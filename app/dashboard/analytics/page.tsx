

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
//   const [range, setRange] = useState("month");

//   const fetchAnalytics = async () => {
//     const res = await fetch(`/api/analytics?range=${range}`);
//     const json = await res.json();
//     setData(json);
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, [range]);

//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <p className="text-black animate-pulse">Loading analytics...</p>
//       </div>
//     );
//   }

//   const revenueChart = Object.entries(data.revenueByDate).map(
//     ([date, value]) => ({ date, revenue: value })
//   );

//   const productChart = Object.entries(data.productStats).map(
//     ([name, qty]) => ({ name, quantity: qty })
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-10">

//       {/* HEADER */}
//       <div className="flex justify-between items-center max-w-7xl mx-auto">
//         <div>
//           <h1 className="text-2xl font-bold text-black">
//             Analytics Dashboard
//           </h1>
//           <p className="text-sm text-slate-500">
//             Business insights & performance
//           </p>
//         </div>

//         {/* FILTERS */}
//         <div className="flex gap-2">
//           {["today", "week", "month"].map((r) => (
//             <button
//               key={r}
//               onClick={() => setRange(r)}
//               className={`px-4 py-2 rounded text-sm ${
//                 range === r
//                   ? "bg-black text-white"
//                   : "bg-white border text-black"
//               }`}
//             >
//               {r}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">

//         <Stat title="Revenue" value={`Ksh${data.totalRevenue}`} />
//         <Stat title="Profit" value={`Ksh${data.totalProfit}`} />
//         <Stat title="Sales" value={data.totalSales} />

//         <Stat
//           title="Trend"
//           value={`${data.revenueTrend.toFixed(1)}%`}
//           trend={data.revenueTrend}
//         />

//       </div>

//       {/* ALERTS */}
//       {data.lowStockItems.length > 0 && (
//         <div className="max-w-7xl mx-auto bg-red-50 border border-red-200 p-4 rounded-xl">
//           <p className="font-bold text-red-600 mb-2">
//             ⚠ Low Stock Alerts
//           </p>

//           <ul className="text-sm text-red-500 space-y-1">
//             {data.lowStockItems.map((p: any) => (
//               <li key={p._id}>
//                 {p.name} — only {p.quantity} left
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* CHARTS */}
//       <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">

//         <ChartCard title="Revenue Trend">
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={revenueChart}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line dataKey="revenue" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Product Performance">
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={productChart}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="quantity" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function Stat({ title, value, trend }: any) {
//   return (
//     <div className="bg-white p-5 rounded-2xl border shadow-sm">
//       <p className="text-xs text-slate-500">{title}</p>

//       <h2 className="text-2xl font-bold text-black mt-2">
//         {value}
//       </h2>

//       {trend !== undefined && (
//         <p
//           className={`text-xs mt-1 ${
//             trend >= 0 ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {trend >= 0 ? "▲" : "▼"} {trend.toFixed(1)}%
//         </p>
//       )}
//     </div>
//   );
// }

// function ChartCard({ title, children }: any) {
//   return (
//     <div className="bg-white border rounded-2xl p-6 shadow-sm">
//       <h2 className="text-sm font-semibold text-black mb-4">
//         {title}
//       </h2>
//       {children}
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
        <p className="text-black animate-pulse text-sm">
          Loading analytics...
        </p>
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
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-8 space-y-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Business insights & performance tracking
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 overflow-x-auto">
          {["today", "week", "month"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap border transition ${
                range === r
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-slate-300 hover:bg-slate-100"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        <Stat title="Revenue" value={`Ksh ${data.totalRevenue}`} />
        <Stat title="Profit" value={`Ksh ${data.totalProfit}`} />
        <Stat title="Sales" value={data.totalSales} />
        <Stat
          title="Trend"
          value={`${data.revenueTrend.toFixed(1)}%`}
          trend={data.revenueTrend}
        />

      </div>

      {/* AI INSIGHT */}
      <div className="max-w-7xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-5">
        <p className="text-xs font-bold text-blue-600 uppercase">
          AI Insight
        </p>
        <h2 className="text-black font-semibold mt-2 text-base sm:text-lg">
          {data.insight || "Sales performance is stable this period."}
        </h2>
      </div>

      {/* LOW STOCK ALERTS */}
      {data.lowStockItems?.length > 0 && (
        <div className="max-w-7xl mx-auto bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="font-bold text-red-600 mb-2">
            ⚠ Low Stock Alerts
          </p>

          <ul className="text-sm text-red-600 space-y-1">
            {data.lowStockItems.map((p: any) => (
              <li key={p._id}>
                {p.name} — only {p.quantity} left
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CHARTS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueChart}>
              <XAxis dataKey="date" stroke="#000" fontSize={12} />
              <YAxis stroke="#000" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Product Performance">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productChart}>
              <XAxis dataKey="name" stroke="#000" fontSize={12} />
              <YAxis stroke="#000" fontSize={12} />
              <Tooltip />
              <Bar dataKey="quantity" fill="#000" radius={[6, 6, 0, 0]} />
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
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-xs text-slate-500">{title}</p>

      <h2 className="text-xl sm:text-2xl font-bold text-black mt-2">
        {value}
      </h2>

      {trend !== undefined && (
        <p
          className={`text-xs mt-1 font-medium ${
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
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition">
      <h2 className="text-sm font-semibold text-black mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}