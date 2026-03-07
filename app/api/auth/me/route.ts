// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import User from "../../../../models/User";
// import { connectDB } from "../../../../lib/db";

// interface DecodedToken extends JwtPayload {
//   id: string;
// }

// export async function GET() {
//   try {
//     await connectDB();

//     // Await cookies() in Turbopack Next.js 16.x
//     const cookiesList = await cookies();
//     const tokenCookie = cookiesList.get("token");
//     const token = tokenCookie?.value;

//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Type assertion: decoded is an object with id
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(user);
//   } catch (err) {
//     console.error("Error in /api/auth/me:", err);
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }
// }


// app/api/auth/update-profile/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";

interface DecodedToken {
  id: string;
}

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const cookiesList = await cookies();
    const tokenCookie = cookiesList.get("token");
    const token = tokenCookie?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const body = await req.json();
    const { name, email, profileImage } = body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name, email, profileImage },
      { new: true }
    ).select("-password");

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("Error updating profile:", err);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}