import axios from 'axios';

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || '';

export const generateSummary = async (pdfText: string) => {
    if (!pdfText) throw new Error("No text provided for summarization");

    try {
        const prompt = `
      You are a professional summarizer. Summarize the following document in clear, concise language, highlighting key points, purpose, and important details. Use bullet points where helpful:
      ${pdfText}
    `;

        const response = await axios.post(
            'https://api-inference.huggingface.co/pipeline/text-generation/deepseek-ai/DeepSeek-V3.1-Terminus',
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const summary = response.data[0]?.generated_text || response.data?.generated_text;
        if (!summary) throw new Error("No summary generated");

        return summary;
    } catch (error: any) {
        console.error("Error generating summary:", error.response?.data || error.message);
        throw error;
    }
};
