// "use client";

// import { useEffect, useState } from "react";
// import Product from "@/models/Product"; // just for type reference
// import Sale from "@/models/sales"; // just for type reference

// type ProductType = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// type SaleType = {
//   _id: string;
//   productName: string;
//   quantity: number;
//   price: number;
//   total: number;
//   date: string;
//   customerName?: string;
// };

// export default function SalesPage() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [sales, setSales] = useState<SaleType[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [customerName, setCustomerName] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     const res = await fetch("/api/products");
//     const data = await res.json();
//     setProducts(data);
//   };

//   const fetchSales = async () => {
//     const res = await fetch("/api/sales");
//     const data = await res.json();
//     setSales(data);
//   };

//   useEffect(() => {
//     Promise.all([fetchProducts(), fetchSales()]).finally(() => setLoading(false));
//   }, []);

//   const handleSale = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedProduct || quantity <= 0) return;

//     try {
//       const res = await fetch("/api/sales", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productId: selectedProduct, quantity, customerName }),
//       });

//       if (!res.ok) throw new Error("Failed to record sale");

//       setQuantity(1);
//       setCustomerName("");
//       setSelectedProduct("");
//       fetchProducts();
//       fetchSales();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

//   return (
//     <div className="p-8 space-y-8">
//       <h1 className="text-3xl font-bold">Sales</h1>

//       {/* Add Sale Form */}
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//         <form onSubmit={handleSale} className="flex flex-col gap-4">
//           <select
//             value={selectedProduct}
//             onChange={(e) => setSelectedProduct(e.target.value)}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="">Select Product</option>
//             {products.map((p) => (
//               <option key={p._id} value={p._id}>
//                 {p.name} - ${p.price} ({p.quantity} in stock)
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             min={1}
//             placeholder="Quantity"
//             className="border p-2 rounded"
//             required
//           />

//           <input
//             type="text"
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             placeholder="Customer Name (optional)"
//             className="border p-2 rounded"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Record Sale
//           </button>
//         </form>
//       </div>

//       {/* Recent Sales */}
//       <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
//         <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
//         {sales.length === 0 ? (
//           <p className="text-gray-500">No sales recorded yet.</p>
//         ) : (
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b bg-gray-100">
//                 <th className="p-2">Product</th>
//                 <th className="p-2">Customer</th>
//                 <th className="p-2">Quantity</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Total</th>
//                 <th className="p-2">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sales.map((s) => (
//                 <tr key={s._id} className="border-b hover:bg-gray-50">
//                   <td className="p-2">{s.productName}</td>
//                   <td className="p-2">{s.customerName || "-"}</td>
//                   <td className="p-2">{s.quantity}</td>
//                   <td className="p-2">${s.price}</td>
//                   <td className="p-2">${s.total}</td>
//                   <td className="p-2">{new Date(s.date).toLocaleString()}</td>
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

type ProductType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type SaleType = {
  _id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  customerName?: string;
};

export default function SalesPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [sales, setSales] = useState<SaleType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(true);

  // Low Contrast Theme Constants
  const bgMain = "bg-slate-100";
  const bgCard = "bg-slate-200";
  const borderSubtle = "border-slate-300";
  const textMain = "text-slate-600";
  const textMuted = "text-slate-500";
  const inputBg = "bg-slate-50";

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchSales = async () => {
    const res = await fetch("/api/sales");
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchSales()]).finally(() => setLoading(false));
  }, []);

  const handleSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || quantity <= 0) return;
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: selectedProduct, quantity, customerName }),
      });
      if (!res.ok) throw new Error("Failed");
      setQuantity(1);
      setCustomerName("");
      setSelectedProduct("");
      fetchProducts();
      fetchSales();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className={`flex justify-center items-center min-h-screen ${bgMain} ${textMuted}`}>
      <span className="animate-pulse">Initializing sales module...</span>
    </div>
  );

  return (
    <div className={`min-h-screen ${bgMain} p-6 md:p-10 space-y-10`}>
      <header className="max-w-6xl mx-auto">
        <h1 className={`text-xl font-semibold uppercase tracking-widest ${textMain}`}>Sales Ledger</h1>
        <p className={`text-xs ${textMuted} mt-1`}>Transaction record and inventory deduction.</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ADD SALE FORM */}
        <section className={`${bgCard} p-6 rounded-lg border ${borderSubtle}`}>
          <h2 className={`text-sm font-bold ${textMain} mb-5 uppercase`}>New Transaction</h2>
          <form onSubmit={handleSale} className="flex flex-col gap-5">
            <div>
              <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Select Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
                required
              >
                <option value="">Choose item...</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} — ${p.price} ({p.quantity} avail.)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
                  required
                />
              </div>
              <div>
                <label className={`block text-[10px] font-bold ${textMuted} mb-1 uppercase`}>Customer</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Optional"
                  className={`w-full ${inputBg} ${borderSubtle} border p-2.5 rounded text-sm ${textMain} outline-none focus:ring-1 focus:ring-slate-400`}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`mt-2 bg-slate-400 text-slate-100 py-2.5 rounded text-sm font-bold hover:bg-slate-500 transition-colors shadow-sm`}
            >
              Commit Transaction
            </button>
          </form>
        </section>

        {/* RECENT SALES TABLE */}
        <section className={`lg:col-span-2 ${bgCard} rounded-lg border ${borderSubtle} overflow-hidden`}>
          <div className="p-6 border-b border-slate-300 bg-slate-200/50">
            <h2 className={`text-sm font-bold ${textMain} uppercase`}>Recent Activity</h2>
          </div>
          
          <div className="overflow-x-auto">
            {sales.length === 0 ? (
              <p className={`p-10 text-center text-sm ${textMuted}`}>No transaction data found.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${borderSubtle} bg-slate-300/30`}>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase`}>Product</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase`}>Entity</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-center`}>Qty</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-right`}>Total</th>
                    <th className={`p-4 text-[10px] font-bold ${textMuted} uppercase text-right`}>Timestamp</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${borderSubtle}`}>
                  {sales.map((s) => (
                    <tr key={s._id} className={`hover:bg-slate-300/20 transition-colors`}>
                      <td className={`p-4 text-sm font-medium ${textMain}`}>{s.productName}</td>
                      <td className={`p-4 text-sm ${textMuted}`}>{s.customerName || "General Sale"}</td>
                      <td className={`p-4 text-sm ${textMain} text-center`}>{s.quantity}</td>
                      <td className={`p-4 text-sm font-bold ${textMain} text-right`}>${s.total.toFixed(2)}</td>
                      <td className={`p-4 text-[11px] ${textMuted} text-right whitespace-nowrap`}>
                        {new Date(s.date).toLocaleDateString()} 
                        <span className="ml-2 opacity-60">{new Date(s.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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