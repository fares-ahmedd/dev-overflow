"use client";

import { useCallback } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  return useCallback(
    (...args: Parameters<T>) => {
      const handler = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(handler);
    },
    [callback, delay]
  );
}
