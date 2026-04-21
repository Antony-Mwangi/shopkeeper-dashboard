// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Sale from "@/models/sales";
// import Product from "@/models/Product";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export async function GET() {
//   await connectDB();

//   try {
//     const token = (await cookies()).get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//     /* ================= BASIC STATS ================= */
//     const sales = await Sale.find({ userId: decoded.id });
//     const products = await Product.find({ userId: decoded.id });

//     const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);
//     const totalSales = sales.length;
//     const totalProducts = products.length;
//     const lowStock = products.filter(p => p.quantity < 5).length;

//     /* ================= REVENUE BY DATE ================= */
//     const revenueByDate: Record<string, number> = {};

//     sales.forEach((s) => {
//       const date = new Date(s.date).toLocaleDateString();

//       if (!revenueByDate[date]) revenueByDate[date] = 0;
//       revenueByDate[date] += s.total;
//     });

//     /* ================= SALES PER PRODUCT ================= */
//     const productStats: Record<string, number> = {};

//     sales.forEach((s) => {
//       if (!productStats[s.productName]) productStats[s.productName] = 0;
//       productStats[s.productName] += s.quantity;
//     });

//     return NextResponse.json({
//       totalRevenue,
//       totalSales,
//       totalProducts,
//       lowStock,
//       revenueByDate,
//       productStats,
//     });

//   } catch (err: any) {
//     return NextResponse.json({ message: err.message }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Sale from "@/models/sales";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    /* ================= FILTER ================= */
    const range = req.nextUrl.searchParams.get("range") || "month";

    const now = new Date();
    let startDate = new Date();

    if (range === "today") {
      startDate.setHours(0, 0, 0, 0);
    } else if (range === "week") {
      startDate.setDate(now.getDate() - 7);
    } else {
      startDate.setMonth(now.getMonth() - 1);
    }

    /* ================= FETCH ================= */
    const sales = await Sale.find({
      userId: decoded.id,
      date: { $gte: startDate },
    });

    const prevSales = await Sale.find({
      userId: decoded.id,
      date: { $lt: startDate },
    });

    const products = await Product.find({ userId: decoded.id });

    /* ================= STATS ================= */
    const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);
    const totalSales = sales.length;

    /* PROFIT (simple assumption: 30% margin if no costPrice) */
    const totalProfit = sales.reduce((acc, s) => acc + s.total * 0.3, 0);

    /* ================= TRENDS ================= */
    const prevRevenue = prevSales.reduce((acc, s) => acc + s.total, 0);

    const revenueTrend =
      prevRevenue === 0
        ? 100
        : ((totalRevenue - prevRevenue) / prevRevenue) * 100;

    /* ================= LOW STOCK ================= */
    const lowStockItems = products.filter(p => p.quantity < 5);

    /* ================= CHARTS ================= */
    const revenueByDate: Record<string, number> = {};
    sales.forEach((s) => {
      const d = new Date(s.date).toLocaleDateString();
      revenueByDate[d] = (revenueByDate[d] || 0) + s.total;
    });

    const productStats: Record<string, number> = {};
    sales.forEach((s) => {
      productStats[s.productName] =
        (productStats[s.productName] || 0) + s.quantity;
    });

    return NextResponse.json({
      totalRevenue,
      totalSales,
      totalProfit,
      revenueTrend,
      lowStockItems,
      revenueByDate,
      productStats,
    });

  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}