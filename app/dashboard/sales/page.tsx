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

export default function SalesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [form, setForm] = useState({ productId: "", quantity: 1, customer: "" });

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setProducts);
    fetch("/api/sales").then(r => r.json()).then(setSales);
  }, []);

  const createSale = async (e: any) => {
    e.preventDefault();

    await fetch("/api/sales", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setForm({ productId: "", quantity: 1, customer: "" });
    location.reload();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">

      {/* FORM */}
      <form onSubmit={createSale} className="bg-white p-5 rounded-xl shadow border space-y-4">
        <h2 className="font-bold">New Sale</h2>

        <select
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          className="input"
        >
          <option>Select product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.quantity})
            </option>
          ))}
        </select>

        <input type="number" className="input"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />

        <input className="input"
          placeholder="Customer"
          value={form.customer}
          onChange={(e) => setForm({ ...form, customer: e.target.value })}
        />

        <button className="btn w-full">Create</button>
      </form>

      {/* TABLE */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow border overflow-x-auto">
        <table className="min-w-[650px] w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="th">Product</th>
              <th className="th">Qty</th>
              <th className="th">Total</th>
              <th className="th">Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="td">{s.productName}</td>
                <td className="td">{s.quantity}</td>
                <td className="td">Ksh {s.total}</td>
                <td className="td">{new Date(s.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}