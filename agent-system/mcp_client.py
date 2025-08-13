"""
MCP client utilities: connect to a remote MCP server, list tool descriptions,
wrap tools for LangChain usage, and demo Groq tool-calling.

Requirements:
- fastmcp (client)
- langchain, langchain-core, langchain-groq
- pydantic>=2
- python-dotenv (optional, for GROQ_API_KEY)

Usage (CLI):
    python mcp_client.py --url http://192.168.53.216:8005/mcp/

Programmatic:
    from mcp_client import get_langchain_tools, call_mcp_tool
    tools = asyncio.run(get_langchain_tools("http://192.168.53.216:8005/mcp/"))

    # Bind to Groq
    from langchain_groq import ChatGroq
    llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0)
    llm_with_tools = llm.bind_tools(tools)  # tools are StructuredTool instances

"""
from __future__ import annotations

import argparse
import asyncio
import json
from typing import Any, Dict, List, Tuple

from dotenv import load_dotenv
from pydantic import BaseModel, Field, create_model

from fastmcp.client.client import Client
import mcp.types as mcp_types
from langchain_groq import ChatGroq

# Prefer langchain_core.tools if available (LangChain 0.3+)
try:
    from langchain_core.tools import StructuredTool
except Exception:  # fallback for older installs
    from langchain.tools import StructuredTool  # type: ignore


def _jsonschema_type_to_python(t: str) -> Any:
    mapping = {
        "string": (str, ...),
        "number": (float, ...),
        "integer": (int, ...),
        "boolean": (bool, ...),
        "array": (list[Any], ...),
        "object": (dict[str, Any], ...),
    }
    return mapping.get(t, (str, ...))


def _build_args_model_from_schema(name: str, schema: Dict[str, Any]) -> type[BaseModel]:
    props: Dict[str, Any] = schema.get("properties", {}) or {}
    required = set(schema.get("required", []) or [])

    fields: Dict[str, Tuple[Any, Any]] = {}
    for key, spec in props.items():
        jtype = spec.get("type", "string")
        py_type, default_required = _jsonschema_type_to_python(jtype)
        desc = spec.get("description", "")
        default = Field(... if key in required else None, description=desc)
        fields[key] = (py_type, default)

    # Fall back to a free-form dict if no properties are defined
    if not fields:
        fields["payload"] = (dict[str, Any], Field(..., description="Free-form payload"))

    model = create_model(f"{name}Args", **fields)  # type: ignore[arg-type]
    return model


async def list_mcp_tools(url: str) -> List[Dict[str, Any]]:
    """Connect to MCP server and return a list of tool dicts with description + schema."""
    async with Client(url) as client:
        tools = await client.list_tools()
        out: List[Dict[str, Any]] = []
        for t in tools:
            out.append(
                {
                    "name": t.name,
                    "description": getattr(t, "description", ""),
                    "inputSchema": getattr(t, "inputSchema", {}) or {},
                }
            )
        return out


async def call_mcp_tool(url: str, name: str, arguments: Dict[str, Any]) -> Any:
    """Call a named MCP tool with arguments and return parsed result (structured if available)."""
    async with Client(url) as client:
        result = await client.call_tool(name=name, arguments=arguments, raise_on_error=True)
        # Prefer structured data when available
        if result.data is not None:
            return result.data
        if result.structured_content is not None:
            return result.structured_content
        # Fallback to textual content blocks
        # Fallback: concatenate any textual content blocks
        blocks = result.content
        texts: List[str] = []
        for b in blocks:
            if isinstance(b, mcp_types.TextContent):
                texts.append(b.text)
            else:
                # Best-effort stringify for non-text content
                try:
                    texts.append(str(b))
                except Exception:
                    pass
        return "\n".join(texts)


async def get_langchain_tools(url: str) -> List[StructuredTool]:
    """Create LangChain StructuredTool wrappers for all MCP tools from the server."""
    async with Client(url) as client:
        tools = await client.list_tools()

    lc_tools: List[StructuredTool] = []
    for t in tools:
        schema = getattr(t, "inputSchema", {}) or {}
        name = t.name
        desc = getattr(t, "description", "")
        args_model = _build_args_model_from_schema(name, schema)

        async def _acall_tool_inner(**kwargs):
            return await call_mcp_tool(url, name, kwargs)

        def _call_tool_sync(**kwargs):
            return asyncio.run(call_mcp_tool(url, name, kwargs))

        try:
            tool = StructuredTool.from_function(
                coroutine=_acall_tool_inner,
                name=name,
                description=desc,
                args_schema=args_model,
            )
        except TypeError:
            tool = StructuredTool.from_function(
                _call_tool_sync,
                name=name,
                description=desc,
                args_schema=args_model,
            )
        lc_tools.append(tool)
    return lc_tools


async def print_tools(url: str) -> None:
    tools = await list_mcp_tools(url)
    print(f"Found {len(tools)} tool(s) at {url}:\n")
    for t in tools:
        print(f"- {t['name']}: {t['description']}")
        schema = t.get("inputSchema", {})
        if schema:
            print("  inputSchema:")
            print(json.dumps(schema, indent=2))
        print()


def demo_with_groq(url: str) -> None:
    load_dotenv()
    # Build tools synchronously for demo
    lc_tools = asyncio.run(get_langchain_tools(url))

    llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0)
    llm_with_tools = llm.bind_tools(lc_tools)

    print("Groq LLM is configured with", len(lc_tools), "tool(s). Try prompting it in your app.")


def main() -> None:
    parser = argparse.ArgumentParser(description="MCP client utility")
    parser.add_argument("--url", default="http://192.168.53.216:8005/mcp/", help="MCP server URL")
    parser.add_argument("--list", action="store_true", help="List tools and exit")
    parser.add_argument("--demo-groq", action="store_true", help="Setup Groq LLM with tools")
    args = parser.parse_args()

    if args.list:
        asyncio.run(print_tools(args.url))
        return

    if args.demo_groq:
        demo_with_groq(args.url)
        return

    # Default action: list tools
    asyncio.run(print_tools(args.url))


if __name__ == "__main__":
    main()
