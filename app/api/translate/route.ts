import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const LANG_MAP: Record<string, string> = {
  en: "English",
  sat: "Santali",
  hi: "Hindi",
  bn: "Bengali",
  or: "Odia",
  ta: "Tamil",
  te: "Telugu",
  mr: "Marathi",
  gu: "Gujarati",
  pa: "Punjabi",
  kn: "Kannada",
  ml: "Malayalam",
};

export async function POST(req: NextRequest) {
  try {
    const { text, from, to } = await req.json();

    if (!text || !from || !to) {
      return NextResponse.json({ error: "Missing text, from, or to" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const fromLang = LANG_MAP[from] || from;
    const toLang = LANG_MAP[to] || to;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: text,
      config: {
        systemInstruction: `You are a professional translator. Translate the user's text from ${fromLang} to ${toLang}. Return ONLY the translated text. No explanations, no notes, no formatting, no bullet points. Just the raw translation.`,
        temperature: 0.2,
      },
    });

    const translated = response.text?.trim();

    if (!translated) {
      return NextResponse.json({ error: "No translation returned from Gemini" }, { status: 500 });
    }

    return NextResponse.json({ translatedText: translated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
