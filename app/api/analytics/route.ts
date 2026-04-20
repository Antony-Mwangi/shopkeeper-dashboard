import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Sale from "@/models/sales";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    /* ================= BASIC STATS ================= */
    const sales = await Sale.find({ userId: decoded.id });
    const products = await Product.find({ userId: decoded.id });

    const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);
    const totalSales = sales.length;
    const totalProducts = products.length;
    const lowStock = products.filter(p => p.quantity < 5).length;

    /* ================= REVENUE BY DATE ================= */
    const revenueByDate: Record<string, number> = {};

    sales.forEach((s) => {
      const date = new Date(s.date).toLocaleDateString();

      if (!revenueByDate[date]) revenueByDate[date] = 0;
      revenueByDate[date] += s.total;
    });

    /* ================= SALES PER PRODUCT ================= */
    const productStats: Record<string, number> = {};

    sales.forEach((s) => {
      if (!productStats[s.productName]) productStats[s.productName] = 0;
      productStats[s.productName] += s.quantity;
    });

    return NextResponse.json({
      totalRevenue,
      totalSales,
      totalProducts,
      lowStock,
      revenueByDate,
      productStats,
    });

  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}