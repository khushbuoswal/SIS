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

    // Use the fine-tuned model to generate questions
    const completion = await openai.chat.completions.create({
      model: "ft:gpt-4o-mini-2024-07-18:karan-openai:quizzly-v2:ABhTUCY9", // Updated to fine-tuned model
      messages: [
        {
          role: "system",
          content:
            `Given a user prompt, always respond in the following JSON format: {\"question_number\": \"number\", \"quiz_question\": \"question text\", \"options\": [\"option1\", \"option2\", \"option3\", \"option4\"], \"correct_option\": \"correct answer\", \"reference\": \"source\"}.`,
        },
        {
          role: "user",
          content: `Generate 5 quiz questions based on the provided text:\n\n"${pdfText}"`,
        },
      ],
    });

    const responseMessage = completion.choices[0].message?.content;

    if (responseMessage) {
      const parsedQuizData = JSON.parse(responseMessage);
      console.log(parsedQuizData);
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