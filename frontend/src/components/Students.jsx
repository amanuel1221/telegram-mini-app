import { useEffect, useState } from "react";

import {
  User,
  Shield,
  Crown,
  UserCheck,
  LoaderCircle,
} from "lucide-react";

import {
  getAllUsers,
  promoteUser,
} from "../api/authApi";

export default function Students() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {

      const data = await getAllUsers();

      setUsers(data.users);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handlePromote = async (id) => {

    try {

      await promoteUser(id);

      setUsers((previous) =>
        previous.map((user) =>
          user._id === id
            ? {
                ...user,
                role: "teacher",
              }
            : user
        )
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to promote user."
      );

    }

  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">

        <LoaderCircle
          className="animate-spin text-blue-600"
          size={40}
        />

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-50 px-4 py-6">

      <div className="mx-auto max-w-xl">

        <h1 className="mb-6 text-3xl font-bold">
          LMS Members
        </h1>

        <div className="space-y-4">

          {users.map((user) => (

            <div
              key={user._id}
              className="rounded-3xl bg-white p-5 shadow"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">

                    <User />

                  </div>

                  <div>

                    <h2 className="font-bold">

                      {user.firstName} {user.lastName}

                    </h2>

                    <p className="text-sm text-slate-500">

                      @{user.username || "unknown"}

                    </p>

                  </div>

                </div>

                {user.role === "teacher" ? (

                  <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">

                    <Crown size={16} />

                    Teacher

                  </span>

                ) : (

                  <button
                    onClick={() =>
                      handlePromote(user._id)
                    }
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
                  >

                    <Shield size={16} />

                    Promote

                  </button>

                )}

              </div>

              <div className="mt-4 flex items-center gap-3">

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    user.isMember
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.isMember
                    ? "Group Member"
                    : "Not Joined"}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">

                  {user.role}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}