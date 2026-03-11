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

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products", {
//         credentials: "include",
//       });

//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Add product
//   const handleAddProduct = async (e: any) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
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
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 space-y-8">

//       {/* PAGE TITLE */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">
//           Inventory Management
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Manage products in your shop
//         </p>
//       </div>

//       {/* ADD PRODUCT CARD */}
//       <div className="bg-white shadow-lg rounded-xl p-6">

//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           Add New Product
//         </h2>

//         <form
//           onSubmit={handleAddProduct}
//           className="grid md:grid-cols-4 gap-4"
//         >

//           <input
//             type="text"
//             placeholder="Product name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <input
//             type="number"
//             placeholder="Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             required
//             className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <button
//             type="submit"
//             className="md:col-span-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//           >
//             Add Product
//           </button>

//         </form>
//       </div>

//       {/* PRODUCT TABLE */}
//       <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">

//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           Product Inventory
//         </h2>

//         {products.length === 0 ? (
//           <p className="text-gray-500">
//             No products added yet.
//           </p>
//         ) : (

//           <table className="w-full border-collapse">

//             <thead>

//               <tr className="bg-gray-100 text-gray-700 border-b">

//                 <th className="p-4 text-left">Product</th>
//                 <th className="p-4 text-left">Category</th>
//                 <th className="p-4 text-left">Price</th>
//                 <th className="p-4 text-left">Quantity</th>

//               </tr>

//             </thead>

//             <tbody>

//               {products.map((product) => (

//                 <tr
//                   key={product._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >

//                   <td className="p-4 font-medium text-gray-800">
//                     {product.name}
//                   </td>

//                   <td className="p-4 text-gray-600">
//                     {product.category || "General"}
//                   </td>

//                   <td className="p-4 text-gray-700">
//                     ${product.price}
//                   </td>

//                   <td className="p-4 text-gray-700">
//                     {product.quantity}
//                   </td>

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
import { Package, Plus, Tag, Hash, DollarSign } from "lucide-react";

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
        setName(""); setPrice(""); setQuantity(""); setCategory("");
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Low-Contrast Theme Classes
  const theme = {
    bg: "bg-slate-50",
    card: "bg-slate-100",
    border: "border-slate-200",
    textMain: "text-slate-600",
    textMuted: "text-slate-400",
    input: "bg-slate-50 focus:bg-white border-slate-200 focus:border-slate-300",
    button: "bg-slate-300 hover:bg-slate-400 text-slate-700"
  };

  if (loading)
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme.bg}`}>
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className={`min-h-screen ${theme.bg} p-6 md:p-10 space-y-8`}>
      
      {/* HEADER */}
      <header className="max-w-6xl mx-auto flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className={`text-xl font-medium tracking-tight ${theme.textMain}`}>
            Inventory Manager
          </h1>
          <p className={`text-xs ${theme.textMuted} mt-0.5`}>Warehouse Stock Control</p>
        </div>
        <div className="text-right">
          <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.textMuted}`}>Total SKUs</p>
          <p className={`text-lg font-light ${theme.textMain}`}>{products.length}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
        
        {/* FORM SECTION */}
        <section className={`${theme.card} p-6 rounded-lg border ${theme.border}`}>
          <div className="flex items-center gap-2 mb-6">
            <Plus size={14} className={theme.textMuted} />
            <h2 className={`text-xs font-bold uppercase tracking-widest ${theme.textMain}`}>New Entry</h2>
          </div>

          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className={`text-[10px] font-bold ${theme.textMuted} uppercase ml-1`}>Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full border rounded p-2 text-sm ${theme.textMain} ${theme.input} outline-none transition-all`}
              />
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] font-bold ${theme.textMuted} uppercase ml-1`}>Price (USD)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className={`w-full border rounded p-2 text-sm ${theme.textMain} ${theme.input} outline-none transition-all`}
              />
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] font-bold ${theme.textMuted} uppercase ml-1`}>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className={`w-full border rounded p-2 text-sm ${theme.textMain} ${theme.input} outline-none transition-all`}
              />
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] font-bold ${theme.textMuted} uppercase ml-1`}>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full border rounded p-2 text-sm ${theme.textMain} ${theme.input} outline-none transition-all`}
              />
            </div>
            <button
              type="submit"
              className={`md:col-span-4 mt-2 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-colors ${theme.button}`}
            >
              Add to Catalog
            </button>
          </form>
        </section>

        {/* TABLE SECTION */}
        <section className={`${theme.card} rounded-lg border ${theme.border} overflow-hidden`}>
          <div className="p-4 border-b border-slate-200 bg-slate-200/30 flex items-center gap-2">
            <Package size={14} className={theme.textMuted} />
            <h2 className={`text-xs font-bold uppercase tracking-widest ${theme.textMain}`}>Current Stock</h2>
          </div>
          
          <div className="overflow-x-auto">
            {products.length === 0 ? (
              <p className={`p-10 text-center text-sm ${theme.textMuted}`}>Inventory empty.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${theme.border} bg-slate-200/20`}>
                    <th className={`p-4 text-[10px] font-bold ${theme.textMuted} uppercase`}>Details</th>
                    <th className={`p-4 text-[10px] font-bold ${theme.textMuted} uppercase`}>Category</th>
                    <th className={`p-4 text-[10px] font-bold ${theme.textMuted} uppercase text-right`}>Pricing</th>
                    <th className={`p-4 text-[10px] font-bold ${theme.textMuted} uppercase text-right`}>In Stock</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme.border}`}>
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-200/20 transition-colors">
                      <td className={`p-4 text-sm ${theme.textMain} font-medium`}>{p.name}</td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${theme.border} ${theme.textMuted} bg-slate-50`}>
                          {p.category || "General"}
                        </span>
                      </td>
                      <td className={`p-4 text-sm ${theme.textMain} text-right font-mono`}>
                        ${p.price.toFixed(2)}
                      </td>
                      <td className={`p-4 text-right`}>
                        <span className={`text-sm ${theme.textMain} font-bold`}>{p.quantity}</span>
                        <span className={`text-[10px] ${theme.textMuted} ml-1`}>units</span>
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