"""
Streamlit web application for Groq + MCP (HTTP) chat with optional OCR file context.
"""
import asyncio
import json
import base64
import os
from contextlib import AsyncExitStack
from typing import Any, Dict, List

import streamlit as st
from dotenv import load_dotenv
from fastmcp.client.client import Client
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage
from langchain_groq import ChatGroq
from mistralai import Mistral

# Reuse existing MCP client helpers
from mcp_client import call_mcp_tool, get_langchain_tools


def _extract_text_from_ocr_response(ocr_response) -> str:
    """Normalize different possible OCR response shapes to plain text."""
    if ocr_response is None:
        return ""
    if hasattr(ocr_response, "model_dump"):
        try:
            data = ocr_response.model_dump()
        except Exception:
            data = None
    else:
        data = None

    pages = []
    if hasattr(ocr_response, "pages") and ocr_response.pages is not None:
        pages = ocr_response.pages
    elif isinstance(data, dict) and isinstance(data.get("pages"), list):
        pages = data.get("pages")
    elif isinstance(ocr_response, dict) and isinstance(ocr_response.get("pages"), list):
        pages = ocr_response.get("pages")

    segments: List[str] = []
    for p in pages:
        if not p:
            continue
        if isinstance(p, dict):
            seg = p.get("markdown") or p.get("text") or ""
        else:
            seg = getattr(p, "markdown", None) or getattr(p, "text", "")
        if seg:
            segments.append(seg.strip())
    return "\n\n".join(segments)


class MCPGroqChat:
    """Manages connection to MCP server and Groq LLM with tool calling."""

    def __init__(self, url: str, llm_model: str = "llama-3.1-8b-instant", temperature: float = 0):
        self.url = url
        self.llm_model = llm_model
        self.temperature = temperature
        self.exit_stack = AsyncExitStack()
        self.client: Client | None = None
        self.lc_tools: List[Any] = []
        self.llm: ChatGroq | None = None
        self.llm_with_tools: Any = None

    async def initialize(self):
        load_dotenv()
        self.client = Client(self.url)
        await self.exit_stack.enter_async_context(self.client)
        self.lc_tools = await get_langchain_tools(self.url)
        self.llm = ChatGroq(model=self.llm_model, temperature=self.temperature)
        self.llm_with_tools = self.llm.bind_tools(self.lc_tools)

    async def _execute_tool(self, name: str, arguments: Dict[str, Any]) -> str:
        result = await call_mcp_tool(self.url, name, arguments)
        if isinstance(result, (dict, list)):
            try:
                return json.dumps(result, ensure_ascii=False)
            except Exception:
                return str(result)
        return str(result)

    async def process(self, messages: List[Any]) -> str:
        if not self.llm_with_tools or not self.llm:
            raise RuntimeError("Chat runner is not initialized.")

        ai_msg = self.llm_with_tools.invoke(messages)

        if isinstance(ai_msg, AIMessage) and getattr(ai_msg, "tool_calls", None):
            messages.append(ai_msg)
            for i, tc in enumerate(ai_msg.tool_calls):
                name = tc.get("name")
                args = tc.get("args") or {}
                try:
                    out_text = await self._execute_tool(name, args)
                except Exception as e:
                    out_text = f"Tool '{name}' failed: {e}"
                messages.append(ToolMessage(content=out_text, tool_call_id=tc.get("id", f"call_{i}")))
            final_model = self.llm.bind_tools([], tool_choice="none")
            final_msg = final_model.invoke(messages)
            if isinstance(final_msg, AIMessage):
                messages.append(final_msg)
                return str(final_msg.content)
            return str(final_msg)

        if isinstance(ai_msg, AIMessage):
            messages.append(ai_msg)
            return str(ai_msg.content)
        return str(ai_msg)

    async def close(self):
        await self.exit_stack.aclose()


