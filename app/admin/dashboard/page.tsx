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
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    activeUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        const data = await res.json();

        setAnalytics({
          totalUsers: data?.totalUsers ?? 0,
          totalProducts: data?.totalProducts ?? 0,
          totalSales: data?.totalSales ?? 0,
          totalRevenue: data?.totalRevenue ?? 0,
          lowStockProducts: data?.lowStockProducts ?? 0,
          activeUsers: data?.activeUsers ?? 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Platform analytics and system overview
        </p>
      </div>

      {/* STATS */}
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
          value={`KSH ${(analytics.totalRevenue ?? 0).toLocaleString()}`}
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

      {/* OPTIONAL SECTIONS LEFT AS-IS */}
    </div>
  );
}