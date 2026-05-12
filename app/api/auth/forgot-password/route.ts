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

    // always return same response (security)
    if (!user) {
      return NextResponse.json({
        message: "If account exists, reset link sent",
      });
    }

    // generate token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify(); // 👈 IMPORTANT: checks Gmail config

    await transporter.sendMail({
      from: `"ShopFlow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Password Reset</h2>

          <p>Click the button below:</p>

          <a href="${resetLink}" 
             style="display:inline-block;padding:10px 15px;
             background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">
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
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { message: "Email sending failed. Check server logs." },
      { status: 500 }
    );
  }
}