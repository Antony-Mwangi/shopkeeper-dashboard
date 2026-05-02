
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Sale from "@/models/sales";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// 🔐 GET USER FROM TOKEN
async function getUserId() {
  const cookiesList = await cookies();
  const token = cookiesList.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded.id;
}

/* =========================
   CREATE SALE
========================= */
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const userId = await getUserId();
    const { productId, quantity, customerName } = await req.json();

    const product = await Product.findOne({
      _id: productId,
      userId,
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (quantity > product.quantity) {
      return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
    }

    const total = product.price * quantity;

    const sale = await Sale.create({
      productId,
      productName: product.name,
      quantity,
      price: product.price,
      total,
      customerName,
      userId,
    });

    product.quantity -= quantity;
    await product.save();

    return NextResponse.json(sale, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

/* =========================
   GET SALES (USER ONLY)
========================= */
export async function GET() {
  await connectDB();

  try {
    const userId = await getUserId();

    const sales = await Sale.find({ userId }).sort({ date: -1 });

    return NextResponse.json(sales);

  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

/* =========================
   UPDATE SALE
========================= */
export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const userId = await getUserId();
    const { saleId, quantity, customerName } = await req.json();

    const sale = await Sale.findOne({ _id: saleId, userId });
    if (!sale) {
      return NextResponse.json({ message: "Sale not found" }, { status: 404 });
    }

    const product = await Product.findById(sale.productId);

    if (product) {
      // restore old stock
      product.quantity += sale.quantity;

      if (quantity > product.quantity) {
        return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
      }

      // apply new quantity
      product.quantity -= quantity;
      await product.save();
    }

    sale.quantity = quantity;
    sale.total = sale.price * quantity;
    sale.customerName = customerName;

    await sale.save();

    return NextResponse.json(sale);

  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

/* =========================
   DELETE SALE
========================= */
export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    const userId = await getUserId();
    const { saleId } = await req.json();

    const sale = await Sale.findOne({ _id: saleId, userId });

    if (!sale) {
      return NextResponse.json({ message: "Sale not found" }, { status: 404 });
    }

    const product = await Product.findById(sale.productId);

    if (product) {
      product.quantity += sale.quantity;
      await product.save();
    }

    await Sale.deleteOne({ _id: saleId });

    return NextResponse.json({ message: "Deleted" });

  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}