# Agent System

This directory contains a multi-agent system for medical assistance.

## Structure

- `main_system.py`: The main application logic with LangGraph.
- `server.py`: The MCP server.
- `mcp_client.py`: A client for the MCP server.
- `fast_client.py`: A client for a FastMCP server.
- `streamlit_app.py`: A Streamlit application for the agent system.
- `requirements.txt`: Project dependencies.

## Setup

1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url>
    cd agent-system
    ```

2.  **Create a Virtual Environment** (Recommended)
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set Up Environment Variables**
    Create a file named `.env` in the root directory and add your Groq API key:
    ```
    GROQ_API_KEY="your-groq-api-key-here"
    ```

## How to Run

1.  Run the MCP server:
    ```bash
    python server.py
    ```
2.  In a separate terminal, run the main system:
    ```bash
    python main_system.py
    ```
    Or run the Streamlit app:
    ```bash
    streamlit run streamlit_app.py
    ```

## 🧠 Agent Orchestration Architecture

The system combines a LangGraph state machine, Groq LLM (tool-calling), and MCP-exposed model tools. The flow below shows how a user request is processed end‑to‑end.

### High-Level Flow

```mermaid
flowchart LR
    U[Doctor / User] -->|message| API[(FastAPI / Streamlit UI)]
    API --> GraphEntry[LangGraph: analyze_intent]
    subgraph LangGraph State Machine
        GraphEntry -->|Intent + params?\ncomplete| ExecuteModel[execute_model]
        GraphEntry -->|Missing params or\nno intent| AskUser[ask_user_node]
        ExecuteModel --> Clinical[clinical_analyzer]
        Clinical --> End1[(Reply)]
        AskUser --> End2[(Reply)]
    end
    ExecuteModel -->|calls| MCP[FastMCP Tools]
    subgraph MCP Tool Layer
        MCP --> DScore[Get Diabetes Score]
        MCP --> HScore[Get Hypertension Score]
        MCP --> XGB[Use XGBoost Model]
    end
    DScore --> ExecuteModel
    HScore --> ExecuteModel
    XGB --> ExecuteModel
    End1 --> API
    End2 --> API
    API --> U
```

### Sequence (Detailed)

```mermaid
sequenceDiagram
    participant U as User
    participant API as FastAPI / Streamlit
    participant LG as LangGraph (State)
    participant LLM as Groq Llama 3.1
    participant MCP as MCP Server (FastMCP)
    participant Tool as Model Tool (e.g. Diabetes)

    U->>API: Send clinical query
    API->>LG: Initialize state (messages, empty intent)
    LG->>LLM: analyze_intent prompt + last user message
    LLM-->>LG: Tool call (schema + extracted args) OR plain text
    alt Tool call & sufficient params
        LG->>MCP: Invoke selected tool with extracted params
        MCP->>Tool: Execute model function
        Tool-->>MCP: Risk score
        MCP-->>LG: Score result
        LG->>LLM: clinical report generation prompt
        LLM-->>LG: Structured clinical interpretation
        LG-->>API: Final assistant message
        API-->>U: Report + follow-up prompt
    else Missing params or no intent
        LG-->>API: Ask for missing fields
        API-->>U: Request additional parameters
    end
```

### Components

- LangGraph Nodes:
  - `analyze_intent`: Classifies intent & extracts structured params via tool schema binding.
  - `execute_model`: Calls FastMCP-decorated scoring tools.
  - `clinical_analyzer`: Generates clinician-style interpretation.
  - `ask_user_node`: Requests missing fields.
- MCP Tools (`models.py`): Lightweight mock implementations returning stochastic risk scores.
- Delivery Channels:
  - CLI (`main_system.py` loop)
  - REST (`/agent/chat` in `server.py`)
  - Chat UI (`streamlit_app.py`)
- External LLM: Groq `llama-3.1-8b-instant` used for both intent extraction & narrative report.

### State Data Contract (AgentState)

| Field | Purpose |
|-------|---------|
| `messages` | Full conversation history (LangChain messages) |
| `intent` | Resolved model intent (`predict_diabetes` / `predict_hypertension`) |
| `required_params` | Parameter names expected for the resolved tool |
| `extracted_data` | Parsed user-supplied structured values |
| `model_result` | Tool execution output (risk score + metadata) |

### Extension Ideas

- Add memory store for multi-turn gradual parameter collection.
- Introduce validation / normalization layer (ranges, units).
- Plug real predictive models or external EHR API instead of mocks.
- Add additional disease risk tools and auto tool selection heuristics.

---
Diagram generated automatically.
