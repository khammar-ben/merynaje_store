"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useAssets } from "@/lib/assets";
import { getNewArrivals } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewArrivals() {
  const { t, dir } = useI18n();
  const trackRef = useRef<HTMLUListElement>(null);
  const { photosFirst } = useAssets();
  const items = photosFirst(getNewArrivals());

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8 * direction * (dir === "rtl" ? -1 : 1);
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  const arrow =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory transition-colors hover:border-gold hover:bg-gold/10";

  return (
    <section aria-labelledby="new-title" className="py-16 md:py-24">
      <div className="container-site">
        <Reveal className="flex items-end justify-between gap-6">
          <SectionHeading id="new-title" align="start" eyebrow="Mery Naje" title={t("home.new.title")} subtitle={t("home.new.subtitle")} />
          <div className="hidden shrink-0 gap-2 md:flex">
            <button type="button" className={arrow} onClick={() => scroll(-1)} aria-label={t("common.previous")}>
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" strokeWidth={1.5} />
            </button>
            <button type="button" className={arrow} onClick={() => scroll(1)} aria-label={t("common.next")}>
              <ChevronRight className="h-5 w-5 rtl:rotate-180" strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul
            ref={trackRef}
            className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:mt-10 md:scroll-px-0 md:gap-6 md:px-0"
          >
            {items.map((p) => (
              <li key={p.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-[calc((100%-3*1.5rem)/4)]">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 text-center">
          <Link
            href="/collection/nouveautes/"
            className="inline-flex min-h-11 items-center gap-2 border-b border-gold pb-0.5 text-sm font-medium tracking-wide transition-colors hover:text-gold-deep"
          >
            {t("home.new.all")} <ArrowRight className="h-4 w-4 rtl:rotate-180" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
