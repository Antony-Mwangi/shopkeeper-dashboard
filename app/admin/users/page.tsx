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

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= DELETE USER ================= */
  async function deleteUser(userId: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    await fetch("/api/admin/users/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    fetchUsers();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          User Management
        </h1>
        <p className="text-gray-600 mt-2">
          Search, manage and control platform users
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 border border-gray-300 bg-white px-4 py-3 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />

        <button
          onClick={fetchUsers}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                     font-semibold transition"
        >
          Search
        </button>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto border border-gray-200">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading users...
          </div>
        ) : (
          <table className="w-full min-w-[700px]">
            {/* HEADER */}
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-gray-800">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{user.name}</td>

                  <td className="p-4 text-gray-600">{user.email}</td>

                  <td className="p-4">
                    {user.isActive ? (
                      <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex gap-2">
                    <button
                      className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                      onClick={() => alert("Toggle feature later")}
                    >
                      Toggle
                    </button>

                    <button
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* EMPTY STATE */}
              {users.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-10 text-center text-gray-500"
                  >
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