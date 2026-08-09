import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { getPdfById, getPdfViewerUrl } from "../api/pdfApi";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).href;

const PAGE_BUFFER = 2;

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
  const touchDistanceRef = useRef(0);
  const lastTapRef = useRef(0);

  const storageKey = useMemo(() => `pdf-progress-${id}`, [id]);
  const documentUrl = useMemo(() => getPdfViewerUrl(id), [id]);

  const pageWindowStart = Math.max(1, currentPage - PAGE_BUFFER);
  const pageWindowEnd = Math.min(numPages, currentPage + PAGE_BUFFER);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent right clicks, copy & keyboard inspection shortcuts
  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    const preventCopy = (event) => event.preventDefault();
    const preventShortcuts = (event) => {
      if ((event.ctrlKey || event.metaKey) && ["c", "a", "p", "s", "u"].includes(event.key.toLowerCase())) {
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
  }, [numPages, pageWindowStart, pageWindowEnd]);

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
        const message = loadError.response?.data?.message || loadError.message || "Unable to load PDF metadata.";
        setError(message);
      } finally {
        setMetadataLoading(false);
      }
    };

    loadPdf();
  }, [id]);

  // Touch handlers for 2-finger pinch zoom & double-tap zoom reset
  const getTouchDistance = (e) => {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      touchDistanceRef.current = getTouchDistance(e);
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        // Reset zoom on double tap
        setScale(1.0);
      }
      lastTapRef.current = now;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchDistanceRef.current > 0) {
      const currentDistance = getTouchDistance(e);
      const delta = (currentDistance - touchDistanceRef.current) * 0.005;

      setScale((prev) => Math.min(Math.max(0.7, prev + delta), 3.0));
      touchDistanceRef.current = currentDistance;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      touchDistanceRef.current = 0;
    }
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
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative h-screen w-screen overflow-auto bg-[#121212] select-none touch-pan-y"
    >
      {/* Floating Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white shadow-lg transition active:scale-90 cursor-pointer"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Floating Page Counter */}
      <div className="fixed top-4 right-4 z-50 rounded-full bg-black/50 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg">
        {currentPage} / {numPages || "—"}
      </div>

      {/* Full Screen PDF Reader Container */}
      <div className="flex min-h-screen w-full flex-col items-center py-2">
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
            const shouldRender = pageNumber >= pageWindowStart && pageNumber <= pageWindowEnd;

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
                {shouldRender ? (
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    width={viewportWidth}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    className="max-w-none transition-transform duration-75"
                  />
                ) : (
                  <div
                    style={{ width: viewportWidth * scale, height: viewportWidth * scale * 1.3 }}
                    className="flex items-center justify-center bg-slate-900 text-xs font-bold text-slate-500 uppercase tracking-widest"
                  >
                    Page {pageNumber}
                  </div>
                )}
              </div>
            );
          })}
        </Document>
      </div>
    </div>
  );
}