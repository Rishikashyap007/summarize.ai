import axios from "axios";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || "";

export const generateSummaryFromFlan = async (pdfText: string) => {
    if (!pdfText) throw new Error("No text provided for summarization");

    const prompt = `
You are an expert text summarizer. 
Summarize the following text in a clear, concise, and structured way. 
Rules:
- Keep the summary under 250 words.
- Focus on the main arguments, findings, and conclusions.
- Remove filler, redundant details, and irrelevant parts.
- Write in professional but easy-to-read language.
- At the end, include 3 key takeaways as bullet points.

Text:
${pdfText}
  `;

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Flan can return either `generated_text` or raw string array
        let summary;
        if (Array.isArray(response.data)) {
            summary =
                response.data[0]?.generated_text ||
                response.data[0]?.summary_text ||
                response.data[0]; // fallback if it's just a string
        }

        if (!summary) throw new Error("No summary generated from Flan");

        return summary;
    } catch (error: unknown) {
        if (typeof error === "object" && error !== null) {
            const err = error as { response?: { data?: unknown }, message?: string };
            console.error(
                "Flan API Error:",
                err.response?.data || err.message
            );
        } else {
            console.error("Flan API Error:", error);
        }
        throw error;
    }
};
