import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OpenAI } from "openai";

export async function POST(request: NextRequest) {
  try {
    const { pdfText } = await request.json();

    // Check if pdfText is provided
    if (!pdfText) {
      return NextResponse.json(
        { error: "No PDF text provided in the request." },
        { status: 400 }
      );
    }

    // Initialise the OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Use the extracted text from the PDF to generate questions
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Based on the following text, generate 5 multiple-choice questions, each with 4 options. Avoid numbering the questions and directly start with the questions:\n\n"${pdfText}"`,
          //while the above works for most info PDFs, we need to ensure random PDFs like resumes and lecture slides have adequate display
          //Also note that pdf.worker.min.mjs which handles this is a copy and is present in both node modules and public
          //front end needs fixes for specific PDFs and there is a loading delay with different unnecessary displays that need fixing
        },
      ],
    });

    const responseMessage = completion.choices[0].message?.content;
    if (responseMessage) {
      const parsedQuizData = parseQuizData(responseMessage);
      return NextResponse.json({ quizData: parsedQuizData });
    } else {
      return NextResponse.json(
        { error: "No quiz data received from OpenAI." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

// Function to parse the quiz data from OpenAI's response
function parseQuizData(responseMessage: string) {
  const questions = responseMessage.split(/\n{2,}/);

  const quizData = questions.map((questionBlock, index) => {
    const lines = questionBlock.split("\n").filter((line) => line.trim() !== "");
    const questionText = lines[0].replace(/^Q\d*[:.]?\s*/, "").trim();
    const options = lines.slice(1, 5).map((option) =>
      option.replace(/^[A-D][:.\)]?\s*/, "").trim()
    );

    return {
      questionNumber: index + 1,
      question: questionText,
      options: options,
      points: 0.5,
    };
  });

  return quizData;
}
