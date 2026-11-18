"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { Placeholder } from "@/components/ui/Placeholder";
import { SmartImage } from "@/components/ui/SmartImage";

/** Swipeable slider on mobile; main photo with hover zoom + thumbnails on desktop. */
export function ProductGallery({
  images,
  name,
  activeIndex,
  onChange,
}: {
  images: string[];
  name: string;
  activeIndex: number;
  onChange: (i: number) => void;
}) {
  const { t, dir } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const count = images.length;

  // Keep the mobile slider in sync when the index changes from outside (color choice, dots).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const target = activeIndex * track.clientWidth * (dir === "rtl" ? -1 : 1);
    if (Math.abs(track.scrollLeft - target) > 4) track.scrollTo({ left: target, behavior: "smooth" });
  }, [activeIndex, dir]);

  // Update the index once the swipe settles (ignores intermediate positions of smooth scrolls).
  const settleTimer = useRef<number | undefined>(undefined);
  const onScroll = () => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const i = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
      if (i !== activeIndex && i >= 0 && i < count) onChange(i);
    }, 90);
  };
  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  if (count === 0) {
    return <Placeholder label={name} caption={t("image.soon")} className="aspect-3/4 w-full rounded-2xl" />;
  }

  const alt = (i: number) => `${name} — ${t("product.photo", { i: i + 1, n: count })}`;

  return (
    <div>
      {/* Mobile: swipe */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto"
          aria-roledescription="carousel"
          aria-label={name}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="aspect-3/4 w-full shrink-0 snap-center"
              role="group"
              aria-roledescription="slide"
              aria-label={t("product.photo", { i: i + 1, n: count })}
            >
              <SmartImage
                src={src}
                alt={alt(i)}
                label={name}
                // Slider is hidden from 768px (desktop gallery below): don't request a big file there.
                sizes="(min-width: 768px) 96px, 100vw"
                preload={i === 0}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
        {count > 1 && (
          <div className="mt-3 flex justify-center gap-1">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => onChange(i)}
                aria-label={t("product.showPhoto", { i: i + 1 })}
                aria-current={i === activeIndex}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === activeIndex ? "w-5 bg-gold-deep" : "w-1.5 bg-ink/25",
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: thumbnails + zoom */}
      <div className={cn("hidden gap-4 md:grid", count > 1 ? "grid-cols-[4.5rem_1fr]" : "grid-cols-1")}>
        {count > 1 && (
          <div className="flex flex-col gap-3">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => onChange(i)}
                aria-label={t("product.showPhoto", { i: i + 1 })}
                aria-current={i === activeIndex}
                className={cn(
                  "overflow-hidden rounded-lg ring-offset-2 ring-offset-cream transition",
                  i === activeIndex ? "ring-2 ring-gold" : "opacity-70 hover:opacity-100",
                )}
              >
                <SmartImage src={src} alt="" label={name} sizes="72px" className="aspect-3/4 w-full" />
              </button>
            ))}
          </div>
        )}
        <div
          className="relative aspect-3/4 cursor-zoom-in overflow-hidden rounded-2xl"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          onMouseLeave={() => setZoom(null)}
          title={t("product.zoom")}
        >
          <div
            className="h-full w-full transition-transform duration-200 ease-out"
            style={{
              transform: zoom ? "scale(2)" : "none",
              transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center",
            }}
          >
            <SmartImage
              key={images[activeIndex]}
              src={images[activeIndex]}
              alt={alt(activeIndex)}
              label={name}
              sizes="(min-width: 1280px) 600px, 50vw"
              preload={activeIndex === 0}
              className="h-full w-full animate-fade-up"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
