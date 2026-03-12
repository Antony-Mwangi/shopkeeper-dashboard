"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Package, User, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-gray-200 p-6 hidden md:block">

        <h1 className="text-xl font-bold mb-8">ShopFlow</h1>

        <nav className="space-y-3">

          <Link
            href="/dashboard"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <User size={18} />
            Profile
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Package size={18} />
            Products
          </Link>

          <Link
            href="/dashboard/sales"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Package size={18} />
            Sales
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Settings size={18} />
            Settings
          </Link>

          <Link
            href="/logout"
            className="flex items-center gap-2 p-2 hover:bg-red-100 rounded"
          >
            <LogOut size={18} />
            Logout
          </Link>

        </nav>
      </aside>


      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">

        {children}

      </main>

    </div>
  );
}