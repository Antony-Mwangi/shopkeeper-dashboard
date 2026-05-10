"use client";

import { useState } from "react";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

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

    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-black">
          Reset Password
        </h1>

        {message && (
          <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4 mt-6">

          <input
            type="password"
            required
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 text-black"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
}