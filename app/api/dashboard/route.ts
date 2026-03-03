import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/models/auth";
import User from "@/models/User";
import Item from "@/models/Item";
import Sale from "@/models/Sale";

export async function GET(req: Request) {
  await connectDB();

  // Read cookie directly
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  if (!tokenMatch) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const token = tokenMatch[1];

  try {
    const payload = verifyToken(token) as any;
    const userId = payload.id;

    // Fetch user info
    const user = await User.findById(userId).select("-password");
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 401 });

    // Stock summary
    const totalProducts = await Item.countDocuments();
    const totalStockQuantityAgg = await Item.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]);
    const totalStockQuantity = totalStockQuantityAgg[0]?.total || 0;

    // Sales summary
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const totalTodayAgg = await Sale.aggregate([{ $match: { createdAt: { $gte: startOfToday } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
    const totalMonthAgg = await Sale.aggregate([{ $match: { createdAt: { $gte: startOfMonth } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
    const totalYearAgg = await Sale.aggregate([{ $match: { createdAt: { $gte: startOfYear } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]);

    return NextResponse.json({
      user,
      totalProducts,
      totalStockQuantity,
      salesToday: totalTodayAgg[0]?.total || 0,
      salesMonth: totalMonthAgg[0]?.total || 0,
      salesYear: totalYearAgg[0]?.total || 0,
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}