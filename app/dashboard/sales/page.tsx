// "use client";

// import { useEffect, useState } from "react";

// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// type Sale = {
//   _id: string;
//   productName: string;
//   quantity: number;
//   price: number;
//   total: number;
//   date: string;
//   customerName?: string;
// };

// export default function SalesPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [sales, setSales] = useState<Sale[]>([]);

//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [customerName, setCustomerName] = useState("");

//   const [editingSale, setEditingSale] = useState<Sale | null>(null);
//   const [editQty, setEditQty] = useState(1);
//   const [editCustomer, setEditCustomer] = useState("");

//   //theme
//   const bgMain = "bg-slate-100";
//   const bgCard = "bg-slate-200";
//   const border = "border-slate-300";
//   const textMain = "text-black";        
//   const inputBg = "bg-slate-50";

//   const fetchProducts = async () => {
//     const res = await fetch("/api/products");
//     setProducts(await res.json());
//   };

//   const fetchSales = async () => {
//     const res = await fetch("/api/sales");
//     setSales(await res.json());
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchSales();
//   }, []);

//   //CREATE
//   const handleSale = async (e: any) => {
//     e.preventDefault();

//     await fetch("/api/sales", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         productId: selectedProduct,
//         quantity,
//         customerName,
//       }),
//     });

//     setQuantity(1);
//     setCustomerName("");
//     setSelectedProduct("");

//     fetchProducts();
//     fetchSales();
//   };

  
//   //EDIT
//   const openEdit = (sale: Sale) => {
//     setEditingSale(sale);
//     setEditQty(sale.quantity);
//     setEditCustomer(sale.customerName || "");
//   };

//   const handleUpdate = async () => {
//     if (!editingSale) return;

//     await fetch("/api/sales", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         saleId: editingSale._id,
//         quantity: editQty,
//         customerName: editCustomer,
//       }),
//     });

//     setEditingSale(null);
//     fetchSales();
//     fetchProducts();
//   };

//   return (
//     <div className={`${bgMain} min-h-screen p-6 md:p-10 space-y-10 ${textMain}`}>

//       {/* HEADER */}
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-xl font-semibold uppercase tracking-widest text-black">
//           Sales Ledger
//         </h1>
//         <p className="text-sm text-black mt-1">
//           Manage transactions and track product sales.
//         </p>
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* FORM */}
//         <div className={`${bgCard} border ${border} rounded-lg p-6`}>
//           <h2 className="text-sm font-bold uppercase text-black mb-5">
//             New Transaction
//           </h2>

//           <form onSubmit={handleSale} className="flex flex-col gap-5">

//             <select
//               value={selectedProduct}
//               onChange={(e) => setSelectedProduct(e.target.value)}
//               className={`p-3 rounded ${inputBg} border ${border} text-black`}
//               required
//             >
//               <option value="">Select product</option>
//               {products.map((p) => (
//                 <option key={p._id} value={p._id}>
//                   {p.name} — Ksh{p.price} ({p.quantity} left)
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               className={`p-3 rounded ${inputBg} border ${border} text-black`}
//               required
//             />

//             <input
//               type="text"
//               placeholder="Customer (optional)"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               className={`p-3 rounded ${inputBg} border ${border} text-black`}
//             />

//             <button className="bg-slate-600 text-white py-2.5 rounded font-bold hover:bg-slate-700 transition">
//               Add Sale
//             </button>

//           </form>
//         </div>

//         {/* TABLE */}
//         <div className={`lg:col-span-2 ${bgCard} border ${border} rounded-lg overflow-hidden`}>

//           <div className="p-6 border-b border-slate-300">
//             <h2 className="text-sm font-bold uppercase text-black">
//               Sales Records
//             </h2>
//           </div>

//           <div className="overflow-x-auto">
//             {sales.length === 0 ? (
//               <p className="p-10 text-center text-sm text-black">
//                 No sales recorded.
//               </p>
//             ) : (
//               <table className="w-full text-black">

//                 <thead className="bg-slate-300/40">
//                   <tr>
//                     <th className="p-4 text-left text-xs uppercase">Product</th>
//                     <th className="p-4 text-left text-xs uppercase">Customer</th>
//                     <th className="p-4 text-center text-xs uppercase">Qty</th>
//                     <th className="p-4 text-right text-xs uppercase">Total</th>
//                     <th className="p-4 text-right text-xs uppercase">Date</th>
//                     <th className="p-4 text-center text-xs uppercase">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-300">
//                   {sales.map((s) => (
//                     <tr key={s._id} className="hover:bg-slate-300/20">

//                       <td className="p-4 font-medium">{s.productName}</td>
//                       <td className="p-4">{s.customerName || "—"}</td>
//                       <td className="p-4 text-center">{s.quantity}</td>
//                       <td className="p-4 text-right font-bold">
//                         Ksh{s.total.toFixed(2)}
//                       </td>
//                       <td className="p-4 text-right text-sm">
//                         {new Date(s.date).toLocaleDateString()}
//                       </td>

