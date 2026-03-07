// "use client";

// import { useEffect, useState } from "react";

// type UserProfile = {
//   _id: string;
//   name: string;
//   email: string;
// };

// export default function DashboardPage() {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include", // send cookie with request
//         });

//         if (!res.ok) {
//           // redirect to login if not authorized
//           window.location.href = "/login";
//           return;
//         }

//         const data: UserProfile = await res.json();
//         setUser(data);
//       } catch (err) {
//         console.error("Error fetching user:", err);
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

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
//         {/* Welcome Header */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Welcome, {user?.name || "User"}!
//         </h1>

//         {/* Profile Details */}
//         <div className="space-y-4 text-gray-700 text-lg">
//           <p>
//             <span className="font-semibold">Full Name:</span> {user?.name || "N/A"}
//           </p>
//           <p>
//             <span className="font-semibold">Email:</span> {user?.email || "N/A"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState, ChangeEvent } from "react";

// type UserProfile = {
//   _id: string;
//   name: string;
//   email: string;
//   profileImage?: string;
// };

// export default function DashboardPage() {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState("");

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" });
//         if (!res.ok) return (window.location.href = "/login");
//         const data: UserProfile = await res.json();
//         setUser(data);
//         setName(data.name);
//         setEmail(data.email);
//         setPreview(data.profileImage || "");
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, []);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfileImage(e.target.files[0]);
//       setPreview(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleSave = async () => {
//     let uploadedImageUrl = preview;

//     // Optional: handle image upload to server / cloud storage
//     // For simplicity, we'll just use local preview URL
//     // In production, upload profileImage to S3 or Cloudinary

//     try {
//       const res = await fetch("/api/auth/update-profile", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ name, email, profileImage: uploadedImageUrl }),
//       });

//       if (!res.ok) throw new Error("Failed to update profile");

//       const data: UserProfile = await res.json();
//       setUser(data);
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-gray-700 text-lg">Loading profile...</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full space-y-6">
//         <div className="flex flex-col items-center">
//           <img
//             src={preview || "/default-avatar.png"}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover mb-4"
//           />
//           {editMode && (
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//           )}
//         </div>

//         <div className="space-y-4 text-gray-700">
//           <div>
//             <label className="font-semibold">Full Name:</label>
//             {editMode ? (
//               <input
//                 type="text"
//                 className="w-full border p-2 rounded mt-1"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             ) : (
//               <p>{user?.name}</p>
//             )}
//           </div>

//           <div>
//             <label className="font-semibold">Email:</label>
//             {editMode ? (
//               <input
//                 type="email"
//                 className="w-full border p-2 rounded mt-1"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             ) : (
//               <p>{user?.email}</p>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-center space-x-4">
//           {editMode ? (
//             <>
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditMode(false)}
//                 className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include", // ⚡ send cookies
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
        <p className="text-gray-700 text-lg mb-4">
          You are not logged in.
        </p>
        <a
          href="/login"
          className="text-white bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </a>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full space-y-6">
        <div className="flex flex-col items-center">
          <img
            src={user?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <label className="font-semibold">Full Name:</label>
            <p>{user?.name}</p>
          </div>

          <div>
            <label className="font-semibold">Email:</label>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}