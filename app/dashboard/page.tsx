

// "use client";

// import { useEffect, useState } from "react";
// import { Menu, X, User, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
// import Footer from "@/components/Footer"; 

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
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading profile...</p>
//         </div>
//       </div>
//     );

//   if (unauthorized)
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//         <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
//           <p className="text-gray-600 mb-6">Please log in to access your profile.</p>
//           <a
//             href="/login"
//             className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg shadow-blue-200 hover:shadow-xl"
//           >
//             Sign In
//           </a>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Desktop Sidebar */}
//       <aside
//         className={`hidden lg:block fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 ease-in-out z-40
//           ${sidebarOpen ? "w-64" : "w-20"}`}
//       >
//         <div className="flex flex-col h-full relative">
//           {/* Toggle Button */}
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-shadow z-50"
//           >
//             {sidebarOpen ? (
//               <ChevronLeft className="w-4 h-4 text-gray-600" />
//             ) : (
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//             )}
//           </button>

//           <div className="flex items-center justify-center p-6 border-b border-gray-100">
//             <div className={`flex items-center ${sidebarOpen ? "space-x-3" : ""}`}>
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <span className="text-white font-bold text-lg">S</span>
//               </div>
//               {sidebarOpen && <h1 className="font-bold text-xl text-gray-800">ShopFlow</h1>}
//             </div>
//           </div>
          
//           <div className="flex-1 overflow-y-auto py-6">
//             <nav className="px-3 space-y-1">
//               <a
//                 href="#profile"
//                 className={`flex items-center ${sidebarOpen ? "gap-3 px-4" : "justify-center px-2"} py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group`}
//                 title={!sidebarOpen ? "Profile" : ""}
//               >
//                 <User className="w-5 h-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="font-medium">Profile</span>}
//               </a>
//               <a
//                 href="#settings"
//                 className={`flex items-center ${sidebarOpen ? "gap-3 px-4" : "justify-center px-2"} py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group`}
//                 title={!sidebarOpen ? "Settings" : ""}
//               >
//                 <Settings className="w-5 h-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="font-medium">Settings</span>}
//               </a>
//               <a
//                 href="/logout"
//                 className={`flex items-center ${sidebarOpen ? "gap-3 px-4" : "justify-center px-2"} py-3 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group`}
//                 title={!sidebarOpen ? "Logout" : ""}
//               >
//                 <LogOut className="w-5 h-5 flex-shrink-0" />
//                 {sidebarOpen && <span className="font-medium">Logout</span>}
//               </a>
//             </nav>
//           </div>

//           {sidebarOpen && (
//             <div className="p-6 border-t border-gray-100">
//               <div className="flex items-center space-x-3">
//                 <img
//                   src={user?.profileImage || "/default-avatar.png"}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-gray-700 truncate">{user?.name}</p>
//                   <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>

      
//       <aside
//         className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
//           ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">S</span>
//               </div>
//               <h1 className="font-bold text-xl text-gray-800">ShopFlow</h1>
//             </div>
//             <button
//               className="text-gray-500 hover:text-gray-700"
//               onClick={() => setMobileSidebarOpen(false)}
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           <div className="flex-1 overflow-y-auto py-6">
//             <nav className="px-3 space-y-1">
//               <a
//                 href="#profile"
//                 className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
//                 onClick={() => setMobileSidebarOpen(false)}
//               >
//                 <User className="w-5 h-5" />
//                 <span className="font-medium">Profile</span>
//               </a>
               
//               <a
//                 href="#settings"
//                 className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
//                 onClick={() => setMobileSidebarOpen(false)}
//               >
//                 <Settings className="w-5 h-5" />
//                 <span className="font-medium">Settings</span>
//               </a>
//               <a
//                 href="/logout"
//                 className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span className="font-medium">Logout</span>
//               </a>
//             </nav>
//           </div>

//           <div className="p-6 border-t border-gray-100">
//             <div className="flex items-center space-x-3">
//               <img
//                 src={user?.profileImage || "/default-avatar.png"}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100"
//               />
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold text-gray-700 truncate">{user?.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

      
//       {mobileSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
//           onClick={() => setMobileSidebarOpen(false)}
//         />
//       )}

      
//       <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
//         ${sidebarOpen ? "lg:pl-64" : "lg:pl-20"}`}
//       >
        
//         <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
//           <div className="flex items-center justify-between px-6 py-4">
//             <button 
//               onClick={() => setMobileSidebarOpen(true)}
//               className="lg:hidden text-gray-600 hover:text-gray-900"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
            
//             <div className="lg:hidden">
//               <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
//             </div>
            
//             <div className="flex-1 lg:flex-none" />
//           </div>
//         </header>

//         <main className="flex-1 p-6 lg:p-8">
          
//           <div
//             id="profile"
//             className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-8">
//               <div className="relative">
//                 <img
//                   src={user?.profileImage || "/default-avatar.png"}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-2xl object-cover ring-4 ring-blue-50"
//                 />
//                 <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
//                   <User className="w-4 h-4" />
//                 </button>
//               </div>
              
//               <div className="flex-1 space-y-4">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
//                   <p className="text-gray-500">{user?.email}</p>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <p className="text-sm text-gray-500">Member since</p>
//                     <p className="font-semibold text-gray-700">
//                       {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//                     </p>
//                   </div>
//                   <div className="bg-gray-50 p-4 rounded-xl">
//                     <p className="text-sm text-gray-500">Account status</p>
//                     <p className="font-semibold text-green-600">Active</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     </div>
//   );
// }

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
  Package
} from "lucide-react";
import Footer from "@/components/Footer";

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
          Go to Login
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
              S
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg text-gray-700">
                ShopFlow
              </span>
            )}
          </div>

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

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <User size={20} />
            {sidebarOpen && "Profile"}
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <Package size={20} />
            {sidebarOpen && "Inventory"}
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
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

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <img
                src={user?.profileImage || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
                alt="profile"
              />
              <div>
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* MOBILE SIDEBAR */}
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

        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <User size={20} /> Profile
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <Package size={20} /> Inventory
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <Settings size={20} /> Settings
          </Link>

          <Link
            href="/logout"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600"
          >
            <LogOut size={20} /> Logout
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b flex items-center px-6 lg:hidden">
          <button onClick={() => setMobileSidebarOpen(true)}>
            <Menu />
          </button>
          <h2 className="ml-4 font-semibold">Dashboard</h2>
        </header>

        {/* PROFILE CONTENT */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
            <div className="flex items-center gap-6">
              <img
                src={user?.profileImage || "/default-avatar.png"}
                className="w-28 h-28 rounded-xl object-cover"
                alt="profile"
              />

              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}