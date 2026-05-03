

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
                        Ksh{Number(p.price).toFixed(2)}
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