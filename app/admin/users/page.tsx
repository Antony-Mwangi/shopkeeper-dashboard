"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  isActive: boolean; // true = active, false = suspended
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/users?search=${search}`);
      const data = await res.json();

      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= SUSPEND / ACTIVATE USER ================= */
  async function toggleUser(userId: string) {
    try {
      await fetch("/api/admin/users/toggle", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  }

  /* ================= DELETE USER ================= */
  async function deleteUser(userId: string) {
    const confirmDelete = confirm(
      "This will permanently delete this user. Continue?"
    );

    if (!confirmDelete) return;

    try {
      await fetch("/api/admin/users/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-slate-600 mt-1">
            Manage accounts, suspensions, and access control
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full md:flex-1 px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <button
            onClick={fetchUsers}
            className="bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Search
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow border overflow-x-auto">

          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Loading users...
            </div>
          ) : (
            <table className="w-full min-w-[700px]">

              <thead className="bg-slate-50 text-left text-sm text-slate-600">
                <tr>
                  <th className="p-4">User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-slate-50">

                    {/* USER */}
                    <td className="p-4 font-medium">
                      {user.name}
                    </td>

                    {/* EMAIL */}
                    <td className="text-slate-600">
                      {user.email}
                    </td>

                    {/* STATUS */}
                    <td>
                      {user.isActive ? (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="text-right p-4 flex justify-end gap-3">

                      {/* SUSPEND / ACTIVATE */}
                      <button
                        onClick={() => toggleUser(user._id)}
                        className={`px-3 py-1 rounded text-sm font-medium transition ${
                          user.isActive
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {user.isActive ? "Suspend" : "Activate"}
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

                {users.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-slate-500">
                      No users found
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}