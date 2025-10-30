// // "use client";

// // import SummaryViewer from "@/components/dashboard/SummaryViewer";
// // import { Navbar } from "@/components/navbar";
// // import { UploadButton, UploadedFile } from "@uploadthing/react";
// // import { useState } from "react";

// // export default function Upload() {
// //   const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

// //   const handleUploadComplete = (files: UploadedFile[]) => {
// //     if (files && files.length > 0) {
// //       setUploadedFile(files[0]); // only one file (since maxFileCount = 1)
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar />

// //       <main className="h-calc(100vh-100px) bg-background px-4 py-10">
// //         <section className="bg-card text-card-foreground p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
// //           {/* Heading */}
// //           <h2 className="text-2xl font-bold text-center mb-3 tracking-tight">
// //             Upload PDF
// //           </h2>
// //           <p className="text-muted-foreground text-center mb-6">
// //             Upload your PDF to generate a summary using AI.
// //           </p>

// //           {/* Upload Button */}
// //           <div className="flex justify-center">
// //             <UploadButton
// //               endpoint="pdfUploader"
// //               onClientUploadComplete={(res) => {
// //                 handleUploadComplete(res as UploadedFile[]);
// //               }}
// //               onUploadError={(error: Error) => {
// //                 alert(`ERROR! ${error.message}`);
// //               }}
// //               className="px-6 py-3 font-medium bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition"
// //             >
// //               Upload PDF
// //             </UploadButton>
// //           </div>

// //           {/* Summary Component */}
// //           {uploadedFile && (
// //             <div className="mt-10">
// //               <SummaryViewer uploadedFile={uploadedFile} />
// //             </div>
// //           )}
// //         </section>
// //       </main>
// //     </>
// //   );
// // }

// "use client";

// import SummaryViewer from "@/components/dashboard/SummaryViewer";
// import { Navbar } from "@/components/navbar";
// import { UploadButton } from "@/utils/uploadthing";
// // import { UploadButton } from "@uploadthing/react";
// import { useState } from "react";

// export default function Upload() {
//   const [uploadedFile, setUploadedFile] = useState(null);

//   return (
//     <>
//       <Navbar />

//       <main className="h-calc(100vh-100px) bg-background px-4 py-10">
//         <section className="bg-card text-card-foreground p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
//           {/* Heading */}
//           <h2 className="text-2xl font-bold text-center mb-3 tracking-tight">
//             Upload PDF
//           </h2>
//           <p className="text-muted-foreground text-center mb-6">
//             Upload your PDF to generate a summary using AI.
//           </p>

//           {/* Upload Button */}
//           <div className="flex justify-center">
//             <UploadButton
//               endpoint="pdfUploader"
//               onClientUploadComplete={(res) => {
//                 // Do something with the response
//                 console.log("Files: ", res);
//                 if (res && res.length > 0) {
//                   setUploadedFile(res[0]);
//                 }
//               }}
//               onUploadError={(error: Error) => {
//                 alert(`ERROR! ${error.message}`);
//               }}
//             />
//           </div>

//           {/* Summary Component */}
//           {uploadedFile && (
//             <div className="mt-10">
//               <SummaryViewer uploadedFile={uploadedFile} />
//             </div>
//           )}
//         </section>
//       </main>
//     </>
//   );
// }
"use client";

import SummaryViewer from "@/components/dashboard/SummaryViewer";
import { Navbar } from "@/components/navbar";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import type { ClientUploadedFileData } from "uploadthing/types";

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<ClientUploadedFileData<{
    uploadedBy: string;
    url: string;
    name: string;
    size: number;
  }> | null>(null);

  return (
    <>
      <Navbar />

      <main className="h-calc(100vh-100px) bg-background px-4 py-10">
        <section className="bg-card text-card-foreground p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center mb-3 tracking-tight">
            Upload PDF
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Upload your PDF to generate a summary using AI.
          </p>

          {/* Upload Button */}
          <div className="flex justify-center">
            <UploadButton
              endpoint="pdfUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                if (res && res.length > 0) {
                  setUploadedFile(res[0]);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="px-6 py-3 font-medium bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 transition"
            />
          </div>

          {/* Summary Component */}
          {uploadedFile && (
            <div className="mt-10">
              <SummaryViewer uploadedFile={uploadedFile} />
            </div>
          )}
        </section>
      </main>
    </>
  );
}
