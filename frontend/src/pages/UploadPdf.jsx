import UploadPdfForm from "../components/UploadForm";

export default function UploadPdf() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-lg p-4">

        <h1 className="text-2xl font-bold">
          Upload PDF
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload new learning material.
        </p>

        <div className="mt-6">
          <UploadPdfForm />
        </div>

      </div>

    </div>
  );
}