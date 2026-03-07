"use client";

import { useEffect, useState } from "react";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include", // send cookie with request
        });

        if (!res.ok) {
          // redirect to login if not authorized
          window.location.href = "/login";
          return;
        }

        const data: UserProfile = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        {/* Welcome Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome, {user?.name || "User"}!
        </h1>

        {/* Profile Details */}
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <span className="font-semibold">Full Name:</span> {user?.name || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}