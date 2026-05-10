import { connectDB } from "@/lib/db";
import User from "@/models/User";

import { NextResponse } from "next/server";

import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "If account exists, reset link sent",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15;

    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <div>
          <h2>Password Reset</h2>

          <p>Click the link below to reset your password:</p>

          <a href="${resetLink}">
            Reset Password
          </a>

          <p>This link expires in 15 minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Password reset email sent",
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}