import { useEffect, useRef } from 'react';
import { flutterApp } from './bootstrap';

interface FlutterComponentProps {
  viewName: string;
  tabIndex: number;
}

export function FlutterComponent(props: FlutterComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewId = flutterApp.addView({
      hostElement: ref.current,
      initialData: {
        viewName: props.viewName,
      },
    });

    return () => {
      flutterApp.removeView(viewId);
    };
  }, []);

  return <div ref={ref} className="size-full" />;
}
