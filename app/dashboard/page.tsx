// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Menu,
//   X,
//   User,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Package,
// } from "lucide-react";

// type UserProfile = {
//   _id: string;
//   name: string;
//   email: string;
//   profileImage?: string;
// };

// export default function DashboardPage() {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [name, setName] = useState("");
//   const [image, setImage] = useState<File | null>(null);

//   const [loading, setLoading] = useState(true);
//   const [unauthorized, setUnauthorized] = useState(false);

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" });
//         if (res.status === 401) {
//           setUnauthorized(true);
//           return;
//         }
//         const data = await res.json();
//         setUser(data);
//         setName(data.name);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, []);

//   async function updateProfile(e: React.FormEvent) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);

//     await fetch("/api/user/update", { method: "PUT", body: formData });
//     window.location.reload();
//   }

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );

//   if (unauthorized)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
//           Login First
//         </Link>
//       </div>
//     );

//   return (
//     <div className="min-h-screen flex bg-gray-100">

//       {/* SIDEBAR */}
//       <aside
//         className={`hidden lg:flex flex-col bg-white shadow-lg transition-all duration-300 ${
//           sidebarOpen ? "w-64" : "w-20"
//         }`}
//       >
//         <div className="flex items-center justify-center h-16 border-b relative">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
//               S
//             </div>
//             {sidebarOpen && <span className="font-bold text-lg text-[#000000]">ShopFlow</span>}
//           </div>
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="absolute -right-3 top-5 bg-white border rounded-full p-1 shadow"
//           >
//             {sidebarOpen ? <ChevronLeft size={16} className="text-[#000000]" /> : <ChevronRight size={16} className="text-[#000000]" />}
//           </button>
//         </div>

//         <nav className="flex-1 p-4 space-y-2">
//           <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <User size={20} className="text-[#000000]" /> {sidebarOpen && "Profile"}
//           </Link>
//           <Link href="/dashboard/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Package size={20} className="text-[#000000]" /> {sidebarOpen && "Products"}
//           </Link>
//           <Link href="/dashboard/sales" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Package size={20} className="text-[#000000]" /> {sidebarOpen && "Sales"}
//           </Link>
//           <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Settings size={20} className="text-[#000000]" /> {sidebarOpen && "Settings"}
//           </Link>
//           <Link href="/logout" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-[#000000] font-medium">
//             <LogOut size={20} className="text-[#000000]" /> {sidebarOpen && "Logout"}
//           </Link>
//         </nav>

//         {sidebarOpen && user && (
//           <div className="p-4 border-t">
//             <div className="flex items-center gap-3">
//               <img src={user.profileImage || "/default-avatar.png"} className="w-10 h-10 rounded-full object-cover" />
//               <div>
//                 <p className="text-sm font-bold text-[#000000]">{user.name}</p>
//                 <p className="text-xs text-[#000000] font-medium">{user.email}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </aside>

//       {/* MOBILE SIDEBAR */}
//       <aside
//         className={`fixed lg:hidden inset-y-0 left-0 bg-white w-64 shadow-lg z-50 transform transition-transform ${
//           mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h1 className="font-bold text-lg text-[#000000]">ShopFlow</h1>
//           <button onClick={() => setMobileSidebarOpen(false)}><X className="text-[#000000]" /></button>
//         </div>
//         <nav className="p-4 space-y-2">
//           <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <User size={20} className="text-[#000000]" /> Profile
//           </Link>
//           <Link href="/dashboard/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Package size={20} className="text-[#000000]" /> Products
//           </Link>
//           <Link href="/dashboard/sales" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Package size={20} className="text-[#000000]" /> Sales
//           </Link>
//           <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Settings size={20} className="text-[#000000]" /> Settings
//           </Link>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 flex flex-col min-h-screen">
//         <header className="lg:hidden h-16 bg-white border-b flex items-center px-6">
//           <button onClick={() => setMobileSidebarOpen(true)}><Menu className="text-[#000000]" /></button>
//           <h2 className="ml-4 font-bold text-[#000000]">Dashboard</h2>
//         </header>

//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

//             <h2 className="text-2xl font-black text-[#000000] mb-6">Edit Profile</h2>

