// app/api/chat/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    console.log("API route called");
    const { message } = await req.json();
    console.log("Received message:", message);

    if (!process.env.GEMINI_API_KEY) {
      console.error("API key missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    console.log("Gemini response:", text);
    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reply from Gemini" },
      { status: 500 }
    );
  }
}
