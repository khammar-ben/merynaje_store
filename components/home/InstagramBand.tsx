"use client";

import { settings } from "@/data/settings";
import { useI18n } from "@/lib/i18n";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

export function InstagramBand() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="insta-title" className="wood-slats text-cream">
      <Reveal className="container-site flex flex-col items-center py-16 text-center md:py-20">
        <span className="flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-gold/70">
          <InstagramIcon className="h-6 w-6 text-gold-light" />
        </span>
        <h2 id="insta-title" className="mt-6 font-serif text-4xl md:text-5xl">
          {t("insta.title", { n: settings.instagram.followers })}
        </h2>
        <p className="mt-3 text-cream/80" dir="ltr">
          @{settings.instagram.handle}
        </p>
        <p className="mt-4 max-w-md text-cream/85">{t("insta.text")}</p>
        <a href={settings.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-8">
          <InstagramIcon className="h-4 w-4" /> {t("insta.follow", { handle: settings.instagram.handle })}
        </a>
      </Reveal>
    </section>
  );
}
