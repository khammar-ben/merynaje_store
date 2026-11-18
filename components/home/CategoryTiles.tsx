"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAssets } from "@/lib/assets";
import { getCollection } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

const TILES = ["robes", "ensembles", "manteaux", "hauts-et-bas"];

export function CategoryTiles() {
  const { t, l } = useI18n();
  const { imagesOf } = useAssets();

  return (
    <section aria-labelledby="categories-title" className="bg-sand/45 py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <SectionHeading id="categories-title" eyebrow="Collection" title={t("home.categories.title")} subtitle={t("home.categories.subtitle")} />
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:gap-5 lg:grid-cols-4">
          {TILES.map((slug, i) => {
            const c = getCollection(slug)!;
            const name = slug === "hauts-et-bas" ? t("home.categories.hautsBas") : l(c.name);
            const src = c.products().map((p) => imagesOf(p)[0]).find(Boolean);
            return (
              <li key={slug}>
                <Reveal delay={i * 70}>
                  <Link href={`/collection/${slug}/`} className="group relative block overflow-hidden rounded-xl">
                    {src ? (
                      <>
                        <SmartImage
                          src={src}
                          alt=""
                          label={name}
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="aspect-4/5"
                          imgClassName="transition-transform duration-700 ease-(--ease-soft) group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(30_26_23/0.7),transparent_55%)]" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-cream md:p-6">
                          <p className="font-serif text-2xl md:text-3xl">{name}</p>
                          <p className="mt-1 inline-flex items-center gap-1.5 text-xs tracking-wider uppercase opacity-90">
                            {t("home.categories.discover")}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                          </p>
                        </div>
                      </>
                    ) : (
                      <Placeholder
                        label={name}
                        caption={`${t("home.categories.discover")} →`}
                        className="aspect-4/5 transition-colors group-hover:bg-sand"
                      />
                    )}
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
