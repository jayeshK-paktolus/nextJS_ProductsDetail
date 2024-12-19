"use client";

import { useEffect, useState } from "react";

export const usePersistedLocalStorageState = (
  key: string,
  initialValue: string
) => {
  const isWindowObjectAvailable = typeof window !== "undefined";

  const [value, setValue] = useState(() => {
    if (isWindowObjectAvailable) {
      const item = localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      return JSON.parse(item);
    }
  });

  useEffect(() => {
    if (isWindowObjectAvailable && value !== initialValue) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, initialValue, isWindowObjectAvailable]);

  const removeValue = (key: string) => {
    if (isWindowObjectAvailable) {
      localStorage.removeItem(key);
      setValue(initialValue);
    }
  };

  return { value, setValue, removeValue };
};
