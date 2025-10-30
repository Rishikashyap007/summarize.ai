// import pdfSummary from "@/models/summaryModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     if (!id) {
//       return NextResponse.json(
//         { message: "id is required" },
//         { status: 400 }
//       );
//     }

//     const summary = await pdfSummary.findById(id);

//     if (!summary) {
//       return NextResponse.json(
//         { message: "summary not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "summary fetched successfully", data: summary },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.log(error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "An unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }


// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     if (!id) {
//       return NextResponse.json({ message: "id is required" }, { status: 400 });
//     }

//     const summary = await pdfSummary.findByIdAndDelete(id);

//     if (!summary) {
//       return NextResponse.json({ message: "summary not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "summary deleted successfully", data: summary },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.error(error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "An unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }

// import pdfSummary from "@/models/summaryModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     if (!id) {
//       return NextResponse.json({ message: "id is required" }, { status: 400 });
//     }

//     const summary = await pdfSummary.findById(id);
//     if (!summary) {
//       return NextResponse.json({ message: "summary not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "summary fetched successfully", data: summary },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.error(error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Unknown error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     if (!id) {
//       return NextResponse.json({ message: "id is required" }, { status: 400 });
//     }

//     const summary = await pdfSummary.findByIdAndDelete(id);
//     if (!summary) {
//       return NextResponse.json({ message: "summary not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "summary deleted successfully", data: summary },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     console.error(error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : "Unknown error" },
//       { status: 500 }
//     );
//   }
// }


import pdfSummary from "@/models/summaryModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  // Await the Promise to access id

  try {
    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const summary = await pdfSummary.findById(id);
    if (!summary) {
      return NextResponse.json({ message: "summary not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "summary fetched successfully", data: summary },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  // Await the Promise to access id

  try {
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
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}