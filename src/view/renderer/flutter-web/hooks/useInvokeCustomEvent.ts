import { RefObject, useEffect, useRef } from 'react';

export function useInvokeCustomEvent<T extends Record<string, any> | null>(
  ref: RefObject<HTMLDivElement | null>,
  eventName: string,
) {
  const referenceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // flutter component somehow sets ref to null after
    // flutter view is attached to the div
    // don't know if it's due to dev Strict Mode
    if (ref.current) {
      referenceRef.current = ref.current;
    }
  }, []);
  return {
    invokeEvent: (detail: T) => {
      if (referenceRef.current) {
        referenceRef.current.dispatchEvent(
          new CustomEvent(eventName, {
            detail,
          }),
        );
      }
    },
  };
}
