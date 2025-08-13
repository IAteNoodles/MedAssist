"""
Groq + MCP (HTTP) chat: connects to an MCP server over HTTP, discovers tools,
and runs a chat loop where the LLM can request tool calls; tool calls are
executed via fastmcp Client and results are fed back to the LLM.

Run:
  python mcp_http_chat.py --url http://192.168.53.216:8005/mcp/
Requires GROQ_API_KEY in the environment (dotenv supported).
"""
from __future__ import annotations

import argparse
import asyncio
import json
from contextlib import AsyncExitStack
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv

from fastmcp.client.client import Client
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage

# Reuse the tool discovery/wrapping logic
from mcp_client import get_langchain_tools, call_mcp_tool, list_mcp_tools


class MCPGroqChat:
    def __init__(self, url: str, llm_model: str = "llama-3.1-8b-instant", temperature: float = 0):
        self.url = url
        self.llm_model = llm_model
        self.temperature = temperature
        self.messages: List[Any] = []
        self.exit_stack = AsyncExitStack()
        self.client: Optional[Client] = None
        self.lc_tools = []
        self.llm = ChatGroq(model=self.llm_model, temperature=self.temperature)
        self.llm_with_tools = None

    async def initialize(self):
        load_dotenv()
        print(f"🔌 Connecting to MCP server at {self.url} (HTTP)...")
        # Keep the MCP client session open during the chat
        self.client = Client(self.url)
        await self.exit_stack.enter_async_context(self.client)

        # List tools for visibility
        tools = await list_mcp_tools(self.url)
        print("✅ Connected. Tools:")
        for t in tools:
            print(f" - {t['name']}: {t.get('description', '')}")

        # Build LangChain tools for function calling schema
        self.lc_tools = await get_langchain_tools(self.url)
        self.llm_with_tools = self.llm.bind_tools(self.lc_tools)

    async def _execute_tool(self, name: str, arguments: Dict[str, Any]) -> str:
        # Call via HTTP MCP and return a string result
        result = await call_mcp_tool(self.url, name, arguments)
        if isinstance(result, (dict, list)):
            try:
                return json.dumps(result, ensure_ascii=False)
            except Exception:
                return str(result)
        return str(result)

    async def process(self, user_input: str) -> str:
        self.messages.append(HumanMessage(content=user_input))

        # First LLM pass to decide on tool usage
        ai_msg = self.llm_with_tools.invoke(self.messages)

        if isinstance(ai_msg, AIMessage) and getattr(ai_msg, "tool_calls", None):
            # Record the assistant's tool-calling intent
            self.messages.append(ai_msg)

            # Execute each requested tool
            for i, tc in enumerate(ai_msg.tool_calls):
                name = tc.get("name")
                args = tc.get("args") or {}
                try:
                    out_text = await self._execute_tool(name, args)
                except Exception as e:
                    out_text = f"Tool '{name}' failed: {e}"
                # Add tool result for the second LLM pass
                self.messages.append(ToolMessage(content=out_text, tool_call_id=tc.get("id", f"call_{i}")))

            # Second LLM pass with tool outputs
            final_msg = self.llm.invoke(self.messages)
            if isinstance(final_msg, AIMessage):
                self.messages.append(final_msg)
                return final_msg.content if isinstance(final_msg.content, str) else str(final_msg.content)
            return str(final_msg)

        # No tools requested; return the model's content
        if isinstance(ai_msg, AIMessage):
            self.messages.append(ai_msg)
            return ai_msg.content if isinstance(ai_msg.content, str) else str(ai_msg.content)

        # Fallback
        return str(ai_msg)

    async def chat_loop(self):
        print("\n🚀 MCP Groq Chat Started! ('quit' to exit)\n")
        while True:
            try:
                user = input("👤 You: ").strip()
                if not user:
                    continue
                if user.lower() in {"quit", "exit", "bye"}:
                    print("👋 Goodbye!")
                    break
                reply = await self.process(user)
                print(f"\n🤖 Assistant: {reply}\n")
            except KeyboardInterrupt:
                print("\n👋 Interrupted. Bye!")
                break
            except Exception as e:
                print(f"❌ Error: {e}")

    async def close(self):
        await self.exit_stack.aclose()


async def amain(url: str):
    chat = MCPGroqChat(url=url)
    try:
        await chat.initialize()
        await chat.chat_loop()
    finally:
        await chat.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://192.168.53.216:8005/mcp/", help="MCP server URL")
    args = parser.parse_args()
    asyncio.run(amain(args.url))


if __name__ == "__main__":
    main()
