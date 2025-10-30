// import { verifyUserToken } from "@/app/helpers/verifyUserToken";
// import connectDb from "@/dbConfig/dbConfig";
// import pdfSummary from "@/models/summaryModel";
// import {NextRequest, NextResponse } from "next/server";

// export async function GET(request:NextRequest) {
//      await connectDb();
//     try {
//         const decodedToken = await verifyUserToken(request)

//         const summaryList = await pdfSummary.find({user_id : decodedToken.id}).sort({createdAt:-1})
//         // console.log(summaryList)
//         return NextResponse.json({
//             success: true,
//             message: "Summaries fetched successfully",
//             data: summaryList,
//         }, {
//             status: 200
//         });

//     } catch (error) {
//         console.log(error,"error while fetching list")
//         return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
//     }
// }


import connectDb from "@/dbConfig/dbConfig";
import pdfSummary from "@/models/summaryModel";
import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";  // Import JwtPayload if not already (for type safety)
import { verifyUserToken } from "@/app/helpers/verifyUserToken";

export async function GET(request: NextRequest) {
  await connectDb();  // Assuming you have DB connection; add if missing

  try {
    const decodedToken = await verifyUserToken(request);

    // Type guard: Check if it's an error response (NextResponse) and return early
    if (decodedToken instanceof NextResponse) {
      return decodedToken;
    }

    // At this point, TypeScript infers decodedToken as JwtPayload (or string, but assuming it's JwtPayload)
    // If verifyUserToken can return a plain string, add further guarding: if (typeof decodedToken === 'string') { ... }
    // But based on the error, it's likely JwtPayload here—adjust if your token decode returns a string ID directly

    const { id } = decodedToken as JwtPayload;  // Explicit cast for safety, or use if ('id' in decodedToken)

    const summaryList = await pdfSummary.find({ user_id: id }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Summaries fetched successfully",
      data: summaryList,
    }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch summaries" },
      { status: 500 }
    );
  }
}

// If you have other handlers (e.g., POST), include them here unchanged