"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Login failed"
        );
      }

      router.push("/admin/dashboard");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-black">
          Admin Login
        </h1>

        <p className="text-center text-slate-500 mt-2 text-sm">
          Sign in to access admin dashboard
        </p>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-5 mt-6"
        >
          
          <input
            type="email"
            placeholder="Admin email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-slate-300 rounded-lg p-3 text-black"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border border-slate-300 rounded-lg p-3 text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}