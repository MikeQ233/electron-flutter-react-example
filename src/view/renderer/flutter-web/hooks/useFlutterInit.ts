import { ComponentRef, RefObject, useEffect } from 'react';
import { FlutterComponent } from '../FlutterComponent';

export function useFlutterInitEffect(
  ref: RefObject<ComponentRef<typeof FlutterComponent> | null>,
  effect: React.EffectCallback,
) {
  useEffect(() => {
    if (ref.current) {
      const reference = ref.current;
      let destructor: (() => void) | void;
      const listener = () => {
        destructor = effect();
      };
      reference.addEventListener('flutter:initialized', listener, {
        once: true,
      });
      return () => {
        if (destructor) {
          destructor();
        }
        reference.removeEventListener('flutter:initialized', listener);
      };
    }
  }, []);
}
