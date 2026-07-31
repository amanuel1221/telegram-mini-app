import {
  Upload,
  FolderOpen,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function TeacherQuickActions() {

  const navigate = useNavigate();

  return (

    <div className="space-y-3">

      <button
        onClick={() => navigate("/teacher/upload")}
        className="flex w-full items-center justify-between rounded-2xl bg-blue-600 px-5 py-4 text-white shadow hover:bg-blue-700"
      >

        <div className="flex items-center gap-3">

          <Upload size={22} />

          <span className="font-semibold">
            Upload PDF
          </span>

        </div>

      </button>

      <button
        onClick={() => navigate("/teacher/my-pdfs")}
        className="flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 shadow border border-slate-200"
      >

        <div className="flex items-center gap-3">

          <FolderOpen
            size={22}
            className="text-blue-600"
          />

          <span className="font-semibold">
            My PDFs
          </span>

        </div>

      </button>

      <button
        onClick={() => navigate("/teacher/users")}
        className="flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 shadow border border-slate-200"
      >

        <div className="flex items-center gap-3">

          <Users
            size={22}
            className="text-green-600"
          />

          <span className="font-semibold">
            Manage Users
          </span>

        </div>

      </button>

    </div>

  );

}