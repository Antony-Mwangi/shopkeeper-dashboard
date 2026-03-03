"use client";

import { useEffect, useState } from "react";
import { Loader2, User } from "lucide-react";

interface DashboardData {
  user: {
    name: string;
    email: string;
  };
  totalProducts: number;
  totalStockQuantity: number;
  salesToday: number;
  salesMonth: number;
  salesYear: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          method: "GET",
          credentials: "include", // important to send httpOnly cookie
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed to fetch dashboard");
        setData(json);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <a href="/login" className="text-blue-600 font-bold hover:underline">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Welcome Header */}
      <div className="flex items-center gap-4 mb-8">
        <User size={48} className="text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {data?.user.name}!</h1>
          <p className="text-slate-600 mt-1">{data?.user.email}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Total Products</h2>
          <p className="text-2xl font-bold text-slate-900">{data?.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Stock Quantity</h2>
          <p className="text-2xl font-bold text-slate-900">{data?.totalStockQuantity}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Sales Today</h2>
          <p className="text-2xl font-bold text-slate-900">${data?.salesToday.toFixed(2)}</p>
        </div>
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Sales This Month</h2>
          <p className="text-2xl font-bold text-slate-900">${data?.salesMonth.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Sales This Year</h2>
          <p className="text-2xl font-bold text-slate-900">${data?.salesYear.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}