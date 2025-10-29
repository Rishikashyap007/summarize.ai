
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { NextResponse } from "next/server";
import pdfSummary from "@/models/summaryModel";
import connectDb from "@/dbConfig/dbConfig";
// import { generateSummaryFromMistral } from "@/utils/mistral";
// import { generateSummaryFromFlan } from "@/utils/flan";
import { generateSummaryFromHF } from "@/utils/huggingFace";

export async function POST(req: Request) {
   await connectDb();
   try {
      const body = await req.json();
      const { pdfUrl, userId, title, filename } = body;

      if (!userId) {
         return NextResponse.json({ message: "Login required" }, { status: 401 });
      }

      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();

      const loader = new PDFLoader(new Blob([arrayBuffer]));
      const docs = await loader.load();

      const content = docs.map((doc) => doc.pageContent).join("\n\n");

      // 🔹 Step 1: Chunking safely (smaller chunks, e.g. 300 words)
      const chunkSize = 300;
      const words = content.split(/\s+/);
      const summaries: string[] = [];

      for (let i = 0; i < words.length; i += chunkSize) {
         const chunk = words.slice(i, i + chunkSize).join(" ");
         if (chunk.trim()) {
            const chunkSummary = await generateSummaryFromHF(chunk);
            summaries.push(chunkSummary);
         }
      }

      // 🔹 Step 2: Combine first-level summaries
      const combinedSummary = summaries.join(" ");

      // 🔹 Step 3: Run one more summarization on the combined text 
      // (to reduce verbosity if the PDF was large)
      const finalSummary = await generateSummaryFromHF(combinedSummary);

      if(!finalSummary){
         return NextResponse.json({message:"Failed to generate summary"},{status:500})
      }

      const newSummary = await pdfSummary.create({
         original_file_url: pdfUrl,
         user_id: userId,
         title,
         file_name: filename,
         summary_text: finalSummary.trim(),
      });

      return NextResponse.json({
         success: true,
         message: "PDF content summarized successfully",
         data: newSummary,
      });
   } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
