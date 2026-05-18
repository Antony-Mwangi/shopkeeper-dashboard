"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleUser(userId: string) {
    await fetch("/api/admin/users/toggle", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    fetchUsers();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => toggleUser(user._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}