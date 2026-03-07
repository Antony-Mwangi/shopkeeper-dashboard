
// "use client";

// import { useEffect, useState } from "react";

// type UserProfile = {
//   _id: string;
//   name: string;
//   email: string;
//   profileImage?: string;
// };

// export default function DashboardPage() {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [unauthorized, setUnauthorized] = useState(false);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include", 
//         });

//         if (res.status === 401) {
//           setUnauthorized(true);
//           return;
//         }

//         const data: UserProfile = await res.json();
//         setUser(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUser();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-gray-700 text-lg">Loading profile...</p>
//       </div>
//     );

//   if (unauthorized)
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//         <p className="text-gray-700 text-lg mb-4">
//           You are not logged in.
//         </p>
//         <a
//           href="/login"
//           className="text-white bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Go to Login
//         </a>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full space-y-6">
//         <div className="flex flex-col items-center">
//           <img
//             src={user?.profileImage || "/default-avatar.png"}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover mb-4"
//           />
//         </div>

//         <div className="space-y-4 text-gray-700">
//           <div>
//             <label className="font-semibold">Full Name:</label>
//             <p>{user?.name}</p>
//           </div>

//           <div>
//             <label className="font-semibold">Email:</label>
//             <p>{user?.email}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { 
  Menu, X, User, Settings, LogOut, 
  Home, Bell, Search, Calendar, 
  TrendingUp, ShoppingBag, Package,
  ChevronDown
} from "lucide-react";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        const data: UserProfile = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );

  if (unauthorized)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
          <a
            href="/login"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg shadow-blue-200 hover:shadow-xl"
          >
            Sign In
          </a>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="font-bold text-xl text-gray-800">ShopFlow</h1>
            </div>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-4 space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Overview</span>
              </a>
              <a
                href="#profile"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </a>
              <a
                href="#orders"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">Orders</span>
              </a>
              <a
                href="#products"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">Products</span>
              </a>
              <a
                href="#analytics"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Analytics</span>
              </a>
            </nav>

            <div className="px-4 mt-8">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Settings
              </p>
              <nav className="mt-2 space-y-1">
                <a
                  href="#settings"
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </a>
                <a
                  href="/logout"
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </a>
              </nav>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={user?.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2 w-96">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none focus:outline-none ml-3 text-gray-600 placeholder-gray-400 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">March 7, 2026</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500">Here's what's happening with your store today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12.5%</span>
              </div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800">$12,345</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+5.2%</span>
              </div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">156</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+18.3%</span>
              </div>
              <p className="text-sm text-gray-500">New Customers</p>
              <p className="text-2xl font-bold text-gray-800">45</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">-2.1%</span>
              </div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-800">3.24%</p>
            </div>
          </div>

          {/* Profile Section */}
          <div
            id="profile"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={user?.profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl object-cover ring-4 ring-blue-50"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
                  <User className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Member since</p>
                    <p className="font-semibold text-gray-700">January 2026</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Account status</p>
                    <p className="font-semibold text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}