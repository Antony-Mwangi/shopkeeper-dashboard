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
        const res = await fetch("/api/auth/me", { credentials: "include" });
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

    await fetch("/api/user/update", { method: "PUT", body: formData });
    window.location.reload();
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (unauthorized)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Link href="/login" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md">
          Login First
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gray-50 text-slate-900">

      {/* SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 z-20 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-100 relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded font-bold">
              S
            </div>
            {sidebarOpen && <span className="font-extrabold text-xl text-slate-800 tracking-tight">ShopFlow</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-5 bg-white border border-gray-300 rounded-full p-1 shadow-sm hover:bg-gray-50 text-slate-600"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 text-slate-700 font-medium">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">
            <User size={20} /> {sidebarOpen && "Profile"}
          </Link>
          <Link href="/dashboard/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">
            <Package size={20} /> {sidebarOpen && "Products"}
          </Link>
          <Link href="/dashboard/sales" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">
            <Package size={20} /> {sidebarOpen && "Sales"}
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">
            <Settings size={20} /> {sidebarOpen && "Settings"}
          </Link>
          <Link href="/logout" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-700 mt-4">
            <LogOut size={20} /> {sidebarOpen && "Logout"}
          </Link>
        </nav>

        {sidebarOpen && user && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <img src={user.profileImage || "/default-avatar.png"} className="w-10 h-10 rounded-full border border-gray-300 object-cover" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed lg:hidden inset-y-0 left-0 bg-white w-72 shadow-2xl z-50 transform transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h1 className="font-extrabold text-xl text-blue-700">ShopFlow</h1>
          <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-500"><X /></button>
        </div>
        <nav className="p-4 space-y-2 text-slate-700 font-medium">
          <Link href="/dashboard" className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50">
            <User size={22} /> Profile
          </Link>
          <Link href="/dashboard/products" className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50">
            <Package size={22} /> Products
          </Link>
          <Link href="/dashboard/sales" className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50">
            <Package size={22} /> Sales
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50">
            <Settings size={22} /> Settings
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-10">
          <button onClick={() => setMobileSidebarOpen(true)} className="text-slate-800"><Menu /></button>
          <h2 className="ml-4 font-bold text-slate-800">Dashboard</h2>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10">

            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Edit Profile</h2>

            <div className="flex flex-col md:flex-row items-center gap-8 mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <img 
                src={user?.profileImage || "/default-avatar.png"} 
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-md" 
              />
              <div className="text-center md:text-left">
                <p className="text-xl font-bold text-slate-900">{user?.name}</p>
                <p className="text-slate-600 font-medium">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={updateProfile} className="space-y-8">

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border-2 border-gray-200 rounded-xl p-4 text-slate-900 bg-white placeholder-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Profile Image</label>
                <input
                  type="file"
                  onChange={(e: any) => setImage(e.target.files[0])}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-slate-600 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-200 w-full md:w-auto active:scale-95"
              >
                Save Changes
              </button>

            </form>

          </div>
        </main>
      </div>
    </div>
  );
}