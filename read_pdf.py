import PyPDF2 

# Function to extract text from a given PDF file
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as pdf_file:
        # Create a PDF reader object
        reader = PyPDF2.PdfReader(pdf_file)

        # Initialize a variable to store the extracted text
        extracted_text = ""

        # Loop through all the pages
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            extracted_text += page.extract_text()

        return extracted_text

if __name__ == "__main__":
    # Provide the path to the PDF file
    pdf_file_path = r'C:\Users\14273\OneDrive - UTS\Desktop\Week 1 Worksheet - 14273751.pdf'  # Replace with your actual PDF file path

    # Call the function and print the extracted text
    pdf_text = extract_text_from_pdf(pdf_file_path)
    print(pdf_text)
