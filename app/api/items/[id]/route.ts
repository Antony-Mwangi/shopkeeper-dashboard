import { NextRequest, NextResponse } from "next/server";
import Item from "@/models/Item";
import { connectDB } from "@/lib/db";

connectDB();

export async function GET(req: NextRequest, context: any) {
  try {
    const { id } = context.params;
    const item = await Item.findById(id);
    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (err) {
    return NextResponse.json({ message: "Error fetching item" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const updatedItem = await Item.findByIdAndUpdate(id, body, { new: true });
    if (!updatedItem) return NextResponse.json({ message: "Item not found" }, { status: 404 });
    return NextResponse.json(updatedItem);
  } catch (err) {
    return NextResponse.json({ message: "Error updating item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const { id } = context.params;
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Error deleting item" }, { status: 500 });
  }
}