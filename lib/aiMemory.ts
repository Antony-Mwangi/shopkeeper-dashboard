

// export type MemoryValue =
//   | string
//   | number
//   | boolean
//   | null
//   | MemoryValue[]
//   | { [key: string]: MemoryValue };

// /* ================= STRUCTURED MEMORY LAYERS ================= */
// export type Preferences = {
//   currency?: "KSH"  | string;
//   currencySymbol?: string;
//   region?: string;
// };

// export type FinanceContext = {
//   currency?: string;
//   currencySymbol?: string;
// };

// /* ================= MAIN MEMORY TYPE ================= */
// export type Memory = {
//   preferences?: Preferences;
//   finance?: FinanceContext;

//   // dynamic AI memory storage (chat, notes, etc.)
//   [key: string]: MemoryValue | Preferences | FinanceContext | undefined;
// };

// /* ================= IN-MEMORY STORE ================= */
// const memoryStore = new Map<string, Memory>();

// /* ================= GET MEMORY ================= */
// export function getMemory(userId: string): Memory {
//   return memoryStore.get(userId) ?? {};
// }

// /* ================= DEEP MERGE ================= */
// function deepMerge(target: Memory, source: Memory): Memory {
//   const result: Memory = { ...target };

//   for (const key in source) {
//     const value = source[key];

//     if (
//       value &&
//       typeof value === "object" &&
//       !Array.isArray(value)
//     ) {
//       result[key] = {
//         ...(result[key] as object),
//         ...(value as object),
//       };
//     } else {
//       result[key] = value as any;
//     }
//   }

//   return result;
// }

// /* ================= UPDATE MEMORY ================= */
// export function updateMemory(userId: string, data: Memory): void {
//   const existing = memoryStore.get(userId) ?? {};
//   const updated = deepMerge(existing, data);
//   memoryStore.set(userId, updated);
// }

// /* ================= SET MEMORY (overwrite) ================= */
// export function setMemory(userId: string, data: Memory): void {
//   memoryStore.set(userId, data);
// }

// /* ================= CLEAR MEMORY ================= */
// export function clearMemory(userId: string): void {
//   memoryStore.delete(userId);
// }


export type MemoryValue =
  | string
  | number
  | boolean
  | null
  | MemoryValue[]
  | { [key: string]: MemoryValue };

/* ================= CHAT MESSAGE ================= */

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  updatedAt?: number;
};

/* ================= USER PREFERENCES ================= */

export type Preferences = {
  currency?: "KSH" | string;
  currencySymbol?: string;
  region?: string;
};

/* ================= FINANCE CONTEXT ================= */

export type FinanceContext = {
  currency?: string;
  currencySymbol?: string;
};

/* ================= MAIN MEMORY ================= */

export type Memory = {
  preferences?: Preferences;
  finance?: FinanceContext;

  /* CHAT HISTORY */
  messages?: ChatMessage[];

  [key: string]:
    | MemoryValue
    | Preferences
    | FinanceContext
    | ChatMessage[]
    | undefined;
};

/* ================= STORE ================= */

const memoryStore = new Map<string, Memory>();

/* ================= GET MEMORY ================= */

export function getMemory(userId: string): Memory {
  return memoryStore.get(userId) ?? {};
}

/* ================= DEEP MERGE ================= */

function deepMerge(target: Memory, source: Memory): Memory {
  const result: Memory = { ...target };

  for (const key in source) {
    const value = source[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      result[key] = {
        ...(result[key] as object),
        ...(value as object),
      };
    } else {
      result[key] = value as any;
    }
  }

  return result;
}

/* ================= UPDATE MEMORY ================= */

export function updateMemory(
  userId: string,
  data: Memory
): void {
  const existing = memoryStore.get(userId) ?? {};

  const updated = deepMerge(existing, data);

  memoryStore.set(userId, updated);
}

/* ================= SET MEMORY ================= */

export function setMemory(
  userId: string,
  data: Memory
): void {
  memoryStore.set(userId, data);
}

/* ================= CLEAR MEMORY ================= */

export function clearMemory(userId: string): void {
  memoryStore.delete(userId);
}

/* =========================================================
   CHAT MESSAGE SYSTEM
========================================================= */

/* ================= ADD MESSAGE ================= */

export function addMessage(
  userId: string,
  message: Omit<ChatMessage, "id" | "createdAt">
) {
  const memory = getMemory(userId);

  const newMessage: ChatMessage = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...message,
  };

  const messages = memory.messages || [];

  memory.messages = [...messages, newMessage];

  memoryStore.set(userId, memory);

  return newMessage;
}

/* ================= GET MESSAGES ================= */

export function getMessages(
  userId: string
): ChatMessage[] {
  return getMemory(userId).messages || [];
}

/* ================= DELETE MESSAGE ================= */

export function deleteMessage(
  userId: string,
  messageId: string
) {
  const memory = getMemory(userId);

  memory.messages =
    memory.messages?.filter(
      (msg) => msg.id !== messageId
    ) || [];

  memoryStore.set(userId, memory);
}

/* ================= EDIT MESSAGE ================= */

export function editMessage(
  userId: string,
  messageId: string,
  newContent: string
) {
  const memory = getMemory(userId);

  const messages = memory.messages || [];

  const updatedMessages = messages.map((msg) => {
    if (msg.id === messageId) {
      return {
        ...msg,
        content: newContent,
        updatedAt: Date.now(),
      };
    }

    return msg;
  });

  memory.messages = updatedMessages;

  memoryStore.set(userId, memory);
}

/* ================= REMOVE AI RESPONSES AFTER EDIT ================= */
/*
   When a user edits a message,
   remove ALL assistant replies after that point
   so AI can regenerate fresh responses.
*/

export function regenerateFromMessage(
  userId: string,
  messageId: string
) {
  const memory = getMemory(userId);

  const messages = memory.messages || [];

  const index = messages.findIndex(
    (msg) => msg.id === messageId
  );

  if (index === -1) return;

  // keep messages up to edited user message
  memory.messages = messages.slice(0, index + 1);

  memoryStore.set(userId, memory);
}