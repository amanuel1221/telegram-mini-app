import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LoaderCircle, ZoomIn, ZoomOut } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { getPdfById, getPdfViewerUrl } from "../api/pdfApi";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).href;

export default function PdfReader() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [metadataLoading, setMetadataLoading] = useState(true);
  const [error, setError] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  const pageRefs = useRef(new Map());

  const storageKey = useMemo(() => `pdf-progress-${id}`, [id]);
  const documentUrl = useMemo(() => getPdfViewerUrl(id), [id]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent right clicks, copy & keyboard shortcuts
  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    const preventCopy = (event) => event.preventDefault();
    const preventShortcuts = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        ["c", "a", "p", "s", "u"].includes(event.key.toLowerCase())
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("copy", preventCopy);
    document.addEventListener("keydown", preventShortcuts);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("keydown", preventShortcuts);
    };
  }, []);

  // Sync scroll reading position
  useEffect(() => {
    if (!id) return;
    const savedPage = Number(localStorage.getItem(storageKey));
    if (savedPage > 0) setCurrentPage(savedPage);
  }, [id, storageKey]);

  useEffect(() => {
    if (!id) return;
    localStorage.setItem(storageKey, String(currentPage));
  }, [currentPage, id, storageKey]);

  useEffect(() => {
    if (!numPages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const page = Number(visibleEntry.target.dataset.page);
          if (page > 0) setCurrentPage(page);
        }
      },
      { root: null, threshold: [0.2, 0.4, 0.6] }
    );

    pageRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [numPages]);

  useEffect(() => {
    setNumPages(0);
    setCurrentPage(1);
    setError("");
    pageRefs.current.clear();
  }, [id]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        await getPdfById(id);
      } catch (loadError) {
        console.error(loadError);
        const message =
          loadError.response?.data?.message ||
          loadError.message ||
          "Unable to load PDF metadata.";
        setError(message);
      } finally {
        setMetadataLoading(false);
      }
    };

    loadPdf();
  }, [id]);

  // Handle explicit button zoom controls
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  if (metadataLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F9F9F6]">
        <LoaderCircle className="animate-spin text-[#1A73E8]" size={36} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F9F9F6] px-4 text-center">
        <p className="text-base font-semibold text-red-600">Unable to open PDF</p>
        <p className="mt-1 text-xs text-slate-500">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded-xl bg-[#1A73E8] px-5 py-2.5 text-xs font-bold text-white shadow-md active:scale-95 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-auto bg-[#121212] select-none">
      {/* Floating Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white shadow-lg transition active:scale-90 cursor-pointer"
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Floating Controls: Zoom Out, Page Counter, Zoom In */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md p-1 pl-1.5 pr-2.5 text-xs font-semibold text-white shadow-lg">
        <button
          onClick={handleZoomOut}
          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/20 active:scale-90 cursor-pointer"
          aria-label="Zoom Out"
        >
          <ZoomOut size={15} />
        </button>

        <span className="px-1 text-xs">
          {currentPage} / {numPages || "—"}
        </span>

        <button
          onClick={handleZoomIn}
          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/20 active:scale-90 cursor-pointer"
          aria-label="Zoom In"
        >
          <ZoomIn size={15} />
        </button>
      </div>

      {/* Full Screen PDF Render Container */}
      <div className="flex min-h-screen w-full flex-col items-center py-2 overflow-hidden">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease-out",
          }}
          className="w-full flex flex-col items-center"
        >
          <Document
            file={{ url: documentUrl, withCredentials: true }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(loadError) => {
              console.error(loadError);
              setError(loadError?.message || "You don't have access to this PDF.");
            }}
            loading={
              <div className="flex h-screen items-center justify-center">
                <LoaderCircle className="animate-spin text-white/80" size={34} />
              </div>
            }
          >
            {Array.from({ length: numPages }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <div
                  key={pageNumber}
                  ref={(node) => {
                    if (node) pageRefs.current.set(pageNumber, node);
                    else pageRefs.current.delete(pageNumber);
                  }}
                  data-page={pageNumber}
                  className="my-1.5 flex justify-center shadow-2xl"
                >
                  <Page
                    pageNumber={pageNumber}
                    width={viewportWidth}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    className="max-w-none"
                  />
                </div>
              );
            })}
          </Document>
        </div>
      </div>
    </div>
  );
}