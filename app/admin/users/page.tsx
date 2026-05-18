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
      style: "none", // keeping existing logic intact
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    } as any);

    fetchUsers();
  }

  // Helper to get initials for a modern avatar look
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-blue-50/40 text-slate-900 antialiased">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-blue-100">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
              User Management
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
              Manage platform permissions, view user activity statuses, and maintain records.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm self-start sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            Total Users: {users.length}
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
              className="w-full bg-white text-slate-900 border border-blue-300 rounded-lg pl-10 pr-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition shadow-sm"
            />
          </div>
          <button
            onClick={fetchUsers}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-sm active:bg-blue-800"
          >
            Filter Results
          </button>
        </div>

        {/* DATA TABLE CONTAINER */}
        <div className="mt-6 bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-16 text-slate-600">
              <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-medium">Retrieving latest records...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] table-fixed divide-y divide-blue-100">
                <thead className="bg-blue-50/70">
                  <tr>
                    <th scope="col" className="w-1/3 px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-blue-900">
                      User Details
                    </th>
                    <th scope="col" className="w-1/3 px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-blue-900">
                      Email Address
                    </th>
                    <th scope="col" className="w-1/6 px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-blue-900">
                      Account Status
                    </th>
                    <th scope="col" className="w-1/6 px-6 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-blue-900">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-blue-100 bg-white">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-blue-50/30 transition">
                      
                      {/* NAME & AVATAR COLUMN */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 flex-shrink-0 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-800">
                            {getInitials(user.name)}
                          </div>
                          <div className="font-semibold text-slate-900 text-sm truncate">
                            {user.name}
                          </div>
                        </div>
                      </td>

                      {/* EMAIL COLUMN */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 truncate">
                        {user.email}
                      </td>

                      {/* STATUS BADGE COLUMN */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* ACTION BUTTONS COLUMN */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => alert("Toggle feature later")}
                            className="text-blue-600 hover:text-blue-900 font-semibold px-2 py-1 rounded hover:bg-blue-50 transition"
                          >
                            Toggle
                          </button>
                          <span className="text-blue-200">|</span>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:text-red-900 font-semibold px-2 py-1 rounded hover:bg-red-50 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* EMPTY DATA STATE */}
                  {users.length === 0 && !loading && (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center text-slate-600">
                        <svg className="mx-auto h-12 w-12 text-blue-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p className="text-sm font-bold text-slate-900">No users found</p>
                        <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or filters.</p>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}