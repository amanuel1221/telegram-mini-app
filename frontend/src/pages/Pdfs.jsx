import {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  BookOpen,
  Search,
  FileX,
} from "lucide-react";

import { getAllPdfs } from "../api/pdfApi";
import PdfCard from "../components/PdfCard";

export default function Pdfs() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPdfs = async () => {
      try {
        const data = await getAllPdfs();
        setPdfs(data.pdfs || []);
      } catch (error) {
        console.error("Failed to fetch PDFs:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load PDF materials"
        );
      } finally {
        setLoading(false);
      }
    };
    loadPdfs();
  }, []);

  const filteredPdfs = useMemo(() => {
    const search = searchQuery.toLowerCase();
    return pdfs.filter((pdf) => {
      const titleMatch = pdf.title?.toLowerCase().includes(search);
      const firstNameMatch = pdf.teacher?.firstName?.toLowerCase().includes(search);
      const lastNameMatch = pdf.teacher?.lastName?.toLowerCase().includes(search);
      return titleMatch || firstNameMatch || lastNameMatch;
    });
  }, [pdfs, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4 max-w-md mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900">PDF Library</h1>
          <p className="text-xs text-slate-500">
            {loading ? "Loading materials..." : `${pdfs.length} learning materials`}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="relative mt-4">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search PDF or teacher..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="mt-5 space-y-3">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-3/4 rounded bg-slate-200" />
                    <div className="h-3 w-1/2 rounded bg-slate-100" />
                  </div>
                </div>
                <div className="mt-4 h-9 rounded-lg bg-slate-100" />
              </div>
            ))
          : filteredPdfs.length === 0 ? (
              <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <FileX size={24} />
                </div>
                <h3 className="mt-3 font-semibold text-slate-800">No PDFs found</h3>
                <p className="mt-1 text-xs text-slate-500">
                  {searchQuery ? "Try another search keyword" : "Learning materials will appear here"}
                </p>
              </div>
            ) : (
              filteredPdfs.map((pdf) => <PdfCard key={pdf._id} pdf={pdf} />)
            )}
      </div>
    </div>
  );
}
