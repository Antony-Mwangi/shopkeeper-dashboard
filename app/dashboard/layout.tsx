
// "use client";

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
//   BarChart3, // ✅ NEW ICON
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

//   /* ================= FETCH USER ================= */
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

//   /* ================= LOGOUT ================= */
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

//       {/* SIDEBAR */}
//       <aside
//         className={`bg-white shadow-lg flex flex-col transition-all duration-300 ${
//           sidebarOpen ? "w-64" : "w-20"
//         }`}
//       >

//         {/* LOGO */}
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

//         {/* NAVIGATION */}
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

//           {/* ✅ NEW ANALYTICS LINK */}
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

//           {/* LOGOUT */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-black font-medium w-full text-left"
//           >
//             <LogOut size={20} />
//             {sidebarOpen && "Logout"}
//           </button>

//         </nav>

//         {/* USER INFO */}
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

//       {/* MAIN */}
//       <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
//         {children}
//       </main>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  User,
  Package,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Menu,
  X,
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
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

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

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  /* ================= NAV ITEM ================= */
  const NavItem = ({
    href,
    icon: Icon,
    label,
  }: any) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
        ${active ? "bg-black text-white" : "text-black hover:bg-slate-100"}
        `}
      >
        <Icon size={18} />
        {sidebarOpen && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-full bg-white border-r shadow-sm transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between h-16 px-4 border-b">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-md font-bold">
              S
            </div>

            {sidebarOpen && (
              <span className="font-semibold text-black text-lg">
                ShopFlow
              </span>
            )}
          </div>

          {/* DESKTOP TOGGLE */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex text-slate-500 hover:text-black"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>

          {/* MOBILE CLOSE */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-3 space-y-1">

          <NavItem href="/dashboard" icon={User} label="Profile" />
          <NavItem href="/dashboard/products" icon={Package} label="Products" />
          <NavItem href="/dashboard/sales" icon={Package} label="Sales" />
          <NavItem href="/dashboard/analytics" icon={BarChart3} label="Analytics" />
          <NavItem href="/dashboard/settings" icon={Settings} label="Settings" />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut size={18} />
            {sidebarOpen && "Logout"}
          </button>

        </nav>

        {/* USER */}
        {user && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage || "/default-avatar.png"}
                className="w-9 h-9 rounded-full object-cover border"
              />

              {sidebarOpen && (
                <div className="truncate">
                  <p className="text-sm font-semibold text-black truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* TOPBAR */}
        <header className="h-16 bg-white border-b px-4 flex items-center justify-between lg:px-8">

          {/* MOBILE MENU */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-black"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-sm font-semibold text-black hidden sm:block">
            Dashboard
          </h1>

          {/* USER MINI */}
          {user && (
            <div className="flex items-center gap-2">
              <img
                src={user.profileImage || "/default-avatar.png"}
                className="w-8 h-8 rounded-full border"
              />
            </div>
          )}
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}