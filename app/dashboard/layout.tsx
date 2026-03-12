// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X, Package, User, Settings, LogOut } from "lucide-react";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex">

//       {/* SIDEBAR */}
//       <aside className="w-64 border-r border-gray-200 p-6 hidden md:block">

//         <h1 className="text-xl font-bold mb-8">ShopFlow</h1>

//         <nav className="space-y-3">

//           <Link
//             href="/dashboard"
//             className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
//           >
//             <User size={18} />
//             Profile
//           </Link>

//           <Link
//             href="/dashboard/products"
//             className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
//           >
//             <Package size={18} />
//             Products
//           </Link>

//           <Link
//             href="/dashboard/sales"
//             className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
//           >
//             <Package size={18} />
//             Sales
//           </Link>

//           <Link
//             href="/dashboard/settings"
//             className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
//           >
//             <Settings size={18} />
//             Settings
//           </Link>

//           <Link
//             href="/logout"
//             className="flex items-center gap-2 p-2 hover:bg-red-100 rounded"
//           >
//             <LogOut size={18} />
//             Logout
//           </Link>

//         </nav>
//       </aside>


//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-8">

//         {children}

//       </main>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import {
  User,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">

        <div className="flex items-center justify-center h-16 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
              S
            </div>
            <span className="font-bold text-lg text-black">
              ShopFlow
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
          >
            <User size={20} /> Profile
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
          >
            <Package size={20} /> Products
          </Link>

          <Link
            href="/dashboard/sales"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
          >
            <Package size={20} /> Sales
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
          >
            <Settings size={20} /> Settings
          </Link>

          <Link
            href="/logout"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-black font-medium"
          >
            <LogOut size={20} /> Logout
          </Link>

        </nav>

      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}