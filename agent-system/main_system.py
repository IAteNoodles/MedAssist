import os
import operator
from typing import TypedDict, Annotated, List, Optional

from langchain_core.messages import AnyMessage, HumanMessage, AIMessage
from langchain_groq import ChatGroq
from langchain.pydantic_v1 import BaseModel, Field
from langgraph.graph import StateGraph, END

# Import the MCP server tools
from models import get_diabetes_score, get_hypertension_score

# --- 1. Define Model Parameter Schemas ---
class DiabetesParams(BaseModel):
    """Parameters required for the diabetes prediction model."""
    Glucose: Optional[float] = Field(description="Plasma glucose concentration.")
    BMI: Optional[float] = Field(description="Body mass index.")
    Age: Optional[int] = Field(description="Age in years.")
    Pregnancies: Optional[int] = Field(description="Number of times pregnant.")
    BloodPressure: Optional[float] = Field(description="Diastolic blood pressure (mm Hg).")
    Insulin: Optional[float] = Field(description="2-Hour serum insulin (mu U/ml).")

class HypertensionParams(BaseModel):
    """Parameters required for the hypertension prediction model."""
    Age: Optional[int] = Field(description="Age in years.")
    BMI: Optional[float] = Field(description="Body mass index.")
    BloodPressure: Optional[float] = Field(description="Diastolic blood pressure (mm Hg).")
    Cholesterol: Optional[float] = Field(description="Total cholesterol (mg/dl).")


# --- 2. Define the Agent's State (Memory) ---
class AgentState(TypedDict):
    messages: Annotated[List[AnyMessage], operator.add]
    intent: str
    required_params: list
    extracted_data: dict
    model_result: Optional[dict]
    report: str

# --- 3. Initialize Models ---
from dotenv import load_dotenv
load_dotenv()

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
    
    llm_with_tools = llm.bind_tools(list(tools.values()))
    
    query = state["messages"][-1].content
    ai_message = llm_with_tools.invoke(prompt.format(query=query))
    
    if not isinstance(ai_message, AIMessage) or not ai_message.tool_calls:
        state['messages'] = state['messages'] + [AIMessage(content="I was unable to determine the intent. Please be more specific.")]
        return state

    extracted_tool = ai_message.tool_calls[0]
    intent = extracted_tool["name"]
    extracted_data = extracted_tool["args"]

    cleaned_data = {k: v for k, v in extracted_data.items() if v is not None}
    
    required_params = list(tools[intent].__fields__.keys())

    state['intent'] = intent
    state['extracted_data'] = cleaned_data
    state['required_params'] = required_params
    
    return state


def execute_model_node(state: AgentState):
    """
    Executes the appropriate ML model from the MCP server.
    """
    print("--- एक्सेक्यूटिंग मॉडल (Executing Model) ---")
    intent = state["intent"]
    data = state["extracted_data"]
    result = {}

    if intent == "predict_diabetes":
        score = get_diabetes_score.run(data)
        result = {"disease": "Diabetes", "risk_score": score}
    elif intent == "predict_hypertension":
        score = get_hypertension_score.run(data)
        result = {"disease": "Hypertension", "risk_score": score}

    state['model_result'] = result
    return state

def generate_report_node(state: AgentState):
    """
    Node to generate a clinical report based on the model's prediction.
    """
    print("---GENERATING CLINICAL REPORT---")
    result = state.get("model_result")
    data = state.get("extracted_data")

    if not result or not data:
        report_message = AIMessage(content="Missing model result or extracted data. Cannot generate report.")
        state['messages'] = state['messages'] + [report_message]
        state['report'] = str(report_message.content)
        return state

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
    report_llm = ChatGroq(model="llama3-8b-8192", temperature=0)
    response = report_llm.invoke(prompt)
    
    report_message = AIMessage(content=response.content)
    
    state['messages'] = state['messages'] + [report_message]
    state['report'] = str(response.content)
    return state


# --- 5. Define Conditional Logic (Edge) ---
def data_validation_edge(state: AgentState):
    """
    Checks if all required data is present. If not, asks the user.
    """
    print("--- वैलिडेटिंग डेटा (Validating Data) ---")
    if not state.get("required_params"):
        return "ask_user_node"
        
    required = set(state["required_params"])
    extracted = set(state["extracted_data"].keys())
    missing_keys = list(required - extracted)

    if not missing_keys:
        print("--- डेटा कंप्लीट है, आगे बढ़ रहे हैं (Data Complete, Proceeding) ---")
        return "execute_model"
    else:
        print("--- डेटा मिसिंग है, यूजर से पूछ रहे हैं (Data Missing, Asking User) ---")
        return "ask_user_node"

# --- 6. Build the Graph ---
workflow = StateGraph(AgentState)
workflow.add_node("analyze_intent", analyze_intent_node)
workflow.add_node("execute_model", execute_model_node)
workflow.add_node("clinical_analyzer", generate_report_node)

def ask_user_node(state: AgentState):
    if not state.get("required_params"):
         prompt_for_more_data = AIMessage(content="I could not determine the required parameters. Please clarify your request.")
    else:
        required = set(state["required_params"])
        extracted = set(state["extracted_data"].keys())
        missing_keys = list(required - extracted)
        missing_keys_str = ", ".join(missing_keys)
        prompt_for_more_data = AIMessage(
            content=f"The following parameters are missing for the {state['intent']} model: **{missing_keys_str}**. "
                    f"Please provide them to proceed."
        )
    state['messages'] = state['messages'] + [prompt_for_more_data]
    return state

workflow.add_node("ask_user_node", ask_user_node)
workflow.set_entry_point("analyze_intent")
workflow.add_conditional_edges(
    "analyze_intent",
    data_validation_edge,
    {
        "execute_model": "execute_model",
        "ask_user_node": "ask_user_node"
    }
)
workflow.add_edge("execute_model", "clinical_analyzer")
workflow.add_edge("clinical_analyzer", END)
workflow.add_edge("ask_user_node", END)
app = workflow.compile()

# --- 7. Run the Chatbot ---
def run_chat():
    print("🏥 Medical AI Assistant is online (Powered by Groq/Llama-3.1). How can I help you today?")
    
    messages = []
    while True:
        user_input = input("Doctor: ")
        if user_input.lower() in ["quit", "exit"]:
            break

        messages.append(HumanMessage(content=user_input))
        
        current_state: AgentState = {
            "messages": messages,
            "intent": "",
            "required_params": [],
            "extracted_data": {},
            "model_result": None,
            "report": ""
        }
        
        result = app.invoke(current_state)
        
        final_message = result['messages'][-1]
        messages = result['messages']
        print(f"AI: {final_message.content}")
        
if __name__ == "__main__":
    run_chat()