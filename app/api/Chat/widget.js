// api/Chat/widget.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateGeminiReply(message) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}
