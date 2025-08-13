import fastapi


from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv

load_dotenv()

import os

api_key = os.environ.get("MISTRAL_API_KEY")

app = FastAPI()

# add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/extract-image")
async def extract_data_from_image(file: UploadFile = File(...)):
    """
    Extract data from an uploaded image using OCR and return extracted text.
    """
    import base64
    import os
    from mistralai import Mistral

    # Read file contents
    contents = await file.read()
    base64_image = base64.b64encode(contents).decode('utf-8')

    api_key = os.environ["MISTRAL_API_KEY"]
    client = Mistral(api_key=api_key)

    ocr_response = client.ocr.process(
        model="mistral-ocr-latest",
        document={
            "type": "image_url",
            "image_url": f"data:image/jpeg;base64,{base64_image}"
        },
        include_image_base64=False  # disable image data in response
    )
    # Build plain text only
    text = ""
    if ocr_response and ocr_response.get("pages"):
        text = "\n\n".join(page.get("markdown", "") for page in ocr_response["pages"])
    return {"text": text}

@app.post("/extract-pdf")
async def extract_data_from_pdf(file: UploadFile = File(...)):
    """
    Extract data from an uploaded PDF using OCR and return extracted text.
    """
    import base64
    import os
    from mistralai import Mistral

    # Read file contents
    contents = await file.read()
    base64_pdf = base64.b64encode(contents).decode('utf-8')

    api_key = os.environ["MISTRAL_API_KEY"]
    client = Mistral(api_key=api_key)

    ocr_response = client.ocr.process(
        model="mistral-ocr-latest",
        document={
            "type": "document_url",
            "document_url": f"data:application/pdf;base64,{base64_pdf}"
        },
        include_image_base64=False  # disable image data in response
    )
    # Build plain text only
    text = ""
    if ocr_response and ocr_response.get("pages"):
        text = "\n\n".join(page.get("markdown", "") for page in ocr_response["pages"])
    return {"text": text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004, log_level="debug")