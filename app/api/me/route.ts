import { NextResponse } from "next/server";
import { cookies } from "next/header";
import jwt from "jsonwebtoken";
import User from "@models/User";
import {connectDB} from "@lib/db";

export async function GET(){
    try {
        await connectDB();
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized"}, {status: 401});
            }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return NextResponse.json({message: "User not found"}, {status:404});
        }

         return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({message:"Invalid token"}, { status: 401});
    }
}