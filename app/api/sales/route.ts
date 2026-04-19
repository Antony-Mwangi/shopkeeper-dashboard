// // app/api/sales/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Product from "@/models/Product";
// import Sale from "@/models/sales";

// // POST: Create a new sale
// export async function POST(req: NextRequest) {
//   await connectDB();

//   try {
//     const { productId, quantity, customerName } = await req.json();

//     // Find the product
//     const product = await Product.findById(productId);
//     if (!product) {
//       return NextResponse.json({ message: "Product not found" }, { status: 404 });
//     }

//     if (quantity > product.quantity) {
//       return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
//     }

//     const total = product.price * quantity;

//     // Create sale record
//     const sale = await Sale.create({
//       productId,
//       productName: product.name,
//       quantity,
//       price: product.price,
//       total,
//       customerName,
//     });

//     // Update product quantity
//     product.quantity -= quantity;
//     await product.save();

//     return NextResponse.json(sale, { status: 201 });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
//   }
// }

// // GET: List all sales
// export async function GET() {
//   await connectDB();

//   try {
//     const sales = await Sale.find().sort({ date: -1 });
//     return NextResponse.json(sales, { status: 200 });
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
//   }
// }

// app/api/sales/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Sale from "@/models/sales";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// POST: Create a new sale (USER-SCOPED)
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const cookiesList = await cookies();
    const token = cookiesList.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const { productId, quantity, customerName } = await req.json();

    // ✅ Only find product belonging to THIS user
    const product = await Product.findOne({
      _id: productId,
      userId: decoded.id,
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (quantity > product.quantity) {
      return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
    }

    const total = product.price * quantity;

    // ✅ Save sale WITH userId
    const sale = await Sale.create({
      productId,
      productName: product.name,
      quantity,
      price: product.price,
      total,
      customerName,
      userId: decoded.id, // 🔥 CRITICAL
    });

    product.quantity -= quantity;
    await product.save();

    return NextResponse.json(sale, { status: 201 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}


// GET: Get ONLY this user's sales
export async function GET() {
  await connectDB();

  try {
    const cookiesList = await cookies();
    const token = cookiesList.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // ✅ Only return this user's sales
    const sales = await Sale.find({
      userId: decoded.id,
    }).sort({ date: -1 });

    return NextResponse.json(sales, { status: 200 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}