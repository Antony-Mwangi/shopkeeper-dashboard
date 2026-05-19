

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

//STRUCTURED MEMORY 

export type Preferences = {
  currency?: "KSH" | string;
  currencySymbol?: string;
  region?: string;
};

export type FinanceContext = {
  currency?: string;
  currencySymbol?: string;
};

//CHAT MESSAGE 

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  updatedAt?: string;
};

//MAIN MEMORY TYPE 

export type Memory = {
  preferences?: Preferences;
  finance?: FinanceContext;

  chats?: ChatMessage[];

  [key: string]:
    | MemoryValue
    | Preferences
    | FinanceContext
    | ChatMessage[]
    | undefined;
};

// IN-MEMORY STORE 

const memoryStore = new Map<string, Memory>();

// GET MEMORY

export function getMemory(userId: string): Memory {
  return memoryStore.get(userId) ?? {};
}

// DEEP MERGE 

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

//UPDATE MEMORY

export function updateMemory(userId: string, data: Memory): void {
  const existing = memoryStore.get(userId) ?? {};
  const updated = deepMerge(existing, data);

  memoryStore.set(userId, updated);
}

//SET MEMORY

export function setMemory(userId: string, data: Memory): void {
  memoryStore.set(userId, data);
}

//CLEAR MEMORY 

export function clearMemory(userId: string): void {
  memoryStore.delete(userId);
}


//GET CHAT HISTORY 

export function getChatHistory(userId: string): ChatMessage[] {
  const memory = getMemory(userId);

  return memory.chats ?? [];
}

//ADD CHAT MESSAGE 

export function addChatMessage(
  userId: string,
  message: Omit<ChatMessage, "id" | "createdAt">
): ChatMessage {
  const memory = getMemory(userId);

  const newMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: message.role,
    content: message.content,
    createdAt: new Date().toISOString(),
  };

  const chats = [...(memory.chats ?? []), newMessage];

  updateMemory(userId, { chats });

  return newMessage;
}

// EDIT CHAT MESSAGE 

export function editChatMessage(
  userId: string,
  messageId: string,
  newContent: string
): boolean {
  const memory = getMemory(userId);

  const chats = (memory.chats ?? []).map((msg) => {
    if (msg.id === messageId) {
      return {
        ...msg,
        content: newContent,
        updatedAt: new Date().toISOString(),
      };
    }

    return msg;
  });

  updateMemory(userId, { chats });

  return true;
}

//DELETE CHAT MESSAGE 

export function deleteChatMessage(
  userId: string,
  messageId: string
): boolean {
  const memory = getMemory(userId);

  const chats = (memory.chats ?? []).filter(
    (msg) => msg.id !== messageId
  );

  updateMemory(userId, { chats });

  return true;
}