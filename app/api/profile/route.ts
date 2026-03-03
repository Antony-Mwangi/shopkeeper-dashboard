import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/models/auth";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token) as any;
    const body = await req.json();
    const { name } = body;

    const user = await User.findByIdAndUpdate(payload.id, { name }, { new: true });
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}