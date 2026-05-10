"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: params.token,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Reset failed");
      }

      setMessage(data.message);

      // optional redirect after success
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">

        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Reset Password
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Enter your new password below
        </p>

        {/* SUCCESS */}
        {message && (
          <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-lg text-sm border border-green-200">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4 mt-6">

          <input
            type="password"
            required
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full border border-slate-300 rounded-lg p-3 text-black
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />

          <button
            disabled={loading}
            className={`
              w-full py-3 rounded-lg text-white font-medium transition
              ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  );
}