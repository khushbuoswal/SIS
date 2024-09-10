from fastapi import FastAPI, File, UploadFile
from PyPDF2 import PdfReader
import os

app = FastAPI()

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "Invalid file type. Please upload a PDF."}

    # Save the uploaded PDF file temporarily
    pdf_path = f"temp_{file.filename}"
    with open(pdf_path, "wb") as buffer:
        buffer.write(await file.read())

    # Extract text from the PDF file
    extracted_text = extract_pdf_text(pdf_path)

    # Delete the temporary PDF file after processing
    os.remove(pdf_path)

    return {"text": extracted_text}

def extract_pdf_text(pdf_path):
    """Extract text from a PDF file."""
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
