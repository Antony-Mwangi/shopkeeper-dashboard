// export type MemoryValue =
//   | string
//   | number
//   | boolean
//   | null
//   | MemoryValue[]
//   | { [key: string]: MemoryValue };

// export type Memory = Record<string, MemoryValue>;

// const memoryStore = new Map<string, Memory>();

// /* ================= GET MEMORY ================= */
// export function getMemory(userId: string): Memory {
//   return memoryStore.get(userId) ?? {};
// }

// /* ================= DEEP MERGE HELPER ================= */
// function deepMerge(
//   target: Memory,
//   source: Memory
// ): Memory {
//   const result: Memory = { ...target };

//   for (const key in source) {
//     const value = source[key];

//     if (
//       value &&
//       typeof value === "object" &&
//       !Array.isArray(value)
//     ) {
//       result[key] = {
//         ...(result[key] as Memory),
//         ...(value as Memory),
//       };
//     } else {
//       result[key] = value;
//     }
//   }

//   return result;
// }

// /* ================= UPDATE MEMORY ================= */
// export function updateMemory(
//   userId: string,
//   data: Memory
// ): void {
//   const existing = memoryStore.get(userId) ?? {};

//   const updated = deepMerge(existing, data);

//   memoryStore.set(userId, updated);
// }

// /* ================= CLEAR MEMORY ================= */
// export function clearMemory(userId: string): void {
//   memoryStore.delete(userId);
// }

// /* ================= OPTIONAL: SET MEMORY ================= */
// export function setMemory(userId: string, data: Memory): void {
//   memoryStore.set(userId, data);
// }


export type MemoryValue =
  | string
  | number
  | boolean
  | null
  | MemoryValue[]
  | { [key: string]: MemoryValue };

/* ================= STRUCTURED MEMORY LAYERS ================= */
export type Preferences = {
  currency?: "KSH"  | string;
  currencySymbol?: string;
  region?: string;
};

export type FinanceContext = {
  currency?: string;
  currencySymbol?: string;
};

/* ================= MAIN MEMORY TYPE ================= */
export type Memory = {
  preferences?: Preferences;
  finance?: FinanceContext;

  // dynamic AI memory storage (chat, notes, etc.)
  [key: string]: MemoryValue | Preferences | FinanceContext | undefined;
};

/* ================= IN-MEMORY STORE ================= */
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
export function updateMemory(userId: string, data: Memory): void {
  const existing = memoryStore.get(userId) ?? {};
  const updated = deepMerge(existing, data);
  memoryStore.set(userId, updated);
}

/* ================= SET MEMORY (overwrite) ================= */
export function setMemory(userId: string, data: Memory): void {
  memoryStore.set(userId, data);
}

/* ================= CLEAR MEMORY ================= */
export function clearMemory(userId: string): void {
  memoryStore.delete(userId);
}