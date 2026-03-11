"use client";

import { useEffect, useState } from "react";
import Product from "@/models/Product"; // just for type reference
import Sale from "@/models/sales"; // just for type reference

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

      if (!res.ok) throw new Error("Failed to record sale");

      setQuantity(1);
      setCustomerName("");
      setSelectedProduct("");
      fetchProducts();
      fetchSales();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Sales</h1>

      {/* Add Sale Form */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <form onSubmit={handleSale} className="flex flex-col gap-4">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} - ${p.price} ({p.quantity} in stock)
              </option>
            ))}
          </select>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            placeholder="Quantity"
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name (optional)"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Record Sale
          </button>
        </form>
      </div>

      {/* Recent Sales */}
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
        {sales.length === 0 ? (
          <p className="text-gray-500">No sales recorded yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2">Product</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{s.productName}</td>
                  <td className="p-2">{s.customerName || "-"}</td>
                  <td className="p-2">{s.quantity}</td>
                  <td className="p-2">${s.price}</td>
                  <td className="p-2">${s.total}</td>
                  <td className="p-2">{new Date(s.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}