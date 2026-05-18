"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Activity,
  ArrowRight,
} from "lucide-react";

type Analytics = {
  totalUsers: number;
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  lowStockProducts: number;
  activeUsers: number;
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Admin Overview
        </h1>
        <p className="text-slate-600 mt-2">
          Real-time system analytics & performance insights
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        <Card
          icon={<Users className="w-6 h-6" />}
          title="Total Users"
          value={analytics.totalUsers}
          color="bg-blue-600"
          onClick={() => router.push("/admin/users")}
        />

        <Card
          icon={<Package className="w-6 h-6" />}
          title="Total Products"
          value={analytics.totalProducts}
          color="bg-purple-600"
          onClick={() => router.push("/admin/products")}
        />

        <Card
          icon={<ShoppingCart className="w-6 h-6" />}
          title="Total Sales"
          value={analytics.totalSales}
          color="bg-green-600"
        />

        <Card
          icon={<DollarSign className="w-6 h-6" />}
          title="Revenue"
          value={`KSH ${(analytics.totalRevenue ?? 0).toLocaleString()}`}
          color="bg-yellow-500"
        />

        <Card
          icon={<AlertTriangle className="w-6 h-6" />}
          title="Low Stock Alerts"
          value={analytics.lowStockProducts}
          color="bg-red-600"
          onClick={() => router.push("/admin/products?filter=low-stock")}
        />

        <Card
          icon={<Activity className="w-6 h-6" />}
          title="Active Users"
          value={analytics.activeUsers}
          color="bg-cyan-600"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl shadow border p-6">

        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <ActionCard
            title="Manage Users"
            desc="View, search and manage all users"
            onClick={() => router.push("/admin/users")}
          />

          <ActionCard
            title="Products"
            desc="Inventory & stock management"
            onClick={() => router.push("/admin/products")}
          />

          <ActionCard
            title="Sales Analytics"
            desc="View revenue and performance"
            onClick={() => router.push("/admin/sales")}
          />

        </div>
      </div>

    </div>
  );
}

/* ================= KPI CARD ================= */
function Card({
  icon,
  title,
  value,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
  color: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition`}
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl text-white ${color}`}>
          {icon}
        </div>

        {onClick && <ArrowRight className="w-5 h-5 text-slate-400" />}
      </div>

      <div className="mt-5">
        <p className="text-slate-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">
          {value}
        </h3>
      </div>
    </div>
  );
}

/* ================= ACTION CARD ================= */
function ActionCard({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-xl p-5 hover:shadow-md transition bg-slate-50 hover:bg-white"
    >
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{desc}</p>
    </div>
  );
}