import { useEffect, useRef } from 'react';

/**
 * Custom hook to poll a function at a specified interval
 * @param callback - The function to call on each interval
 * @param interval - Interval in milliseconds
 * @param enabled - Whether polling is enabled (default: true)
 */
export function usePolling(
  callback: () => void,
  interval: number,
  enabled: boolean = true
): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const tick = () => {
      savedCallback.current();
    };

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, enabled]);
}
