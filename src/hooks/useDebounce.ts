import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a value.
 * 
 * @param value - The value you want to debounce.
 * @param delay - Time in milliseconds to wait before updating the value.
 * 
 * @returns - The debounced value (updated after the delay).
 * 
 * This hook delays updating the value until after the specified delay period, avoiding unnecessary updates.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}