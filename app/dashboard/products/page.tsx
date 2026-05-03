

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

//   const [editing, setEditing] = useState<Product | null>(null);

//   /* ================= FETCH ================= */
//   const fetchProducts = async () => {
//     const res = await fetch("/api/products");
//     const data = await res.json();
//     setProducts(data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   /* ================= CREATE ================= */
//   const handleAdd = async (e: any) => {
//     e.preventDefault();

//     await fetch("/api/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         price: Number(price),
//         quantity: Number(quantity),
//         category,
//       }),
//     });

//     setName("");
//     setPrice("");
//     setQuantity("");
//     setCategory("");

//     fetchProducts();
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id: string) => {
//     await fetch("/api/products", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ productId: id }),
//     });

//     fetchProducts();
//   };

//   /* ================= UPDATE ================= */
//   const handleUpdate = async () => {
//     if (!editing) return;

//     await fetch("/api/products", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         productId: editing._id,
//         name: editing.name,
//         price: editing.price,
//         quantity: editing.quantity,
//         category: editing.category,
//       }),
//     });

//     setEditing(null);
//     fetchProducts();
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-6 md:p-10 space-y-10 text-black">

//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-xl font-bold uppercase tracking-widest text-black">
//           Inventory Management
//         </h1>
//         <p className="text-sm text-black mt-1">
//           Add, update, and manage your products.
//         </p>
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* FORM */}
//         <div className="bg-slate-200 border border-slate-300 rounded-lg p-6">

//           <h2 className="text-sm font-bold uppercase mb-5 text-black">
//             Add Product
//           </h2>

//           <form onSubmit={handleAdd} className="flex flex-col gap-4">

//             <input
//               placeholder="Product name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="p-3 border border-slate-300 rounded bg-slate-50 text-black"
//               required
//             />

//             <input
//               type="number"
//               placeholder="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="p-3 border border-slate-300 rounded bg-slate-50 text-black"
//               required
//             />

//             <input
//               type="number"
//               placeholder="Quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               className="p-3 border border-slate-300 rounded bg-slate-50 text-black"
//               required
//             />

//             <input
//               placeholder="Category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="p-3 border border-slate-300 rounded bg-slate-50 text-black"
//             />

//             <button className="bg-slate-700 text-white py-2.5 rounded font-bold hover:bg-slate-800">
//               Add Product
//             </button>

//           </form>
//         </div>

//         {/* TABLE */}
//         <div className="lg:col-span-2 bg-slate-200 border border-slate-300 rounded-lg overflow-hidden">

//           <div className="p-6 border-b border-slate-300">
//             <h2 className="text-sm font-bold uppercase text-black">
//               Product List
//             </h2>
//           </div>

//           <div className="overflow-x-auto">

//             {products.length === 0 ? (
//               <p className="p-10 text-center text-black">
//                 No products available.
//               </p>
//             ) : (
//               <table className="w-full text-black">

//                 <thead className="bg-slate-300/40">
//                   <tr>
//                     <th className="p-4 text-left text-xs uppercase">Name</th>
//                     <th className="p-4 text-left text-xs uppercase">Category</th>
//                     <th className="p-4 text-right text-xs uppercase">Price</th>
//                     <th className="p-4 text-right text-xs uppercase">Qty</th>
//                     <th className="p-4 text-center text-xs uppercase">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-300">

//                   {products.map((p) => (
//                     <tr key={p._id} className="hover:bg-slate-300/20">

//                       <td className="p-4 font-medium">{p.name}</td>
//                       <td className="p-4">{p.category || "General"}</td>
//                       <td className="p-4 text-right font-bold">
//                         Ksh{Number(p.price).toFixed(2)}
//                       </td>
//                       <td className="p-4 text-right">{p.quantity}</td>

//                       <td className="p-4 flex justify-center gap-2">

//                         <button
//                           onClick={() => setEditing(p)}
//                           className="bg-slate-700 text-white px-3 py-1 rounded text-xs hover:bg-slate-800"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           onClick={() => handleDelete(p._id)}
//                           className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
//                         >
//                           Delete
//                         </button>

