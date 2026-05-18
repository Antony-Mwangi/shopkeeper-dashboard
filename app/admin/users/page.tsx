"use client";

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  isActive?: boolean;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH USERS ================= */
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

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= DELETE USER ================= */
  async function deleteUser(userId: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this user?"
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
      console.error("Delete failed:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500">Search, manage and delete users</p>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={fetchUsers}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500">Loading users...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>

                  <td className="p-3">
                    {user.isActive ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Inactive</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                      onClick={() => alert("Toggle feature later")}
                    >
                      Toggle
                    </button>

                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}