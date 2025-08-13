"""
Streamlit web application for Groq + MCP (HTTP) chat.

This application connects to an MCP server over HTTP, discovers its tools,
and provides a chat interface where an LLM can use the tools to respond to user queries.
"""
import asyncio
import json
from contextlib import AsyncExitStack
from typing import Any, Dict, List

import streamlit as st
from dotenv import load_dotenv

from fastmcp.client.client import Client
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage
from langchain_groq import ChatGroq

# Reuse the tool discovery/wrapping logic from the original script
from mcp_client import call_mcp_tool, get_langchain_tools, list_mcp_tools


class MCPGroqChat:
    """
    Manages the connection to the MCP server and the chat logic.
    This is adapted from the original mcp_http_chat.py script.
    """

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
        """Connects to the MCP server and initializes the LLM with tools."""
        load_dotenv()
        self.client = Client(self.url)
        await self.exit_stack.enter_async_context(self.client)

        self.lc_tools = await get_langchain_tools(self.url)
        self.llm = ChatGroq(model=self.llm_model, temperature=self.temperature)
        self.llm_with_tools = self.llm.bind_tools(self.lc_tools)

    async def _execute_tool(self, name: str, arguments: Dict[str, Any]) -> str:
        """Executes a tool call via the MCP client."""
        result = await call_mcp_tool(self.url, name, arguments)
        if isinstance(result, (dict, list)):
            try:
                return json.dumps(result, ensure_ascii=False)
            except Exception:
                return str(result)
        return str(result)

    async def process(self, messages: List[Any]) -> str:
        """
        Processes a user query, calls tools if needed, and returns the final response.
        """
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
        """Closes the connection to the MCP server."""
        await self.exit_stack.aclose()


def main():
    """Main function to run the Streamlit application."""
    st.set_page_config(page_title="MCP Chat", layout="wide")
    st.title("💬 MCP Chat with Groq")

    # Initialize session state
    if "messages" not in st.session_state:
        st.session_state.messages = []
    if "chat_runner" not in st.session_state:
        st.session_state.chat_runner = None

    # Sidebar for configuration
    with st.sidebar:
        st.header("Configuration")
        mcp_url = st.text_input("MCP Server URL", "http://192.168.53.216:8005/mcp/")

        if st.button("Connect"):
            with st.spinner("Connecting to MCP server and initializing..."):
                try:
                    chat_runner = MCPGroqChat(url=mcp_url)
                    asyncio.run(chat_runner.initialize())
                    st.session_state.chat_runner = chat_runner
                    st.session_state.messages = [] # Reset chat
                    st.success("Connected successfully!")
                except Exception as e:
                    st.error(f"Failed to connect: {e}")

    # Display chat messages
    for message in st.session_state.messages:
        role = "user" if isinstance(message, HumanMessage) else "assistant"
        if isinstance(message, AIMessage) and message.tool_calls:
            continue # Don't display tool call intents
        with st.chat_message(role):
            st.markdown(message.content)

    # Chat input
    if prompt := st.chat_input("Ask me anything..."):
        if not st.session_state.chat_runner:
            st.warning("Please connect to an MCP server first.")
            st.stop()

        # Add user message to state and display it
        st.session_state.messages.append(HumanMessage(content=prompt))
        with st.chat_message("user"):
            st.markdown(prompt)

        # Process the message and get the assistant's response
        with st.spinner("Thinking..."):
            try:
                runner = st.session_state.chat_runner
                response = asyncio.run(runner.process(st.session_state.messages))
                # The process method already appends the AI message to the list
                with st.chat_message("assistant"):
                    st.markdown(response)
            except Exception as e:
                st.error(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
