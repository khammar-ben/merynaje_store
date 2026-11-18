"use client";

import Image from "next/image";
import { useState } from "react";
import { cn, hasPosition } from "@/lib/cn";
import { Placeholder } from "./Placeholder";

type Props = {
  src?: string | null;
  alt: string;
  /** Text shown on the placeholder when the photo is missing. */
  label?: string;
  caption?: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Above-the-fold image (hero, first product photo): loaded immediately. */
  preload?: boolean;
};

/**
 * Photo with a skeleton while loading. If the resized WebP version is missing (photo added
 * while `npm run dev` was running), the original file is used; if that fails too, an elegant
 * placeholder is shown — never a broken image.
 */
export function SmartImage({ src, alt, label, caption, sizes, className, imgClassName, preload }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failures, setFailures] = useState({ src: "", count: 0 });
  const failed = failures.src === src ? failures.count : 0;

  if (!src || failed >= 2) {
    return <Placeholder label={label ?? alt} caption={caption} className={className} />;
  }

  return (
    <div className={cn("overflow-hidden bg-sand", !hasPosition(className) && "relative", className)}>
      {!loaded && <div aria-hidden="true" className="skeleton absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={failed === 1}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        className={cn("object-cover", imgClassName)}
        onLoad={() => setLoaded(true)}
        onError={() => setFailures({ src, count: failed + 1 })}
      />
    </div>
  );
}
