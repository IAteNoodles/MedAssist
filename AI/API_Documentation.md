# MedAssist Prediction API Documentation

## Overview
The MedAssist Prediction API provides machine learning-based predictions for:
1. **Cardiovascular Disease Risk** - Using patient health metrics
2. **Diabetes Risk** - Using metabolic and lifestyle factors

Both endpoints provide detailed explanations using SHAP (SHapley Additive exPlanations) to help understand how the model arrived at its predictions.

## Features
- 🎯 **Accurate Predictions**: XGBoost models trained on medical datasets
- 🔍 **Explainable AI**: SHAP explanations for model transparency
- 📊 **Confidence Scores**: Probability scores and risk categorization
- 💡 **Health Recommendations**: Personalized recommendations based on risk factors
- 🌐 **RESTful API**: Easy integration with web and mobile applications

## Installation & Setup

### Prerequisites
- Python 3.8+
- Required packages (install with pip):

```bash
pip install flask flask-cors joblib numpy pandas scikit-learn xgboost shap matplotlib seaborn
```

### Running the API
```bash
cd /path/to/MedAssist/AI
python prediction_api.py
```

The API will start on `http://localhost:5000`

## API Endpoints

### 1. Health Check
**GET** `/health`

Check if the API is running and models are loaded.

**Response:**
```json
{
  "status": "healthy",
  "message": "MedAssist Prediction API is running",
  "models_loaded": {
    "cardiovascular": true,
    "diabetes": true
  }
}
```

### 2. Model Information
**GET** `/model/info`

Get information about the loaded models.

**Response:**
```json
{
  "cardiovascular_model": {
    "loaded": true,
    "type": "XGBoost Classifier",
    "purpose": "Cardiovascular Disease Prediction",
    "features": ["age", "gender", "height", "weight", "ap_hi", "ap_lo", "cholesterol", "gluc", "smoke", "alco", "active"]
  },
  "diabetes_model": {
    "loaded": true,
    "type": "XGBoost Classifier",
    "purpose": "Diabetes Risk Prediction",
    "features": ["age", "hypertension", "heart_disease", "bmi", "HbA1c_level", "blood_glucose_level", "gender_encoded", "smoking_encoded"]
  },
  "shap_explanations": "Available for both models"
}
```

### 3. Cardiovascular Disease Prediction
**POST** `/predict/cardiovascular`

Predict cardiovascular disease risk based on patient health metrics.

**Request Body:**
```json
{
  "age": 50,
  "gender": 2,
  "height": 175,
  "weight": 80,
  "ap_hi": 140,
  "ap_lo": 90,
  "cholesterol": 2,
  "gluc": 1,
  "smoke": 1,
  "alco": 0,
  "active": 1
}
```

**Field Descriptions:**
- `age`: Age in years (numeric)
- `gender`: 1 = Female, 2 = Male
- `height`: Height in centimeters
- `weight`: Weight in kilograms
- `ap_hi`: Systolic blood pressure
- `ap_lo`: Diastolic blood pressure
- `cholesterol`: 1 = Normal, 2 = Above normal, 3 = Well above normal
- `gluc`: Glucose level (1 = Normal, 2 = Above normal, 3 = Well above normal)
- `smoke`: 0 = No, 1 = Yes
- `alco`: Alcohol consumption (0 = No, 1 = Yes)
- `active`: Physical activity (0 = No, 1 = Yes)

**Response:**
```json
{
  "prediction": 1,
  "risk_probability": 0.75,
  "confidence_score": 0.82,
  "risk_category": "High",
  "input_data": {
    "age_years": 50.0,
    "bmi": 26.12,
    "gender": "Male",
    "systolic_bp": 140,
    "diastolic_bp": 90,
    "cholesterol_level": 2,
    "glucose_level": 1,
    "smoking": true,
    "alcohol": false,
    "physical_activity": true
  },
  "explanations": {
    "explanations": [...],
    "top_factors": [...],
    "summary": "The prediction is primarily influenced by: Ap_Hi (value: 140.00) increases the risk, Smoke (value: 1.00) increases the risk, Cholesterol (value: 2.00) increases the risk."
  },
  "interpretation": {
    "result": "High risk of cardiovascular disease",
    "recommendation": [
      "Consult with a cardiologist immediately for comprehensive evaluation",
      "Consider immediate lifestyle modifications including diet and exercise",
      "Monitor and manage blood pressure through diet, exercise, and medication if needed",
      "Smoking cessation is highly recommended"
    ]
  }
}
```

### 4. Diabetes Risk Prediction
**POST** `/predict/diabetes`

Predict diabetes risk based on metabolic and lifestyle factors.

**Request Body:**
```json
{
  "age": 45,
  "gender": "Male",
  "hypertension": 1,
  "heart_disease": 0,
  "smoking_history": "former",
  "bmi": 28.5,
  "HbA1c_level": 6.2,
  "blood_glucose_level": 140
}
```

