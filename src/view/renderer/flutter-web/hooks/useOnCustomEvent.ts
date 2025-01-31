import { RefObject, useEffect } from 'react';

interface CustomEventCallback<T> {
  (event: CustomEvent<T>): void;
}

export const useOnCustomEvent = <T>(
  ref: RefObject<HTMLElement | null>,
  eventName: string,
  callback: CustomEventCallback<T>,
): void => {
  useEffect(() => {
    if (ref.current) {
      // flutter component somehow sets ref to null after
      // flutter view is attached to the div, so we need to store
      // ref here
      // (don't know if it's due to dev strict mode)
      const reference = ref.current;
      const handleEvent = (event: CustomEvent) => {
        callback(event as CustomEvent);
      };

      reference.addEventListener(eventName, handleEvent);

      return () => {
        reference.removeEventListener(eventName, handleEvent);
      };
    }
  }, [eventName, callback]);
};
