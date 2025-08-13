# mcp.py

from fastmcp import FastMCP
import random

mcp = FastMCP("Hospital")

# --- Mock Implementations for Hackathon ---
# In a real scenario, these would contain actual model logic or API calls.

@mcp.tool("Get Diabetes Score")
def get_diabetes_score(patient_data: dict) -> float:
    """
    Get the diabetes risk score for a patient based on their data.
    Requires: 'Glucose', 'BMI', 'Age', 'Pregnancies', 'BloodPressure', 'Insulin'
    """
    print(f"--- Calling Diabetes Model with: {patient_data} ---")
    # Simulate a score based on input
    score = random.uniform(0.1, 0.9)
    return round(score, 2)

@mcp.tool("Get Hypertension Score")
def get_hypertension_score(patient_data: dict) -> float:
    """
    Get the hypertension risk score for a patient based on their data.
    Requires: 'Age', 'BMI', 'BloodPressure', 'Cholesterol'
    """
    print(f"--- Calling Hypertension Model with: {patient_data} ---")
    # Simulate a score based on input
    score = random.uniform(0.1, 0.9)
    return round(score, 2)

# Add other tools as needed...
@mcp.tool("Use XGBoost Model for confidence score")
def use_xgboost_model(data: dict) -> float:
    """
    Use the XGBoost model to get a confidence score for the given data.
    """
    print(f"--- Calling XGBoost Model with: {data} ---")
    return random.uniform(0.8, 0.99)