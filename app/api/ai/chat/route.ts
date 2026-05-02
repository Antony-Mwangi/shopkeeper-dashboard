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

    // ---- AUTH ----
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = user.id;

    // ---- SYSTEM PROMPT ----
    const systemPrompt = `
You are ShopFlow AI Assistant.

You help users with:
- sales analytics
- inventory/stock management
- profit insights
- business decisions

Context:
${JSON.stringify(context || {})}

Rules:
- Be concise
- Use business data when available
- If data is missing, ask questions
- Always act like a SaaS analytics assistant
`;

    // ---- SAFE HISTORY ----
    const safeHistory: Message[] = Array.isArray(history)
      ? history.filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
      : [];

    // ---- OPENAI CALL ----
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...safeHistory,
        { role: "user", content: message },
      ],
    });

    const reply = completion?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "AI returned empty response" },
        { status: 500 }
      );
    }

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