export type MemoryValue =
  | string
  | number
  | boolean
  | null
  | MemoryValue[]
  | { [key: string]: MemoryValue };

export type Memory = Record<string, MemoryValue>;

const memoryStore = new Map<string, Memory>();

/* ================= GET MEMORY ================= */
export function getMemory(userId: string): Memory {
  return memoryStore.get(userId) ?? {};
}

/* ================= DEEP MERGE HELPER ================= */
function deepMerge(
  target: Memory,
  source: Memory
): Memory {
  const result: Memory = { ...target };

  for (const key in source) {
    const value = source[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      result[key] = {
        ...(result[key] as Memory),
        ...(value as Memory),
      };
    } else {
      result[key] = value;
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

/* ================= CLEAR MEMORY ================= */
export function clearMemory(userId: string): void {
  memoryStore.delete(userId);
}

/* ================= OPTIONAL: SET MEMORY ================= */
export function setMemory(userId: string, data: Memory): void {
  memoryStore.set(userId, data);
}