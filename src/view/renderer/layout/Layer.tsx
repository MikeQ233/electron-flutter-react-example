import { cn } from '../utils/tail-wind';

export function LayoutLayer({
  children,
  zIndex,
  pointerNone,
  className,
}: {
  zIndex?: number;
  children?: React.ReactNode;
  pointerNone?: boolean;
  className?: string;
}) {
  return (
    <div
      style={{ zIndex: zIndex, pointerEvents: pointerNone ? 'none' : 'auto' }}
      className={cn(
        'absolute top-0 left-0 w-screen h-screen overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  );
}
