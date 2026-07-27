import useAuth from "../hooks/useAuth";
import {
  User,
  ShieldCheck,
  Hash,
  Users,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
            <User size={42} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Welcome
          </h1>

          <p className="mt-2 text-lg font-medium text-blue-600">
            {user?.firstName}
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-100">

          <div className="space-y-5">

            {/* Username */}
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-100 p-3">
                <User
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Username
                </p>

                <p className="font-semibold text-slate-800">
                  @{user?.username || "N/A"}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-100 p-3">
                <ShieldCheck
                  size={22}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Role
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    user?.role === "teacher"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user?.role}
                </span>
              </div>
            </div>

            {/* Telegram ID */}
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-violet-100 p-3">
                <Hash
                  size={22}
                  className="text-violet-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Telegram ID
                </p>

                <p className="font-semibold text-slate-800 break-all">
                  {user?.telegramId}
                </p>
              </div>
            </div>

            {/* Membership */}
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-100 p-3">
                <Users
                  size={22}
                  className="text-orange-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Group Membership
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    user?.isMember
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user?.isMember
                    ? "Active Member"
                    : "Not a Member"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-red-600 active:scale-95"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </div>
  );
}