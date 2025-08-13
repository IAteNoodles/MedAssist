"""
FastAPI server exposing the main agent as an API for frontend use.

Endpoints:
- GET /health: liveness check
- POST /agent/chat: send a user message and optional context, get assistant reply

Run:
  agent-system/bin/uvicorn server:app --host 0.0.0.0 --port 8080
"""
from __future__ import annotations

import os
from typing import Any, List, Optional

from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from langchain_core.messages import HumanMessage, AnyMessage

# Import the compiled app graph and llm prompt pipeline
from main_system import app as agent_app, AgentState

load_dotenv()

app = FastAPI(title="MedAssist Agent API")

# Allow browser apps to call the API (adjust origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: str = Field(description="'user' or 'assistant'")
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., description="User message/question")
    history: Optional[List[ChatMessage]] = Field(
        default=None,
        description="Optional prior conversation messages for context",
    )


class ChatResponse(BaseModel):
    reply: str
    messages: List[ChatMessage]
    intent: Optional[str] = None
    required_params: Optional[list] = None
    extracted_data: Optional[dict] = None
    model_result: Optional[dict] = None


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/agent/chat", response_model=ChatResponse)
def agent_chat(body: str = Body(..., media_type="text/plain")) -> ChatResponse:
    try:
        # Plain-text message from frontend
        messages: List[AnyMessage] = [HumanMessage(content=str(body))]

        state: AgentState = {
            "messages": messages,
            "intent": "",
            "required_params": [],
            "extracted_data": {},
            "model_result": None,
        }

        result = agent_app.invoke(state)
        final_messages = result.get("messages", [])

        # Format response messages list
        out_messages = [
            ChatMessage(role="user", content=str(m.content)) for m in messages if hasattr(m, "content")
        ]
        if final_messages and hasattr(final_messages[-1], "content"):
            out_messages.append(ChatMessage(role="assistant", content=str(final_messages[-1].content)))
            reply_text = str(final_messages[-1].content)
        else:
            reply_text = ""

        return ChatResponse(
            reply=reply_text,
            messages=out_messages,
            intent=result.get("intent"),
            required_params=result.get("required_params"),
            extracted_data=result.get("extracted_data"),
            model_result=result.get("model_result"),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Optional: JSON-compatible endpoint retained for compatibility
@app.post("/agent/chat-json", response_model=ChatResponse)
def agent_chat_json(req: ChatRequest) -> ChatResponse:
    try:
        messages: List[AnyMessage] = []
        if req.history:
            for m in req.history:
                if m.role == "user":
                    messages.append(HumanMessage(content=m.content))
                else:
                    messages.append(HumanMessage(content=m.content))
        messages.append(HumanMessage(content=req.message))

        state: AgentState = {
            "messages": messages,
            "intent": "",
            "required_params": [],
            "extracted_data": {},
            "model_result": None,
        }
        result = agent_app.invoke(state)
        final_messages = result.get("messages", [])
        out_messages = [
            ChatMessage(role="user", content=str(m.content)) for m in messages if hasattr(m, "content")
        ]
        if final_messages and hasattr(final_messages[-1], "content"):
            out_messages.append(ChatMessage(role="assistant", content=str(final_messages[-1].content)))
            reply_text = str(final_messages[-1].content)
        else:
            reply_text = ""

        return ChatResponse(
            reply=reply_text,
            messages=out_messages,
            intent=result.get("intent"),
            required_params=result.get("required_params"),
            extracted_data=result.get("extracted_data"),
            model_result=result.get("model_result"),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
