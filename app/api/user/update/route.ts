import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File | null;

    user.name = name;

    // ✅ FIX: convert image to base64 (simple working solution)
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

      user.profileImage = base64Image;
    }

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Update failed" },
      { status: 500 }
    );
  }
}