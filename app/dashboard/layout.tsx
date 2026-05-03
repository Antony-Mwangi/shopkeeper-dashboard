
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
  ShoppingCart,
  LayoutDashboard,
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
  const [user, setUser] = useState<UserProfile | null>(null);

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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { name: "Profile", href: "/dashboard", icon: User },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Sales", href: "/dashboard/sales", icon: ShoppingCart },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-slate-200">
      
      {/* SIDEBAR */}
      <aside
        className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-500 ease-in-out z-40 relative ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >
        {/* LOGO SECTION */}
        <div className="flex items-center px-6 h-20 border-b border-slate-100 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-xl shadow-lg shadow-slate-200 font-black text-xl">
              S
            </div>
            {sidebarOpen && (
              <span className="font-black text-xl tracking-tighter text-black animate-in fade-in duration-500">
                ShopFlow
              </span>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-7 bg-white border border-slate-200 rounded-full p-1 shadow-md hover:scale-110 transition-transform text-slate-500 hover:text-black"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-slate-100 text-black shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-black"
                }`}
              >
                <item.icon 
                  size={22} 
                  className={`${isActive ? "text-black" : "text-slate-400 group-hover:text-black"} transition-colors`} 
                />
                {sidebarOpen && (
                  <span className="font-bold text-sm tracking-tight whitespace-nowrap animate-in slide-in-from-left-2 duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER / USER SECTION */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all w-full group"
          >
            <LogOut size={22} className="group-hover:translate-x-0.5 transition-transform" />
            {sidebarOpen && (
              <span className="font-bold text-sm tracking-tight">Logout</span>
            )}
          </button>

          {user && (
            <div className={`flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 ${!sidebarOpen && 'justify-center'}`}>
              <img
                src={user.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {sidebarOpen && (
                <div className="overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-xs font-black text-black truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium truncate uppercase tracking-tighter">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* TOP BAR (Optional padding/spacer) */}
        <div className="h-4 w-full bg-slate-50" />

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 scroll-smooth">
          {/* CONTENT WRAPPER */}
          <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>

        {/* AI FLOATING COMPONENT */}
        <div className="fixed bottom-6 right-6 z-50">
          <AiChat />
        </div>
      </main>
    </div>
  );
}