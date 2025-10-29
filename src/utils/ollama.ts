// // // // lib/ollama.ts
// // // import { execFile } from "child_process";

// // // export const generateSummaryFromOllama = async (pdfText: string) => {
// // //   if (!pdfText) throw new Error("No text provided for summarization");

// // //   return new Promise<string>((resolve, reject) => {
// // //     // Call Python script
// // //     execFile("python", ["./summarize.py", pdfText], (error, stdout, stderr) => {
// // //       if (error) {
// // //         console.error("Python script error:", stderr || error.message);
// // //         return reject(new Error("Failed to generate summary"));
// // //       }

// // //       try {
// // //         const result = JSON.parse(stdout); // parse JSON from Python script
// // //         if (!result.summary) return reject(new Error("No summary returned"));
// // //         resolve(result.summary);
// // //       } catch (err) {
// // //         console.error("Failed to parse Python JSON:", err);
// // //         reject(new Error("Invalid response from Python script"));
// // //       }
// // //     });
// // //   });
// // // };


// // import { execFile } from "child_process";

// // export const generateSummaryFromOllama = async (pdfText: string): Promise<string> => {
// //   if (!pdfText) throw new Error("No text provided for summarization");

// //   return new Promise<string>((resolve, reject) => {
// //     execFile("python", ["./summarize.py", pdfText], (error, stdout, stderr) => {
// //       if (error) {
// //         console.error("Python script error:", stderr || error.message);
// //         return reject(new Error("Failed to generate summary"));
// //       }

// //       try {
// //         const result = JSON.parse(stdout);
// //         if (result.error) return reject(new Error(result.error));
// //         if (!result.summary) return reject(new Error("No summary returned"));
// //         resolve(result.summary);
// //       } catch (err) {
// //         console.error("Failed to parse Python JSON:", err);
// //         reject(new Error("Invalid response from Python script"));
// //       }
// //     });
// //   });
// // };



// import { spawn } from "child_process";

// export const generateSummaryFromOllama = async (pdfText: string): Promise<string> => {
//   if (!pdfText) throw new Error("No text provided");

//   return new Promise<string>((resolve, reject) => {
//     const pyProcess = spawn("python", ["./summarize.py"]);

//     let output = "";
//     let errorOutput = "";

//     pyProcess.stdout.on("data", (data) => (output += data.toString()));
//     pyProcess.stderr.on("data", (data) => (errorOutput += data.toString()));

//     pyProcess.on("close", (code) => {
//       if (code !== 0) {
//         console.error("Python script error:", errorOutput);
//         return reject(new Error("Python script failed"));
//       }
//       try {
//         const result = JSON.parse(output);
//         if (result.error) return reject(new Error(result.error));
//         if (!result.summary) return reject(new Error("No summary returned"));
//         resolve(result.summary);
//       } catch (err) {
//         console.error("Failed to parse JSON:", err);
//         reject(new Error("Invalid response from Python"));
//       }
//     });

//     // Send PDF text to Python stdin
//     pyProcess.stdin.write(pdfText);
//     pyProcess.stdin.end();
//   });
// };


import { spawn } from "child_process";

export const generateSummaryFromOllamaChunks = async (chunks: string[]): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const pyProcess = spawn("python", ["./summarize.py"]);

    let output = "";
    let errorOutput = "";

    pyProcess.stdout.on("data", (data) => (output += data.toString()));
    pyProcess.stderr.on("data", (data) => (errorOutput += data.toString()));

    pyProcess.on("close", (code) => {
      if (code !== 0) {
        console.error("Python error:", errorOutput);
        return reject(new Error("Python script failed"));
      }

      try {
        const result = JSON.parse(output);
        if (result.error) return reject(new Error(result.error));
        resolve(result.summary);
      } catch (err) {
        console.error("JSON parse error:", err);
        reject(new Error("Invalid response from Python"));
      }
    });

    // Send chunks JSON to Python stdin
    pyProcess.stdin.write(JSON.stringify(chunks));
    pyProcess.stdin.end();
  });
};
