

// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Sale from "@/models/sales";
// import Product from "@/models/Product";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export async function GET(req: NextRequest) {
//   await connectDB();

//   try {
//     const token = (await cookies()).get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//     /* ================= FILTER ================= */
//     const range = req.nextUrl.searchParams.get("range") || "month";

//     const now = new Date();
//     let startDate = new Date();

//     if (range === "today") {
//       startDate.setHours(0, 0, 0, 0);
//     } else if (range === "week") {
//       startDate.setDate(now.getDate() - 7);
//     } else {
//       startDate.setMonth(now.getMonth() - 1);
//     }

//     /* ================= FETCH ================= */
//     const sales = await Sale.find({
//       userId: decoded.id,
//       date: { $gte: startDate },
//     });

//     const prevSales = await Sale.find({
//       userId: decoded.id,
//       date: { $lt: startDate },
//     });

//     const products = await Product.find({ userId: decoded.id });

//     /* ================= STATS ================= */
//     const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);
//     const totalSales = sales.length;

//     /* PROFIT (simple assumption: 30% margin if no costPrice) */
//     const totalProfit = sales.reduce((acc, s) => acc + s.total * 0.3, 0);

    
//     const prevRevenue = prevSales.reduce((acc, s) => acc + s.total, 0);

//     const revenueTrend =
//       prevRevenue === 0
//         ? 100
//         : ((totalRevenue - prevRevenue) / prevRevenue) * 100;


//     const lowStockItems = products.filter(p => p.quantity < 5);

//     const revenueByDate: Record<string, number> = {};
//     sales.forEach((s) => {
//       const d = new Date(s.date).toLocaleDateString();
//       revenueByDate[d] = (revenueByDate[d] || 0) + s.total;
//     });

//     const productStats: Record<string, number> = {};
//     sales.forEach((s) => {
//       productStats[s.productName] =
//         (productStats[s.productName] || 0) + s.quantity;
//     });

//     return NextResponse.json({
//       totalRevenue,
//       totalSales,
//       totalProfit,
//       revenueTrend,
//       lowStockItems,
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

    /* ================= DATE FILTER ================= */
    const range = req.nextUrl.searchParams.get("range") || "month";

    const now = new Date();
    const startDate = new Date();

    if (range === "today") {
      startDate.setHours(0, 0, 0, 0);
    } else if (range === "week") {
      startDate.setDate(now.getDate() - 7);
    } else {
      startDate.setMonth(now.getMonth() - 1);
    }

    /* ================= DATA ================= */
    const sales = await Sale.find({
      userId: decoded.id,
      date: { $gte: startDate },
    });

    const prevSales = await Sale.find({
      userId: decoded.id,
      date: { $lt: startDate },
    });

    const products = await Product.find({ userId: decoded.id });

    /* ================= CORE STATS ================= */
    const totalRevenue = sales.reduce((a, s) => a + s.total, 0);
    const totalSales = sales.length;

    const totalProfit = sales.reduce((a, s) => a + s.total * 0.3, 0);

    const prevRevenue = prevSales.reduce((a, s) => a + s.total, 0);

    const revenueTrend =
      prevRevenue === 0
        ? 100
        : ((totalRevenue - prevRevenue) / prevRevenue) * 100;

    const lowStockItems = products.filter((p) => p.quantity < 5);

    /* ================= CHART DATA ================= */
    const revenueByDate: Record<string, number> = {};

    sales.forEach((s) => {
      const date = new Date(s.date).toLocaleDateString();
      revenueByDate[date] = (revenueByDate[date] || 0) + s.total;
    });

    const productStats: Record<string, number> = {};

    sales.forEach((s) => {
      productStats[s.productName] =
        (productStats[s.productName] || 0) + s.quantity;
    });

    /* ================= AI INSIGHT ENGINE ================= */

    const productTotals: Record<string, number> = {};

    sales.forEach((s) => {
      productTotals[s.productName] =
        (productTotals[s.productName] || 0) + s.total;
    });

    const topProduct = Object.entries(productTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    let insight = "Sales are stable with normal activity.";

    if (revenueTrend > 20) {
      insight = `Sales increased significantly due to high demand for ${
        topProduct?.[0] || "key products"
      }.`;
    }

    if (revenueTrend < -20) {
      insight = `Sales dropped due to reduced demand or stock issues.`;
    }

    if (topProduct) {
      insight += ` Top product: ${topProduct[0]}.`;
    }

    if (lowStockItems.length > 3) {
      insight += " Warning: multiple items are low in stock.";
    }

    /* ================= RESPONSE ================= */
    return NextResponse.json({
      totalRevenue,
      totalSales,
      totalProfit,
      revenueTrend,
      lowStockItems,
      revenueByDate,
      productStats,
      insight,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}