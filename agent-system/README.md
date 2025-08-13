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