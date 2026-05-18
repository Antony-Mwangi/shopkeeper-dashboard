import { NextResponse } from "next/server";

import User from "@/models/User";
import Product from "@/models/Product";
import SaleModel from "@/models/sales";

import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalSales = await SaleModel.countDocuments();

    const revenue = await SaleModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
        },
      },
    ]);

    const lowStock = await Product.countDocuments({
      quantity: { $lt: 5 },
    });

    const recentSales = await SaleModel.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalSales,
      revenue: revenue[0]?.total || 0,
      lowStock,
      recentSales,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}