// import connectDb from "@/dbConfig/dbConfig";
// import { sendEmail } from "@/lib/sendEmail";
// import pdfSummary from "@/models/summaryModel";
// import { randomBytes } from "crypto";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
//     await connectDb()
//     try {
//         const { id } = params;
//         const { email, message } = await request.json()

//         if (!email) {
//             return NextResponse.json({ message: "email is required" }, { status: 400 })
//         }

//         const summary = await pdfSummary.findById(id)

//         if (!summary) {
//             return NextResponse.json({ message: "Summary not found" }, { status: 404 })
//         }

//         if (!summary.shareable_link) {
//             const shareable_link = randomBytes(6).toString("hex");
//             summary.shareable_link = shareable_link;
//             summary.isPublic = true;
//             await summary.save();
//         }

//         const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${summary.shareable_link}`

//         const html = `
//       <div style="font-family:sans-serif;line-height:1.5;color:#333;">
//         <h2 style="color:#1C2957;">📄 ${summary.title}</h2>
//         <p>${message || "Here's a summary I wanted to share with you:"}</p>
//         <a href="${publicUrl}" 
//           style="background:#1C2957;color:white;padding:10px 16px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:8px;">
//           View Summary
//         </a>
//         <p style="margin-top:20px;font-size:14px;">Or open this link: <br/><a href="${publicUrl}">${publicUrl}</a></p>
//       </div>
//     `;

//         const sent = await sendEmail(email, "Shared AI Summary", html);

//         if (!sent) {
//             return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
//         }

//         return NextResponse.json({ message: "Email sent successfully!", publicUrl }, { status: 200 });
//     } catch (error) {
//         console.error("Share via email error:", error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//     }
// }

import connectDb from "@/dbConfig/dbConfig";
import { sendEmail } from "@/lib/sendEmail";
import pdfSummary from "@/models/summaryModel";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDb();
  try {
    const { id } = await params;  // Await the Promise to access id

    const { email, message } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "email is required" }, { status: 400 });
    }

    const summary = await pdfSummary.findById(id);

    if (!summary) {
      return NextResponse.json({ message: "Summary not found" }, { status: 404 });
    }

    if (!summary.shareable_link) {
      const shareable_link = randomBytes(6).toString("hex");
      summary.shareable_link = shareable_link;
      summary.isPublic = true;
      await summary.save();
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${summary.shareable_link}`;

    const html = `
      <div style="font-family:sans-serif;line-height:1.5;color:#333;">
        <h2 style="color:#1C2957;">📄 ${summary.title}</h2>
        <p>${message || "Here's a summary I wanted to share with you:"}</p>
        <a href="${publicUrl}" 
          style="background:#1C2957;color:white;padding:10px 16px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:8px;">
          View Summary
        </a>
        <p style="margin-top:20px;font-size:14px;">Or open this link: <br/><a href="${publicUrl}">${publicUrl}</a></p>
      </div>
    `;

    const sent = await sendEmail(email, "Shared AI Summary", html);

    if (!sent) {
      return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully!", publicUrl }, { status: 200 });
//   } catch (error) {
//     console.error("Share via email error:", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
}catch (error:unknown) {
    console.log(error, "Share via email error");
    return NextResponse.json(
      { error: (error as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}