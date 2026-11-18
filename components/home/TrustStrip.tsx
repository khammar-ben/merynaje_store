"use client";

import { HandCoins, MessageCircleHeart, Store, Truck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/data/translations";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS: { icon: typeof Truck; key: "delivery" | "cod" | "store" | "whatsapp" }[] = [
  { icon: Truck, key: "delivery" },
  { icon: HandCoins, key: "cod" },
  { icon: Store, key: "store" },
  { icon: MessageCircleHeart, key: "whatsapp" },
];

export function TrustStrip() {
  const { t } = useI18n();
  return (
    <section aria-label="Mery Naje" className="border-y border-gold/30 bg-ivory">
      <ul className="container-site grid grid-cols-2 gap-x-4 gap-y-8 py-10 md:grid-cols-4 md:py-12">
        {ITEMS.map(({ icon: Icon, key }, i) => (
          <li key={key}>
            <Reveal delay={i * 60} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold-deep ring-1 ring-gold/50">
                <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <p className="mt-4 font-serif text-lg leading-snug md:text-xl">{t(`trust.${key}` as TranslationKey)}</p>
              <p className="mt-1 text-xs text-muted md:text-sm">{t(`trust.${key}.sub` as TranslationKey)}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
