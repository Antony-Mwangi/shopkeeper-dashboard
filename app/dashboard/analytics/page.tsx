// "use client";

// import { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// export default function AnalyticsPage() {
//   const [data, setData] = useState<any>(null);

//   const fetchAnalytics = async () => {
//     const res = await fetch("/api/analytics");
//     const json = await res.json();
//     setData(json);
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <p className="text-black animate-pulse text-sm tracking-wide">
//           Loading analytics...
//         </p>
//       </div>
//     );
//   }

//   /* FORMAT DATA */
//   const revenueChart = Object.entries(data.revenueByDate).map(
//     ([date, value]) => ({
//       date,
//       revenue: value,
//     })
//   );

//   const productChart = Object.entries(data.productStats).map(
//     ([name, qty]) => ({
//       name,
//       quantity: qty,
//     })
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 px-6 md:px-10 py-10 space-y-10">

//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto flex flex-col gap-2">
//         <h1 className="text-2xl font-bold text-black tracking-tight">
//           Analytics Dashboard
//         </h1>
//         <p className="text-sm text-slate-500">
//           Monitor revenue, sales activity, and product performance.
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
//         <Stat title="Total Revenue" value={`Ksh ${data.totalRevenue}`} />
//         <Stat title="Total Sales" value={data.totalSales} />
//         <Stat title="Products" value={data.totalProducts} />
//         <Stat title="Low Stock" value={data.lowStock} />
//       </div>

//       {/* CHARTS */}
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

//         {/* REVENUE */}
//         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-sm font-semibold text-black">
//               Revenue Over Time
//             </h2>
//             <span className="text-xs text-slate-400">Last 30 days</span>
//           </div>

//           <ResponsiveContainer width="100%" height={260}>
//             <LineChart data={revenueChart}>
//               <XAxis dataKey="date" stroke="#888" fontSize={10} />
//               <YAxis stroke="#888" fontSize={10} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="revenue"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* PRODUCT */}
//         <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-sm font-semibold text-black">
//               Sales per Product
//             </h2>
//             <span className="text-xs text-slate-400">Top items</span>
//           </div>

//           <ResponsiveContainer width="100%" height={260}>
//             <BarChart data={productChart}>
//               <XAxis dataKey="name" stroke="#888" fontSize={10} />
//               <YAxis stroke="#888" fontSize={10} />
//               <Tooltip />
//               <Bar dataKey="quantity" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       </div>

//     </div>
//   );
// }

// /* STAT CARD */
// function Stat({ title, value }: any) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
//       <p className="text-xs font-medium text-slate-500 tracking-wide">
//         {title}
//       </p>
//       <h2 className="text-2xl font-bold text-black mt-2">
//         {value}
//       </h2>
//     </div>
//   );
// }

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
  const [range, setRange] = useState("month");

  const fetchAnalytics = async () => {
    const res = await fetch(`/api/analytics?range=${range}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-black animate-pulse">Loading analytics...</p>
      </div>
    );
  }

  const revenueChart = Object.entries(data.revenueByDate).map(
    ([date, value]) => ({ date, revenue: value })
  );

  const productChart = Object.entries(data.productStats).map(
    ([name, qty]) => ({ name, quantity: qty })
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-black">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Business insights & performance
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2">
          {["today", "week", "month"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded text-sm ${
                range === r
                  ? "bg-black text-white"
                  : "bg-white border text-black"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">

        <Stat title="Revenue" value={`Ksh${data.totalRevenue}`} />
        <Stat title="Profit" value={`Ksh${data.totalProfit}`} />
        <Stat title="Sales" value={data.totalSales} />

        <Stat
          title="Trend"
          value={`${data.revenueTrend.toFixed(1)}%`}
          trend={data.revenueTrend}
        />

      </div>

      {/* ALERTS */}
      {data.lowStockItems.length > 0 && (
        <div className="max-w-7xl mx-auto bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="font-bold text-red-600 mb-2">
            ⚠ Low Stock Alerts
          </p>

          <ul className="text-sm text-red-500 space-y-1">
            {data.lowStockItems.map((p: any) => (
              <li key={p._id}>
                {p.name} — only {p.quantity} left
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">

        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueChart}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="revenue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Product Performance">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ title, value, trend }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border shadow-sm">
      <p className="text-xs text-slate-500">{title}</p>

      <h2 className="text-2xl font-bold text-black mt-2">
        {value}
      </h2>

      {trend !== undefined && (
        <p
          className={`text-xs mt-1 ${
            trend >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend >= 0 ? "▲" : "▼"} {trend.toFixed(1)}%
        </p>
      )}
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-black mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}