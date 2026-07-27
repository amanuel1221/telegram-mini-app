import {
  FileText,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function PdfCard({ pdf }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <FileText size={24} />
        </div>

        <div className="flex-1 overflow-hidden">

          <h3 className="truncate text-sm font-bold text-slate-900">
            {pdf.title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            By{" "}
            {pdf.uploadedBy
              ? `${pdf.uploadedBy.firstName ?? ""} ${pdf.uploadedBy.lastName ?? ""}`.trim()
              : "Unknown Teacher"}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {pdf.description || "Course material"}
          </p>

        </div>

      </div>

      <button
        onClick={() => navigate(`/pdfs/${pdf._id}`)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
      >
        Read PDF

        <ArrowRight size={16} />
      </button>

    </div>
  );
}