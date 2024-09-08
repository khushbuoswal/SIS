import fitz  # PyMuPDF

# Open the PDF file
pdf_path = '/Users/khushbuoswal/Documents/Sample.pdf'  # Replace with the path to your PDF file
pdf_document = fitz.open(pdf_path)

# Iterate through the pages
for page_num in range(len(pdf_document)):
    page = pdf_document.load_page(page_num)
    text = page.get_text()
    print(f"Page {page_num + 1}:\n{text}\n")

# Close the PDF file
pdf_document.close()
