import {
  ShieldCheck,
  LogOut,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function DashboardHeader() {

  const {
    user,
    logout,
  } = useAuth();

  return (

    <div
      className="
      rounded-3xl
      bg-gradient-to-br
      from-blue-600
      to-indigo-700
      p-6
      text-white
      shadow-xl
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm opacity-80">
            Telegram LMS
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Welcome,
            <br />
            {user?.firstName || "Teacher"}
          </h1>

          <p className="mt-2 text-blue-100">
            Manage your course materials
          </p>

        </div>

        <button
          onClick={logout}
          className="
          rounded-2xl
          bg-white/20
          p-3
          transition
          hover:bg-white/30
          "
        >
          <LogOut size={22} />
        </button>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <span
          className="
          rounded-full
          bg-white/20
          px-4
          py-2
          text-sm
          font-medium
          "
        >
          {user?.role}
        </span>

        <span
          className={`
          flex
          items-center
          gap-2
          rounded-full
          px-4
          py-2
          text-sm
          font-medium
          ${
            user?.isMember
              ? "bg-green-500/30"
              : "bg-red-500/30"
          }
          `}
        >

          <ShieldCheck size={16} />

          {user?.isMember
            ? "Telegram Member"
            : "Not Joined"}

        </span>

      </div>

    </div>

  );

}