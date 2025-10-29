// lib/huggingface.ts
import axios from "axios";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || "";
const prompt = `You are an expert text summarizer. 
Summarize the following text in a clear, concise, and structured way. 
Rules:
- Keep the summary under 250 words.
- Focus on the main arguments, findings, and conclusions.
- Remove filler, redundant details, and irrelevant parts.
- Write in professional but easy-to-read language.
- At the end, include 3 key takeaways as bullet points.`

export const generateSummaryFromHF = async (pdfText: string) => {
    if (!pdfText) throw new Error("No text provided for summarization");
    // console.log(pdfText)
    try {
        const response = await axios.post(
            // "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            "https://api-inference.huggingface.co/models/google/pegasus-cnn_dailymail",
            { inputs: pdfText },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Hugging Face returns an array with summary_text
        const summary = response.data[0]?.summary_text;

        if (!summary) throw new Error("No summary generated from HF");
        console.log(summary, "summary")
        return summary;

    } catch (error: any) {
        // Handle rate limits or other API errors
        if (error.response?.status === 429) throw new Error("RATE_LIMIT_EXCEEDED");
        console.error("Hugging Face API Error:", error.response?.data || error.message);
        throw error;
    }
};
