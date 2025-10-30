// import { verifyUserToken } from "@/app/helpers/verifyUserToken";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";


// const f = createUploadthing();

// export const ourFileRouter = {
//     pdfUploader: f({
//         pdf: {
//             maxFileSize: "4MB",
//             maxFileCount: 1,
//         }
//     })

//         .middleware(async ({ req }) => {
//             const decodedToken =  await verifyUserToken(req)
//             if (!decodedToken) throw new UploadThingError("Unauthorized");

//             return { userId: decodedToken.id };
//         })
//         .onUploadComplete(async ({ metadata, file }) => {
//             // This code RUNS ON YOUR SERVER after upload
//             console.log("Upload complete for userId:", metadata.userId);
//             console.log("file url", file.url);
//             // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
//             return { uploadedBy: metadata.userId, file };
//         }),
//     // pdfUploader: f({
//     //     pdf: { maxFileSize: "4MB", maxFileCount: 1 }
//     // })
//     //     .onUploadComplete(async ({ file }) => {
//     //         console.log("file url", file.url);
//     //         return {
//     //             fileUrl: file.url,
//     //             fileName: file.name,
//     //             fileSize: file.size,
//     //         };
//     //     }),


// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;


import { verifyUserToken } from "@/app/helpers/verifyUserToken";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { NextResponse } from "next/server";  // For type guarding the error response
// import { JwtPayload } from "jsonwebtoken";  // For typing the decoded token (install @types/jsonwebtoken if needed)

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const decodedToken = await verifyUserToken(req);

      // Type guard: If it's an error response (NextResponse), throw UploadThingError
      if (decodedToken instanceof NextResponse) {
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "Invalid or missing token",
        });
      }

      // Type guard: If it's a plain string (invalid case), throw error
      if (typeof decodedToken === "string") {
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "Invalid token format",
        });
      }

      // At this point, decodedToken is JwtPayload
      if (!decodedToken || !("id" in decodedToken)) {
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "No user ID in token",
        });
      }

      return { userId: decodedToken.id as string };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return {
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),
  // pdfUploader: f({
  //     pdf: { maxFileSize: "4MB", maxFileCount: 1 }
  // })
  //     .onUploadComplete(async ({ file }) => {
  //         console.log("file url", file.url);
  //         return {
  //             fileUrl: file.url,
  //             fileName: file.name,
  //             fileSize: file.size,
  //         };
  //     }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;