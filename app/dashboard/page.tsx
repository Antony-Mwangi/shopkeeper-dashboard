"use client";

import { useEffect, useState } from "react";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.status === 401) {
          window.location.href = "/login"; // redirect if not authenticated
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

  if (loading) return <p className="p-6 text-center">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome, {user?.name || "User"}!
        </h1>

        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <span className="font-semibold">Full Name:</span> {user?.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          {user?.createdAt && (
            <p>
              <span className="font-semibold">Member Since:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}