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

  async function deleteUser(userId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    await fetch("/api/admin/users/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    fetchUsers();
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          User Management
        </h1>
        <p className="text-slate-600 mt-2">
          Search, manage, and control platform users
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
       <input
  type="text"
  placeholder="Search by name or email..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
    w-full md:flex-1
    bg-white text-gray-900
    border-2 border-gray-400
    px-4 py-3 rounded-lg

    placeholder-gray-500

    focus:outline-none
    focus:ring-2 focus:ring-blue-600
    focus:border-blue-600

    shadow-md
  "
/>

        <button
          onClick={fetchUsers}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                     font-semibold shadow-md transition"
        >
          Search
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">

        {loading ? (
          <div className="p-10 text-center text-slate-600">
            Loading users...
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">
              
              {/* HEADER */}
              <thead className="bg-slate-900 text-white text-sm uppercase">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="text-slate-800">

                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`
                      border-b border-slate-200
                      ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      hover:bg-blue-50 transition
                    `}
                  >
                    <td className="p-4 font-medium text-slate-900">
                      {user.name}
                    </td>

                    <td className="p-4 text-slate-700">
                      {user.email}
                    </td>

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

                    <td className="p-4 flex gap-2">
                      <button
                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
                        onClick={() => alert("Toggle feature later")}
                      >
                        Toggle
                      </button>

                      <button
                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* EMPTY */}
                {users.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-slate-600">
                      No users found
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}