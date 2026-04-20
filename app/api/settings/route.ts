import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from "bcryptjs";

/* ================= GET USER ================= */
export async function GET() {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.id).select("-password");

    return NextResponse.json(user);

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/* ================= UPDATE PROFILE ================= */
export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { name, profileImage } = await req.json();

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { name, profileImage },
      { new: true }
    ).select("-password");

    return NextResponse.json(user);

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/* ================= CHANGE PASSWORD ================= */
export async function PATCH(req: NextRequest) {
  await connectDB();

  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { oldPassword, newPassword } = await req.json();

    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return NextResponse.json({ message: "Password updated" });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}