import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import {
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import { login } from "../api/authApi";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const telegramLogin = async () => {
      try {
        const params = retrieveLaunchParams();

        console.log("Launch Params:", params);

        const initDataRaw = params.initDataRaw;

        if (!initDataRaw) {
          throw new Error(
            "Telegram authentication data not found"
          );
        }

        await login(initDataRaw);

        await Promise.race([
          refreshUser(),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(
                new Error("User fetch timeout")
              ),
              10000
            )
          )
        ]);

        navigate("/dashboard");
      } catch (error) {
        console.error(
          "Telegram Login Error:",
          error
        );

        setError(
          error.message || "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

    telegramLogin();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 shadow-lg">
            <ShieldCheck
              size={40}
              className="text-white"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Telegram LMS
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Secure login using your Telegram account
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 flex flex-col items-center">

            <Loader2
              size={40}
              className="animate-spin text-blue-600"
            />

            <p className="mt-5 text-center text-slate-600">
              Connecting to Telegram...
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Please wait a moment.
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex items-center gap-3">

              <AlertCircle
                className="text-red-500"
                size={24}
              />

              <h2 className="font-semibold text-red-700">
                Authentication Failed
              </h2>

            </div>

            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        )}

      </div>

    </div>
  );
}