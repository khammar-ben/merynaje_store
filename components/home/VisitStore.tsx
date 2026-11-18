"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { settings } from "@/data/settings";
import { cn } from "@/lib/cn";
import { useAssets } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";
import { WazeIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

/** Address, hours, phone and map buttons — used on the home page and on /la-boutique. */
export function StoreInfo({ className }: { className?: string }) {
  const { t, l } = useI18n();
  return (
    <div className={cn("space-y-6", className)}>
      <ul className="space-y-5">
        <li className="flex gap-4">
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <p className="eyebrow">{t("visit.address")}</p>
            <p className="mt-1 text-lg">{l(settings.address)}</p>
            <p className="text-sm text-muted">{l(settings.wazeHint)}</p>
          </div>
        </li>
        <li className="flex gap-4">
          <Clock className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <p className="eyebrow">{t("visit.hours")}</p>
            <p className="mt-1 text-lg">{l(settings.hours)}</p>
          </div>
        </li>
        <li className="flex gap-4">
          <Phone className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <p className="eyebrow">{t("visit.phone")}</p>
            <p className="mt-1 text-lg">
              <a href={`tel:${settings.phoneLink}`} dir="ltr" className="hover:text-gold-deep">
                {settings.phoneDisplay}
              </a>
            </p>
          </div>
        </li>
      </ul>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href={settings.wazeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
          <WazeIcon className="h-5 w-5" /> {t("visit.waze")}
        </a>
        <a href={settings.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <Navigation className="h-4 w-4" strokeWidth={1.6} /> {t("visit.maps")}
        </a>
      </div>
    </div>
  );
}

export function VisitStore() {
  const { t } = useI18n();
  const { store } = useAssets();
  const photo = store[1] ?? store[0] ?? null;

  return (
    <section aria-labelledby="visit-title" className="bg-sand/45 py-16 md:py-24">
      <div className="container-site grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <div className="relative">
            <SmartImage
              src={photo}
              alt={t("visit.photoAlt")}
              label={t("store.eyebrow")}
              caption="Hay Adil · Casablanca"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="aspect-4/5 rounded-2xl md:aspect-square"
            />
            <div
              aria-hidden="true"
              className="absolute -end-3 -bottom-3 -z-10 h-full w-full rounded-2xl border border-gold/60 md:-end-5 md:-bottom-5"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading id="visit-title" align="start" eyebrow={t("visit.eyebrow")} title={t("visit.title")} subtitle={t("visit.text")} />
          <StoreInfo className="mt-8" />
        </Reveal>
      </div>
    </section>
  );
}
