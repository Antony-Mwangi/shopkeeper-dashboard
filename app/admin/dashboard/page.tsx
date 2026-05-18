"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Users,
  UserCheck,
  UserX,
  Shield,
  ArrowRight,
  AlertTriangle,
  Activity,
} from "lucide-react";

type Analytics = {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
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

      setAnalytics({
        totalUsers: data.totalUsers || 0,
        activeUsers: data.activeUsers || 0,
        suspendedUsers: data.suspendedUsers || 0,
      });
    } catch (err) {
      console.error("Analytics error:", err);
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
          Admin Control Panel
        </h1>
        <p className="text-slate-600 mt-2">
          Manage user accounts, access, and platform safety
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        <Card
          icon={<Users className="w-6 h-6" />}
          title="Total Users"
          value={analytics.totalUsers}
          color="bg-blue-600"
          onClick={() => router.push("/admin/users")}
        />

        <Card
          icon={<UserCheck className="w-6 h-6" />}
          title="Active Users"
          value={analytics.activeUsers}
          color="bg-green-600"
          onClick={() => router.push("/admin/users?filter=active")}
        />

        <Card
          icon={<UserX className="w-6 h-6" />}
          title="Suspended Users"
          value={analytics.suspendedUsers}
          color="bg-red-600"
          onClick={() => router.push("/admin/users?filter=suspended")}
        />

        <Card
          icon={<Shield className="w-6 h-6" />}
          title="Security Overview"
          value="Protected"
          color="bg-purple-600"
        />

        <Card
          icon={<AlertTriangle className="w-6 h-6" />}
          title="Risk Alerts"
          value="0"
          color="bg-yellow-500"
        />

        <Card
          icon={<Activity className="w-6 h-6" />}
          title="System Activity"
          value="Live"
          color="bg-cyan-600"
        />
      </div>

      {/* ACTIONS */}
      <div className="bg-white rounded-2xl shadow border p-6">

        <h2 className="text-xl font-bold text-slate-900 mb-6">
          User Management
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <ActionCard
            title="Manage Users"
            desc="Search, suspend, activate, delete accounts"
            onClick={() => router.push("/admin/users")}
          />

          <ActionCard
            title="Suspended Accounts"
            desc="View and restore suspended users"
            onClick={() => router.push("/admin/users?filter=suspended")}
          />

          <ActionCard
            title="Security Logs"
            desc="Track login attempts & account actions"
            onClick={() => router.push("/admin/logs")}
          />

        </div>
      </div>
    </div>
  );
}

/* ================= CARD ================= */
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
      className="cursor-pointer bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
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