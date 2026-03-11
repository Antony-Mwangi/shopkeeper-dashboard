// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   Menu,
//   X,
//   User,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Package,
// } from "lucide-react";

// type UserProfile = {
//   _id: string;
//   name: string;
//   email: string;
//   profileImage?: string;
// };

// export default function DashboardPage() {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [name, setName] = useState("");
//   const [image, setImage] = useState<File | null>(null);

//   const [loading, setLoading] = useState(true);
//   const [unauthorized, setUnauthorized] = useState(false);

//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch("/api/auth/me", { credentials: "include" });
//         if (res.status === 401) {
//           setUnauthorized(true);
//           return;
//         }
//         const data = await res.json();
//         setUser(data);
//         setName(data.name);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, []);

//   async function updateProfile(e: React.FormEvent) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);

//     await fetch("/api/user/update", { method: "PUT", body: formData });
//     window.location.reload();
//   }

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );

//   if (unauthorized)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
//           Login First
//         </Link>
//       </div>
//     );

//   return (
//     <div className="min-h-screen flex bg-gray-100">

//       {/* SIDEBAR */}
//       <aside
//         className={`hidden lg:flex flex-col bg-white shadow-lg transition-all duration-300 ${
//           sidebarOpen ? "w-64" : "w-20"
//         }`}
//       >
//         <div className="flex items-center justify-center h-16 border-b relative">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded">
//               S
//             </div>
//             {sidebarOpen && <span className="font-bold text-lg text-[#000000]">ShopFlow</span>}
//           </div>
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="absolute -right-3 top-5 bg-white border rounded-full p-1 shadow"
//           >
//             {sidebarOpen ? <ChevronLeft size={16} className="text-[#000000]" /> : <ChevronRight size={16} className="text-[#000000]" />}
//           </button>
//         </div>

//         <nav className="flex-1 p-4 space-y-2">
//           <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <User size={20} className="text-[#000000]" /> {sidebarOpen && "Profile"}
//           </Link>
//           <Link href="/dashboard/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Package size={20} className="text-[#000000]" /> {sidebarOpen && "Products"}
//           </Link>
//           <Link href="/dashboard/sales" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Package size={20} className="text-[#000000]" /> {sidebarOpen && "Sales"}
//           </Link>
//           <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Settings size={20} className="text-[#000000]" /> {sidebarOpen && "Settings"}
//           </Link>
//           <Link href="/logout" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-[#000000] font-medium">
//             <LogOut size={20} className="text-[#000000]" /> {sidebarOpen && "Logout"}
//           </Link>
//         </nav>

//         {sidebarOpen && user && (
//           <div className="p-4 border-t">
//             <div className="flex items-center gap-3">
//               <img src={user.profileImage || "/default-avatar.png"} className="w-10 h-10 rounded-full object-cover" />
//               <div>
//                 <p className="text-sm font-bold text-[#000000]">{user.name}</p>
//                 <p className="text-xs text-[#000000] font-medium">{user.email}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </aside>

//       {/* MOBILE SIDEBAR */}
//       <aside
//         className={`fixed lg:hidden inset-y-0 left-0 bg-white w-64 shadow-lg z-50 transform transition-transform ${
//           mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h1 className="font-bold text-lg text-[#000000]">ShopFlow</h1>
//           <button onClick={() => setMobileSidebarOpen(false)}><X className="text-[#000000]" /></button>
//         </div>
//         <nav className="p-4 space-y-2">
//           <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <User size={20} className="text-[#000000]" /> Profile
//           </Link>
//           <Link href="/dashboard/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Package size={20} className="text-[#000000]" /> Products
//           </Link>
//           <Link href="/dashboard/sales" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Package size={20} className="text-[#000000]" /> Sales
//           </Link>
//           <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-[#000000] font-medium">
//             <Settings size={20} className="text-[#000000]" /> Settings
//           </Link>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 flex flex-col min-h-screen">
//         <header className="lg:hidden h-16 bg-white border-b flex items-center px-6">
//           <button onClick={() => setMobileSidebarOpen(true)}><Menu className="text-[#000000]" /></button>
//           <h2 className="ml-4 font-bold text-[#000000]">Dashboard</h2>
//         </header>

