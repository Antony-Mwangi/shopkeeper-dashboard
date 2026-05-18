import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status"); // 👈 NEW (active | suspended)

    // 🔎 BUILD QUERY DYNAMICALLY
    const query: any = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    // 🎯 FILTER BY STATUS IF PROVIDED
    if (status === "active" || status === "suspended") {
      query.status = status;
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}