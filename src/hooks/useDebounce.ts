import { useCallback, useRef } from 'react';

export default function useDebounce<A extends any[]>(
  callback: (...args: A) => void,
  delay: number
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const argsRef = useRef<A>();
  return useCallback(
    (...args: A) => {
      argsRef.current = args;
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        if (argsRef.current) {
          callback(...argsRef.current);
        }
      }, delay);
    },
    [callback, delay]
  );
}
