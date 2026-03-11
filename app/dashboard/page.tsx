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

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type Sale = {
  _id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  customerName?: string;
};

export default function RecordSalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    async function fetchSales() {
      const res = await fetch("/api/sales");
      const data = await res.json();
      setSales(data);
    }
    fetchProducts();
    fetchSales();
  }, []);

  async function handleSale(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: selectedProduct, quantity, customerName }),
    });
    setQuantity(1);
    setCustomerName("");
    setSelectedProduct("");
    const res = await fetch("/api/sales");
    const data = await res.json();
    setSales(data);
  }

  const selectedProductDetails = products.find(p => p._id === selectedProduct);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* PAGE TITLE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Record Sale</h1>
        <p className="text-gray-500 mt-1">Process customer purchases</p>
      </div>

      {/* SALE FORM CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">New Sale Transaction</h2>

        <form onSubmit={handleSale} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="" disabled>Choose a product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} - ${p.price} ({p.quantity} in stock)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                min={1}
                max={selectedProductDetails?.quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {selectedProductDetails && (
                <p className="text-sm text-gray-500 mt-1">
                  Available: {selectedProductDetails.quantity} units
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name (optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Record Sale
            </button>
          </div>

        </form>
      </div>

      {/* RECENT SALES CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Sales</h2>
          <span className="text-sm text-gray-500">{sales.length} transactions</span>
        </div>

        {sales.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No sales recorded yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Qty</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr 
                    key={sale._id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-800">{sale.productName}</td>
                    <td className="p-4 text-gray-600">{sale.customerName || "—"}</td>
                    <td className="p-4 text-gray-700">{sale.quantity}</td>
                    <td className="p-4 text-gray-700">${sale.price}</td>
                    <td className="p-4 font-medium text-gray-800">${sale.total}</td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(sale.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}