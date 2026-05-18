import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { userId } = await req.json();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.isActive = !user.isActive;
    await user.save();

    return NextResponse.json({
      message: "User status updated",
      isActive: user.isActive,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}