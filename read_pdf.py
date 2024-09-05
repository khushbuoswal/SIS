import PyPDF2
import json

def read_pdf(file_path):
    pdf_file = open(file_path, 'rb')
    read_pdf = PyPDF2.PdfFileReader(pdf_file)
    num_pages = read_pdf.getNumPages()
    text = ''
    for page in range(num_pages):
        page_obj = read_pdf.getPage(page)
        text += page_obj.extractText()
    pdf_file.close() 
    return text

def save_to_json(text, file_path):
    data = {'text': text}
    with open(file_path, 'w') as f:
        json.dump(data, f)

# Example usage
file_path = 'uploaded_pdf.pdf'  # Replace with the uploaded PDF file path
text = read_pdf(file_path)
save_to_json(text, 'output.json')  # Replace with the desired JSON file path