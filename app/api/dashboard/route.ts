import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Item from "@/models/Item";
import Sale from "@/models/Sale";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Get user ID from middleware (x-user-id header)
    const userId = req.headers.get("x-user-id");
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // Fetch user info
    const user = await User.findById(userId).select("-password");
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Stock summary
    const totalProducts = await Item.countDocuments();
    const totalStockQuantityAgg = await Item.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]);
    const totalStockQuantity = totalStockQuantityAgg[0]?.total || 0;

    // Sales summary
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const totalTodayAgg = await Sale.aggregate([
      { $match: { createdAt: { $gte: startOfToday } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalMonthAgg = await Sale.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalYearAgg = await Sale.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const dashboardData = {
      user,
      totalProducts,
      totalStockQuantity,
      salesToday: totalTodayAgg[0]?.total || 0,
      salesMonth: totalMonthAgg[0]?.total || 0,
      salesYear: totalYearAgg[0]?.total || 0,
    };

    return NextResponse.json(dashboardData);
  } catch (err: any) {
    console.error("Dashboard API error:", err);
    return NextResponse.json({ message: err.message || "Server Error" }, { status: 500 });
  }
}