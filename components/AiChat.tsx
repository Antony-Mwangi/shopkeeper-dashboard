"use client";

import { useState } from "react";

type Msg = {
  role: "user" | "ai";
  text: string;
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi 👋 I’m your ShopFlow AI assistant." },
  ]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
          context: {
            source: "dashboard",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: err.message || "Something went wrong",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
      >
        🤖 AI
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[350px] bg-white border shadow-xl rounded-xl overflow-hidden z-50 flex flex-col">

          {/* HEADER */}
          <div className="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center">
            <span>ShopFlow AI</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* MESSAGES */}
          <div className="h-80 overflow-y-auto p-3 space-y-2 bg-slate-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  m.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-slate-500">
                AI is typing...
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="flex p-2 border-t gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sales, stock..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-3 rounded text-white ${
                loading
                  ? "bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}