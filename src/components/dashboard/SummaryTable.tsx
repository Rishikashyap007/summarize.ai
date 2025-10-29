
"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SummaryTable() {
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
 const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchSummaries = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/summaries-list");
      setSummaries(res.data.data || []);
    } catch (error) {
      console.error("Error fetching summaries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      const res = await axios.delete(`/api/summaries-list/${id}`);
      if(res.data){
        fetchSummaries()
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      
    }finally{
      setDeletingId(null)
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">My Summaries</h2>

      <div className="overflow-x-auto">
        <div
          className="max-h-[500px] overflow-y-auto border rounded-lg"
          style={{ scrollbarWidth: "thin" }}
        >
          <table className="w-full border-collapse table-fixed">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-left w-1/4">
                  Title
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-left w-1/6">
                  Date
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-left w-1/3">
                  Preview
                </th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-700 text-left w-1/4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="py-3 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                    </td>
                  </tr>
                ))
              ) : summaries.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 text-center text-gray-500 text-sm"
                  >
                    No summaries found
                  </td>
                </tr>
              ) : (
                summaries.map((summary) => (
                  <tr
                    key={summary._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Title */}
                    <td className="py-3 px-4 font-medium text-gray-800 truncate">
                      {summary.title}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(summary.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    {/* Preview */}
                    <td className="py-3 px-4 text-gray-600 text-sm truncate max-w-xs">
                      {summary.summary_text
                        ? summary.summary_text
                            .split(" ")
                            .slice(0, 12)
                            .join(" ") +
                          (summary.summary_text.split(" ").length > 12
                            ? "..."
                            : "")
                        : "No summary"}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(`/dashboard/summaries/${summary._id}`)
                        }
                      >
                        View
                      </Button>
                      <Button size="sm" variant="secondary">
                        Download
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(summary._id)}>
                       { deletingId === summary._id ? "Deleting..." : "Delete"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
