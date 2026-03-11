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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Inventory Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage products in your shop
        </p>
      </div>

      {/* ADD PRODUCT CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add New Product
        </h2>

        <form
          onSubmit={handleAddProduct}
          className="grid md:grid-cols-4 gap-4"
        >

          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="md:col-span-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Product
          </button>

        </form>
      </div>

      {/* PRODUCT TABLE */}
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Product Inventory
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">
            No products added yet.
          </p>
        ) : (

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100 text-gray-700 border-b">

                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Quantity</th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium text-gray-800">
                    {product.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {product.category || "General"}
                  </td>

                  <td className="p-4 text-gray-700">
                    ${product.price}
                  </td>

                  <td className="p-4 text-gray-700">
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