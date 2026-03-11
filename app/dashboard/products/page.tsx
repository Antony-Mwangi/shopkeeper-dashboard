

// "use client";

// import { useEffect, useState } from "react";

// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   category: string;
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [category, setCategory] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products", { credentials: "include" });
//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           price: Number(price),
//           quantity: Number(quantity),
//           category,
//         }),
//       });

//       if (res.ok) {
//         setName("");
//         setPrice("");
//         setQuantity("");
//         setCategory("");
//         fetchProducts();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#f5f5f5] p-8 space-y-8">

//       {/* PAGE HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold text-[#1a1a1a]">
//           Inventory Management
//         </h1>
//         <p className="text-[#4b3f2f] mt-1">Manage products in your shop</p>
//       </div>

//       {/* ADD PRODUCT FORM */}
//       <div className="bg-[#ffffff] shadow-lg rounded-xl p-6 border border-[#d1bfa7]">
//         <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">Add New Product</h2>

//         <form onSubmit={handleAddProduct} className="grid md:grid-cols-4 gap-4">

//           <input
//             type="text"
//             placeholder="Product name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="border border-[#d1bfa7] rounded-lg p-3 text-[#1a1a1a] focus:ring-2 focus:ring-blue-600 outline-none"
//           />

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="border border-[#d1bfa7] rounded-lg p-3 text-[#1a1a1a] focus:ring-2 focus:ring-blue-600 outline-none"
//           />

//           <input
//             type="number"
//             placeholder="Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             required
//             className="border border-[#d1bfa7] rounded-lg p-3 text-[#1a1a1a] focus:ring-2 focus:ring-blue-600 outline-none"
//           />

//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border border-[#d1bfa7] rounded-lg p-3 text-[#1a1a1a] focus:ring-2 focus:ring-blue-600 outline-none"
//           />

//           <button
//             type="submit"
//             className="md:col-span-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>

//       {/* PRODUCT TABLE */}
//       <div className="bg-[#ffffff] shadow-lg rounded-xl p-6 border border-[#d1bfa7] overflow-x-auto">

//         <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">Product Inventory</h2>

//         {products.length === 0 ? (
//           <p className="text-[#4b3f2f]">No products added yet.</p>
//         ) : (
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-[#f0ece5] text-[#1a1a1a] border-b border-[#d1bfa7]">
//                 <th className="p-4 text-left">Product</th>
//                 <th className="p-4 text-left">Category</th>
//                 <th className="p-4 text-left">Price</th>
//                 <th className="p-4 text-left">Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id} className="border-b border-[#d1bfa7] hover:bg-[#f9f7f2] transition">
//                   <td className="p-4 font-medium text-[#1a1a1a]">{p.name}</td>
//                   <td className="p-4 text-[#4b3f2f]">{p.category || "General"}</td>
//                   <td className="p-4 text-[#1a1a1a]">${p.price}</td>
//                   <td className="p-4 text-[#1a1a1a]">{p.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

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
  category: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Unified Theme Constants
  const bgMain = "bg-slate-100";
  const bgCard = "bg-slate-200";
  const borderSubtle = "border-slate-300";
  const textMain = "text-slate-600";
  const textMuted = "text-slate-500";
  const inputBg = "bg-slate-50";

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", { credentials: "include" });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          quantity: Number(quantity),
          category,
        }),
      });

      if (res.ok) {
        setName("");
        setPrice("");
        setQuantity("");
        setCategory("");
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className={`flex justify-center items-center min-h-screen ${bgMain} ${textMuted}`}>
      <span className="animate-pulse">Loading inventory records...</span>
    </div>
  );

  return (
    <div className={`min-h-screen ${bgMain} p-6 md:p-10 space-y-10`}>
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto">
        <h1 className={`text-xl font-semibold uppercase tracking-widest ${textMain}`}>Inventory Management</h1>
        <p className={`text-xs ${textMuted} mt-1`}>Add and monitor products within the catalog.</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ADD PRODUCT FORM */}
        <section className={`${bgCard} p-6 rounded-lg border ${borderSubtle}`}>
          <h2 className={`text-sm font-bold ${textMain} mb-5 uppercase`}>New Entry</h2>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-5">
            <div>
              <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Product Name</label>
              <input
                type="text"
                placeholder="Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Price</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
                />
              </div>
              <div>
                <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Quantity</label>
                <input
                  type="number"
                  placeholder="Stock"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Category</label>
              <input
                type="text"
                placeholder="Tag"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
              />
            </div>

            <button
              type="submit"
              className={`mt-2 bg-slate-400 text-slate-100 py-2.5 rounded text-sm font-bold hover:bg-slate-500 transition-colors shadow-sm`}
            >
              Add Product
            </button>
          </form>
        </section>

        {/* PRODUCT TABLE */}
        <section className={`lg:col-span-2 ${bgCard} rounded-lg border ${borderSubtle} overflow-hidden`}>
          <div className="p-6 border-b border-slate-300 bg-slate-200/50">
            <h2 className={`text-sm font-bold ${textMain} uppercase`}>Live Inventory</h2>
          </div>
          
          <div className="overflow-x-auto">
            {products.length === 0 ? (
              <p className={`p-10 text-center text-sm ${textMuted}`}>No items currently in stock.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${borderSubtle} bg-slate-300/30`}>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase`}>Details</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase`}>Category</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-right`}>Price</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-right`}>Availability</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${borderSubtle}`}>
                  {products.map((p) => (
                    <tr key={p._id} className={`hover:bg-slate-300/20 transition-colors`}>
                      <td className={`p-4 text-sm font-medium ${textMain}`}>{p.name}</td>
                      <td className={`p-4 text-[10px] uppercase font-bold tracking-tight ${textMuted}`}>
                        {p.category || "General"}
                      </td>
                      <td className={`p-4 text-sm font-bold ${textMain} text-right`}>${Number(p.price).toFixed(2)}</td>
                      <td className={`p-4 text-right`}>
                        <div className={`text-sm font-bold ${textMain}`}>{p.quantity}</div>
                        <div className={`text-[9px] uppercase tracking-tighter ${textMuted}`}>Units remaining</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}