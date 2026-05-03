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
      text: "Hi 👋 I’m your ShopFlow AI. I can help you analyze sales trends, check stock levels, or update product info. What's on your mind?",
    },
  ]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    const currentMessages = [...messages];

    setMessages([...currentMessages, { role: "user", text: userText }]);
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
          context: { source: "dashboard" },
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "I couldn't process that. Try again?" },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `⚠️ Connection error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans antialiased">
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-4 rounded-2xl shadow-2xl transition-all duration-300 active:scale-95 ${
          open 
          ? "bg-white text-black border border-slate-200 rotate-90" 
          : "bg-black text-white hover:bg-slate-800"
        }`}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
        {!open && <span className="font-bold text-sm pr-2">Ask AI</span>}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="absolute bottom-20 right-0 w-[380px] sm:w-[420px] max-h-[600px] h-[70vh] bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 fade-in duration-300">
          
          {/* HEADER */}
          <div className="bg-black p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-slate-700 to-slate-500 rounded-lg flex items-center justify-center text-white">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white leading-none">ShopFlow AI</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <Sparkles size={14} className="text-slate-400" />
            </div>
          </div>

          {/* MESSAGES AREA */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 scroll-smooth"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-black text-white rounded-tr-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none font-medium"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Check my best selling products..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="w-full pl-4 pr-12 py-3.5 bg-slate-100 border-none rounded-2xl text-sm font-medium text-black focus:ring-2 focus:ring-black transition-all outline-none placeholder:text-slate-400"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`absolute right-2 p-2 rounded-xl transition-all ${
                  loading || !input.trim() 
                  ? "text-slate-300" 
                  : "bg-black text-white shadow-lg hover:scale-105 active:scale-95"
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium uppercase tracking-tighter">
              Powered by ShopFlow Intelligence
            </p>
          </div>
        </div>
      )}
    </div>
  );
}