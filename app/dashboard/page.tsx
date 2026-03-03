"use client";

import { useState, useEffect } from "react";
import { Loader2, User, Edit, Trash2, Plus } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"profile" | "items" | "sales">("profile");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const userRes = await fetch("/api/auth/me");
        setUser(await userRes.json());

        const itemsRes = await fetch("/api/items");
        setItems(await itemsRes.json());

        const salesRes = await fetch("/api/sales");
        setSales(await salesRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

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

      setItems((prev) =>
        editingItem ? prev.map((it) => (it._id === savedItem._id ? savedItem : it)) : [...prev, savedItem]
      );
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

  const today = new Date().toDateString();
  const thisMonth = new Date().getMonth();
  const dailySales = sales.filter((s) => new Date(s.date).toDateString() === today);
  const monthlySales = sales.filter((s) => new Date(s.date).getMonth() === thisMonth);
  const calcTotal = (arr: Sale[]) => arr.reduce((sum, s) => sum + s.totalPrice, 0);
  const calcNetProfit = (arr: Sale[]) => arr.reduce((sum, s) => sum + (s.totalPrice - s.totalBuyingPrice), 0);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b flex items-center gap-3">
          <User className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="font-bold">{user?.name || "Shopkeeper"}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            className={`w-full text-left p-2 rounded hover:bg-blue-100 ${activeTab === "profile" ? "bg-blue-100" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`w-full text-left p-2 rounded hover:bg-blue-100 ${activeTab === "items" ? "bg-blue-100" : ""}`}
            onClick={() => setActiveTab("items")}
          >
            Items
          </button>
          <button
            className={`w-full text-left p-2 rounded hover:bg-blue-100 ${activeTab === "sales" ? "bg-blue-100" : ""}`}
            onClick={() => setActiveTab("sales")}
          >
            Sales
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {loading && <Loader2 className="animate-spin mb-4" />}

        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Welcome back, {user?.name}!</h1>
            <p className="mb-2"><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
        )}

        {activeTab === "items" && (
          <div className="space-y-6">
            {/* Item Form */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {editingItem ? "Edit Item" : "Add Item"}
              </h2>
              <form onSubmit={handleSubmitItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                  className="border p-2 rounded"
                />
                <input
                  required
                  type="number"
                  placeholder="Buying Price"
                  value={itemForm.buyingPrice}
                  onChange={(e) => setItemForm({ ...itemForm, buyingPrice: Number(e.target.value) })}
                  className="border p-2 rounded"
                />
                <input
                  required
                  type="number"
                  placeholder="Quantity"
                  value={itemForm.quantity}
                  onChange={(e) => setItemForm({ ...itemForm, quantity: Number(e.target.value) })}
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
                  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 col-span-1 md:col-span-2"
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </form>
            </div>

            {/* Items List */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Items</h2>
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
          </div>
        )}

        {activeTab === "sales" && (
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold mb-2">Sales Summary</h2>
            <p>Daily Sales: ${calcTotal(dailySales)}</p>
            <p>Daily Net Profit: ${calcNetProfit(dailySales)}</p>
            <p>Monthly Sales: ${calcTotal(monthlySales)}</p>
            <p>Monthly Net Profit: ${calcNetProfit(monthlySales)}</p>
          </div>
        )}
      </main>
    </div>
  );
}