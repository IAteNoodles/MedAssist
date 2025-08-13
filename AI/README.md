# AI

This directory contains the AI models and related files for the MedAssist application.

## Structure

- `prediction_api.py`: A FastAPI application to serve the prediction models.
- `xgboost_model.pkl`: A trained XGBoost model for cardiovascular disease prediction.
- `diabetes_xgboost_model.pkl`: A trained XGBoost model for diabetes prediction.
- `clinical_bert.py`: Contains code related to a clinical BERT model.
- `pmc_llama.py`: Contains code related to a Llama model fine-tuned on PMC articles.
- `ml_notebook.ipynb`: A Jupyter notebook for model development.
- `api_requirements.txt`: Python dependencies for the API.

## Setup

1.  Install the dependencies:
    ```bash
    pip install -r api_requirements.txt
    ```
2.  Run the prediction API:
    ```bash
    uvicorn prediction_api:app --reload
    ```

## API Keys

The `pmc_llama.py` might require API keys for services like Hugging Face. These should be stored as environment variables.
