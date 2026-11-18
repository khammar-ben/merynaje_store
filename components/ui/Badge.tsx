import { cn } from "@/lib/cn";

export function Badge({
  tone,
  children,
  className,
}: {
  tone: "new" | "soldOut";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-medium tracking-wider uppercase",
        tone === "new" ? "bg-ivory/95 text-gold-deep ring-1 ring-gold/50" : "bg-ink/85 text-cream",
        className,
      )}
    >
      {children}
    </span>
  );
}
