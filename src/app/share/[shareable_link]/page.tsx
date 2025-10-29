"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";

export default function SummaryDetailPage() {
  const { shareable_link } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [sharing, setSharing] = useState(false);


  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/summaries-list/share/${shareable_link}`);
      setSummary(res.data.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  }, [shareable_link]);

//   const handleDelete = async () => {
//     try {
//       const res = await axios.delete(`/api/summaries-list/${id}`);
//       //   toast.success(res.data.message || "Summary deleted");
//       router.push("/dashboard"); // redirect back to list
//     } catch (error: any) {
//       console.error("Delete error:", error);
//       //   toast.error(error.response?.data?.message || "Failed to delete");
//     }
//   };

//   const handleShare = async ()=>{
//     setSharing(true)
//     try {
//       const res = await axios.post(`/api/summaries-list/${id}/share`,{});

//       if(res.data.public_url){
//         console.log(res.data.public_url,"response")
//       }
//     } catch (error) {
//       console.error("Error sharing summary:", error);
//     }
//     finally{
//       setSharing(false)
//     }
//   }

  useEffect(() => {
    if (shareable_link) fetchSummary();
  }, [fetchSummary, shareable_link]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading summary...
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Summary not found
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {summary.title}
        </h1>

        {/* Meta */}
        <p className="text-sm text-gray-500 mb-4">
          Uploaded file:{" "}
          <span className="font-medium text-gray-700">{summary.file_name}</span>
          <br />
          Created on{" "}
          {new Date(summary.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        {/* PDF Link */}
        {/* <div className="mb-6">
          <a
            href={summary.original_file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            View Original PDF
          </a>
        </div> */}

        {/* Summary Content */}
        <div className="bg-gray-50 shadow-sm rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {summary.summary_text
              .split("<n>")
              .map((line: string, i: number) => (
                <li key={i} className="leading-relaxed">
                  {line.trim()}
                </li>
              ))}
          </ul>
        </div>

        {/* Actions */}
        {/* <div className="mt-6 flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => window.open(summary.original_file_url, "_blank")}
          >
            Download
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant={"default"} onClick={() => handleShare()}>
            {sharing ? "Sharing..." : "Share"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to List
          </Button>
        </div> */}
      </div>
    </>
  );
}
