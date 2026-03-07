
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
import { Menu, X, User, Settings, LogOut } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">Loading profile...</p>
      </div>
    );

  if (unauthorized)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <p className="text-gray-700 text-lg mb-4">You are not logged in.</p>
        <a
          href="/login"
          className="text-white bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </a>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h1 className="font-bold text-xl">ShopFlow</h1>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-6 space-y-2">
          <a
            href="#profile"
            className="flex items-center gap-3 p-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            <User className="w-5 h-5" /> Profile
          </a>
          <a
            href="#settings"
            className="flex items-center gap-3 p-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            <Settings className="w-5 h-5" /> Settings
          </a>
          <a
            href="/logout"
            className="flex items-center gap-3 p-2 rounded hover:bg-red-600 hover:text-white transition"
          >
            <LogOut className="w-5 h-5" /> Logout
          </a>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <div />
        </header>

        <main className="flex-1 p-8 md:p-12">
          <div
            id="profile"
            className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto flex flex-col items-center space-y-6"
          >
            <img
              src={user?.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-yellow-400"
            />
            <div className="space-y-4 text-gray-700 w-full">
              <div>
                <label className="font-semibold text-gray-900">Full Name:</label>
                <p className="text-lg">{user?.name}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-900">Email:</label>
                <p className="text-lg">{user?.email}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}