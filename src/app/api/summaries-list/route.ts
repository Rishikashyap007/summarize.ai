import { verifyUserToken } from "@/app/helpers/verifyUserToken";
import connectDb from "@/dbConfig/dbConfig";
import pdfSummary from "@/models/summaryModel";
import {NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
     await connectDb();
    try {
        const decodedToken = await verifyUserToken(request)

        const summaryList = await pdfSummary.find({user_id : decodedToken.id}).sort({createdAt:-1})
        // console.log(summaryList)
        return NextResponse.json({
            success: true,
            message: "Summaries fetched successfully",
            data: summaryList,
        }, {
            status: 200
        });

    } catch (error) {
        console.log(error,"error while fetching list")
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}