import { ComponentRef, useEffect, useRef, useState } from 'react';
import { FlutterComponent } from '../flutter-web/FlutterComponent';
import { cn } from '../utils/tail-wind';
import { useOnCustomEvent } from '../flutter-web/hooks/useOnCustomEvent';
import { useInvokeCustomEvent } from '../flutter-web/hooks/useInvokeCustomEvent';
import { AppContext } from '../app-context';

export function NavigationFlutter({ className }: { className?: string }) {
  const ref = useRef<ComponentRef<typeof FlutterComponent>>(null);
  const [pointerEvent, setPointerEvent] = useState(false);

  useOnCustomEvent<{ status: 'open' | 'close' }>(
    ref,
    'flutter:status',
    (event) => {
      if (event.detail.status === 'open') {
        setPointerEvent(true);
      } else {
        setPointerEvent(false);
        AppContext.closeNavigation();
      }
    },
  );

  const { invokeEvent } = useInvokeCustomEvent<{ open: boolean }>(
    ref,
    'flutter:open',
  );

  useEffect(() => {
    return AppContext.useAppStore().subscribe(
      (state) => state.navigationOpen,
      (open) => {
        invokeEvent({ open });
      },
    );
  }, []);

  return (
    <div
      className={cn(
        'w-screen h-screen',
        {
          'pointer-events-auto': pointerEvent,
        },
        className,
      )}
    >
      <FlutterComponent ref={ref} viewName="navigation" />
    </div>
  );
}
