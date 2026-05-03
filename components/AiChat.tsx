"use client";

import { useState } from "react";

type Msg = {
  role: "user" | "ai";
  text: string;
};

type ApiMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi 👋 I’m your ShopFlow AI assistant. Ask me about sales, stock, or products.",
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    const currentMessages = [...messages];

    setMessages([
      ...currentMessages,
      { role: "user", text: userText },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: currentMessages.map((m): ApiMessage => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
          context: {
            source: "dashboard",
          },
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "No response from AI" },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `⚠️ ${err.message || "Error"}` },
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
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl z-50 hover:scale-105 transition"
      >
        🤖
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[380px] bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col">

          {/* HEADER */}
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold">ShopFlow AI</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-slate-200"
            >
              ✕
            </button>
          </div>

          {/* MESSAGES */}
          <div className="h-80 overflow-y-auto p-3 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-xl max-w-[80%] shadow-sm ${
                  m.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-white border text-slate-800"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-slate-500 animate-pulse px-2">
                AI is thinking...
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t bg-white flex gap-2 items-center">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sales, stock, products..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="
                flex-1
                px-3 py-2
                rounded-lg
                border border-slate-300
                text-slate-900
                placeholder:text-slate-500
                bg-white
                focus:outline-none
                focus:ring-2 focus:ring-blue-500
                text-sm
              "
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white text-sm transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
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