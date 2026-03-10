import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Product from "@/models/Product";
import { connectDB } from  "@/lib/db";

export async function POST(req: Request) {
    try {
        await connectDB();

        const cookiesList = await cookies();
        const token = cookiesList.get("token")?.value;

        if (!token) 
            return NextResponse.json({message: "Unauthorized"}, {status: 401} );
        const decoded: any = jwt.verify(token,process.env.JWT_SECRET!);

        const { name, price, quantity, category } = await req.json();

        const product = await Product.create({
            name,
            price,
            quantity,
            category,
            userId: decoded.id,
        });
        return NextResponse.json(product);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: "Server Error"}, {status:500});
        }
}
//GET ALL PRODUCTS
export async function GET(){
    try {
        await connectDB();

        const cookiesList = await cookies();
        const token = cookiesList.get("token")?.value;

        if (!token){
            return NextResponse.json({ message: "Unauthorized"}, {status: 401});
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const products = await Product.find({ userId: decoded.id });
         return NextResponse.json(products);
         } catch (error) {
            return NextResponse.json({message: "Server Error"}, {status: 500});
         }
}