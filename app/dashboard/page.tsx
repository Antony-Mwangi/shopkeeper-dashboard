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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-700 flex items-center gap-3">
          <User className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="font-bold text-lg">{user?.name || "Shopkeeper"}</h2>
            <p className="text-sm text-gray-300">{user?.email || "email@example.com"}</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {["profile", "items", "sales"].map((tab) => (
            <button
              key={tab}
              className={`w-full text-left p-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition ${
                activeTab === tab ? "bg-yellow-400 text-gray-900 font-semibold" : ""
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded shadow p-6 md:p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Welcome, {user?.name || "User"}!
            </h1>
            <div className="text-gray-700 text-lg space-y-2">
              <p>
                <strong>Name:</strong> {user?.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Items Tab */}
        {activeTab === "items" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Item Form */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {editingItem ? "Edit Item" : "Add Item"}
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Name"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="border p-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
                />
                <input
                  type="number"
                  placeholder="Selling Price"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                  className="border p-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
                />
                <input
                  type="number"
                  placeholder="Buying Price"
                  value={itemForm.buyingPrice}
                  onChange={(e) => setItemForm({ ...itemForm, buyingPrice: Number(e.target.value) })}
                  className="border p-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={itemForm.quantity}
                  onChange={(e) => setItemForm({ ...itemForm, quantity: Number(e.target.value) })}
                  className="border p-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
                />
                <input
                  placeholder="Category"
                  value={itemForm.category}
                  onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                  className="border p-2 rounded focus:outline-none focus:ring focus:ring-yellow-300"
                />
                <button
                  type="submit"
                  className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900 col-span-1 md:col-span-2 transition"
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </form>
            </div>

            {/* Items List */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Items</h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item._id} className="flex justify-between items-center border p-2 rounded bg-gray-50">
                    <span className="text-gray-800">{item.name} - ${item.price}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditItem(item)} title="Edit">
                        <Edit className="text-blue-600" />
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

        {/* Sales Tab */}
        {activeTab === "sales" && (
          <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Sales Summary</h2>
            <p className="text-gray-700">Daily Sales: ${calcTotal(dailySales)}</p>
            <p className="text-gray-700">Daily Net Profit: ${calcNetProfit(dailySales)}</p>
            <p className="text-gray-700">Monthly Sales: ${calcTotal(monthlySales)}</p>
            <p className="text-gray-700">Monthly Net Profit: ${calcNetProfit(monthlySales)}</p>
          </div>
        )}
      </main>
    </div>
  );
}