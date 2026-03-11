// app/api/sales/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Sale from "@/models/sales";

// POST: Create a new sale
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { productId, quantity, customerName } = await req.json();

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (quantity > product.quantity) {
      return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
    }

    const total = product.price * quantity;

    // Create sale record
    const sale = await Sale.create({
      productId,
      productName: product.name,
      quantity,
      price: product.price,
      total,
      customerName,
    });

    // Update product quantity
    product.quantity -= quantity;
    await product.save();

    return NextResponse.json(sale, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
}

// GET: List all sales
export async function GET() {
  await connectDB();

  try {
    const sales = await Sale.find().sort({ date: -1 });
    return NextResponse.json(sales, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
}