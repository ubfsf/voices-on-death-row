// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    // Using Flash for speed; use 'gemini-1.5-pro' if you need deeper reasoning
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-8b",
      systemInstruction: "You are an educational assistant for 'Voices on Death Row'. Keep responses empathetic, clinical, and focused on psychology, justice, and human stories. Never excuse criminal behavior."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return Response.json({ text: response.text() });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
