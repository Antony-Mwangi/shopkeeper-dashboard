import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function GET() {
  try {
    await connectDB();

    // Await cookies() in Turbopack Next.js 16.x
    const cookiesList = await cookies();
    const tokenCookie = cookiesList.get("token");
    const token = tokenCookie?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Type assertion: decoded is an object with id
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error in /api/auth/me:", err);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}