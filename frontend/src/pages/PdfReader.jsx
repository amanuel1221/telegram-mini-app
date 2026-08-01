import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  LoaderCircle,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
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

  const [pdf, setPdf] = useState(null);
  const [metadataLoading, setMetadataLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [error, setError] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.1);
  const [fitWidth, setFitWidth] = useState(() => window.innerWidth < 768);
  const [fullscreen, setFullscreen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  const viewerRef = useRef(null);
  const pageRefs = useRef(new Map());
  const restoreTimerRef = useRef(null);

  const storageKey = useMemo(() => `pdf-progress-${id}`, [id]);
  const documentUrl = useMemo(() => getPdfViewerUrl(id), [id]);
  const pageWindowStart = Math.max(1, currentPage - PAGE_BUFFER);
  const pageWindowEnd = Math.min(numPages, currentPage + PAGE_BUFFER);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!id) return;

    const savedPage = Number(localStorage.getItem(storageKey));
    if (savedPage > 0) {
      setCurrentPage(savedPage);
    }
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
          if (page > 0) {
            setCurrentPage(page);
          }
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
    return () => {
      if (restoreTimerRef.current) {
        clearTimeout(restoreTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const data = await getPdfById(id);
        setPdf(data.pdf ?? data);
      } catch (loadError) {
        console.error(loadError);
        setError(loadError.response?.data?.message || "Unable to load PDF metadata.");
      } finally {
        setMetadataLoading(false);
      }
    };

    loadPdf();
  }, [id]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await viewerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (fullscreenError) {
      console.error("Fullscreen error:", fullscreenError);
    }
  };

  const handleZoomIn = () => {
    setScale((previous) => Math.min(2.5, Number((previous + 0.15).toFixed(2))));
    setFitWidth(false);
  };

  const handleZoomOut = () => {
    setScale((previous) => Math.max(0.8, Number((previous - 0.15).toFixed(2))));
    setFitWidth(false);
  };

  const handleFitWidth = () => {
    setFitWidth((previous) => !previous);
  };

  if (metadataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
          <LoaderCircle className="animate-spin text-blue-600" size={34} />
          <p className="text-sm font-medium text-slate-600">Preparing PDF reader…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-red-600">Unable to open this PDF</p>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={viewerRef} className="flex h-screen flex-col bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl p-2 transition hover:bg-slate-100"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="rounded-xl bg-blue-50 p-2">
            <FileText size={20} className="text-blue-600" />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold text-slate-900">
              {pdf?.title || "Untitled PDF"}
            </h1>
            <p className="truncate text-xs text-slate-500">
              Page {currentPage} / {numPages || "—"}
            </p>
          </div>

          <button
            onClick={toggleFullscreen}
            className="rounded-xl p-2 transition hover:bg-slate-100"
            aria-label="Toggle fullscreen"
          >
            {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-200"
              style={{ width: `${pdfLoading ? Math.max(15, pdfProgress * 100) : 100}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-slate-500">
            {pdfLoading ? "Loading…" : "Ready"}
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-auto px-2 py-2 sm:px-4 sm:py-3">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3">
          <Document
            file={{ url: documentUrl, withCredentials: true }}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setPdfLoading(false);
              setPdfProgress(1);

              const savedPage = Number(localStorage.getItem(storageKey));
              if (savedPage > 0 && savedPage <= numPages) {
                setCurrentPage(savedPage);
                restoreTimerRef.current = window.setTimeout(() => {
                  const target = pageRefs.current.get(savedPage);
                  target?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
              }
            }}
            onLoadProgress={({ loaded, total }) => {
              if (total) {
                setPdfProgress(loaded / total);
              }
            }}
            onLoadError={(loadError) => {
              console.error(loadError);
              setPdfLoading(false);
              setError("Unable to display PDF contents.");
            }}
            loading={
              <div className="flex min-h-[60vh] items-center justify-center rounded-2xl bg-white px-4 py-10 shadow-sm">
                <div className="flex flex-col items-center gap-3">
                  <LoaderCircle className="animate-spin text-blue-600" size={32} />
                  <p className="text-sm text-slate-500">Streaming PDF securely…</p>
                </div>
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
                    if (node) {
                      pageRefs.current.set(pageNumber, node);
                    } else {
                      pageRefs.current.delete(pageNumber);
                    }
                  }}
                  data-page={pageNumber}
                  className="w-full rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
                >
                  {shouldRender ? (
                    <div className="flex justify-center rounded-2xl p-2 sm:p-3">
                      <Page
                        pageNumber={pageNumber}
                        scale={fitWidth ? undefined : scale}
                        width={fitWidth ? Math.max(280, viewportWidth - 28) : undefined}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        className="max-w-full"
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Page {pageNumber}
                    </div>
                  )}
                </div>
              );
            })}
          </Document>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 transition hover:bg-slate-100"
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>

            <button
              onClick={handleFitWidth}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                fitWidth ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              Fit Width
            </button>

            <button
              onClick={handleZoomIn}
              className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 transition hover:bg-slate-100"
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          <div className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
            {(scale * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
}
