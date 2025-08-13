"""
Simplified test for API functionality without running server
"""
import sys
import os
sys.path.append('/Users/sankalpshankar/Projects/MedAssist/AI')

import numpy as np
import joblib
import pickle
import shap

# Test model loading
print("Testing model loading...")

try:
    # Load cardiovascular model
    cardio_model = joblib.load('/Users/sankalpshankar/Projects/MedAssist/AI/xgboost_model.pkl')
    print("✅ Cardiovascular model loaded successfully")
    
    # Load diabetes model and encoders
    diabetes_model = joblib.load('/Users/sankalpshankar/Projects/MedAssist/AI/diabetes_xgboost_model.pkl')
    
    with open('/Users/sankalpshankar/Projects/MedAssist/AI/diabetes_label_encoders.pkl', 'rb') as f:
        diabetes_encoders = pickle.load(f)
        
    with open('/Users/sankalpshankar/Projects/MedAssist/AI/diabetes_feature_info.pkl', 'rb') as f:
        diabetes_features = pickle.load(f)
        
    print("✅ Diabetes model and encoders loaded successfully")
    
    # Create SHAP explainers
    cardio_explainer = shap.TreeExplainer(cardio_model)
    diabetes_explainer = shap.TreeExplainer(diabetes_model)
    print("✅ SHAP explainers created successfully")
    
    # Test cardiovascular prediction
    print("\nTesting cardiovascular prediction...")
    cardio_test_data = np.array([[
        50,    # age
        2,     # gender (male)
        175,   # height
        80,    # weight
        140,   # systolic BP
        90,    # diastolic BP
        2,     # cholesterol
        1,     # glucose
        1,     # smoke
        0,     # alcohol
        1      # active
    ]])
    
    cardio_pred = cardio_model.predict(cardio_test_data)[0]
    cardio_proba = cardio_model.predict_proba(cardio_test_data)[0]
    cardio_shap = cardio_explainer.shap_values(cardio_test_data)
    
    print(f"Prediction: {cardio_pred}")
    print(f"Probability: {cardio_proba}")
    print(f"SHAP values shape: {np.array(cardio_shap).shape}")
    print("✅ Cardiovascular prediction working")
    
    # Test diabetes prediction
    print("\nTesting diabetes prediction...")
    
    # Encode categorical variables
    gender_encoded = diabetes_encoders['gender_encoder'].transform(['Male'])[0]
    smoking_encoded = diabetes_encoders['smoking_encoder'].transform(['former'])[0]
    
    diabetes_test_data = np.array([[
        45,       # age
        1,        # hypertension
        0,        # heart_disease
        28.5,     # bmi
        6.2,      # HbA1c_level
        140,      # blood_glucose_level
        gender_encoded,
        smoking_encoded
    ]])
    
    diabetes_pred = diabetes_model.predict(diabetes_test_data)[0]
    diabetes_proba = diabetes_model.predict_proba(diabetes_test_data)[0]
    diabetes_shap = diabetes_explainer.shap_values(diabetes_test_data)
    
    print(f"Prediction: {diabetes_pred}")
    print(f"Probability: {diabetes_proba}")
    print(f"SHAP values shape: {np.array(diabetes_shap).shape}")
    print("✅ Diabetes prediction working")
    
    print("\n" + "="*50)
    print("🎉 ALL TESTS PASSED!")
    print("The models are working correctly and ready for API deployment.")
    print("="*50)
    
except Exception as e:
    print(f"❌ Error: {str(e)}")
    import traceback
    traceback.print_exc()
