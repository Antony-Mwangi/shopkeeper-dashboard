"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  const fetchAnalytics = async () => {
    const res = await fetch("/api/analytics");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-black animate-pulse text-sm tracking-wide">
          Loading analytics...
        </p>
      </div>
    );
  }

  /* FORMAT DATA */
  const revenueChart = Object.entries(data.revenueByDate).map(
    ([date, value]) => ({
      date,
      revenue: value,
    })
  );

  const productChart = Object.entries(data.productStats).map(
    ([name, qty]) => ({
      name,
      quantity: qty,
    })
  );

  return (
    <div className="min-h-screen bg-slate-50 px-6 md:px-10 py-10 space-y-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-black tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Monitor revenue, sales activity, and product performance.
        </p>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat title="Total Revenue" value={`Ksh ${data.totalRevenue}`} />
        <Stat title="Total Sales" value={data.totalSales} />
        <Stat title="Products" value={data.totalProducts} />
        <Stat title="Low Stock" value={data.lowStock} />
      </div>

      {/* CHARTS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

        {/* REVENUE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-black">
              Revenue Over Time
            </h2>
            <span className="text-xs text-slate-400">Last 30 days</span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueChart}>
              <XAxis dataKey="date" stroke="#888" fontSize={10} />
              <YAxis stroke="#888" fontSize={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PRODUCT */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-black">
              Sales per Product
            </h2>
            <span className="text-xs text-slate-400">Top items</span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productChart}>
              <XAxis dataKey="name" stroke="#888" fontSize={10} />
              <YAxis stroke="#888" fontSize={10} />
              <Tooltip />
              <Bar dataKey="quantity" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

/* STAT CARD */
function Stat({ title, value }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-xs font-medium text-slate-500 tracking-wide">
        {title}
      </p>
      <h2 className="text-2xl font-bold text-black mt-2">
        {value}
      </h2>
    </div>
  );
}