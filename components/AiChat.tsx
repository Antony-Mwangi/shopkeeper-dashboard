

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Send, X, Bot, Sparkles, MessageSquare } from "lucide-react";

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
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const [messages, setMessages] = useState<Msg[]>([
//     {
//       role: "ai",
//       text: "Hi! How can I help with your ShopFlow data today?",
//     },
//   ]);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages, loading]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;
//     const userText = input;
//     setMessages((prev) => [...prev, { role: "user", text: userText }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/ai/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: userText,
//           history: messages.map((m): ApiMessage => ({
//             role: m.role === "user" ? "user" : "assistant",
//             content: m.text,
//           })),
//           context: { source: "dashboard" },
//         }),
//       });
//       const data = await res.json();
//       setMessages((prev) => [...prev, { role: "ai", text: data.reply || "No response." }]);
//     } catch (err) {
//       setMessages((prev) => [...prev, { role: "ai", text: "⚠️ Connection error." }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="font-sans antialiased text-slate-900">
//       {/* TRIGGER BUTTON - Only visible when chat is closed */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           className="fixed bottom-6 right-6 z-[70] flex items-center justify-center w-12 h-12 bg-black text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
//         >
//           <MessageSquare size={20} />
//         </button>
//       )}

//       {/* COMPACT CHAT WINDOW */}
//       {open && (
//         <div className="
//           fixed z-[60]
//           /* Mobile: Bottom Drawer */
//           bottom-0 left-0 right-0 h-[60vh] 
//           /* Desktop: Compact Floating Window */
//           sm:bottom-6 sm:right-6 sm:left-auto sm:w-80 sm:h-[480px]
//           bg-white sm:border border-slate-200 shadow-2xl sm:rounded-2xl rounded-t-3xl 
//           overflow-hidden flex flex-col 
//           animate-in slide-in-from-bottom-4 fade-in duration-200
//         ">
          
//           {/* CLEAN HEADER - X Button is now here */}
//           <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white">
//                 <Bot size={14} />
//               </div>
//               <span className="text-xs font-bold tracking-tight">ShopFlow AI</span>
//             </div>
//             <div className="flex items-center gap-3">
//                <Sparkles size={12} className="text-slate-400" />
//                <button 
//                 onClick={() => setOpen(false)}
//                 className="text-slate-400 hover:text-black transition-colors"
//                >
//                  <X size={18} />
//                </button>
//             </div>
//           </div>

//           {/* MESSAGES */}
//           <div 
//             ref={scrollRef}
//             className="flex-1 overflow-y-auto p-4 space-y-3 bg-white scroll-smooth"
//           >
//             {messages.map((m, i) => (
//               <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
//                 <div className={`max-w-[90%] px-3 py-2 rounded-xl text-[13px] leading-snug shadow-sm ${
//                   m.role === "user"
//                     ? "bg-black text-white rounded-tr-none"
//                     : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50"
//                 }`}>
//                   {m.text}
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex gap-1 p-1">
//                 <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
//                 <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
//                 <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
//               </div>
//             )}
//           </div>

//           {/* MINIMAL INPUT */}
//           <div className="p-3 border-t border-slate-100 bg-slate-50/50">
//             <div className="relative flex items-center">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Ask me anything..."
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-black transition-colors shadow-sm"
//               />
//               <button
//                 onClick={sendMessage}
//                 disabled={loading || !input.trim()}
//                 className="absolute right-1.5 p-1.5 text-slate-400 hover:text-black disabled:opacity-30 transition-colors"
//               >
//                 <Send size={14} />
//               </button>
//             </div>
//             <p className="text-[9px] text-center text-slate-400 mt-2 font-medium uppercase tracking-tighter">
//               ShopFlow Intelligence
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  X,
  Bot,
  Sparkles,
  MessageSquare,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";

type Msg = {
  id: string;
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

  const [editingId, setEditingId] = useState<string | null>(null);

  const [editText, setEditText] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: crypto.randomUUID(),
      role: "ai",
      text: "Hi! How can I help with your ShopFlow data today?",
    },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  /* ================= SEND MESSAGE ================= */

  const sendMessage = async (
    overrideMessages?: Msg[],
    overrideInput?: string
  ) => {
    const finalInput = overrideInput || input;

    if (!finalInput.trim() || loading) return;

    const userMessage: Msg = {
      id: crypto.randomUUID(),
      role: "user",
      text: finalInput,
    };

    const updatedMessages = overrideMessages
      ? [...overrideMessages, userMessage]
      : [...messages, userMessage];

    setMessages(updatedMessages);

    setInput("");

    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: finalInput,

          history: updatedMessages.map(
            (m): ApiMessage => ({
              role:
                m.role === "user"
                  ? "user"
                  : "assistant",

              content: m.text,
            })
          ),

          context: {
            source: "dashboard",
          },
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,

        {
          id: crypto.randomUUID(),
          role: "ai",
          text: data.reply || "No response.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,

        {
          id: crypto.randomUUID(),
          role: "ai",
          text: "⚠️ Connection error.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE MESSAGE ================= */

  const deleteMessage = (id: string) => {
    setMessages((prev) =>
      prev.filter((m) => m.id !== id)
    );
  };

  /* ================= START EDIT ================= */

  const startEdit = (msg: Msg) => {
    setEditingId(msg.id);
    setEditText(msg.text);
  };

  /* ================= SAVE EDIT + REGENERATE ================= */

  const saveEdit = async () => {
    if (!editingId) return;

    const index = messages.findIndex(
      (m) => m.id === editingId
    );

    if (index === -1) return;

    const updated = [...messages];

    updated[index] = {
      ...updated[index],
      text: editText,
    };

    /*
      Remove all messages after edited message
      so AI regenerates fresh response
    */

    const trimmed = updated.slice(0, index + 1);

    setMessages(trimmed);

    setEditingId(null);

    const editedMessage = trimmed[index];

    if (editedMessage.role === "user") {
      setLoading(true);

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: editedMessage.text,

            history: trimmed.map(
              (m): ApiMessage => ({
                role:
                  m.role === "user"
                    ? "user"
                    : "assistant",

                content: m.text,
              })
            ),

            context: {
              source: "dashboard",
            },
          }),
        });

        const data = await res.json();

        setMessages((prev) => [
          ...prev,

          {
            id: crypto.randomUUID(),
            role: "ai",
            text:
              data.reply || "No response.",
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,

          {
            id: crypto.randomUUID(),
            role: "ai",
            text: "⚠️ Connection error.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="font-sans antialiased text-slate-900">
      {/* TRIGGER BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[70] flex items-center justify-center w-12 h-12 bg-black text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <MessageSquare size={20} />
        </button>
      )}

      {/* CHAT WINDOW */}
      {open && (
        <div
          className="
          fixed z-[60]
          bottom-0 left-0 right-0 h-[60vh]
          sm:bottom-6 sm:right-6 sm:left-auto sm:w-80 sm:h-[480px]
          bg-white sm:border border-slate-200 shadow-2xl sm:rounded-2xl rounded-t-3xl
          overflow-hidden flex flex-col
          animate-in slide-in-from-bottom-4 fade-in duration-200
        "
        >
          {/* HEADER */}
          <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white">
                <Bot size={14} />
              </div>

              <span className="text-xs font-bold tracking-tight">
                ShopFlow AI
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles
                size={12}
                className="text-slate-400"
              />

              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-black transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-white scroll-smooth"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`group relative max-w-[90%] px-3 py-2 rounded-xl text-[13px] leading-snug shadow-sm ${
                    m.role === "user"
                      ? "bg-black text-white rounded-tr-none"
                      : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50"
                  }`}
                >
                  {/* EDIT MODE */}
                  {editingId === m.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editText}
                        onChange={(e) =>
                          setEditText(e.target.value)
                        }
                        className="w-full bg-white text-black rounded p-2 text-xs outline-none"
                      />

                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1 text-xs bg-green-600 text-white px-2 py-1 rounded"
                      >
                        <Check size={12} />
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      {m.text}

                      {/* ACTIONS */}
                      {m.role === "user" && (
                        <div className="absolute -top-2 -left-16 opacity-0 group-hover:opacity-100 flex gap-1 transition">
                          <button
                            onClick={() =>
                              startEdit(m)
                            }
                            className="p-1 rounded bg-white border shadow hover:bg-slate-50"
                          >
                            <Pencil
                              size={12}
                              className="text-slate-700"
                            />
                          </button>

                          <button
                            onClick={() =>
                              deleteMessage(m.id)
                            }
                            className="p-1 rounded bg-white border shadow hover:bg-slate-50"
                          >
                            <Trash2
                              size={12}
                              className="text-red-600"
                            />
                          </button>
                        </div>
                      )}
                    </>
                  )}
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

          {/* INPUT */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50">
            <div className="relative flex items-center">
              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ask me anything..."
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  sendMessage()
                }
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-black transition-colors shadow-sm"
              />

              <button
                onClick={() => sendMessage()}
                disabled={
                  loading || !input.trim()
                }
                className="absolute right-1.5 p-1.5 text-slate-400 hover:text-black disabled:opacity-30 transition-colors"
              >
                <Send size={14} />
              </button>
            </div>

            <p className="text-[9px] text-center text-slate-400 mt-2 font-medium uppercase tracking-tighter">
              ShopFlow Intelligence
            </p>
          </div>
        </div>
      )}
    </div>
  );
}