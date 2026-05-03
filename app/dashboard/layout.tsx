
// "use client";
// import AiChat from "@/components/AiChat";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   User,
//   Package,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   BarChart3, 
// } from "lucide-react";

// type UserProfile = {
//   name: string;
//   email: string;
//   profileImage?: string;
// };

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [user, setUser] = useState<UserProfile | null>(null);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUser(data);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     fetchUser();
//   }, []);


//   const handleLogout = async () => {
//     try {
//       await fetch("/api/auth/logout", {
//         method: "POST",
//       });

//       router.push("/");
//       router.refresh();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">

//       <aside
//         className={`bg-white shadow-lg flex flex-col transition-all duration-300 ${
//           sidebarOpen ? "w-64" : "w-20"
//         }`}
//       >

        
//         <div className="flex items-center justify-center h-16 border-b relative">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
//               S
//             </div>

//             {sidebarOpen && (
//               <span className="font-bold text-lg text-black">
//                 ShopFlow
//               </span>
//             )}
//           </div>

//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="absolute -right-3 top-5 bg-white border rounded-full p-1 shadow"
//           >
//             {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
//           </button>
//         </div>

        
//         <nav className="flex-1 p-4 space-y-2">

//           <Link
//             href="/dashboard"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <User size={20} />
//             {sidebarOpen && "Profile"}
//           </Link>

//           <Link
//             href="/dashboard/products"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <Package size={20} />
//             {sidebarOpen && "Products"}
//           </Link>

//           <Link
//             href="/dashboard/sales"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <Package size={20} />
//             {sidebarOpen && "Sales"}
//           </Link>

//           <Link
//             href="/dashboard/analytics"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <BarChart3 size={20} />
//             {sidebarOpen && "Analytics"}
//           </Link>

//           <Link
//             href="/dashboard/settings"
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-black font-medium"
//           >
//             <Settings size={20} />
//             {sidebarOpen && "Settings"}
//           </Link>

      
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-black font-medium w-full text-left"
//           >
//             <LogOut size={20} />
//             {sidebarOpen && "Logout"}
//           </button>

//         </nav>

     
//         {user && (
//           <div className="p-4 border-t">
//             <div className="flex items-center gap-3">
//               <img
//                 src={user.profileImage || "/default-avatar.png"}
//                 className="w-10 h-10 rounded-full object-cover border"
//               />

//               {sidebarOpen && (
//                 <div>
//                   <p className="text-sm font-bold text-black">
//                     {user.name}
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     {user.email}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//       </aside>

  
//       <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
//         {children}
//            <AiChat />
//       </main>

//     </div>
//   );
// }

"use client";

import AiChat from "@/components/AiChat";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Package, Settings, LogOut, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: any) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 w-64 h-full bg-white shadow-lg transform transition ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="font-bold text-lg">ShopFlow</h1>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-2 text-sm">
          <Nav href="/dashboard" icon={<User size={18} />} label="Profile" />
          <Nav href="/dashboard/products" icon={<Package size={18} />} label="Products" />
          <Nav href="/dashboard/sales" icon={<Package size={18} />} label="Sales" />
          <Nav href="/dashboard/analytics" icon={<BarChart3 size={18} />} label="Analytics" />
          <Nav href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" />

          <button onClick={logout} className="flex items-center gap-2 p-2 w-full hover:bg-red-100 rounded">
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white p-4 shadow-sm flex items-center lg:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
          <AiChat />
        </main>
      </div>
    </div>
  );
}

function Nav({ href, icon, label }: any) {
  return (
    <Link href={href} className="flex items-center gap-2 p-2 rounded hover:bg-blue-50">
      {icon} {label}
    </Link>
  );
}