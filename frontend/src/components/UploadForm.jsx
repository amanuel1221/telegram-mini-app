import { useState } from "react";
import { Upload } from "lucide-react";

import { uploadPdf } from "../api/pdfApi";

export default function UploadPdfForm() {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {

    e.preventDefault();

    if (!file) {
      return alert("Please choose a PDF");
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);

      await uploadPdf(formData);

      alert("PDF Uploaded Successfully");

      setTitle("");
      setDescription("");
      setFile(null);

      document.getElementById("pdfFile").value = "";

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Upload failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl bg-white p-5 shadow"
    >

      <div>

        <label className="text-sm font-medium">
          Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="mt-2 w-full rounded-xl border p-3"
          required
        />

      </div>

      <div>

        <label className="text-sm font-medium">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="mt-2 w-full rounded-xl border p-3"
          required
        />

      </div>

      <div>

        <label className="text-sm font-medium">
          PDF File
        </label>

        <input
          id="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mt-2 block w-full"
          required
        />

      </div>

      <button
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white"
      >

        <Upload size={18} />

        {loading
          ? "Uploading..."
          : "Upload PDF"}

      </button>

    </form>

  );

}