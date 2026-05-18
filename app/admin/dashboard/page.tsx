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

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const [aRes, uRes] = await Promise.all([
        fetch("/api/admin/analytics"),
        fetch("/api/admin/users"),
      ]);

      const aData = await aRes.json();
      const uData = await uRes.json();

      setAnalytics(aData);
      setUsers(uData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleUser(userId: string) {
    await fetch("/api/admin/users/toggle", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    fetchAll();
  }

  if (loading || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Overview + User Management
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
          title="Revenue"
          value={`KSH ${(analytics.totalRevenue ?? 0).toLocaleString()}`}
          icon="💰"
          color="from-yellow-500 to-orange-500"
        />

        <StatsCard
          title="Low Stock"
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

      {/* USER MANAGEMENT SECTION */}
      <div className="bg-white rounded-2xl shadow border p-6">

        <h2 className="text-xl font-bold text-gray-900 mb-5">
          User Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-600 text-sm">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">

                  <td className="py-4 font-medium text-gray-900">
                    {user.name}
                  </td>

                  <td className="text-gray-600">
                    {user.email}
                  </td>

                  <td>
                    <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => toggleUser(user._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                    >
                      Toggle
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}