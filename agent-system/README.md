# 🏥 MedAgent-Llama: AI Multi-Agent Medical Assistant

*A multi-agent system powered by LangGraph and Groq's Llama 3.1 to assist medical professionals with real-time predictive model analysis.*

---

## 📜 Overview

**MedAgent-Llama** is a conversational AI prototype designed to streamline a doctor's workflow. It allows medical professionals to get instant risk assessments for conditions like diabetes and hypertension by simply describing a patient's data in natural language.

The system intelligently analyzes the doctor's request, identifies the correct predictive model to use, checks if all necessary patient data is available, and runs the analysis via a mock **Model Control Panel (MCP)**. It then provides a structured, interpretable report, simulating an advanced clinical analysis.

This project was built for rapid prototyping, demonstrating the power of stateful agentic workflows using modern AI tools.

---

## ⚙️ How It Works

The system is architected as a stateful graph using **LangGraph**. This "flowchart as code" approach allows for complex, conditional interactions, such as asking the user for missing information before proceeding.

**The agent workflow is as follows:**

1.  **Analyze Intent**: The first agent listens to the doctor's query. It uses Groq's `llama-3.1-8b-instant` model with tool-calling capabilities to determine the doctor's goal (e.g., `predict_diabetes`) and extracts all provided patient parameters.
2.  **Validate Data (Conditional Step)**: The system checks if the required parameters for the intended model were provided.
    * ✅ **If Yes**: The flow proceeds to the next step.
    * ❌ **If No**: The flow is interrupted, and the agent asks the doctor to provide the specific missing data points.
3.  **Execute Model**: The system calls the appropriate function from the `mcp.py` server (e.g., `get_diabetes_score`), passing the validated patient data.
4.  **Generate Report**: The final agent takes the raw model score and generates a structured, easy-to-read clinical summary, explaining the risk score, key contributing factors, and recommended next steps.
5.  **Wait for Next Command**: The system presents the report and asks the doctor for the next instruction, maintaining the conversation's memory.

---

## ✨ Features

* **Natural Language Interface**: Doctors can interact with the system using plain English, without needing to format data manually.
* **Intelligent Intent & Data Extraction**: Uses Llama 3.1's tool-calling to reliably understand the user's goal and extract relevant data.
* **Dynamic Data Validation**: Automatically prompts the user for missing information required by the predictive models.
* **Stateful Conversation**: Remembers the context of the conversation, allowing for follow-up questions and corrections.
* **Modular & Extensible**: Built with LangGraph nodes, making it easy to add new models, tools, or steps to the workflow.
* **Blazing Fast**: Powered by the **Groq API**, providing near-instant responses.

---

## 🛠️ Tech Stack

* **Orchestration**: LangChain & LangGraph
* **LLM Provider**: Groq (Model: `llama-3.1-8b-instant`)
* **Tooling/Models**: FastMCP (for mock model server)
* **Core Language**: Python

---

## 📁 Project Structure

.
├── .env                # For storing API keys
├── main_system.py      # Main application logic with LangGraph
├── mcp.py              # Mock Model Control Panel server
├── requirements.txt    # Project dependencies
└── README.md           # You are here!

---

## 🚀 Setup and Installation

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

---

## ▶️ How to Run

Execute the main application file from your terminal:

```bash
python main_system.py