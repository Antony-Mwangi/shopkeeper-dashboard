
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

//   // Unified Theme Constants
//   const bgMain = "bg-slate-100";
//   const bgCard = "bg-slate-200";
//   const borderSubtle = "border-slate-300";
//   const textMain = "text-slate-600";
//   const textMuted = "text-slate-500";
//   const inputBg = "bg-slate-50";

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

//   if (loading) return (
//     <div className={`flex justify-center items-center min-h-screen ${bgMain} ${textMuted}`}>
//       <span className="animate-pulse">Loading inventory records...</span>
//     </div>
//   );

//   return (
//     <div className={`min-h-screen ${bgMain} p-6 md:p-10 space-y-10`}>
//       {/* HEADER SECTION */}
//       <header className="max-w-6xl mx-auto">
//         <h1 className={`text-xl font-semibold uppercase tracking-widest ${textMain}`}>Inventory Management</h1>
//         <p className={`text-xs ${textMuted} mt-1`}>Add and monitor products within the catalog.</p>
//       </header>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
//         {/* ADD PRODUCT FORM */}
//         <section className={`${bgCard} p-6 rounded-lg border ${borderSubtle}`}>
//           <h2 className={`text-sm font-bold ${textMain} mb-5 uppercase`}>New Entry</h2>
//           <form onSubmit={handleAddProduct} className="flex flex-col gap-5">
//             <div>
//               <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Product Name</label>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Price</label>
//                 <input
//                   type="number"
//                   placeholder="0.00"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                   className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
//                 />
//               </div>
//               <div>
//                 <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Quantity</label>
//                 <input
//                   type="number"
//                   placeholder="Stock"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                   required
//                   className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Category</label>
//               <input
//                 type="text"
//                 placeholder="Tag"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
//               />
//             </div>

//             <button
//               type="submit"
//               className={`mt-2 bg-slate-400 text-slate-100 py-2.5 rounded text-sm font-bold hover:bg-slate-500 transition-colors shadow-sm`}
//             >
//               Add Product
//             </button>
//           </form>
//         </section>

//         {/* PRODUCT TABLE */}
//         <section className={`lg:col-span-2 ${bgCard} rounded-lg border ${borderSubtle} overflow-hidden`}>
//           <div className="p-6 border-b border-slate-300 bg-slate-200/50">
//             <h2 className={`text-sm font-bold ${textMain} uppercase`}>Live Inventory</h2>
//           </div>
          
//           <div className="overflow-x-auto">
//             {products.length === 0 ? (
//               <p className={`p-10 text-center text-sm ${textMuted}`}>No items currently in stock.</p>
//             ) : (
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className={`border-b ${borderSubtle} bg-slate-300/30`}>
//                     <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase`}>Details</th>
//                     <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase`}>Category</th>
//                     <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-right`}>Price</th>
//                     <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-right`}>Availability</th>
//                   </tr>
//                 </thead>
//                 <tbody className={`divide-y ${borderSubtle}`}>
//                   {products.map((p) => (
//                     <tr key={p._id} className={`hover:bg-slate-300/20 transition-colors`}>
//                       <td className={`p-4 text-sm font-medium ${textMain}`}>{p.name}</td>
//                       <td className={`p-4 text-[10px] uppercase font-bold tracking-tight ${textMuted}`}>
//                         {p.category || "General"}
//                       </td>
//                       <td className={`p-4 text-sm font-bold ${textMain} text-right`}>${Number(p.price).toFixed(2)}</td>
//                       <td className={`p-4 text-right`}>
//                         <div className={`text-sm font-bold ${textMain}`}>{p.quantity}</div>
//                         <div className={`text-[9px] uppercase tracking-tighter ${textMuted}`}>Units remaining</div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </section>
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

  const [editing, setEditing] = useState<Product | null>(null);

  /* ================= FETCH ================= */
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= CREATE ================= */
  const handleAdd = async (e: any) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        quantity: Number(quantity),
        category,
      }),
    });

    setName("");
    setPrice("");
    setQuantity("");
    setCategory("");

    fetchProducts();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });

    fetchProducts();
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!editing) return;

    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: editing._id,
        name: editing.name,
        price: editing.price,
        quantity: editing.quantity,
        category: editing.category,
      }),
    });

    setEditing(null);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10 space-y-10 text-black">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold uppercase tracking-widest text-black">
          Inventory Management
        </h1>
        <p className="text-sm text-black mt-1">
          Add, update, and manage your products.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="bg-slate-200 border border-slate-300 rounded-lg p-6">

          <h2 className="text-sm font-bold uppercase mb-5 text-black">
            Add Product
          </h2>

          <form onSubmit={handleAdd} className="flex flex-col gap-4">

            <input
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border border-slate-300 rounded bg-slate-50 text-black"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-3 border border-slate-300 rounded bg-slate-50 text-black"
              required
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="p-3 border border-slate-300 rounded bg-slate-50 text-black"
              required
            />

            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border border-slate-300 rounded bg-slate-50 text-black"
            />

            <button className="bg-slate-700 text-white py-2.5 rounded font-bold hover:bg-slate-800">
              Add Product
            </button>

          </form>
        </div>

        {/* TABLE */}
        <div className="lg:col-span-2 bg-slate-200 border border-slate-300 rounded-lg overflow-hidden">

          <div className="p-6 border-b border-slate-300">
            <h2 className="text-sm font-bold uppercase text-black">
              Product List
            </h2>
          </div>

          <div className="overflow-x-auto">

            {products.length === 0 ? (
              <p className="p-10 text-center text-black">
                No products available.
              </p>
            ) : (
              <table className="w-full text-black">

                <thead className="bg-slate-300/40">
                  <tr>
                    <th className="p-4 text-left text-xs uppercase">Name</th>
                    <th className="p-4 text-left text-xs uppercase">Category</th>
                    <th className="p-4 text-right text-xs uppercase">Price</th>
                    <th className="p-4 text-right text-xs uppercase">Qty</th>
                    <th className="p-4 text-center text-xs uppercase">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-300">

                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-300/20">

                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4">{p.category || "General"}</td>
                      <td className="p-4 text-right font-bold">
                        ${Number(p.price).toFixed(2)}
                      </td>
                      <td className="p-4 text-right">{p.quantity}</td>

                      <td className="p-4 flex justify-center gap-2">

                        <button
                          onClick={() => setEditing(p)}
                          className="bg-slate-700 text-white px-3 py-1 rounded text-xs hover:bg-slate-800"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96 space-y-4 text-black">

            <h2 className="font-bold text-lg">Edit Product</h2>

            <input
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              className="w-full border p-3 rounded text-black"
            />

            <input
              type="number"
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: Number(e.target.value) })
              }
              className="w-full border p-3 rounded text-black"
            />

            <input
              type="number"
              value={editing.quantity}
              onChange={(e) =>
                setEditing({ ...editing, quantity: Number(e.target.value) })
              }
              className="w-full border p-3 rounded text-black"
            />

            <input
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
              className="w-full border p-3 rounded text-black"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditing(null)}>Cancel</button>
              <button
                onClick={handleUpdate}
                className="bg-slate-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}