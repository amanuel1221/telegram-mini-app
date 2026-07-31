import {
  FileText,
  Users,
} from "lucide-react";

export default function TeacherStats() {
  return (
    <div className="grid grid-cols-2 gap-4">

      <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs text-slate-500">
              Total PDFs
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              0
            </h2>

          </div>

          <div className="rounded-xl bg-blue-100 p-3">

            <FileText
              className="text-blue-600"
              size={24}
            />

          </div>

        </div>

      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs text-slate-500">
              Students
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              0
            </h2>

          </div>

          <div className="rounded-xl bg-green-100 p-3">

            <Users
              className="text-green-600"
              size={24}
            />

          </div>

        </div>

      </div>

    </div>
  );
}