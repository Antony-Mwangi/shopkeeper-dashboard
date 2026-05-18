import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import SaleModel from "@/models/sales";

export async function GET() {
  try {
    await connectDB();

    const [
      totalUsers,
      totalProducts,
      totalSales,
      lowStock,
      revenueResult,
      recentSales,
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      SaleModel.countDocuments(),
      Product.countDocuments({ quantity: { $lt: 5 } }),
      SaleModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$total" },
          },
        },
      ]),
      SaleModel.find().sort({ createdAt: -1 }).limit(5),
    ]);

    const totalRevenue = revenueResult?.[0]?.total ?? 0;

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalSales,
      totalRevenue,
      lowStockProducts: lowStock,
      activeUsers: totalUsers, // fallback (until you track real active users)
      recentSales,
    });
  } catch (error) {
    console.error("Admin analytics error:", error);

    return NextResponse.json(
      {
        totalUsers: 0,
        totalProducts: 0,
        totalSales: 0,
        totalRevenue: 0,
        lowStockProducts: 0,
        activeUsers: 0,
        recentSales: [],
      },
      { status: 500 }
    );
  }
}