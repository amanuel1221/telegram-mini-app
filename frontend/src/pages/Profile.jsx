import useAuth from "../hooks/useAuth";
import {
  User,
  ShieldCheck,
  Hash,
  Users,
  Calendar,
  LogOut,
} from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">

      <div className="mx-auto max-w-md">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-center text-white shadow-xl">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur">

            <User size={46} />

          </div>

          <h1 className="mt-5 text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>

          <p className="mt-1 text-sm opacity-80">
            @{user?.username || "telegram_user"}
          </p>

          <div className="mt-5 flex justify-center gap-3">

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              {user?.role}
            </span>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                user?.isMember
                  ? "bg-green-500/30"
                  : "bg-red-500/30"
              }`}
            >
              {user?.isMember
                ? "Member"
                : "Not Member"}
            </span>

          </div>

        </div>

        {/* Information Card */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">

          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Account Information
          </h2>

          <div className="space-y-5">

            <InfoRow
              icon={<User />}
              label="Full Name"
              value={`${user?.firstName || ""} ${user?.lastName || ""}`}
            />

            <InfoRow
              icon={<Hash />}
              label="Telegram Username"
              value={
                user?.username
                  ? `@${user.username}`
                  : "N/A"
              }
            />

            <InfoRow
              icon={<ShieldCheck />}
              label="Role"
              value={user?.role}
            />

            <InfoRow
              icon={<Users />}
              label="Membership"
              value={
                user?.isMember
                  ? "Active Member"
                  : "Not Joined"
              }
            />

            <InfoRow
              icon={<Hash />}
              label="Telegram ID"
              value={user?.telegramId}
            />

            <InfoRow
              icon={<Calendar />}
              label="Joined"
              value={
                user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "N/A"
              }
            />

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-red-500
            py-4
            font-semibold
            text-white
            shadow-lg
            transition
            hover:bg-red-600
            active:scale-95
          "
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

        {icon}

      </div>

      <div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="font-semibold text-slate-800 break-all">
          {value || "N/A"}
        </p>

      </div>

    </div>
  );
}