import { debounce } from "lodash";

declare module globalThis {
  var __initializerMap: Record<string, boolean>;
}

export const createInitiator = (fn: (...args: any[]) => any) => {
  if (!globalThis.__initializerMap) globalThis.__initializerMap = {};

  const key = fn.toString();

  return debounce((...args: any[]) => {
    if (globalThis.__initializerMap[key]) return;

    globalThis.__initializerMap[key] = true;
    return fn(...args);
  }, 100);
};
