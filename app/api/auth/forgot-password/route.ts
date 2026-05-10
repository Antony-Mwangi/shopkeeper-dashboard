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
      return NextResponse.json(
        { message: "If account exists, reset link sent" },
        { status: 200 }
      );
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

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Password Reset</h2>
          <p>Click below to reset:</p>

          <a href="${resetLink}" 
             style="display:inline-block;padding:10px 15px;
             background:#2563eb;color:white;text-decoration:none;border-radius:5px;">
            Reset Password
          </a>

          <p>This link expires in 15 minutes.</p>
        </div>
      `,
    });

    console.log("Email sent:", info.response);

    return NextResponse.json({
      message: "Password reset email sent",
    });

  } catch (error: any) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}