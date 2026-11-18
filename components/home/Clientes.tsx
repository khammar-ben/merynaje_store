"use client";

import { Star } from "lucide-react";
import { settings } from "@/data/settings";
import { useAssets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

/** Screenshots from the "Nos clientes" Instagram highlight (/public/clientes). */
export function Clientes() {
  const { t } = useI18n();
  const { clientes } = useAssets();
  // Placeholders until screenshots are added to /public/clientes.
  const shots: (string | null)[] = clientes.length ? clientes.slice(0, 8) : [null, null, null, null];

  return (
    <section aria-labelledby="clientes-title" className="py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <div className="mb-4 flex justify-center gap-1 text-gold" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" strokeWidth={0} />
            ))}
          </div>
          <SectionHeading id="clientes-title" title={t("clientes.title")} subtitle={t("clientes.subtitle")} />
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-5">
          {shots.map((src, i) => (
            <li key={src ?? i}>
              <Reveal delay={(i % 4) * 70}>
                <figure className="overflow-hidden rounded-2xl bg-ivory p-1.5 shadow-[0_10px_30px_-18px_rgb(74_55_42/0.5)] ring-1 ring-gold/30">
                  <SmartImage
                    src={src}
                    alt={`${t("clientes.alt")} ${i + 1}`}
                    label={t("clientes.placeholder")}
                    caption={t("image.soon")}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="aspect-9/16 rounded-xl"
                    imgClassName="object-top"
                  />
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={settings.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <InstagramIcon className="h-4 w-4" /> {t("clientes.more")}
          </a>
        </div>
      </div>
    </section>
  );
}
