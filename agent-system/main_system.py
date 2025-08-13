import os
import operator
from typing import TypedDict, Annotated, List, Optional

from langchain_core.messages import AnyMessage, HumanMessage, AIMessage, BaseMessage
from langchain_groq import ChatGroq # CHANGED: Import ChatGroq instead of ChatOpenAI
from langchain.pydantic_v1 import BaseModel, Field
from langgraph.graph import StateGraph, END

# Import the MCP server tools
from mcp import get_diabetes_score, get_hypertension_score

# --- 1. Define Model Parameter Schemas ---
# (This section remains unchanged)
class DiabetesParams(BaseModel):
    """Parameters for the diabetes prediction model."""
    age: int = Field(description="Age in years.")
    gender: str = Field(description='"Female", "Male", or "Other".')
    hypertension: int = Field(description="0 for No, 1 for Yes.")
    heart_disease: int = Field(description="0 for No, 1 for Yes.")
    smoking_history: str = Field(description='"never", "No Info", "current", "former", "ever", or "not current".')
    bmi: float = Field(description="Body Mass Index.")
    HbA1c_level: float = Field(description="Hemoglobin A1c level (e.g., 5.7).")
    blood_glucose_level: float = Field(description="Blood glucose level (e.g., 100 mg/dL).")

class HypertensionParams(BaseModel):
    """Parameters for the hypertension prediction model."""
    age: int = Field(description="Age in years.")
    bmi: float = Field(description="Body Mass Index.")
    blood_pressure: int = Field(description="Systolic blood pressure (e.g., 120).")
    cholesterol: int = Field(description="Total cholesterol level (e.g., 200).")


# --- 2. Define the Agent's State (Memory) ---
# (This section remains unchanged)
class AgentState(TypedDict):
    messages: Annotated[List[AnyMessage], operator.add]
    intent: str
    required_params: list
    extracted_data: dict
    model_result: Optional[dict]

# --- 3. Initialize Models ---
# Load environment variables (for GROQ_API_KEY)
from dotenv import load_dotenv
load_dotenv()

# CHANGED: Initialize the Groq model.
# Llama-3.1-8b-instant is extremely fast, so we can use the same instance for all tasks.
llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0)


# --- 4. Define Agent Nodes ---

def analyze_intent_node(state: AgentState):
    """
    First node: Analyzes user query to find intent and extract data.
    """
    print("--- एनालाइजिंग इंटेंट (Analyzing Intent) ---")
    prompt = """
    You are an expert medical assistant. Your task is to analyze the doctor's query.
    1.  Determine the primary intent: 'predict_diabetes' or 'predict_hypertension'.
    2.  Extract all available parameters mentioned in the query.

    Query:
    {query}
    """
    
    tools = {
        "predict_diabetes": DiabetesParams,
        "predict_hypertension": HypertensionParams
    }
    
    # CHANGED: Bind tools to the Groq LLM
    llm_with_tools = llm.bind_tools(list(tools.values()))
    
    query = state["messages"][-1].content
    ai_message = llm_with_tools.invoke(prompt.format(query=query))
    
    if not isinstance(ai_message, AIMessage) or not ai_message.tool_calls:
        # If no tool is called, we can't proceed.
        # We'll add a message to the state and let the graph end.
        # A more robust solution might involve asking for clarification.
        return {
            "messages": state['messages'] + [AIMessage(content="I could not determine the intent or extract the required parameters from your query. Please be more specific.")]
        }

    extracted_tool = ai_message.tool_calls[0]
    intent = extracted_tool["name"]
    extracted_data = extracted_tool["args"]

    cleaned_data = {k: v for k, v in extracted_data.items() if v is not None}
    
    required_params = list(tools[intent].__fields__.keys())

    return {
        "intent": intent,
        "extracted_data": cleaned_data,
        "required_params": required_params
    }

def execute_model_node(state: AgentState):
    """
    Executes the appropriate ML model from the MCP server.
    """
    print("--- एक्सेक्यूटिंग मॉडल (Executing Model) ---")
    intent = state["intent"]
    data = state["extracted_data"]
    result = {}

    if intent == "predict_diabetes":
        # The tool function expects keyword arguments, so we unpack the data dict.
        model_output = get_diabetes_score(**data)
        # We'll store the full output but also keep the simple format for the report generator
        result = {
            "disease": "Diabetes", 
            "risk_score": model_output.get("risk_probability"),
            "full_report": model_output
        }
    elif intent == "predict_hypertension":
        model_output = get_hypertension_score(**data)
        result = {
            "disease": "Hypertension", 
            "risk_score": model_output.get("risk_probability"),
            "full_report": model_output
        }

    return {"model_result": result}

