import { cn, hasPosition } from "@/lib/cn";

/** Elegant stand-in shown whenever a photo is missing: cream background, name in serif. */
export function Placeholder({ label, caption, className }: { label: string; caption?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "@container flex items-center justify-center overflow-hidden bg-[#f2e9dc]",
        "bg-[radial-gradient(90%_70%_at_50%_30%,#fbf7f1_0%,transparent_70%)]",
        !hasPosition(className) && "relative",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-1.5 rounded-[inherit] border border-gold/40 @[120px]:inset-2.5 @[260px]:inset-4"
      />
      {/* Tiny thumbnails: monogram only. */}
      <span aria-hidden="true" className="relative font-serif text-sm text-gold-deep @[120px]:hidden">
        MN
      </span>
      <div aria-hidden="true" className="relative hidden px-5 text-center @[120px]:block">
        <span className="block text-[0.6rem] tracking-[0.35em] text-gold-deep uppercase @[260px]:text-xs">
          Mery Naje
        </span>
        <span className="mt-2 block font-serif text-xl leading-tight text-wood-dark @[200px]:text-2xl @[380px]:text-4xl">
          {label}
        </span>
        <span className="mx-auto mt-3 block h-px w-10 bg-gold" />
        {caption && <span className="mt-3 block text-[0.7rem] text-muted @[260px]:text-xs">{caption}</span>}
      </div>
    </div>
  );
}
