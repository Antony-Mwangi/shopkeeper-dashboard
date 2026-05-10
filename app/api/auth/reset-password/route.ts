import { connectDB } from "@/lib/db";
import User from "@/models/User";

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { token, password } = await req.json();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Password reset successful",
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}