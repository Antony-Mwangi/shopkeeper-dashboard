import { NextResponse } from "next/server";
import Item from "@/models/Item";
import Sale from "@/models/Sale";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

connectDB();

export async function GET() {
  try {
    const user = await User.findOne(); // Single shopkeeper
    const items = await Item.find();
    const totalProducts = items.length;
    const totalStockQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const dailySales = await Sale.find({ createdAt: { $gte: startOfDay } }).populate("itemId");
    const monthlySales = await Sale.find({ createdAt: { $gte: startOfMonth } }).populate("itemId");

    const dailySalesTotal = dailySales.reduce((sum, s) => sum + s.totalAmount, 0);
    const monthlySalesTotal = monthlySales.reduce((sum, s) => sum + s.totalAmount, 0);
    const dailyNetProfit = dailySales.reduce((sum, s) => sum + (s.itemId.sellingPrice - s.itemId.buyingPrice) * s.quantitySold, 0);
    const monthlyNetProfit = monthlySales.reduce((sum, s) => sum + (s.itemId.sellingPrice - s.itemId.buyingPrice) * s.quantitySold, 0);

    return NextResponse.json({
      user,
      items,
      totalProducts,
      totalStockQuantity,
      dailySalesTotal,
      monthlySalesTotal,
      dailyNetProfit,
      monthlyNetProfit,
    });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch dashboard" }, { status: 500 });
  }
}