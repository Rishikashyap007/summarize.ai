"use client";

import { useEffect, useState } from "react";

interface SummaryViewerProps {
  uploadedFile: unknown;
}

export default function SummaryViewer({ uploadedFile }: SummaryViewerProps) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        // Build payload from upload response
        const payload = {
          pdfUrl: uploadedFile?.url,
          title: uploadedFile?.name || "Untitled",
          filename: uploadedFile?.name,
          userId: uploadedFile?.serverData?.uploadedBy, // ✅ userId from serverData
        };

        const res = await fetch("/api/extract-pdf-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log(data, "summary data");
        setSummary(data?.data?.summary_text || "No summary generated.");
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Failed to generate summary ❌");
      } finally {
        setLoading(false);
      }
    };

    if (uploadedFile) fetchSummary();
  }, [uploadedFile]);

  return (
    <div className="bg-muted text-muted-foreground p-6 rounded-lg shadow-inner">
      {loading ? (
        <div className="flex justify-center items-center space-x-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary font-medium">Generating summary...</p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3">
            AI Generated Summary
          </h3>
          <div className="bg-white p-6 rounded-xl shadow-md max-h-96 overflow-y-auto">
            <ul className="list-disc list-inside space-y-3">
              {summary.split("<n>").map((line, i) => (
                <li key={i} className="text-gray-700 leading-relaxed">
                  <span className="font-medium">{line.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
