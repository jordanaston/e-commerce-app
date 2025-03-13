import { useState, useEffect } from "react";

export function useLocalStorage(
  key: string,
  initialValue: string | null = null
) {
  const [value, setValue] = useState<string | null>(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue ?? initialValue);
    }
  }, [key, initialValue]);

  const setStoredValue = (newValue: string | null) => {
    if (typeof window !== "undefined") {
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newValue);
      }
      setValue(newValue);
    }
  };

  return [value, setStoredValue] as const;
}
