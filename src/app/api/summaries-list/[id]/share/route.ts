// import connectDb from "@/dbConfig/dbConfig";
// import pdfSummary from "@/models/summaryModel";
// import { randomBytes } from "crypto";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     await connectDb();
//     const { id } = params;
//     try {
//         const shareable_link = randomBytes(6).toString('hex')
//         const summary = await pdfSummary.findByIdAndUpdate(id, {
//             shareable_link,
//             isPublic: true,
//         }, { new: true })

//         if (!summary) {
//             return NextResponse.json({ message: "Summary not found" }, { status: 404 })
//         }

//         return NextResponse.json(
//             {
//                 message: "Summary shared successfully",
//                 data: summary,
//                 public_url: `${process.env.NEXT_PUBLIC_BASE_URL}/share/${shareable_link}`,
//             },
//             { status: 200 }
//         );


//     } catch (error: unknown) {
//         return NextResponse.json({ message: "Something went wrong", error: (error as Error).message }, { status: 500 })
//     }
// }

import connectDb from "@/dbConfig/dbConfig";
import pdfSummary from "@/models/summaryModel";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDb();
  const { id } = await params;  // Await the Promise to access id
  try {
    const shareable_link = randomBytes(6).toString('hex');
    const summary = await pdfSummary.findByIdAndUpdate(
      id,
      {
        shareable_link,
        isPublic: true,
      },
      { new: true }
    );

    if (!summary) {
      return NextResponse.json({ message: "Summary not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Summary shared successfully",
        data: summary,
        public_url: `${process.env.NEXT_PUBLIC_BASE_URL}/share/${shareable_link}`,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
}