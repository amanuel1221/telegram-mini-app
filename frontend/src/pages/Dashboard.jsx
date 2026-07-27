import useAuth from "../hooks/useAuth";
import {
  User,
  ShieldCheck,
  Hash,
  Users,
  LogOut,
  FileUp,
  BookOpen,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const {
    user,
    logout,
  } = useAuth();


  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">

      <div className="mx-auto max-w-lg">


        {/* Header */}
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-xl">

          <p className="text-sm opacity-80">
            Telegram LMS
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Welcome,
            <br />
            {user?.firstName}
          </h1>


          <div className="mt-5 flex items-center gap-3">

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              {user?.role}
            </span>


            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                user?.isMember
                  ? "bg-green-400/30"
                  : "bg-red-400/30"
              }`}
            >
              {user?.isMember
                ? "Member"
                : "Not Member"}
            </span>

          </div>

        </div>



        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-6 shadow-md">


          <h2 className="mb-5 text-lg font-bold text-slate-800">
            Profile Information
          </h2>



          <div className="space-y-5">


            <InfoItem
              icon={<User />}
              title="Username"
              value={
                user?.username
                  ? `@${user.username}`
                  : "N/A"
              }
            />


            <InfoItem
              icon={<ShieldCheck />}
              title="Role"
              value={user?.role}
            />


            <InfoItem
              icon={<Hash />}
              title="Telegram ID"
              value={user?.telegramId}
            />


            <InfoItem
              icon={<Users />}
              title="Group Status"
              value={
                user?.isMember
                  ? "Active Member"
                  : "Not Joined"
              }
            />


          </div>


        </div>



        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">


          {user?.role === "teacher" && (

            <DashboardButton
              icon={<FileUp />}
              title="Upload PDF"
            />

          )}



          <DashboardButton
            icon={<BookOpen />}
            title="Browse PDFs"
          />


          <DashboardButton
            icon={<FileText />}
            title="My Files"
          />


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

          <LogOut size={20}/>

          Logout

        </button>


      </div>

    </div>
  );
}





function InfoItem({
  icon,
  title,
  value,
}) {

  return (

    <div className="flex items-center gap-4">

      <div className="
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      bg-blue-100
      text-blue-600
      ">
        {icon}
      </div>


      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <p className="font-semibold text-slate-800">
          {value || "N/A"}
        </p>

      </div>


    </div>

  );

}





function DashboardButton({
  icon,
  title,
}) {

  return (

    <button
      className="
      flex
      flex-col
      items-center
      justify-center
      gap-3
      rounded-3xl
      bg-white
      p-5
      shadow-md
      transition
      hover:-translate-y-1
      hover:shadow-lg
      active:scale-95
      "
    >

      <div className="
      rounded-2xl
      bg-blue-100
      p-3
      text-blue-600
      ">
        {icon}
      </div>


      <span className="text-sm font-semibold text-slate-700">
        {title}
      </span>


    </button>

  );

}