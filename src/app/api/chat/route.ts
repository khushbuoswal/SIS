import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OpenAI } from "openai";

export async function POST(request: NextRequest) {
  try {
    // Initialise the OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Make the chat completion request
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Generate 5 general ability multiple choice questions with 4 options each, and mark the correct answer.",
        },
      ],
    });

    console.log("OpenAI API response:", completion);

    const responseMessage = completion.choices[0].message?.content;
    if (responseMessage) {
      console.log("Quiz data from OpenAI:", responseMessage); // Log raw quiz data
      
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

  function parseQuizData(responseMessage: string) {
    const questions = responseMessage.split(/\n{2,}/); // split by two or more newlines
    
    const quizData = questions.map((questionBlock, index) => {
      const lines = questionBlock.split("\n").filter(line => line); // split lines and filter empty ones
      const questionText = lines[0].replace(/^Q\d+:\s*/, ""); // remove Q1:, Q2: etc.
      const options = lines.slice(1, 5).map(option => option.replace(/^\w+\.\s*/, "")); // get options and remove A. B. etc.
      
      return {
        questionNumber: index + 1,
        question: questionText,
        options: options,
        points: 0.5,
      };
    });

    return quizData;
  }
}
