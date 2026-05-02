// import { NextResponse } from "next/server";
// import Groq from "groq-sdk";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// type JwtUser = {
//   id: string;
// };

// const groqApiKey = process.env.GROQ_API_KEY;

// if (!groqApiKey) {
//   console.warn("⚠️ GROQ_API_KEY is missing");
// }

// const groq = new Groq({
//   apiKey: groqApiKey || "",
// });

// export async function POST(req: Request) {
//   try {
//     const { message, history = [], context = {} } = await req.json();

//     if (!message) {
//       return NextResponse.json(
//         { error: "Message is required" },
//         { status: 400 }
//       );
//     }

//     /* ================= AUTH FIX ================= */
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const user = jwt.verify(
//       token,
//       process.env.JWT_SECRET!
//     ) as JwtUser;

//     const userId = user.id;

//     /* ================= SYSTEM PROMPT ================= */
//     const systemPrompt = `
// You are ShopFlow AI Assistant.

// You help with:
// - sales analytics
// - inventory management
// - top products
// - profit insights

// Context:
// ${JSON.stringify(context)}

// Rules:
// - Be concise
// - Use business data when available
// - If missing data, ask questions
// - Do not hallucinate numbers
// `;

//     /* ================= SAFE HISTORY ================= */
//     const safeHistory: Message[] = Array.isArray(history)
//       ? history.filter(
//           (m) =>
//             typeof m?.content === "string" &&
//             (m.role === "user" || m.role === "assistant")
//         )
//       : [];

//     /* ================= GROQ CALL ================= */
//     const completion = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [
//         { role: "system", content: systemPrompt },
//         ...safeHistory,
//         { role: "user", content: message },
//       ],
//     });

//     const reply = completion.choices?.[0]?.message?.content || "";

//     return NextResponse.json({
//       reply,
//       userId,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import SaleModel from "@/models/sales";
import Product from "@/models/Product";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

type Message = {
  role: "user" | "assistant";
  content: string;
};

type JwtUser = {
  id: string;
};

/* ================= MAIN HANDLER ================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const { message, history = [], context = {} } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    /* ================= AUTH FIX (IMPORTANT) ================= */
    const cookieStore = await cookies(); // ✅ FIXED
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let user: JwtUser;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET!) as JwtUser;
    } catch {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = user.id;

    /* ================= REAL DB CONTEXT ================= */
    const [sales, products] = await Promise.all([
      SaleModel.find({ userId }).limit(50).lean(),
      Product.find({ userId }).limit(50).lean(),
    ]);

    const systemPrompt = `
You are ShopFlow AI Assistant.

You are a real business intelligence system.

You have access to REAL database data:

SALES:
${JSON.stringify(sales)}

PRODUCTS:
${JSON.stringify(products)}

User context:
${JSON.stringify(context)}

RULES:
- Answer ONLY using real data above
- If data is missing, say "No data found"
- Never invent numbers
- Be concise and analytical
- Act like Shopify analytics AI
`;

    /* ================= SAFE HISTORY ================= */
    const safeHistory: Message[] = Array.isArray(history)
      ? history.filter(
          (m): m is Message =>
            typeof m?.content === "string" &&
            (m.role === "user" || m.role === "assistant")
        )
      : [];

    /* ================= GROQ CALL ================= */
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        ...safeHistory,
        { role: "user", content: message },
      ],
      temperature: 0.3,
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply,
      userId,
    });
  } catch (err: unknown) {
    const error =
      err instanceof Error ? err.message : "Server error";

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}