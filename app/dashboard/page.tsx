"use client";

import { useState, useEffect } from "react";
import { Loader2, User, Edit, Trash2 } from "lucide-react";

// Types
type Item = {
  _id: string;
  name: string;
  price: number;
  buyingPrice: number;
  quantity: number;
  category?: string;
};

type Sale = {
  _id: string;
  itemId: string;
  quantity: number;
  totalPrice: number;
  totalBuyingPrice: number;
  date: string;
};

type UserProfile = {
  name: string;
  email: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  const [loading, setLoading] = useState(false);

  const [itemForm, setItemForm] = useState({
    name: "",
    price: 0,
    buyingPrice: 0,
    quantity: 0,
    category: "",
  });

  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Load user and items
  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const userRes = await fetch("/api/auth/me");
        const userData: UserProfile = await userRes.json();
        setUser(userData);

        const itemsRes = await fetch("/api/items");
        const itemsData: Item[] = await itemsRes.json();
        setItems(itemsData);

        const salesRes = await fetch("/api/sales");
        const salesData: Sale[] = await salesRes.json();
        setSales(salesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Add or Edit Item
  const handleSubmitItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingItem ? `/api/items/${editingItem._id}` : "/api/items";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemForm),
      });

      const savedItem: Item = await res.json();

      if (editingItem) {
        setItems((prev) =>
          prev.map((it) => (it._id === savedItem._id ? savedItem : it))
        );
      } else {
        setItems((prev) => [...prev, savedItem]);
      }

      setItemForm({ name: "", price: 0, buyingPrice: 0, quantity: 0, category: "" });
      setEditingItem(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      price: item.price,
      buyingPrice: item.buyingPrice,
      quantity: item.quantity,
      category: item.category || "",
    });
  };

  const handleDeleteItem = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`/api/items/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Sales calculations
  const today = new Date().toDateString();
  const thisMonth = new Date().getMonth();

  const dailySales = sales.filter((s) => new Date(s.date).toDateString() === today);
  const monthlySales = sales.filter((s) => new Date(s.date).getMonth() === thisMonth);

  const calcTotal = (arr: Sale[]) =>
    arr.reduce((sum, s) => sum + s.totalPrice, 0);
  const calcNetProfit = (arr: Sale[]) =>
    arr.reduce((sum, s) => sum + (s.totalPrice - s.totalBuyingPrice), 0);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Welcome back, {user?.name || "Shopkeeper"}!
      </h1>

      {loading && <Loader2 className="animate-spin" />}

      {/* Items Form */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>
        <form onSubmit={handleSubmitItem} className="flex flex-col gap-2">
          <input
            required
            placeholder="Name"
            value={itemForm.name}
            onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            required
            type="number"
            placeholder="Selling Price"
            value={itemForm.price}
            onChange={(e) =>
              setItemForm({ ...itemForm, price: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
          <input
            required
            type="number"
            placeholder="Buying Price"
            value={itemForm.buyingPrice}
            onChange={(e) =>
              setItemForm({ ...itemForm, buyingPrice: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
          <input
            required
            type="number"
            placeholder="Quantity"
            value={itemForm.quantity}
            onChange={(e) =>
              setItemForm({ ...itemForm, quantity: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
          <input
            placeholder="Category"
            value={itemForm.category}
            onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {editingItem ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      {/* Items List */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Items</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item._id} className="flex justify-between items-center border p-2 rounded">
              <span>{item.name} - ${item.price}</span>
              <div className="flex gap-2">
                <button onClick={() => handleEditItem(item)} title="Edit">
                  <Edit />
                </button>
                <button onClick={() => handleDeleteItem(item._id)} title="Delete">
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sales Summary */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">Sales Summary</h2>
        <p>Daily Sales: ${calcTotal(dailySales)}</p>
        <p>Daily Net Profit: ${calcNetProfit(dailySales)}</p>
        <p>Monthly Sales: ${calcTotal(monthlySales)}</p>
        <p>Monthly Net Profit: ${calcNetProfit(monthlySales)}</p>
      </div>
    </div>
  );
}