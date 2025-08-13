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

# --- helper ---------------------------------------------------------------

def _extract_text_from_ocr_response(ocr_response) -> str:
    """Normalize different possible OCR response shapes to plain text.
    Supports SDK pydantic model objects or raw dict replies.
    """
    if ocr_response is None:
        return ""
    # If pydantic model, prefer model_dump() if available
    if hasattr(ocr_response, "model_dump"):
        try:
            data = ocr_response.model_dump()
        except Exception:
            data = None
    else:
        data = None

    pages = []
    # Priority: direct attribute .pages
    if hasattr(ocr_response, "pages") and ocr_response.pages is not None:
        pages = ocr_response.pages
    elif isinstance(data, dict) and isinstance(data.get("pages"), list):
        pages = data.get("pages")
    elif isinstance(ocr_response, dict) and isinstance(ocr_response.get("pages"), list):
        pages = ocr_response.get("pages")

    segments = []
    for p in pages:
        if p is None:
            continue
        if isinstance(p, dict):
            seg = p.get("markdown") or p.get("text") or ""
        else:  # object with attributes
            seg = getattr(p, "markdown", None) or getattr(p, "text", "")
        if seg:
            segments.append(seg.strip())
    return "\n\n".join(segments)


@app.post("/extract-image")
async def extract_data_from_image(file: UploadFile = File(...)):
    """
    Extract data from an uploaded image using OCR and return extracted text.
    """
    import base64
    import os
    from mistralai import Mistral

    try:
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
            include_image_base64=False
        )
        text = _extract_text_from_ocr_response(ocr_response)
        return {"text": text}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.post("/extract-pdf")
async def extract_data_from_pdf(file: UploadFile = File(...)):
    """
    Extract data from an uploaded PDF using OCR and return extracted text.
    """
    import base64
    import os
    from mistralai import Mistral

    try:
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
            include_image_base64=False
        )
        text = _extract_text_from_ocr_response(ocr_response)
        return {"text": text}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


if __name__ == "__main__":
    import uvicorn
    import socket
    def get_network_ip():
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            # doesn't have to be reachable
            s.connect(('10.255.255.255', 1))
            IP = s.getsockname()[0]
        except Exception:
            IP = '127.0.0.1'
        finally:
            s.close()
        return IP

    network_ip = get_network_ip()
    print(f"Server running at http://0.0.0.0:8004 (use http://{network_ip}:8004 to access from other devices on your network)")
    uvicorn.run(app, host="0.0.0.0", port=8004, log_level="debug")