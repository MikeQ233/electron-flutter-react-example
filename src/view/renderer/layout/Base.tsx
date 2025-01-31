export function LayoutBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">{children}</div>
  );
}