//                       <td className="p-4 flex justify-center gap-2">

//                         <button
//                           onClick={() => openEdit(s)}
//                           className="px-3 py-1 text-xs bg-slate-600 text-white rounded hover:bg-slate-700"
//                         >
//                           Edit
//                         </button>

//                         {/* <button
//                           onClick={() => handleDelete(s._id)}
//                           className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
//                         >
//                           Delete
//                         </button> */}

//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>

//               </table>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {editingSale && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//           <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-xl text-black">

//             <h2 className="font-bold text-lg">Edit Sale</h2>

//             <input
//               type="number"
//               value={editQty}
//               onChange={(e) => setEditQty(Number(e.target.value))}
//               className="w-full border p-3 rounded text-black"
//             />

//             <input
//               type="text"
//               value={editCustomer}
//               onChange={(e) => setEditCustomer(e.target.value)}
//               className="w-full border p-3 rounded text-black"
//             />

//             <div className="flex justify-end gap-2">
//               <button onClick={() => setEditingSale(null)} className="text-black">
//                 Cancel
//               </button>
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

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");

  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [editQty, setEditQty] = useState(1);
  const [editCustomer, setEditCustomer] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  };

  const fetchSales = async () => {
    const res = await fetch("/api/sales");
    setSales(await res.json());
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const handleSale = async (e: any) => {
    e.preventDefault();
    await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: selectedProduct,
        quantity,
        customerName,
      }),
    });
    setQuantity(1);
    setCustomerName("");
    setSelectedProduct("");
    fetchProducts();
    fetchSales();
  };

  const openEdit = (sale: Sale) => {
    setEditingSale(sale);
    setEditQty(sale.quantity);
    setEditCustomer(sale.customerName || "");
  };

  const handleUpdate = async () => {
    if (!editingSale) return;
    await fetch("/api/sales", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        saleId: editingSale._id,
        quantity: editQty,
        customerName: editCustomer,
      }),
    });
    setEditingSale(null);
    fetchSales();
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* HEADER */}
        <header className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
              Sales Ledger
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Track transactions, manage customers, and monitor revenue flow.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Total Volume</span>
            <span className="text-xl font-black text-black">
              Ksh {sales.reduce((acc, s) => acc + s.total, 0).toLocaleString()}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">

          {/* NEW TRANSACTION FORM */}
          <aside className="xl:col-span-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              New Transaction
            </h2>

            <form onSubmit={handleSale} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Select Product</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Choose item...</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} — Ksh{p.price} ({p.quantity} in stock)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1">Customer Name</label>
                <input
                  type="text"
                  placeholder="Optional"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>

              <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 mt-2">
                Record Sale
              </button>
            </form>
          </aside>

          {/* SALES RECORDS TABLE */}
          <main className="xl:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                Transaction History
              </h2>
            </div>

            <div className="overflow-x-auto">
              {sales.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-slate-400 font-medium italic">No sales recorded yet.</p>
                </div>
              ) : (
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                      <th className="p-4 text-left text-xs font-bold uppercase tracking-tighter">Product</th>
                      <th className="p-4 text-left text-xs font-bold uppercase tracking-tighter">Customer</th>
                      <th className="p-4 text-center text-xs font-bold uppercase tracking-tighter">Qty</th>
                      <th className="p-4 text-right text-xs font-bold uppercase tracking-tighter">Total Amount</th>
                      <th className="p-4 text-right text-xs font-bold uppercase tracking-tighter">Date</th>
                      <th className="p-4 text-center text-xs font-bold uppercase tracking-tighter">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sales.map((s) => (
                      <tr key={s._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-black block">{s.productName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {s._id.slice(-6)}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-medium text-slate-600">
                            {s.customerName || <span className="text-slate-300 italic">Walk-in</span>}
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-slate-700">
                          {s.quantity}
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-sm font-bold text-black bg-slate-100 px-2 py-1 rounded-lg">
                            Ksh {s.total.toLocaleString(undefined, {minimumFractionDigits: 2})}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-xs font-bold text-slate-500">
                            {new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => openEdit(s)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-black hover:text-black transition-all shadow-sm"
                          >
                            <EditIcon />
                            <span>Edit</span>
                          </button>
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

      {/* EDIT SALE MODAL */}
      {editingSale && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-black">Edit Transaction</h2>
                <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500">ID: {editingSale._id.slice(-6)}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">Adjusting sale for <span className="font-bold text-slate-800">{editingSale.productName}</span></p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Quantity Sold</label>
                <input
                  type="number"
                  value={editQty}
                  onChange={(e) => setEditQty(Number(e.target.value))}
                  className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Customer Name</label>
                <input
                  type="text"
                  value={editCustomer}
                  onChange={(e) => setEditCustomer(e.target.value)}
                  className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex gap-3">
              <button 
                onClick={() => setEditingSale(null)}
                className="flex-1 px-4 py-3 font-bold text-slate-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 bg-black text-white px-4 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Update Ledger
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