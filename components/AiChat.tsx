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
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi 👋 I’m your ShopFlow AI assistant." },
  ]);

  const sendMessage = async (): Promise<void> => {
    if (!input.trim() || loading) return;

    const userText = input;

    // snapshot messages BEFORE update (fix stale state bug)
    const currentMessages = [...messages];

    const newMessages: Msg[] = [
      ...currentMessages,
      { role: "user", text: userText },
    ];

    setMessages(newMessages);
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

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `⚠️ ${message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
      >
        🤖 AI
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[360px] bg-white border shadow-xl rounded-xl overflow-hidden z-50 flex flex-col">

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
                    : "bg-white border text-slate-700"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-slate-500 animate-pulse">
                AI is thinking...
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="flex p-2 border-t gap-2 bg-white">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sales, stock..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-3 rounded text-white transition ${
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