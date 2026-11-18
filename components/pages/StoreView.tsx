"use client";

import { settings } from "@/data/settings";
import { useAssets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import { StoreInfo } from "@/components/home/VisitStore";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function StoreView() {
  const { t, l } = useI18n();
  const { store } = useAssets();
  const [cover, ...others] = store;
  // Three gallery slots, filled with placeholders until shop photos are added.
  const gallery: (string | null)[] = [...others, null, null, null].slice(0, Math.max(3, others.length));

  return (
    <>
      <section className="container-site grid items-center gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
        <div className="animate-fade-up">
          <SectionHeading as="h1" align="start" eyebrow={t("store.eyebrow")} title={l(settings.story.title)} />
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ink/85">
            {settings.story.paragraphs.map((p, i) => (
              <p key={i}>{l(p)}</p>
            ))}
          </div>
        </div>
        <SmartImage
          src={cover}
          alt={t("visit.photoAlt")}
          label={t("store.eyebrow")}
          caption="Hay Adil · Casablanca"
          sizes="(min-width: 768px) 50vw, 100vw"
          preload
          className="aspect-4/5 rounded-2xl shadow-[0_24px_50px_-30px_rgb(74_55_42/0.6)]"
        />
      </section>

      <section aria-labelledby="store-photos" className="bg-sand/45 py-14 md:py-20">
        <div className="container-site">
          <Reveal>
            <SectionHeading id="store-photos" title={t("store.photos")} />
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {gallery.map((src, i) => (
              <li key={src ?? `empty-${i}`} className={i === 0 ? "col-span-2 md:col-span-1" : ""}>
                <Reveal delay={i * 70}>
                  <SmartImage
                    src={src}
                    alt={`${t("visit.photoAlt")} ${i + 2}`}
                    label={t("store.eyebrow")}
                    caption={t("image.soon")}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className={i === 0 ? "aspect-4/3 rounded-xl md:aspect-4/5" : "aspect-4/5 rounded-xl"}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="store-visit" className="container-site grid gap-10 py-14 md:grid-cols-[1fr_1.2fr] md:py-20">
        <SectionHeading id="store-visit" align="start" eyebrow={t("visit.eyebrow")} title={t("store.visit")} subtitle={t("visit.text")} />
        <StoreInfo />
      </section>
    </>
  );
}
