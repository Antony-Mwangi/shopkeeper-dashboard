"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* MAIN */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">

        {/* BACK BUTTON */}
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* LOGIN CARD */}
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2 text-sm">
            Sign in to manage your shop
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* REGISTER */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>

      <Footer />

    </div>
  );
}