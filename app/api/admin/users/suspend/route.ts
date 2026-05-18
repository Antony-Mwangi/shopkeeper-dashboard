import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

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

    user.isSuspended = true;
    user.isActive = false;

    await user.save();

    return NextResponse.json({
      message: "User suspended successfully",
    });

  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}