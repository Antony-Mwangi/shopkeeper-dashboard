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
import { Package, Plus, Search, Tag } from "lucide-react";

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

  // Theme Constants (Reduced Contrast)
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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgMain}`}>
        <div className={`w-10 h-10 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin`} />
      </div>
    );

  return (
    <div className={`min-h-screen ${bgMain} p-6 md:p-10 space-y-10`}>
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto flex justify-between items-end">
        <div>
          <h1 className={`text-xl font-semibold uppercase tracking-widest ${textMain}`}>
            Inventory Manager
          </h1>
          <p className={`text-xs ${textMuted} mt-1`}>
            Catalog and stock level control
          </p>
        </div>
        <div className={`hidden md:block text-right`}>
          <span className={`text-[10px] font-bold ${textMuted} uppercase`}>Total SKU Count</span>
          <p className={`text-lg font-medium ${textMain}`}>{products.length}</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
        
        {/* ADD PRODUCT FORM SECTION */}
        <section className={`${bgCard} p-6 rounded-lg border ${borderSubtle}`}>
          <div className="flex items-center gap-2 mb-6">
            <Plus size={16} className={textMuted} />
            <h2 className={`text-sm font-bold ${textMain} uppercase tracking-tight`}>
              Register New Asset
            </h2>
          </div>

          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className={`text-[10px] font-bold ${textMuted} uppercase ml-1`}>Item Name</label>
              <input
                type="text"
                placeholder="Product title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full ${inputBg} border ${borderSubtle} rounded p-2.5 text-sm ${textMain} outline-none focus:border-slate-400 transition-colors`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-[10px] font-bold ${textMuted} uppercase ml-1`}>Unit Price</label>
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className={`w-full ${inputBg} border ${borderSubtle} rounded p-2.5 text-sm ${textMain} outline-none focus:border-slate-400 transition-colors`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-[10px] font-bold ${textMuted} uppercase ml-1`}>Stock Qty</label>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className={`w-full ${inputBg} border ${borderSubtle} rounded p-2.5 text-sm ${textMain} outline-none focus:border-slate-400 transition-colors`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-[10px] font-bold ${textMuted} uppercase ml-1`}>Category</label>
              <input
                type="text"
                placeholder="Type"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full ${inputBg} border ${borderSubtle} rounded p-2.5 text-sm ${textMain} outline-none focus:border-slate-400 transition-colors`}
              />
            </div>

            <button
              type="submit"
              className={`md:col-span-4 mt-2 bg-slate-400 text-slate-100 py-3 rounded text-sm font-bold hover:bg-slate-500 transition-all uppercase tracking-widest shadow-sm`}
            >
              Add to Inventory
            </button>
          </form>
        </section>

        {/* INVENTORY TABLE SECTION */}
        <section className={`${bgCard} rounded-lg border ${borderSubtle} overflow-hidden`}>
          <div className={`p-4 border-b ${borderSubtle} flex justify-between items-center bg-slate-200/50`}>
            <div className="flex items-center gap-2">
              <Package size={16} className={textMuted} />
              <h2 className={`text-sm font-bold ${textMain} uppercase`}>Current Stock Levels</h2>
            </div>
            <div className="relative">
              <Search size={14} className={`absolute left-2.5 top-2.5 ${textMuted}`} />
              <input 
                type="text" 
                placeholder="Filter..." 
                className={`bg-slate-100 border ${borderSubtle} rounded pl-8 pr-2 py-1.5 text-xs ${textMain} outline-none`}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {products.length === 0 ? (
              <div className={`p-20 text-center`}>
                <p className={`text-sm ${textMuted}`}>No inventory records found.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${borderSubtle} bg-slate-300/20`}>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase`}>Product Details</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase`}>Classification</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-right`}>Unit Price</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-right`}>Availability</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${borderSubtle}`}>
                  {products.map((product) => (
                    <tr key={product._id} className={`hover:bg-slate-300/10 transition-colors`}>
                      <td className={`p-4`}>
                        <div className={`text-sm font-medium ${textMain}`}>{product.name}</div>
                        <div className={`text-[10px] ${textMuted} font-mono mt-0.5`}>ID: {product._id.slice(-6).toUpperCase()}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border ${borderSubtle} text-[10px] font-medium ${textMuted} bg-slate-100`}>
                          <Tag size={10} />
                          {product.category || "General"}
                        </span>
                      </td>
                      <td className={`p-4 text-sm font-bold ${textMain} text-right`}>
                        ${product.price.toFixed(2)}
                      </td>
                      <td className={`p-4 text-right`}>
                        <div className={`text-sm font-bold ${Number(product.quantity) < 10 ? 'text-slate-400' : textMain}`}>
                          {product.quantity}
                        </div>
                        <div className={`text-[9px] uppercase font-bold tracking-tighter ${textMuted}`}>Units</div>
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