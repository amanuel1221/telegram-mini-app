import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  LoaderCircle,
} from "lucide-react";

import {
  getPdfById,
  getPdfViewerUrl,
} from "../api/pdfApi";

export default function PdfReader() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50">

        <LoaderCircle
          size={34}
          className="animate-spin text-blue-600"
        />

        <p className="text-sm text-slate-500">
          Loading PDF...
        </p>

      </div>

    );

  }



  if (error) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm font-medium text-red-500">

            {error}

          </p>

        </div>

      </div>

    );

  }



  return (

    <div className="flex h-screen flex-col bg-slate-100">

      <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-white px-4 py-3 shadow-sm">

        <button

          onClick={() => navigate(-1)}

          className="rounded-xl p-2 transition hover:bg-slate-100"

        >

          <ArrowLeft size={20} />

        </button>


        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-50 p-2">

            <FileText
              size={20}
              className="text-blue-600"
            />

          </div>

          <div>

            <h1 className="line-clamp-1 text-sm font-bold text-slate-900">

              {pdf.title}

            </h1>

            <p className="text-xs text-slate-500">

              {pdf.description || "Course Material"}

            </p>

          </div>

        </div>

      </header>


      <div className="flex-1 p-3">

        <iframe

          src={getPdfViewerUrl(id)}

          title={pdf.title}

          className="h-full w-full rounded-2xl border bg-white shadow"

        />

      </div>

    </div>

  );

}