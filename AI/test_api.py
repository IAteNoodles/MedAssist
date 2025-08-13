"""
Test script for MedAssist Prediction API
This script tests both cardiovascular and diabetes prediction endpoints
"""

import requests
import json

# API base URL (adjust if running on different host/port)
BASE_URL = "http://localhost:5001"

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print("Health Check:")
        print(json.dumps(response.json(), indent=2))
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_cardiovascular_prediction():
    """Test cardiovascular disease prediction"""
    # Sample data for testing
    test_data = {
        "age": 50,  # Age in years
        "gender": 2,  # Male
        "height": 175,  # cm
        "weight": 80,  # kg
        "ap_hi": 140,  # Systolic BP
        "ap_lo": 90,   # Diastolic BP
        "cholesterol": 2,  # Above normal
        "gluc": 1,     # Normal glucose
        "smoke": 1,    # Smoker
        "alco": 0,     # No alcohol
        "active": 1    # Physically active
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict/cardiovascular", 
            json=test_data,
            headers={'Content-Type': 'application/json'}
        )
        print("\nCardiovascular Prediction:")
        print(json.dumps(response.json(), indent=2))
        return response.status_code == 200
    except Exception as e:
        print(f"Cardiovascular prediction failed: {e}")
        return False

def test_diabetes_prediction():
    """Test diabetes risk prediction"""
    # Sample data for testing
    test_data = {
        "age": 45,
        "gender": "Male",
        "hypertension": 1,
        "heart_disease": 0,
        "smoking_history": "former",
        "bmi": 28.5,
        "HbA1c_level": 6.2,
        "blood_glucose_level": 140
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/predict/diabetes",
            json=test_data,
            headers={'Content-Type': 'application/json'}
        )
        print("\nDiabetes Prediction:")
        print(json.dumps(response.json(), indent=2))
        return response.status_code == 200
    except Exception as e:
        print(f"Diabetes prediction failed: {e}")
        return False

def test_model_info():
    """Test model info endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/model/info")
        print("\nModel Info:")
        print(json.dumps(response.json(), indent=2))
        return response.status_code == 200
    except Exception as e:
        print(f"Model info failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing MedAssist Prediction API...")
    print("=" * 50)
    
    # Test all endpoints
    tests = [
        ("Health Check", test_health_check),
        ("Model Info", test_model_info),
        ("Cardiovascular Prediction", test_cardiovascular_prediction),
        ("Diabetes Prediction", test_diabetes_prediction)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{test_name}:")
        print("-" * 30)
        success = test_func()
        results.append((test_name, success))
        print(f"Status: {'✅ PASSED' if success else '❌ FAILED'}")
    
    # Summary
    print("\n" + "=" * 50)
    print("TEST SUMMARY:")
    for test_name, success in results:
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{test_name}: {status}")
    
    total_passed = sum(1 for _, success in results if success)
    print(f"\nTotal: {total_passed}/{len(results)} tests passed")
