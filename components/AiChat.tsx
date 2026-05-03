// "use client";

// import { useState } from "react";

// type Msg = {
//   role: "user" | "ai";
//   text: string;
// };

// type ApiMessage = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function AiChat() {
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [messages, setMessages] = useState<Msg[]>([
//     {
//       role: "ai",
//       text: "Hi 👋 I’m your ShopFlow AI assistant. Ask me about sales, stock, or products.",
//     },
//   ]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userText = input;
//     const currentMessages = [...messages];

//     setMessages([
//       ...currentMessages,
//       { role: "user", text: userText },
//     ]);

//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/ai/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: userText,
//           history: currentMessages.map((m): ApiMessage => ({
//             role: m.role === "user" ? "user" : "assistant",
//             content: m.text,
//           })),
//           context: {
//             source: "dashboard",
//           },
//         }),
//       });

//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         { role: "ai", text: data.reply || "No response from AI" },
//       ]);
//     } catch (err: any) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "ai", text: `⚠️ ${err.message || "Error"}` },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* FLOAT BUTTON */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl z-50 hover:scale-105 transition"
//       >
//         🤖
//       </button>

//       {/* CHAT WINDOW */}
//       {open && (
//         <div className="fixed bottom-20 right-6 w-[380px] bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col">

//           {/* HEADER */}
//           <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
//             <span className="font-semibold">ShopFlow AI</span>
//             <button
//               onClick={() => setOpen(false)}
//               className="text-white hover:text-slate-200"
//             >
//               ✕
//             </button>
//           </div>

//           {/* MESSAGES */}
//           <div className="h-80 overflow-y-auto p-3 space-y-3 bg-slate-50">
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`text-sm px-3 py-2 rounded-xl max-w-[80%] shadow-sm ${
//                   m.role === "user"
//                     ? "ml-auto bg-blue-600 text-white"
//                     : "bg-white border text-slate-800"
//                 }`}
//               >
//                 {m.text}
//               </div>
//             ))}

//             {loading && (
//               <div className="text-xs text-slate-500 animate-pulse px-2">
//                 AI is thinking...
//               </div>
//             )}
//           </div>

//           {/* INPUT */}
//           <div className="p-3 border-t bg-white flex gap-2 items-center">

//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask about sales, stock, products..."
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               className="
//                 flex-1
//                 px-3 py-2
//                 rounded-lg
//                 border border-slate-300
//                 text-slate-900
//                 placeholder:text-slate-500
//                 bg-white
//                 focus:outline-none
//                 focus:ring-2 focus:ring-blue-500
//                 text-sm
//               "
//             />

//             <button
//               onClick={sendMessage}
//               disabled={loading}
//               className={`px-4 py-2 rounded-lg text-white text-sm transition ${
//                 loading
//                   ? "bg-blue-300 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { Send, X, Bot, Sparkles, MessageSquare } from "lucide-react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi! How can I help with your ShopFlow data today?",
    },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages.map((m): ApiMessage => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
          context: { source: "dashboard" },
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply || "No response." }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "⚠️ Connection error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans antialiased text-slate-900">
      {/* COMPACT TRIGGER */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[70] flex items-center justify-center w-12 h-12 bg-black text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* COMPACT CHAT WINDOW */}
      {open && (
        <div className="
          fixed z-[60]
          /* Mobile: Bottom Drawer */
          bottom-0 left-0 right-0 h-[60vh] 
          /* Desktop: Compact Floating Window */
          sm:bottom-20 sm:right-6 sm:left-auto sm:w-80 sm:h-[450px]
          bg-white sm:border border-slate-200 shadow-2xl sm:rounded-2xl rounded-t-3xl 
          overflow-hidden flex flex-col 
          animate-in slide-in-from-bottom-8 duration-200
        ">
          
          {/* CLEAN HEADER */}
          <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white">
                <Bot size={14} />
              </div>
              <span className="text-xs font-bold tracking-tight">ShopFlow Assistant</span>
            </div>
            <div className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
               <Sparkles size={12} className="text-slate-400" />
            </div>
          </div>

          {/* MESSAGES - Smaller text and tighter padding */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-white scroll-smooth"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[90%] px-3 py-2 rounded-xl text-[13px] leading-snug shadow-sm ${
                  m.role === "user"
                    ? "bg-black text-white rounded-tr-none"
                    : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 p-1">
                <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* MINIMAL INPUT */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50">
            <div className="relative flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="w-full pl-3 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-black transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="absolute right-1.5 p-1.5 text-slate-400 hover:text-black disabled:opacity-30"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}