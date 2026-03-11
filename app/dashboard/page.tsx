"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.status === 401) {
          setUnauthorized(true);
          return;
        }

        const data = await res.json();
        setUser(data);
        setName(data.name);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    await fetch("/api/user/update", {
      method: "PUT",
      body: formData,
    });

    window.location.reload();
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (unauthorized)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login First
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* --- SIDEBAR --- */}
      <aside
        className={`hidden lg:flex flex-col bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
              S
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg text-gray-800">ShopFlow</span>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-5 bg-white border rounded-full p-1 shadow"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-gray-700">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
          >
            <User size={20} />
            {sidebarOpen && "Profile"}
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
          >
            <Package size={20} />
            {sidebarOpen && "Products"}
          </Link>

          <Link
            href="/dashboard/sales"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
          >
            <Package size={20} />
            {sidebarOpen && "Sales"}
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50"
          >
            <Settings size={20} />
            {sidebarOpen && "Settings"}
          </Link>

          <Link
            href="/logout"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600"
          >
            <LogOut size={20} />
            {sidebarOpen && "Logout"}
          </Link>

        </nav>

        {sidebarOpen && user && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
                alt="profile"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* --- MOBILE SIDEBAR --- */}
      <aside
        className={`fixed lg:hidden inset-y-0 left-0 bg-white w-64 shadow-lg z-50 transform transition-transform ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="font-bold text-lg">ShopFlow</h1>
          <button onClick={() => setMobileSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-2 text-gray-700">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50">
            <User size={20} /> Profile
          </Link>
          <Link href="/dashboard/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50">
            <Package size={20} /> Products
          </Link>
          <Link href="/dashboard/sales" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50">
            <Package size={20} /> Sales
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* --- HEADER --- */}
        <header className="lg:hidden h-16 bg-white border-b flex items-center px-6">
          <button onClick={() => setMobileSidebarOpen(true)}>
            <Menu />
          </button>
          <h2 className="ml-4 font-semibold text-gray-700">Dashboard</h2>
        </header>

        {/* --- PROFILE CONTENT --- */}
        <main className="flex-1 p-8 overflow-y-auto">

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <img
                src={user?.profileImage || "/default-avatar.png"}
                className="w-24 h-24 rounded-xl object-cover border"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={updateProfile} className="space-y-6">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image</label>
                <input
                  type="file"
                  onChange={(e: any) => setImage(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
              >
                Update Profile
              </button>

            </form>

          </div>

        </main>

      </div>
    </div>
  );
}