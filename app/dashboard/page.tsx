"use client";

import { useState, useEffect } from "react";
import { User, Edit, Trash2, Plus } from "lucide-react";

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
      try {
        const userRes = await fetch("/api/auth/me");
        setUser(await userRes.json());

        const itemsRes = await fetch("/api/items");
        setItems(await itemsRes.json());

        const salesRes = await fetch("/api/sales");
        setSales(await salesRes.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

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
    try {
      await fetch(`/api/items/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const today = new Date().toDateString();
  const thisMonth = new Date().getMonth();
  const dailySales = sales.filter((s) => new Date(s.date).toDateString() === today);
  const monthlySales = sales.filter((s) => new Date(s.date).getMonth() === thisMonth);
  const calcTotal = (arr: Sale[]) => arr.reduce((sum, s) => sum + s.totalPrice, 0);
  const calcNetProfit = (arr: Sale[]) => arr.reduce((sum, s) => sum + (s.totalPrice - s.totalBuyingPrice), 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-blue-700 flex items-center gap-3">
          <User className="w-8 h-8 text-yellow-300" />
          <div>
            <h2 className="font-bold text-lg">{user?.name || "Shopkeeper"}</h2>
            <p className="text-sm text-blue-200">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {["profile", "items", "sales"].map((tab) => (
            <button
              key={tab}
              className={`w-full text-left p-2 rounded hover:bg-yellow-300 hover:text-blue-800 transition ${
                activeTab === tab ? "bg-yellow-300 text-blue-800 font-semibold" : ""
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "profile" && (
          <div className="bg-yellow-100 rounded shadow p-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              Welcome, {user?.name}!
            </h1>
            <div className="text-blue-900 text-lg">
              <p className="mb-2"><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
          </div>
        )}

        {activeTab === "items" && (
          <div className="space-y-6">
            {/* Item Form */}
            <div className="bg-blue-50 p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4 text-blue-900 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {editingItem ? "Edit Item" : "Add Item"}
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Name"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Selling Price"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Buying Price"
                  value={itemForm.buyingPrice}
                  onChange={(e) => setItemForm({ ...itemForm, buyingPrice: Number(e.target.value) })}
                  className="border p-2 rounded"
                />
                <input
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
                  className="bg-blue-800 text-white py-2 rounded hover:bg-blue-900 col-span-1 md:col-span-2"
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </form>
            </div>

            {/* Items List */}
            <div className="bg-blue-50 p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4 text-blue-900">Items</h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item._id} className="flex justify-between items-center border p-2 rounded bg-white">
                    <span className="text-blue-900">{item.name} - ${item.price}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditItem(item)} title="Edit">
                        <Edit className="text-blue-700" />
                      </button>
                      <button onClick={() => handleDeleteItem(item._id)} title="Delete">
                        <Trash2 className="text-red-600" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "sales" && (
          <div className="bg-yellow-100 p-6 rounded shadow space-y-4">
            <h2 className="text-2xl font-semibold text-blue-800">Sales Summary</h2>
            <p className="text-blue-900">Daily Sales: ${calcTotal(dailySales)}</p>
            <p className="text-blue-900">Daily Net Profit: ${calcNetProfit(dailySales)}</p>
            <p className="text-blue-900">Monthly Sales: ${calcTotal(monthlySales)}</p>
            <p className="text-blue-900">Monthly Net Profit: ${calcNetProfit(monthlySales)}</p>
          </div>
        )}
      </main>
    </div>
  );
}