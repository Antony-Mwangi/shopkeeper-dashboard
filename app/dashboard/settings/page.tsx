"use client";

import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  profileImage?: string;
};

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  /* FETCH USER */
  const fetchUser = async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();

    setUser(data);
    setName(data.name);
    setImage(data.profileImage || "");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* UPDATE PROFILE */
  const updateProfile = async () => {
    await fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        profileImage: image,
      }),
    });

    fetchUser();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <p className="text-sm text-slate-600 animate-pulse">
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Account Settings
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Manage your profile information
        </p>
      </div>

      {/* CARD */}
      <div className="max-w-5xl mx-auto">

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* TOP SECTION */}
          <div className="border-b border-slate-200 px-5 sm:px-8 py-6 bg-slate-50">

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              {/* AVATAR */}
              <div className="flex justify-center sm:justify-start">
                <img
                  src={image || "/default-avatar.png"}
                  alt="Profile"
                  className="
                    w-20 h-20 sm:w-24 sm:h-24
                    rounded-full
                    object-cover
                    border-4 border-white
                    shadow
                  "
                />
              </div>

              {/* USER INFO */}
              <div className="text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-black">
                  {user.name}
                </h2>

                <p className="text-sm text-slate-500 break-all">
                  {user.email}
                </p>
              </div>

            </div>
          </div>

          {/* FORM */}
          <div className="p-5 sm:p-8">

            <div className="space-y-6">

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="
                    w-full
                    bg-white
                    border border-slate-300
                    rounded-xl
                    px-4 py-3
                    text-black
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:ring-2 focus:ring-blue-500
                  "
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  value={user.email}
                  disabled
                  className="
                    w-full
                    bg-slate-100
                    border border-slate-300
                    rounded-xl
                    px-4 py-3
                    text-slate-500
                    cursor-not-allowed
                  "
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Profile Image URL
                </label>

                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="
                    w-full
                    bg-white
                    border border-slate-300
                    rounded-xl
                    px-4 py-3
                    text-black
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:ring-2 focus:ring-blue-500
                  "
                />
              </div>

              {/* BUTTON */}
              <div className="pt-2">
                <button
                  onClick={updateProfile}
                  className="
                    w-full sm:w-auto
                    px-6 py-3
                    bg-black hover:bg-slate-900
                    text-white
                    rounded-xl
                    text-sm font-semibold
                    transition
                  "
                >
                  Save Changes
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}