//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

//             <h2 className="text-2xl font-black text-[#000000] mb-6">Edit Profile</h2>

//             <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
//               <img src={user?.profileImage || "/default-avatar.png"} className="w-24 h-24 rounded-xl object-cover border border-gray-300" />
//               <div>
//                 <p className="text-lg font-bold text-[#000000]">{user?.name}</p>
//                 <p className="text-[#000000] font-medium">{user?.email}</p>
//               </div>
//             </div>

//             <form onSubmit={updateProfile} className="space-y-6">

//               <div>
//                 <label className="block text-sm font-bold text-[#000000] mb-2 uppercase tracking-wide">Full Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full border border-gray-400 rounded-lg p-3 text-[#000000] font-bold bg-gray-50 focus:bg-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-bold text-[#000000] mb-2 uppercase tracking-wide">Profile Image</label>
//                 <input
//                   type="file"
//                   onChange={(e: any) => setImage(e.target.files[0])}
//                   className="w-full border border-gray-400 rounded-lg p-3 text-[#000000] font-bold bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-200 file:text-[#000000] file:font-bold hover:file:bg-gray-300 cursor-pointer"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold transition w-full md:w-auto"
//               >
//                 Update Profile
//               </button>

//             </form>

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

type SaleRecord = {
  _id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  customerName?: string;
  date: string;
};

export default function SalesPage() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);

  async function fetchSales() {
    try {
      const res = await fetch("/api/sales");
      const data = await res.json();
      setSales(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function submitSale(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, customerName }),
      });

      setProductId("");
      setQuantity(1);
      setCustomerName("");
      fetchSales();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-black">

      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Record a Sale</h1>

      {/* Sale Form */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-10">
        <form onSubmit={submitSale} className="space-y-5">
          
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Product ID
            </label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter Product ID"
              className="w-full p-3 border border-blue-700 rounded-lg bg-white text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 border border-blue-700 rounded-lg bg-white text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Customer Name (Optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Customer Name"
              className="w-full p-3 border border-blue-700 rounded-lg bg-white text-black font-medium focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-700 hover:bg-brown-500 text-black font-bold py-3 rounded-lg transition flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {submitting ? "Recording..." : "Record Sale"}
          </button>
        </form>
      </div>

      {/* Recent Sales Table */}
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Recent Sales</h2>

      <div className="overflow-x-auto max-w-5xl mx-auto">
        <table className="w-full bg-white border border-blue-700 rounded-lg">
          <thead className="bg-blue-100 text-black font-semibold">
            <tr>
              <th className="border border-blue-700 p-3 text-left">Product</th>
              <th className="border border-blue-700 p-3 text-left">Quantity</th>
              <th className="border border-blue-700 p-3 text-left">Price</th>
              <th className="border border-blue-700 p-3 text-left">Total</th>
              <th className="border border-blue-700 p-3 text-left">Customer</th>
              <th className="border border-blue-700 p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-3 font-medium">
                  Loading...
                </td>
              </tr>
            ) : sales.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-3 font-medium">
                  No sales recorded
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale._id} className="hover:bg-blue-50">
                  <td className="border border-blue-700 p-3">{sale.productName}</td>
                  <td className="border border-blue-700 p-3">{sale.quantity}</td>
                  <td className="border border-blue-700 p-3">{sale.price}</td>
                  <td className="border border-blue-700 p-3">{sale.total}</td>
                  <td className="border border-blue-700 p-3">{sale.customerName || "-"}</td>
                  <td className="border border-blue-700 p-3">
                    {new Date(sale.date).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}