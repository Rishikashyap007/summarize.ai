// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateSummaryFromGemini = async (pdfText: string) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "embedding-gecko-001", // smaller model for free/credits
            temperature: 0.7,                       // lower = more focused, less creative
            topP: 0.9,                              // nucleus sampling
            topK: 40,                               // limit token diversity
            maxOutputTokens: 500                     // limit tokens in response
        });

        const prompt = `
You are a world-class professional summarizer.
Transform the following document into a concise, engaging summary in structured JSON format, highlighting **key points in bullet form**.
Use short, clear sentences, prioritize important concepts, and make it easy to skim.
Include relevant emojis where appropriate, but keep it professional.


Document Content:
${pdfText}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        return response.text();

    } catch (error: unknown) {
        if (error?.status === 429) throw new Error("RATE_LIMIT_EXCEEDED");
        console.error("Gemini API Error:", error);
        throw error;
    }
};
