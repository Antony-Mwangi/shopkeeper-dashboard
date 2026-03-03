import { NextRequest, NextResponse } from "next/server";
import Sale from "@/models/Sale";
import { connectDB } from "@/lib/db";

connectDB();

export async function GET(req: NextRequest, context: any) {
  try {
    const { id } = context.params; // now `any` allows it
    const sale = await Sale.findById(id);
    if (!sale) return NextResponse.json({ message: "Sale not found" }, { status: 404 });
    return NextResponse.json(sale);
  } catch (err) {
    return NextResponse.json({ message: "Error fetching sale" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const updatedSale = await Sale.findByIdAndUpdate(id, body, { new: true });
    if (!updatedSale) return NextResponse.json({ message: "Sale not found" }, { status: 404 });
    return NextResponse.json(updatedSale);
  } catch (err) {
    return NextResponse.json({ message: "Error updating sale" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const { id } = context.params;
    await Sale.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting sale" }, { status: 500 });
  }
}