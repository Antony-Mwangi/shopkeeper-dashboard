import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Sale from "@/models/Sale";
import Item from "@/models/Item";

connectDB();

// POST: Record a sale
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, quantitySold } = body;

    if (!itemId || !quantitySold) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const item = await Item.findById(itemId);
    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

    if (item.quantity < quantitySold) {
      return NextResponse.json({ message: "Insufficient stock" }, { status: 400 });
    }

    const totalAmount = item.price * quantitySold;
    const netProfit = (item.price - item.buyingPrice) * quantitySold;

    // Deduct stock
    item.quantity -= quantitySold;
    await item.save();

    // Save sale
    const sale = await Sale.create({
      itemId,
      quantitySold,
      totalAmount,
      netProfit,
    });

    return NextResponse.json(sale, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to record sale" }, { status: 500 });
  }
}

// GET: Fetch all sales with optional daily/monthly/yearly aggregation
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // optional: ?period=today|month|year
    const period = searchParams.get("period");

    let match: any = {};
    const now = new Date();

    if (period === "today") {
      match.createdAt = {
        $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        $lte: now,
      };
    } else if (period === "month") {
      match.createdAt = {
        $gte: new Date(now.getFullYear(), now.getMonth(), 1),
        $lte: now,
      };
    } else if (period === "year") {
      match.createdAt = {
        $gte: new Date(now.getFullYear(), 0, 1),
        $lte: now,
      };
    }

    const sales = await Sale.find(match)
      .populate("itemId", "name price buyingPrice")
      .sort({ createdAt: -1 });

    // Calculate totals
    const totalRevenue = sales.reduce((acc, s: any) => acc + s.totalAmount, 0);
    const totalNetProfit = sales.reduce((acc, s: any) => acc + s.netProfit, 0);

    return NextResponse.json({ sales, totalRevenue, totalNetProfit });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch sales" }, { status: 500 });
  }
}