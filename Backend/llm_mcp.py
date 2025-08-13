from fastmcp import FastMCP


mcp = FastMCP("Hospital")

import os
from dotenv import load_dotenv

load_dotenv()

import requests

@mcp.tool("Get Top K Chunks")
def get_top_k_chunks(query: str, k: int = 5) -> list:
    """
    Get the top K chunks from the knowledge base that are most relevant to the query.
    
    Args:
        query (str): The query string to search for.
        k (int): The number of top chunks to return. Default is 5.
    
    Returns:
        list: A list of dictionaries containing the top K chunks.
    """
    
    pass

@mcp.tool("Extract Data from Image")
def extract_data_from_image(image_url: str) -> dict:
    """
    Extract data from an image using OCR.
    
    Args:
        image_url (str): The URL of the image to extract data from.
    
    Returns:
        dict: A dictionary containing the extracted data.
    """
    
    pass

@mcp.tool("Extract Data from PDF")
def extract_data_from_pdf(pdf_url: str) -> dict:
    """
    Extract data from a PDF file using OCR.
    
    Args:
        pdf_url (str): The URL of the PDF file to extract data from.
    
    Returns:
        dict: A dictionary containing the extracted data.
    """
    pass

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
@mcp.tool("Update Patient Data")
# def save_patient_data()
    
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



#-------------------------PROMPTS-------------------------

#TODO
@mcp.prompt()
def _data_prompt() -> str:
    """
    Prompt for patient data input.
    
    Returns:
        str: A string containing the patient data input.
    """
    pass

