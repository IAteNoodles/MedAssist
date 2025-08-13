# Backend

This directory contains the backend of the MedAssist application.

## Structure

- `backend_tradional.py`: A traditional backend server.
- `connect_to_database.py`: Contains functions for connecting to the database.
- `convert_xpt_to_csv.py`: A script to convert XPT files to CSV.
- `llm_mcp.py`: MCP server for LLM related tasks.
- `ocr_frontend.html`: A simple frontend for an OCR service.

## Setup

It is recommended to use a virtual environment.

1.  Install the dependencies from the `api_requirements.txt` in the `AI` folder:
    ```bash
    pip install -r ../AI/api_requirements.txt
    ```
2.  Run the desired server. For example, to run the MCP server:
    ```bash
    python llm_mcp.py
    ```