//                       </td>

//                     </tr>
//                   ))}

//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* EDIT MODAL */}
//       {editing && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-lg w-96 space-y-4 text-black">

//             <h2 className="font-bold text-lg">Edit Product</h2>

//             <input
//               value={editing.name}
//               onChange={(e) =>
//                 setEditing({ ...editing, name: e.target.value })
//               }
//               className="w-full border p-3 rounded text-black"
//             />

//             <input
//               type="number"
//               value={editing.price}
//               onChange={(e) =>
//                 setEditing({ ...editing, price: Number(e.target.value) })
//               }
//               className="w-full border p-3 rounded text-black"
//             />

//             <input
//               type="number"
//               value={editing.quantity}
//               onChange={(e) =>
//                 setEditing({ ...editing, quantity: Number(e.target.value) })
//               }
//               className="w-full border p-3 rounded text-black"
//             />

//             <input
//               value={editing.category}
//               onChange={(e) =>
//                 setEditing({ ...editing, category: e.target.value })
//               }
//               className="w-full border p-3 rounded text-black"
//             />

//             <div className="flex justify-end gap-2">
//               <button onClick={() => setEditing(null)}>Cancel</button>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-slate-700 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

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

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e: any) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        quantity: Number(quantity),
        category,
      }),
    });
    setName(""); setPrice(""); setQuantity(""); setCategory("");
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this product?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });
    fetchProducts();
  };

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
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* HEADER */}
        <header className="border-b border-slate-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
            Inventory Management
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Manage your stock levels, pricing, and product categories.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">

          {/* FORM CARD */}
          <aside className="xl:col-span-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-400">
              New Product
            </h2>

            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Product Name</label>
                <input
                  placeholder="e.g. Wireless Mouse"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1">Price (Ksh)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 ml-1">Stock</label>
                  <input
                    type="number"
                    placeholder="Qty"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Category</label>
                <input
                  placeholder="e.g. Electronics"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>

              <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 mt-2">
                Create Product
              </button>
            </form>
          </aside>

          {/* TABLE CARD */}
          <main className="xl:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Live Inventory ({products.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              {products.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-slate-400 font-medium italic">No products found in the database.</p>
                </div>
              ) : (
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                      <th className="p-4 text-left text-xs font-bold uppercase tracking-tighter">Product Info</th>
                      <th className="p-4 text-left text-xs font-bold uppercase tracking-tighter">Category</th>
                      <th className="p-4 text-right text-xs font-bold uppercase tracking-tighter">Price</th>
                      <th className="p-4 text-right text-xs font-bold uppercase tracking-tighter">Stock</th>
                      <th className="p-4 text-center text-xs font-bold uppercase tracking-tighter">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-black block">{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">{p._id.slice(-8)}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                            {p.category || "General"}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-slate-700">
                          Ksh {Number(p.price).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="p-4 text-right">
                          <span className={`font-bold ${p.quantity < 10 ? 'text-red-500' : 'text-slate-600'}`}>
                            {p.quantity}
                          </span>
                        </td>
                        <td className="p-4">
                          {/* STATIC ACTION BUTTONS */}
                          <div className="flex justify-center items-center gap-1.5">
                            <button
                              onClick={() => setEditing(p)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-black hover:text-black transition-all shadow-sm"
                            >
                              <EditIcon />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(p._id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                            >
                              <DeleteIcon />
                              <span>Del</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-black">Update Product</h2>
              <p className="text-sm text-slate-500">Modify details for {editing.name}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Name</label>
                <input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Price (Ksh)</label>
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Stock Level</label>
                  <input
                    type="number"
                    value={editing.quantity}
                    onChange={(e) => setEditing({ ...editing, quantity: Number(e.target.value) })}
                    className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Category</label>
                <input
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex gap-3">
              <button 
                onClick={() => setEditing(null)}
                className="flex-1 px-4 py-3 font-bold text-slate-600 hover:text-black transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 bg-black text-white px-4 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= ICONS ================= */

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  );
}

function DeleteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  );
}