**Field Descriptions:**
- `age`: Age in years
- `gender`: "Female", "Male", or "Other"
- `hypertension`: 0 = No, 1 = Yes
- `heart_disease`: 0 = No, 1 = Yes
- `smoking_history`: "never", "No Info", "current", "former", "ever", "not current"
- `bmi`: Body Mass Index
- `HbA1c_level`: Hemoglobin A1c level (3.5-9.0)
- `blood_glucose_level`: Blood glucose level (80-300 mg/dL)

**Response:**
```json
{
  "prediction": 0,
  "risk_probability": 0.35,
  "confidence_score": 0.65,
  "risk_category": "Medium",
  "input_data": {
    "age": 45,
    "gender": "Male",
    "bmi": 28.5,
    "bmi_category": "Overweight",
    "hypertension": true,
    "heart_disease": false,
    "smoking_history": "former",
    "HbA1c_level": 6.2,
    "HbA1c_category": "Prediabetes",
    "blood_glucose_level": 140,
    "glucose_category": "Prediabetes"
  },
  "explanations": {
    "explanations": [...],
    "top_factors": [...],
    "summary": "The prediction is primarily influenced by: HbA1c_level (value: 6.20) increases the risk, Blood_glucose_level (value: 140.00) increases the risk, Age (value: 45.00) increases the risk."
  },
  "interpretation": {
    "result": "Low risk of diabetes",
    "recommendation": [
      "Schedule regular glucose monitoring and healthcare check-ups",
      "Implement diabetes prevention strategies",
      "Focus on blood sugar control through diet and lifestyle modifications",
      "Weight management through balanced diet and regular exercise"
    ]
  }
}
```

## SHAP Explanations

Both endpoints include detailed SHAP explanations that help understand:

- **Feature Impact**: How each input feature contributes to the prediction
- **Direction**: Whether a feature increases or decreases the risk
- **Magnitude**: The relative importance of each feature
- **Top Factors**: The most influential features for the specific prediction

## Risk Categories

- **Low Risk**: Probability < 0.3
- **Medium Risk**: Probability 0.3 - 0.7
- **High Risk**: Probability > 0.7

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200`: Success
- `400`: Bad Request (missing or invalid data)
- `500`: Internal Server Error

Example error response:
```json
{
  "error": "Missing required fields: ['age', 'gender']"
}
```

## Testing

Use the provided test script to verify the API:

```bash
python test_api.py
```

Or test manually with curl:

```bash
# Health check
curl http://localhost:5000/health

# Cardiovascular prediction
curl -X POST http://localhost:5000/predict/cardiovascular \
  -H "Content-Type: application/json" \
  -d '{"age": 50, "gender": 2, "height": 175, "weight": 80, "ap_hi": 140, "ap_lo": 90, "cholesterol": 2, "gluc": 1, "smoke": 1, "alco": 0, "active": 1}'

# Diabetes prediction
curl -X POST http://localhost:5000/predict/diabetes \
  -H "Content-Type: application/json" \
  -d '{"age": 45, "gender": "Male", "hypertension": 1, "heart_disease": 0, "smoking_history": "former", "bmi": 28.5, "HbA1c_level": 6.2, "blood_glucose_level": 140}'
```

## Integration Example

### JavaScript/Frontend Integration

```javascript
// Cardiovascular prediction
async function predictCardiovascular(patientData) {
  try {
    const response = await fetch('http://localhost:5000/predict/cardiovascular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('Prediction:', result.prediction);
      console.log('Risk Category:', result.risk_category);
      console.log('Recommendations:', result.interpretation.recommendation);
      return result;
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Usage
const patientData = {
  age: 50,
  gender: 2,
  height: 175,
  weight: 80,
  ap_hi: 140,
  ap_lo: 90,
  cholesterol: 2,
  gluc: 1,
  smoke: 1,
  alco: 0,
  active: 1
};

predictCardiovascular(patientData);
```

### Python Client Integration

```python
import requests
import json

def predict_diabetes(patient_data):
    url = "http://localhost:5000/predict/diabetes"
    
    try:
        response = requests.post(url, json=patient_data)
        
        if response.status_code == 200:
            result = response.json()
            print(f"Risk Category: {result['risk_category']}")
            print(f"Risk Probability: {result['risk_probability']:.2%}")
            print(f"Recommendations: {result['interpretation']['recommendation']}")
            return result
        else:
            print(f"Error: {response.json()['error']}")
            
    except requests.exceptions.RequestException as e:
        print(f"Network error: {e}")

# Usage
patient_data = {
    "age": 45,
    "gender": "Male",
    "hypertension": 1,
    "heart_disease": 0,
    "smoking_history": "former",
    "bmi": 28.5,
    "HbA1c_level": 6.2,
    "blood_glucose_level": 140
}

predict_diabetes(patient_data)
```

## Notes

- The API requires all model files to be present in the same directory
- SHAP explanations may take a few extra milliseconds to compute
- The API supports CORS for frontend integration
- All predictions should be used for educational/research purposes and not as medical advice
- Always consult healthcare professionals for medical decisions
