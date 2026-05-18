import { NextResponse } from "next/server";
import User from "@/models/User";
import Product from "@/models/Product";
import SaleModel from "@/models/sales";
import { connectDB } from "@/lib/db";

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
      lowStock,
      recentSales,
    });
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      {
        message: "Server Error",
        totalUsers: 0,
        totalProducts: 0,
        totalSales: 0,
        totalRevenue: 0,
        lowStock: 0,
        recentSales: [],
      },
      { status: 500 }
    );
  }
}