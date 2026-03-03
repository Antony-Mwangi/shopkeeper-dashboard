import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Item from "@/models/Item";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, quantity, category, buyingPrice } = body;

    if (!name || !price || !quantity || !buyingPrice)
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });

    const newItem = await Item.create({ name, price, quantity, category, buyingPrice });
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to create item" }, { status: 500 });
  }
}