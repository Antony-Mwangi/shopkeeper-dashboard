

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
//         <p className="text-black animate-pulse text-sm">
//           Loading analytics...
//         </p>
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
//     <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-8 space-y-10">

//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-black">
//             Analytics Dashboard
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Business insights & performance tracking
//           </p>
//         </div>

//         {/* FILTERS */}
//         <div className="flex gap-2 overflow-x-auto">
//           {["today", "week", "month"].map((r) => (
//             <button
//               key={r}
//               onClick={() => setRange(r)}
//               className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap border transition ${
//                 range === r
//                   ? "bg-black text-white border-black"
//                   : "bg-white text-black border-slate-300 hover:bg-slate-100"
//               }`}
//             >
//               {r}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

//         <Stat title="Revenue" value={`Ksh ${data.totalRevenue}`} />
//         {/* <Stat title="Profit" value={`Ksh ${data.totalProfit}`} /> */}
//         <Stat title="Sales" value={data.totalSales} />
//         <Stat
//           title="Trend"
//           value={`${data.revenueTrend.toFixed(1)}%`}
//           trend={data.revenueTrend}
//         />

//       </div>

//       {/* AI INSIGHT */}
//       <div className="max-w-7xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-5">
//         <p className="text-xs font-bold text-blue-600 uppercase">
//           AI Insight
//         </p>
//         <h2 className="text-black font-semibold mt-2 text-base sm:text-lg">
//           {data.insight || "Sales performance is stable this period."}
//         </h2>
//       </div>

//       {/* LOW STOCK ALERTS */}
//       {data.lowStockItems?.length > 0 && (
//         <div className="max-w-7xl mx-auto bg-red-50 border border-red-200 p-4 rounded-xl">
//           <p className="font-bold text-red-600 mb-2">
//             ⚠ Low Stock Alerts
//           </p>

//           <ul className="text-sm text-red-600 space-y-1">
//             {data.lowStockItems.map((p: any) => (
//               <li key={p._id}>
//                 {p.name} — only {p.quantity} left
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* CHARTS */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

//         <ChartCard title="Revenue Trend">
//           <ResponsiveContainer width="100%" height={280}>
//             <LineChart data={revenueChart}>
//               <XAxis dataKey="date" stroke="#000" fontSize={12} />
//               <YAxis stroke="#000" fontSize={12} />
//               <Tooltip />
//               <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Product Performance">
//           <ResponsiveContainer width="100%" height={280}>
//             <BarChart data={productChart}>
//               <XAxis dataKey="name" stroke="#000" fontSize={12} />
//               <YAxis stroke="#000" fontSize={12} />
//               <Tooltip />
//               <Bar dataKey="quantity" fill="#000" radius={[6, 6, 0, 0]} />
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
//     <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
//       <p className="text-xs text-slate-500">{title}</p>

//       <h2 className="text-xl sm:text-2xl font-bold text-black mt-2">
//         {value}
//       </h2>

//       {trend !== undefined && (
//         <p
//           className={`text-xs mt-1 font-medium ${
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
//     <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition">
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
  CartesianGrid,
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
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-black rounded-full animate-spin" />
          <p className="text-slate-500 font-medium text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const revenueChart = Object.entries(data.revenueByDate).map(([date, value]) => ({
    date,
    revenue: value,
  }));

  const productChart = Object.entries(data.productStats).map(([name, qty]) => ({
    name,
    quantity: qty,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
              Analytics
            </h1>
            <p className="text-slate-500 font-medium">
              Real-time performance metrics and stock monitoring.
            </p>
          </div>

          {/* RESPONSIVE FILTERS */}
          <div className="inline-flex p-1 bg-slate-200/50 rounded-xl backdrop-blur-sm">
            {["today", "week", "month"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                  range === r
                    ? "bg-white text-black shadow-sm"
                    : "text-slate-600 hover:text-black hover:bg-white/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </header>

        {/* TOP STATS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Stat 
            title="Total Revenue" 
            value={`Ksh ${data.totalRevenue.toLocaleString()}`} 
            subtitle="Gross earnings"
          />
          <Stat 
            title="Units Sold" 
            value={data.totalSales.toLocaleString()} 
            subtitle="Successful orders"
          />
          <Stat
            title="Revenue Trend"
            value={`${data.revenueTrend > 0 ? "+" : ""}${data.revenueTrend.toFixed(1)}%`}
            trend={data.revenueTrend}
            subtitle="Vs. previous period"
          />
        </section>

        {/* ALERTS & INSIGHTS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                AI Insight
              </p>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 leading-relaxed">
              "{data.insight || "Your sales performance is showing steady growth this period."}"
            </h2>
          </div>

          {data.lowStockItems?.length > 0 && (
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">⚠️</span>
                <p className="font-bold text-red-700">Low Stock Alerts</p>
              </div>
              <ul className="space-y-3">
                {data.lowStockItems.slice(0, 3).map((p: any) => (
                  <li key={p._id} className="flex justify-between items-center text-sm">
                    <span className="text-red-900 font-medium">{p.name}</span>
                    <span className="bg-red-200 text-red-800 px-2 py-0.5 rounded-md font-bold">
                      {p.quantity} left
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CHARTS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
          <ChartCard title="Revenue Growth Over Time">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#000" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#000" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Performing Products">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={productChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="quantity" fill="#0f172a" radius={[6, 6, 2, 2]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ title, value, trend, subtitle }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        {trend !== undefined && (
          <span className={`flex items-center px-2 py-1 rounded-lg text-xs font-bold ${
            trend >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {trend >= 0 ? "↗" : "↘"} {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <h2 className="text-3xl font-black text-black tracking-tight">{value}</h2>
      </div>
      <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-colors">
      <h3 className="text-lg font-bold text-black mb-8 flex items-center gap-2">
        <span className="w-1 h-5 bg-black rounded-full" />
        {title}
      </h3>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}