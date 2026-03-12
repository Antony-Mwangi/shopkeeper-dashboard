


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

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

//     await fetch("/api/user/update", {
//       method: "PUT",
//       body: formData,
//     });

//     window.location.reload();
//   }

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );

//   if (unauthorized)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Link
//           href="/login"
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg"
//         >
//           Login First
//         </Link>
//       </div>
//     );

//   return (
//     <div className="p-8">

//       <div className="max-w-3xl bg-white rounded-xl shadow-lg p-8">

//         <h2 className="text-2xl font-black text-black mb-6">
//           Edit Profile
//         </h2>

//         <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
//           <img
//             src={user?.profileImage || "/default-avatar.png"}
//             className="w-24 h-24 rounded-xl object-cover border"
//           />

//           <div>
//             <p className="text-lg font-bold text-black">{user?.name}</p>
//             <p className="text-black">{user?.email}</p>
//           </div>
//         </div>

//         <form onSubmit={updateProfile} className="space-y-6">

//           <div>
//             <label className="block font-bold text-black mb-2">
//               Full Name
//             </label>

//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border border-gray-400 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="block font-bold text-black mb-2">
//               Profile Image
//             </label>

//             <input
//               type="file"
//               onChange={(e: any) => setImage(e.target.files[0])}
//               className="w-full border border-gray-400 rounded-lg p-3 text-black"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold transition"
//           >
//             Update Profile
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  profileImage?: string, default: "/default-avatar.jpeg";
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

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

    await fetch("/api/user/update", {
      method: "PUT",
      body: formData,
    });

    window.location.reload();
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (unauthorized)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors text-center"
        >
          Login First
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8 sm:py-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Dashboard
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base">
              Manage your profile settings
            </p>
          </div>

          {/* Main Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Profile Overview */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-gray-200">
              <div className="relative group">
                <img
                  src={user?.profileImage || "/default-avatar.jpeg"}
                  alt={user?.name || "Profile"}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-2xl transition-all duration-200" />
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {user?.name}
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base break-all">
                  {user?.email}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Member since {new Date().getFullYear()}
                </p>
              </div>
            </div>

            {/* Edit Profile Form */}
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Edit Profile
              </h3>

              <form onSubmit={updateProfile} className="space-y-6 sm:space-y-8">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 border-2 border-gray-200 rounded-xl 
                             text-gray-900 text-sm sm:text-base
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                             outline-none transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Image Upload Field */}
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900">
                    Profile Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setImage(e.target.files?.[0] || null)
                      }
                      accept="image/*"
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 border-2 border-gray-200 rounded-xl
                               text-gray-700 text-sm sm:text-base
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-lg file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                               outline-none transition-all duration-200 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Recommended: Square image, max 5MB
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 
                             bg-gradient-to-r from-blue-600 to-blue-700
                             hover:from-blue-700 hover:to-blue-800
                             text-white font-semibold text-sm sm:text-base
                             rounded-xl shadow-lg hover:shadow-xl
                             transform hover:-translate-y-0.5
                             transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Update Profile
                  </button>
                </div>
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                  Your profile information is secure and private. Changes will be reflected across all devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}