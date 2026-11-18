"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { useAssets } from "@/lib/assets";

/** Round logo (from /public/logo.png, or a gold monogram) + "MERY NAJE / STORE" wordmark. */
export function Logo({
  className,
  compact = false,
  onDark = false,
}: {
  className?: string;
  compact?: boolean;
  /** Light gold on dark backgrounds, darker gold on cream (contrast). */
  onDark?: boolean;
}) {
  const { logo } = useAssets();
  return (
    <span className={cn("flex items-center gap-2 md:gap-2.5", className)}>
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={88}
          height={88}
          preload
          className="h-9 w-9 shrink-0 rounded-full bg-white object-cover ring-1 ring-gold/60 md:h-11 md:w-11"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory font-serif text-[0.85rem] tracking-wider text-gold-deep ring-1 ring-gold/70 md:h-11 md:w-11"
        >
          MN
        </span>
      )}
      {!compact && (
        <span dir="ltr" className="leading-none">
          <span className="block font-serif text-[1.15rem] tracking-[0.1em] whitespace-nowrap uppercase md:text-2xl md:tracking-[0.14em]">
            Mery Naje
          </span>
          <span className={cn("mt-0.5 block text-[0.55rem] tracking-[0.5em] uppercase", onDark ? "text-gold-light" : "text-gold-deep")}>
            Store
          </span>
        </span>
      )}
    </span>
  );
}
