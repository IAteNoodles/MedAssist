from fastmcp import FastMCP


mcp = FastMCP("Hospital")

import os
from dotenv import load_dotenv

load_dotenv()

import requests

#NOT NEEDED

    
    

@mcp.tool("Get Diabetes Score")
def get_diabetes_score(patient_data: dict) -> float:
    """
    Get the diabetes risk score for a patient based on their data.
    
    Args:
        patient_data (dict): A dictionary containing the patient's data.
    
    Returns:
        float: The diabetes risk score for the patient.
    """
    pass

@mcp.tool("Get Hypertension Score")
def get_hypertension_score(patient_data: dict) -> float:
    """
    Get the hypertension risk score for a patient based on their data.

    Args:
        patient_data (dict): A dictionary containing the patient's data.

    Returns:
        float: The hypertension risk score for the patient.
    """
    pass
    
#TODO
@mcp.tool("Get Patient Data")
def get_patient_data(patient_id: str) -> dict:
    """
    Get the patient data for a given patient ID.
    
    Args:
        patient_id (str): The ID of the patient to retrieve data for.
    
    Returns:
        dict: A dictionary containing the patient's data.
    """
    pass

@mcp.tool("Use XGBoost Model for confidence score")
def use_xgboost_model(data: dict) -> float:
    """
    Use the XGBoost model to get a confidence score for the given data.
    
    Args:
        data (dict): The input data for the model.
    
    Returns:
        float: The confidence score from the model.
    """
    pass

@mcp.tool("Chat with MedGEMMA LLM")
def chat_with_medgemma(message: str) -> str:
    """
    Chat with the MedGEMMA LLM using the provided message.

    Args:
        message (str): The message to send to the LLM.

    Returns:
        str: The response from the LLM.
    """
    from langchain_ollama.chat_models import ChatOllama

    model = ChatOllama(model="alibayram/medgemma:4b", temperature=0)
    response = model.invoke(message)
    return response.content

#TODO
@mcp.prompt()
def _data_prompt() -> str:
    """
    Prompt for patient data input.
    
    Returns:
        str: A string containing the patient data input.
    """
    pass


if __name__ == "__main__":
    mcp.run(
        transport="http",
        host="0.0.0.0",
        port=8002,
        log_level="debug",
    )