def clinical_bert_analyzer_node(state: AgentState):
    """
    Generates a final report, simulating a Clinical BERT analysis.
    """
    print("--- जेनरेटिंग रिपोर्ट (Generating Report) ---")
    result = state.get("model_result")
    data = state.get("extracted_data")

    if not result:
        final_message = AIMessage(content="Could not retrieve model results. Please check the inputs or the MCP server.")
        return {"messages": state['messages'] + [final_message]}

    prompt = f"""
    You are an expert Clinical Analysis AI (simulating ClinicalBERT).
    A predictive model has been run on a patient. Your task is to provide a structured clinical interpretation.

    **Patient Data Provided:**
    {data}

    **Model Prediction:**
    - Disease Assessed: {result.get('disease', 'N/A')}
    - Calculated Risk Score: {result.get('risk_score', 'N/A')} (A score > 0.6 is considered high risk)

    **Your Tasks:**
    1.  **Summary**: Write a one-sentence summary of the finding.
    2.  **Interpretation**: Briefly explain what the risk score means in a clinical context.
    3.  **Key Factors**: Identify the key patient parameters that likely contributed to this score.
    4.  **Recommendation**: Suggest a next step for the doctor (e.g., "Consider further tests," "Recommend lifestyle changes").

    Provide a concise report.
    """
    # CHANGED: Use the Groq LLM for generating the report
    report = llm.invoke(prompt).content
    final_message = AIMessage(content=str(report) + "\n\nIs there anything else I can assist you with?")
    return {"messages": state['messages'] + [final_message]}


# --- 5. Define Conditional Logic (Edge) ---
# (This section remains unchanged)
def data_validation_edge(state: AgentState):
    """
    Checks if all required data is present. If not, asks the user.
    """
    print("--- वैलिडेटिंग डेटा (Validating Data) ---")
    required = set(state["required_params"])
    extracted = set(state["extracted_data"].keys())
    missing_keys = list(required - extracted)

    if not missing_keys:
        print("--- डेटा कंप्लीट है, आगे बढ़ रहे हैं (Data Complete, Proceeding) ---")
        return "execute_model"
    else:
        print("--- डेटा मिसिंग है, यूजर से पूछ रहे हैं (Data Missing, Asking User) ---")
        return "end_and_ask_user"

# --- 6. Build the Graph ---
# (This section remains unchanged, as the logic is the same)
workflow = StateGraph(AgentState)
workflow.add_node("analyze_intent", analyze_intent_node)
workflow.add_node("execute_model", execute_model_node)
workflow.add_node("clinical_analyzer", clinical_bert_analyzer_node)

def ask_user_node(state: AgentState):
    required = set(state["required_params"])
    extracted = set(state["extracted_data"].keys())
    missing_keys = list(required - extracted)
    missing_keys_str = ", ".join(missing_keys)
    prompt_for_more_data = AIMessage(
        content=f"The following parameters are missing for the {state['intent']} model: **{missing_keys_str}**. "
                f"Please provide them to proceed."
    )
    return {"messages": [prompt_for_more_data]}

workflow.add_node("ask_user_node", ask_user_node)
workflow.set_entry_point("analyze_intent")
workflow.add_conditional_edges(
    "analyze_intent",
    data_validation_edge,
    {
        "execute_model": "execute_model",
        "end_and_ask_user": "ask_user_node"
    }
)
workflow.add_edge("execute_model", "clinical_analyzer")
workflow.add_edge("clinical_analyzer", END)
workflow.add_edge("ask_user_node", END)
app = workflow.compile()

# --- 7. Run the Chatbot ---
# (This section remains unchanged)
def run_chat():
    print("🏥 Medical AI Assistant is online (Powered by Groq/Llama-3.1). How can I help you today?")
    
    # Maintain the conversation history
    messages = []
    
    while True:
        user_input = input("Doctor: ")
        if user_input.lower() in ["quit", "exit"]:
            break

        messages.append(HumanMessage(content=user_input))
        
        # Construct the full state to pass to the graph
        initial_state: AgentState = {
            "messages": messages,
            "intent": "",
            "required_params": [],
            "extracted_data": {},
            "model_result": None,
        }
        
        result = app.invoke(initial_state)
        
        # Update the conversation history from the final state
        messages = result['messages']
        
        print(f"\nAssistant:\n{messages[-1].content}\n")

if __name__ == "__main__":
    run_chat()