
import { useState, useEffect } from 'react';

/**
 * A hook that delays updating a value until a specified delay has passed
 * since the last change, useful for search inputs to reduce API calls.
 * 
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Only set up a new timer if the value actually changes
    if (JSON.stringify(value) !== JSON.stringify(debouncedValue)) {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, delay, debouncedValue]);

  return debouncedValue;
}
