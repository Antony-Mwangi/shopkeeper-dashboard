
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  /* FETCH USER */
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
        setName(data.name);
      } catch (err) {
        console.error("Fetch user error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  /* UPDATE PROFILE */
  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/user/update", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      // ✅ FIX: instantly update UI without reload
      setUser((prev) =>
        prev
          ? {
              ...prev,
              name: data.user.name,
              profileImage: data.user.profileImage,
            }
          : prev
      );

      setImage(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* UNAUTHORIZED */
  if (unauthorized) {
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
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8 sm:py-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Dashboard
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base">
              Manage your profile settings
            </p>
          </div>

          {/* CONTENT */}
          <div className="p-6 sm:p-8 lg:p-10">

            {/* PROFILE SECTION */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-gray-200">

              <img
                src={user?.profileImage || "/default-avatar.jpeg"}
                alt={user?.name || "Profile"}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />

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

            {/* FORM */}
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Edit Profile
              </h3>

              <form onSubmit={updateProfile} className="space-y-6 sm:space-y-8">

                {/* NAME */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                {/* IMAGE */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    Profile Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 border-2 border-gray-200 rounded-xl text-gray-700 file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-blue-50 file:text-blue-700 file:rounded-lg hover:file:bg-blue-100 cursor-pointer"
                  />

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Recommended: Square image, max 5MB
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Update Profile
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}