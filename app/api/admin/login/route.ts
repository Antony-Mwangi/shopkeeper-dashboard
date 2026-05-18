import { connectDB } from "@/lib/db";
import User from "@/models/User";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } =
      await req.json();

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Invalid credentials",
        },
        { status: 400 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        {
          message:
            "Access denied",
        },
        { status: 403 }
      );
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return NextResponse.json(
        {
          message:
            "Invalid credentials",
        },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    (await cookies()).set(
      "admin-token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        path: "/",
      }
    );

    return NextResponse.json({
      message:
        "Admin login successful",
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}