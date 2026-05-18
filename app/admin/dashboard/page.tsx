"use client";

import { useEffect, useState } from "react";

 import StatsCard from "@/app/admin/components/StatsCard";

type Analytics = {
  totalUsers: number;
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  lowStockProducts: number;
  activeUsers: number;
};

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");

        const data = await res.json();

        setAnalytics(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Platform analytics and system overview
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatsCard
          title="Total Users"
          value={analytics.totalUsers}
          icon="👥"
          color="from-blue-600 to-blue-700"
        />

        <StatsCard
          title="Total Products"
          value={analytics.totalProducts}
          icon="📦"
          color="from-purple-600 to-purple-700"
        />

        <StatsCard
          title="Total Sales"
          value={analytics.totalSales}
          icon="🛒"
          color="from-green-600 to-green-700"
        />

        <StatsCard
          title="Revenue Generated"
          value={`KSH ${analytics.totalRevenue.toLocaleString()}`}
          icon="💰"
          color="from-yellow-500 to-orange-500"
        />

        <StatsCard
          title="Low Stock Reports"
          value={analytics.lowStockProducts}
          icon="⚠️"
          color="from-red-500 to-red-700"
        />

        <StatsCard
          title="Active Users"
          value={analytics.activeUsers}
          icon="📈"
          color="from-cyan-500 to-cyan-700"
        />
      </div>

      {/* ANALYTICS SECTION */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium text-gray-900">
                  New user registered
                </p>
                <p className="text-sm text-gray-500">
                  User account created successfully
                </p>
              </div>

              <span className="text-xs text-gray-400">
                Just now
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium text-gray-900">
                  Product stock updated
                </p>
                <p className="text-sm text-gray-500">
                  Inventory synchronized
                </p>
              </div>

              <span className="text-xs text-gray-400">
                5 mins ago
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  New sale recorded
                </p>
                <p className="text-sm text-gray-500">
                  Transaction completed successfully
                </p>
              </div>

              <span className="text-xs text-gray-400">
                15 mins ago
              </span>
            </div>

          </div>
        </div>

        {/* GROWTH METRICS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Growth Metrics
          </h2>

          <div className="space-y-5">

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  User Growth
                </span>

                <span className="text-sm font-bold text-green-600">
                  +18%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full w-[70%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Sales Growth
                </span>

                <span className="text-sm font-bold text-blue-600">
                  +24%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full w-[82%]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Revenue Growth
                </span>

                <span className="text-sm font-bold text-purple-600">
                  +31%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full w-[88%]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}