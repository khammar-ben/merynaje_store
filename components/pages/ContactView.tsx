"use client";

import { settings } from "@/data/settings";
import { useI18n } from "@/lib/i18n";
import { waLink, GREETING } from "@/lib/whatsapp";
import { StoreInfo } from "@/components/home/VisitStore";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfoShell } from "./InfoPageView";

export function ContactView() {
  const { t, l } = useI18n();
  return (
    <InfoShell slug="contact">
      <SectionHeading as="h1" align="start" eyebrow={t("nav.infos")} title={t("footer.contact")} subtitle={t("trust.whatsapp.sub")} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={waLink(GREETING)}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl bg-ivory p-6 ring-1 ring-gold/25 transition-shadow hover:shadow-lg"
        >
          <WhatsAppIcon className="h-7 w-7 text-[#1f7a4d]" />
          <p className="mt-4 font-serif text-2xl">WhatsApp</p>
          <p className="mt-1 text-muted" dir="ltr">
            {settings.phoneDisplay}
          </p>
          <p className="mt-3 text-sm text-gold-deep">{t("trust.whatsapp")} →</p>
        </a>
        <a
          href={settings.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl bg-ivory p-6 ring-1 ring-gold/25 transition-shadow hover:shadow-lg"
        >
          <InstagramIcon className="h-7 w-7 text-gold-deep" />
          <p className="mt-4 font-serif text-2xl">Instagram</p>
          <p className="mt-1 text-muted" dir="ltr">
            @{settings.instagram.handle}
          </p>
          <p className="mt-3 text-sm text-gold-deep">{t("insta.title", { n: settings.instagram.followers })} →</p>
        </a>
      </div>
      <div className="mt-10 rounded-2xl bg-sand/50 p-6 ring-1 ring-gold/25 md:p-8">
        <h2 className="font-serif text-2xl">{t("visit.title")}</h2>
        <p className="mt-1 mb-6 text-sm text-muted">{l(settings.wazeHint)}</p>
        <StoreInfo />
      </div>
    </InfoShell>
  );
}
