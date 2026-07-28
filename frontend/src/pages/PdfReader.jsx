import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  LoaderCircle,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";

import {
  getPdfById,
  getPdfViewerUrl,
} from "../api/pdfApi";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).href;

export default function PdfReader() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pdf, setPdf] = useState(null);

  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(true);

  const [error, setError] = useState("");

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const data = await getPdfById(id);

        setPdf(data.pdf);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load PDF."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle
            className="animate-spin text-blue-600"
            size={36}
          />

          <p className="text-sm text-slate-500">
            Loading PDF...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-red-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-slate-100">

      {/* Header */}

      <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-white px-4 py-3 shadow">

        <button
          onClick={() => navigate(-1)}
          className="rounded-xl p-2 transition hover:bg-slate-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="rounded-xl bg-blue-50 p-2">
          <FileText
            size={20}
            className="text-blue-600"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <h1 className="truncate text-sm font-bold text-slate-900">
            {pdf.title}
          </h1>

          <p className="truncate text-xs text-slate-500">
            {pdf.description ||
              "Course Material"}
          </p>
        </div>
      </header>

      {/* PDF */}

      <div className="flex-1 overflow-auto p-3">

        <div className="flex justify-center">

          <Document
            file={{
              url: getPdfViewerUrl(id),
              withCredentials: true,
            }}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setPdfLoading(false);
            }}
            onLoadError={(err) => {
              console.error(err);

              setError(
                "Unable to display PDF."
              );
            }}
            loading={
              <div className="flex h-[70vh] items-center justify-center">
                <LoaderCircle
                  className="animate-spin text-blue-600"
                  size={36}
                />
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer
              renderTextLayer
            />
          </Document>

        </div>
      </div>

      {/* Controls */}

      {!pdfLoading && (
        <div className="border-t bg-white p-3">

          <div className="flex items-center justify-between">

            <button
              onClick={() =>
                setScale((s) =>
                  Math.max(0.8, s - 0.2)
                )
              }
              className="rounded-xl bg-slate-100 p-3"
            >
              <ZoomOut size={20} />
            </button>

            <div className="text-sm font-semibold">
              {(scale * 100).toFixed(0)}%
            </div>

            <button
              onClick={() =>
                setScale((s) =>
                  Math.min(3, s + 0.2)
                )
              }
              className="rounded-xl bg-slate-100 p-3"
            >
              <ZoomIn size={20} />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between">

            <button
              disabled={pageNumber <= 1}
              onClick={() =>
                setPageNumber((p) => p - 1)
              }
              className="rounded-xl bg-blue-600 p-3 text-white disabled:bg-slate-300"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="text-sm font-bold">
              {pageNumber} / {numPages}
            </div>

            <button
              disabled={pageNumber >= numPages}
              onClick={() =>
                setPageNumber((p) => p + 1)
              }
              className="rounded-xl bg-blue-600 p-3 text-white disabled:bg-slate-300"
            >
              <ChevronRight size={22} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}