import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OpenAI } from "openai";

export async function POST(request: NextRequest) {
  try {
    // const { message } = await request.json();

    // Initialise the OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Make the chat completion request
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Give me 5 general ability multiple choice questions" }],
    });

    const responseMessage = completion.choices[0].message?.content;

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
