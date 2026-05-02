import { NextResponse } from "next/server";
import OpenAI from "openai";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  try {
    const { message, history, context } = await req.json();

    // ---- AUTH (user-based memory) ----
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const userId = user.id;

    // ---- SYSTEM PROMPT (BUSINESS AI) ----
    const systemPrompt = `
You are ShopFlow AI Assistant.

You help users with:
- sales analytics
- inventory/stock management
- profit insights
- business decisions

You have context:
${JSON.stringify(context || {})}

Rules:
- Be concise and clear
- Use business insights when possible
- If asked about stock/sales, rely on provided context
- If data is missing, ask smart follow-up questions
- Act like a professional SaaS business analyst
`;

    // ---- OPENAI CALL ----
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...(history as Message[]),
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({
      reply,
      userId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}