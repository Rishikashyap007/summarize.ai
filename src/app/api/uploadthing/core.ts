import { verifyUserToken } from "@/app/helpers/verifyUserToken";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";


const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({
        pdf: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        }
    })

        .middleware(async ({ req }) => {
            const decodedToken =  await verifyUserToken(req)
            if (!decodedToken) throw new UploadThingError("Unauthorized");

            return { userId: decodedToken.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId, file };
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