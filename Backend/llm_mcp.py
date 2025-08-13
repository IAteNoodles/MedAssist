from fastmcp import FastMCP


mcp = FastMCP("Hospital")

import os
from dotenv import load_dotenv

load_dotenv()

import requests

#NOT NEEDED

    
    
AI_URL = "http://192.168.53.197:5001/predict/"

@mcp.tool("Get Diabetes Score")
def get_diabetes_score(
    age: int,
    gender: str,
    hypertension: int,
    heart_disease: int,
    smoking_history: str,
    bmi: float,
    HbA1c_level: float,
    blood_glucose_level: float
) -> dict:
    """
    Get the diabetes risk score for a patient based on their data.

    Args:
        age (int): Age in years.
        gender (str): "Female", "Male", or "Other".
        hypertension (int): 0 = No, 1 = Yes.
        heart_disease (int): 0 = No, 1 = Yes.
        smoking_history (str): "never", "No Info", "current", "former", "ever", "not current".
        bmi (float): Body Mass Index.
        HbA1c_level (float): Hemoglobin A1c level (3.5-9.0).
        blood_glucose_level (float): Blood glucose level (80-300 mg/dL).

    Returns:
        dict: A dictionary with the following structure:
            - prediction (int): 0 or 1, indicating the predicted class (e.g., 0 = no diabetes, 1 = diabetes).
            - risk_probability (float): The probability of diabetes risk (between 0 and 1).
            - confidence_score (float): The model's confidence in its prediction (between 0 and 1).
            - risk_category (str): Risk level, such as "Low", "Medium", or "High".
            - input_data (dict): The input patient data used for prediction.
            - explanations (dict): Explanation details, including:
                - explanations (list): List of explanation strings or factors.
                - top_factors (list): List of most influential factors.
                - summary (str): Summary of the main factors influencing the prediction.
            - interpretation (dict): Human-readable interpretation and recommendations, including:
                - result (str): Text summary of the risk.
    """
    payload = {
        "age": age,
        "gender": gender,
        "hypertension": hypertension,
        "heart_disease": heart_disease,
        "smoking_history": smoking_history,
        "bmi": bmi,
        "HbA1c_level": HbA1c_level,
        "blood_glucose_level": blood_glucose_level
    }
    try:
        response = requests.post(AI_URL + "diabetes", json=payload, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {
            "error": str(e),
            "input_data": payload
        }



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
        port=8005,
        log_level="debug"
    )