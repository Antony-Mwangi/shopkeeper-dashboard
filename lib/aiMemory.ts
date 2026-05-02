export type MemoryValue =
  | string
  | number
  | boolean
  | null
  | MemoryValue[]
  | { [key: string]: MemoryValue };

export type Memory = Record<string, MemoryValue>;

const memoryStore = new Map<string, Memory>();

/**
 * Get user memory safely
 */
export function getMemory(userId: string): Memory {
  return memoryStore.get(userId) ?? {};
}

/**
 * Update memory (deep-merge style shallow safe merge)
 */
export function updateMemory(userId: string, data: Memory): void {
  const existing = memoryStore.get(userId) ?? {};

  memoryStore.set(userId, {
    ...existing,
    ...data,
  });
}

/**
 * Optional: clear memory (useful for logout)
 */
export function clearMemory(userId: string): void {
  memoryStore.delete(userId);
}