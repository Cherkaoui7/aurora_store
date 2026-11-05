import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce dynamic state updates.
 * Throttles high-frequency inputs (such as rapid keystrokes in search bars)
 * to prevent excessive rendering and client-side computational spikes.
 *
 * @param {*} value The value to debounce
 * @param {number} delay Milliseconds to delay before committing the value (default 150ms)
 * @returns {*} The debounced value
 */
export const useDebounce = (value, delay = 150) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

