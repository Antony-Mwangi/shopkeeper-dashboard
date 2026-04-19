// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import Product from "@/models/Product";
// import { connectDB } from  "@/lib/db";

// export async function POST(req: Request) {
//     try {
//         await connectDB();

//         const cookiesList = await cookies();
//         const token = cookiesList.get("token")?.value;

//         if (!token) 
//             return NextResponse.json({message: "Unauthorized"}, {status: 401} );
//         const decoded: any = jwt.verify(token,process.env.JWT_SECRET!);

//         const { name, price, quantity, category } = await req.json();

//         const product = await Product.create({
//             name,
//             price,
//             quantity,
//             category,
//             userId: decoded.id,
//         });
//         return NextResponse.json(product);
//         } catch (error) {
//             console.error(error);
//             return NextResponse.json({ message: "Server Error"}, {status:500});
//         }
// }
// //GET ALL PRODUCTS
// export async function GET(){
//     try {
//         await connectDB();

//         const cookiesList = await cookies();
//         const token = cookiesList.get("token")?.value;

//         if (!token){
//             return NextResponse.json({ message: "Unauthorized"}, {status: 401});
//         }

//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         const products = await Product.find({ userId: decoded.id });
//          return NextResponse.json(products);
//          } catch (error) {
//             return NextResponse.json({message: "Server Error"}, {status: 500});
//          }
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

/* ================= AUTH ================= */
const getUserId = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded.id;
};

/* ================= CREATE ================= */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getUserId();

    const { name, price, quantity, category } = await req.json();

    const product = await Product.create({
      name,
      price,
      quantity,
      category,
      userId,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}

/* ================= READ ================= */
export async function GET() {
  try {
    await connectDB();
    const userId = await getUserId();

    const products = await Product.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}

/* ================= UPDATE ================= */
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getUserId();

    const { productId, name, price, quantity, category } = await req.json();

    const updated = await Product.findOneAndUpdate(
      { _id: productId, userId },
      { name, price, quantity, category },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getUserId();

    const { productId } = await req.json();

    const deleted = await Product.findOneAndDelete({
      _id: productId,
      userId,
    });

    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}