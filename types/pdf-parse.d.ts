declare module 'pdf-parse' {
    interface PDFParseOptions {
      // Define options here if needed
    }
  
    interface PDFParseResult {
      text: string;
      numpages: number;
      info: any;
      metadata: any;
    }
  
    function pdfParse(data: Buffer | Uint8Array, options?: PDFParseOptions): Promise<PDFParseResult>;
  
    export = pdfParse;
  }
  