"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-black">
          Forgot Password
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Enter your email to receive a reset link
        </p>

        {message && (
          <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          <input
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 text-black"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Send Reset Link
          </button>

        </form>
      </div>
    </div>
  );
}