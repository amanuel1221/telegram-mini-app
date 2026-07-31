import { useEffect, useState } from "react";

import { getDashboardStats } from "../api/teacherApi";

import PdfCard from "./PdfCard";

export default function RecentPdfs() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const loadPdfs = async () => {
      try {
        const data = await getDashboardStats();

        setPdfs(data.recentPdfs || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadPdfs();
  }, []);

  return (
    <div className="mt-6 rounded-3xl bg-white p-6 shadow">

      <h2 className="mb-5 text-lg font-bold text-slate-800">
        Recent Uploads
      </h2>

      {pdfs.length === 0 ? (
        <p className="text-sm text-slate-500">
          No PDFs uploaded yet.
        </p>
      ) : (
        <div className="space-y-4">
          {pdfs.map((pdf) => (
            <PdfCard
              key={pdf._id}
              pdf={pdf}
            />
          ))}
        </div>
      )}

    </div>
  );
}