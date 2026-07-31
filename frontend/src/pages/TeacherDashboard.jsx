import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FolderOpen,
  FileText,
  Pencil,
  Trash2,
  LoaderCircle,
} from "lucide-react";

import { getMyPdfs } from "../api/pdfApi";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyPdfs();
  }, []);

  const loadMyPdfs = async () => {
    try {
      const data = await getMyPdfs();
      setPdfs(data.pdfs || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle
          size={36}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-white shadow-sm">

        <div className="mx-auto max-w-6xl px-6 py-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Teacher Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your uploaded learning materials.
          </p>

        </div>

      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Statistics */}

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total PDFs
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {pdfs.length}
                </h2>

              </div>

              <div className="rounded-2xl bg-blue-100 p-4">
                <FileText className="text-blue-600" />
              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Storage
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {(
                    pdfs.reduce(
                      (sum, pdf) => sum + pdf.fileSize,
                      0
                    ) /
                    1024 /
                    1024
                  ).toFixed(2)}
                  MB
                </h2>

              </div>

              <div className="rounded-2xl bg-green-100 p-4">
                <FolderOpen className="text-green-600" />
              </div>

            </div>

          </div>

          <button
            onClick={() =>
              navigate("/teacher/upload")
            }
            className="rounded-3xl bg-blue-600 p-6 text-left text-white shadow transition hover:bg-blue-700"
          >
            <Upload size={34} />

            <h2 className="mt-4 text-xl font-bold">
              Upload PDF
            </h2>

            <p className="mt-2 text-sm text-blue-100">
              Upload new course materials for students.
            </p>

          </button>

        </div>

        {/* Uploaded PDFs */}

        <div className="mt-10">

          <h2 className="mb-6 text-2xl font-bold">
            My Uploaded PDFs
          </h2>

          {pdfs.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

              <FileText
                size={50}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-xl font-semibold">
                No PDFs Uploaded
              </h3>

              <p className="mt-2 text-slate-500">
                Upload your first learning material.
              </p>

            </div>
          ) : (
            <div className="space-y-4">

              {pdfs.map((pdf) => (
                <div
                  key={pdf._id}
                  className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between"
                >
                  <div>

                    <h3 className="text-lg font-semibold">
                      {pdf.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {pdf.description}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(
                        pdf.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        navigate(`/pdfs/${pdf._id}`)
                      }
                      className="rounded-xl bg-blue-600 p-3 text-white"
                    >
                      <FileText size={18} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          `/teacher/edit/${pdf._id}`
                        )
                      }
                      className="rounded-xl bg-yellow-500 p-3 text-white"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="rounded-xl bg-red-600 p-3 text-white"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}