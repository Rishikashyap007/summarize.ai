// import connectDb from "@/dbConfig/dbConfig";
// import pdfSummary from "@/models/summaryModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { shareable_link: string } }
// ) {
//   await connectDb();
//   try {
//     const { shareable_link } = params;
//     console.log("shareableLink", shareable_link);
//     const summary = await pdfSummary.findOne({
//       shareable_link,
//       isPublic: true,
//     });
//     // console.log(summaryList)
//     if (!summary) {
//       return NextResponse.json(
//         { message: "Summary not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Summary fetched successfully",
//         data: summary,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.log(error, "error while fetching list");
//     return NextResponse.json(
//       { error: error.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

import connectDb from "@/dbConfig/dbConfig";
import pdfSummary from "@/models/summaryModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shareable_link: string }> }
) {
  await connectDb();
  try {
    const { shareable_link } = await params;  // Await the Promise to access shareable_link
    console.log("shareableLink", shareable_link);
    const summary = await pdfSummary.findOne({
      shareable_link,
      isPublic: true,
    });
    // console.log(summaryList)
    if (!summary) {
      return NextResponse.json(
        { message: "Summary not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Summary fetched successfully",
        data: summary,
      },
      {
        status: 200,
      }
    );
  } catch (error:unknown) {
    console.log(error, "error while fetching list");
    return NextResponse.json(
      { error: (error as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}