//             <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
//               <img src={user?.profileImage || "/default-avatar.png"} className="w-24 h-24 rounded-xl object-cover border border-gray-300" />
//               <div>
//                 <p className="text-lg font-bold text-[#000000]">{user?.name}</p>
//                 <p className="text-[#000000] font-medium">{user?.email}</p>
//               </div>
//             </div>

//             <form onSubmit={updateProfile} className="space-y-6">

//               <div>
//                 <label className="block text-sm font-bold text-[#000000] mb-2 uppercase tracking-wide">Full Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full border border-gray-400 rounded-lg p-3 text-[#000000] font-bold bg-gray-50 focus:bg-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-bold text-[#000000] mb-2 uppercase tracking-wide">Profile Image</label>
//                 <input
//                   type="file"
//                   onChange={(e: any) => setImage(e.target.files[0])}
//                   className="w-full border border-gray-400 rounded-lg p-3 text-[#000000] font-bold bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-200 file:text-[#000000] file:font-bold hover:file:bg-gray-300 cursor-pointer"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold transition w-full md:w-auto"
//               >
//                 Update Profile
//               </button>

//             </form>

//           </div>
//         </main>
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
  Package,
  TrendingUp,
  Camera,
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (unauthorized)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="mb-4 text-slate-600 font-medium">Please sign in to access your dashboard.</p>
        <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-semibold transition-all shadow-sm">
          Login
        </Link>
      </div>
    );

  const NavItem = ({ href, icon: Icon, label, danger = false }: any) => (
    <Link 
      href={href} 
      className={`flex items-center gap-3 p-2.5 rounded-md transition-colors font-medium text-sm
        ${danger 
          ? "text-red-600 hover:bg-red-50" 
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
    >
      <Icon size={18} />
      {sidebarOpen && <span>{label}</span>}
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100 relative">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold shadow-sm">
              S
            </div>
            {sidebarOpen && <span className="font-bold text-slate-900 tracking-tight text-lg">ShopFlow</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-5 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50"
          >
            {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/dashboard" icon={User} label="Profile" />
          <NavItem href="/dashboard/products" icon={Package} label="Products" />
          <NavItem href="/dashboard/sales" icon={TrendingUp} label="Sales" />
          <NavItem href="/dashboard/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <NavItem href="/logout" icon={LogOut} label="Logout" danger />
          {sidebarOpen && user && (
            <div className="mt-4 flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
              <img src={user.profileImage || "/default-avatar.png"} className="w-9 h-9 rounded-full bg-slate-200 object-cover" />
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-50 bg-slate-900/50 lg:hidden transition-opacity ${mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileSidebarOpen(false)} />
      <aside className={`fixed lg:hidden inset-y-0 left-0 bg-white w-64 z-50 transform transition-transform duration-300 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-slate-900">ShopFlow</span>
          <button onClick={() => setMobileSidebarOpen(false)}><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-2">
            <NavItem href="/dashboard" icon={User} label="Profile" />
            <NavItem href="/dashboard/products" icon={Package} label="Products" />
            <NavItem href="/dashboard/sales" icon={TrendingUp} label="Sales" />
            <NavItem href="/dashboard/settings" icon={Settings} label="Settings" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <button className="lg:hidden mr-4" onClick={() => setMobileSidebarOpen(true)}><Menu size={20} /></button>
            <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Account Settings</h2>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Personal Information</h1>
                <p className="text-slate-500 text-sm mt-1">Update your profile details and public avatar.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <form onSubmit={updateProfile} className="p-8 space-y-8">
                
                {/* Avatar Upload Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <img 
                        src={user?.profileImage || "/default-avatar.png"} 
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-50 border border-slate-200" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-sm font-semibold text-slate-900">Profile Photo</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-3">JPG, GIF or PNG. Max size of 2MB.</p>
                    <input
                      type="file"
                      onChange={(e: any) => setImage(e.target.files[0])}
                      className="text-xs text-slate-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-tight">Display Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-tight">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ""}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 text-slate-500 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-semibold text-sm transition-all shadow-sm focus:ring-2 focus:ring-indigo-500/50"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}