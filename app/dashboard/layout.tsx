
// "use client";

// import Link from "next/link";
// import {
//   User,
//   Package,
//   Settings,
//   LogOut,
// } from "lucide-react";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex bg-gray-100">

//       {/* SIDEBAR */}
//       <aside className="w-64 bg-white shadow-lg flex flex-col">

//         <div className="flex items-center justify-center h-16 border-b">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
//               S
//             </div>
//             <span className="font-bold text-lg text-black">
//               ShopFlow
//             </span>
//           </div>
//         </div>

//         <nav className="flex-1 p-4 space-y-2">

//           <Link
//             href="/dashboard"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <User size={20} /> Profile
//           </Link>

//           <Link
//             href="/dashboard/products"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <Package size={20} /> Products
//           </Link>

//           <Link
//             href="/dashboard/sales"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <Package size={20} /> Sales
//           </Link>

//           <Link
//             href="/dashboard/settings"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <Settings size={20} /> Settings
//           </Link>

//           <Link
//             href="/logout"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-black font-medium"
//           >
//             <LogOut size={20} /> Logout
//           </Link>

//         </nav>

//       </aside>

//       {/* PAGE CONTENT */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {children}
//       </main>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type UserProfile = {
  name: string;
  email: string;
  profileImage?: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside
        className={`bg-white shadow-lg flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >

        {/* LOGO */}
        <div className="flex items-center justify-center h-16 border-b relative">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
              S
            </div>

            {sidebarOpen && (
              <span className="font-bold text-lg text-black">
                ShopFlow
              </span>
            )}
          </div>

          {/* COLLAPSE BUTTON */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-5 bg-white border rounded-full p-1 shadow"
          >
            {sidebarOpen ? (
              <ChevronLeft size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
          >
            <User size={20} />
            {sidebarOpen && "Profile"}
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
          >
            <Package size={20} />
            {sidebarOpen && "Products"}
          </Link>

          <Link
            href="/dashboard/sales"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
          >
            <Package size={20} />
            {sidebarOpen && "Sales"}
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
          >
            <Settings size={20} />
            {sidebarOpen && "Settings"}
          </Link>

          <Link
            href="/logout"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-black font-medium"
          >
            <LogOut size={20} />
            {sidebarOpen && "Logout"}
          </Link>

        </nav>

        {/* USER INFO */}
        {user && (
          <div className="p-4 border-t">

            <div className="flex items-center gap-3">

              <img
                src={user.profileImage || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
              />

              {sidebarOpen && (
                <div>
                  <p className="text-sm font-bold text-black">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-600">
                    {user.email}
                  </p>
                </div>
              )}

            </div>

          </div>
        )}

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}