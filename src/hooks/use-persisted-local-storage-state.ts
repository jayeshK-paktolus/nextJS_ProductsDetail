"use client";

import { useEffect, useState } from "react";

export const usePersistedLocalStorageState = <T>(
  key: string,
  initialValue: T
) => {
  const isWindowObjectAvailable = typeof window !== "undefined";

  const [value, setValue] = useState(() => {
    if (isWindowObjectAvailable) {
      const item = localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      return JSON.parse(item) as T;
    }
  });

  useEffect(() => {
    if (isWindowObjectAvailable && value !== initialValue) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, initialValue, isWindowObjectAvailable]);

  const removeValue = () => {
    if (isWindowObjectAvailable) {
      localStorage.removeItem(key);
      setValue(initialValue);
    }
  };

  return { value, setValue, removeValue };
};
