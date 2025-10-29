import pdfSummary from "@/models/summaryModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "id is required" },
        { status: 400 }
      );
    }

    const summary = await pdfSummary.findById(id);

    if (!summary) {
      return NextResponse.json(
        { message: "summary not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "summary fetched successfully", data: summary },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const summary = await pdfSummary.findByIdAndDelete(id);

    if (!summary) {
      return NextResponse.json({ message: "summary not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "summary deleted successfully", data: summary },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
