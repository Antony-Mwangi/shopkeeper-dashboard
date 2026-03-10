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

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        credentials: "include",
      });

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

  // Add product
  const handleAddProduct = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        credentials: "include",
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
      <div className="flex justify-center items-center min-h-screen">
        Loading products...
      </div>
    );

  return (
    <div className="p-8 space-y-8">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <p className="text-gray-500">
          Manage products in your shop
        </p>
      </div>

      {/* ADD PRODUCT FORM */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <form
          onSubmit={handleAddProduct}
          className="grid md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">
          Product Inventory
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">
            No products added yet.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {product.name}
                  </td>

                  <td className="p-3">
                    {product.category || "General"}
                  </td>

                  <td className="p-3">
                    ${product.price}
                  </td>

                  <td className="p-3">
                    {product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}