def _handle_file_upload() -> str | None:
    uploaded_file = st.file_uploader("Upload image or PDF for context", type=["png", "jpg", "jpeg", "pdf"])  # noqa: RUF100
    if not uploaded_file:
        return None
    with st.spinner("Extracting text..."):
        try:
            api_key = "76jNt9NP9qvfzSCNWl98FUgpZgcjii6D"
            if not api_key:
                st.error("MISTRAL_API_KEY missing.")
                return None
            client = Mistral(api_key=api_key)
            contents = uploaded_file.getvalue()
            b64 = base64.b64encode(contents).decode("utf-8")
            if uploaded_file.type.startswith("image/"):
                document_payload = {"type": "image_url", "image_url": f"data:{uploaded_file.type};base64,{b64}"}
            elif uploaded_file.type == "application/pdf":
                document_payload = {"type": "document_url", "document_url": f"data:application/pdf;base64,{b64}"}
            else:
                st.error("Unsupported file type.")
                return None
            ocr_response = client.ocr.process(model="mistral-ocr-latest", document=document_payload, include_image_base64=False)
            text = _extract_text_from_ocr_response(ocr_response)
            if not text.strip():
                st.warning("No text extracted.")
            return text
        except Exception as e:  # noqa: BLE001
            st.error(f"OCR failed: {e}")
            return None


def main():  # noqa: C901
    st.set_page_config(page_title="MCP Chat", layout="wide")
    st.title("💬 MCP Chat with Groq")

    if "messages" not in st.session_state:
        st.session_state.messages = []  # type: ignore[assignment]
    if "chat_runner" not in st.session_state:
        st.session_state.chat_runner = None  # type: ignore[assignment]
    if "file_context" not in st.session_state:
        st.session_state.file_context = None  # type: ignore[assignment]

    with st.sidebar:
        st.header("Connection")
        mcp_url = st.text_input("MCP Server URL", "http://127.0.0.1:8005/mcp/")
        if st.button("Connect", type="primary"):
            with st.spinner("Connecting..."):
                try:
                    runner = MCPGroqChat(url=mcp_url)
                    asyncio.run(runner.initialize())
                    st.session_state.chat_runner = runner
                    st.session_state.messages = []
                    st.success("Connected")
                except Exception as e:  # noqa: BLE001
                    st.error(f"Connect failed: {e}")

        st.divider()
        st.header("File Context")
        new_context = _handle_file_upload()
        if new_context is not None:
            st.session_state.file_context = new_context
        if st.session_state.file_context:
            with st.expander("Extracted Text", expanded=False):
                st.text_area("Context", st.session_state.file_context, height=180)
            if st.button("Clear Context"):
                st.session_state.file_context = None
                st.experimental_rerun()

    # Display conversation
    for m in st.session_state.messages:
        role = "user" if isinstance(m, HumanMessage) else "assistant"
        if isinstance(m, AIMessage) and getattr(m, "tool_calls", None):
            continue
        with st.chat_message(role):
            st.markdown(m.content)

    if prompt := st.chat_input("Ask something..."):
        if not st.session_state.chat_runner:
            st.warning("Connect first.")
            st.stop()
        # Compose final prompt with optional file context
        final_prompt = prompt
        if st.session_state.file_context:
            final_prompt = (
                "Context from uploaded file:\n---\n" + st.session_state.file_context + "\n---\n\nUser query: " + prompt
            )
        # Build message list for this turn
        temp_messages = st.session_state.messages.copy()
        temp_messages.append(HumanMessage(content=final_prompt))
        with st.chat_message("user"):
            st.markdown(prompt)
        with st.spinner("Thinking..."):
            try:
                response = asyncio.run(st.session_state.chat_runner.process(temp_messages))
                st.session_state.messages = temp_messages
                with st.chat_message("assistant"):
                    st.markdown(response)
            except Exception as e:  # noqa: BLE001
                st.error(f"Error: {e}")


if __name__ == "__main__":
    main()
