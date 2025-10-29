import axios, { AxiosError } from "axios";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || "";

export const generateSummaryFromMistral = async (pdfText: string) => {
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
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data[0]?.generated_text;
    if (!summary) throw new Error("No summary generated from Mistral");

    return summary;
  } catch (error: unknown) {
    console.error("tiiuae API Error:", (error as AxiosError).response?.data || (error as Error).message);
    throw error;
  }
};
