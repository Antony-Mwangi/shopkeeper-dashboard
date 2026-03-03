"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface DashboardData {
  user: User;
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
        const res = await fetch("/api/dashboard");
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

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {data?.user.name}!</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-50 p-6 rounded-xl shadow">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">Total Products</h2>
          <p className="text-2xl font-bold">{data?.totalProducts}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">Total Stock Quantity</h2>
          <p className="text-2xl font-bold">{data?.totalStockQuantity}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl shadow">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">Sales Today</h2>
          <p className="text-2xl font-bold">${data?.salesToday.toFixed(2)}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-purple-50 p-6 rounded-xl shadow">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">Sales This Month</h2>
          <p className="text-2xl font-bold">${data?.salesMonth.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">Sales This Year</h2>
          <p className="text-2xl font-bold">${data?.salesYear.toFixed(2)}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <div className="bg-white p-6 rounded-xl shadow border border-slate-100 max-w-md">
          <p><span className="font-semibold">Name:</span> {data?.user.name}</p>
          <p><span className="font-semibold">Email:</span> {data?.user.email}</p>
        </div>
      </section>
    </div>
  );
}