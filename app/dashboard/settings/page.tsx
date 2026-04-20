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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, profileImage: image }),
    });

    fetchUser();
  };

  /* CHANGE PASSWORD */
  const changePassword = async () => {
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    setOldPassword("");
    setNewPassword("");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-black animate-pulse text-sm">
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10 space-y-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold uppercase tracking-widest text-black">
          Account Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your profile and security settings.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* PROFILE CARD */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 space-y-6 shadow-sm">

          <div>
            <h2 className="text-sm font-bold uppercase text-black">
              Profile Information
            </h2>
            <p className="text-xs text-slate-500">
              Update your personal details
            </p>
          </div>

          {/* AVATAR */}
          <div className="flex items-center gap-4">
            <img
              src={image || "/default-avatar.png"}
              className="w-14 h-14 rounded-full object-cover border"
            />
            <span className="text-xs text-slate-500">
              Preview
            </span>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-slate-50 border border-slate-300 p-3 rounded text-black outline-none focus:ring-1 focus:ring-slate-400"
            />

            <input
              value={user.email}
              disabled
              className="w-full bg-slate-200 border border-slate-300 p-3 rounded text-black cursor-not-allowed"
            />

            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Profile Image URL"
              className="w-full bg-slate-50 border border-slate-300 p-3 rounded text-black outline-none focus:ring-1 focus:ring-slate-400"
            />

          </div>

          <button
            onClick={updateProfile}
            className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-900 transition"
          >
            Save Changes
          </button>
        </div>

        {/* PASSWORD CARD */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 space-y-6 shadow-sm">

          <div>
            <h2 className="text-sm font-bold uppercase text-black">
              Security
            </h2>
            <p className="text-xs text-slate-500">
              Update your password
            </p>
          </div>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 p-3 rounded text-black outline-none focus:ring-1 focus:ring-slate-400"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 p-3 rounded text-black outline-none focus:ring-1 focus:ring-slate-400"
            />

          </div>

          <button
            onClick={changePassword}
            className="w-full bg-slate-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
          >
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
}