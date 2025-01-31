import { forwardRef, useEffect, useRef } from 'react';
import { flutterApp } from './bootstrap';

interface FlutterComponentProps {
  viewName: string;
}

export const FlutterComponent = forwardRef<
  HTMLDivElement,
  FlutterComponentProps
>(function FlutterComponent(props, ref) {
  const innerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const viewId = flutterApp.addView({
      hostElement: innerRef.current,
      initialData: {
        viewName: props.viewName,
      },
    });

    return () => {
      flutterApp.removeView(viewId);
    };
  }, []);

  return (
    <div
      ref={(node) => {
        innerRef.current = node;
        if (ref) {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }
      }}
      className="size-full"
    />
  );
});
