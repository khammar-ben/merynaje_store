"use client";

import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { settings } from "@/data/settings";
import { useI18n } from "@/lib/i18n";
import { allProductsLink, collectionNav, infoNav } from "@/lib/nav";
import { waLink, GREETING } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";
import { LangToggle } from "@/components/ui/LangToggle";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const { t, l } = useI18n();
  const linkClass = "text-cream/75 transition-colors hover:text-gold-light";

  return (
    <footer className="mt-auto bg-wood-dark text-cream">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo onDark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">{t("footer.tagline")}</p>
          <div className="mt-5 flex gap-2">
            <a
              href={settings.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram @${settings.instagram.handle}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-gold/50 transition-colors hover:bg-gold hover:text-ink"
            >
              <InstagramIcon />
            </a>
            <a
              href={waLink(GREETING)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-gold/50 transition-colors hover:bg-gold hover:text-ink"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <nav aria-label={t("footer.shop")}>
          <h2 className="eyebrow mb-4 text-gold">{t("footer.shop")}</h2>
          <ul className="space-y-2.5 text-sm">
            {collectionNav.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className={linkClass}>
                  {l(c.label)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={allProductsLink.href} className={linkClass}>
                {l(allProductsLink.label)}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={t("footer.help")}>
          <h2 className="eyebrow mb-4 text-gold">{t("footer.help")}</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/la-boutique/" className={linkClass}>
                {t("nav.boutique")}
              </Link>
            </li>
            {infoNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {l(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4 text-gold">{t("footer.contact")}</h2>
          <ul className="space-y-3 text-sm text-cream/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
              <span>
                {l(settings.address)}
                <span className="block text-cream/60">{l(settings.wazeHint)}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
              {l(settings.hours)}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
              <a href={`tel:${settings.phoneLink}`} dir="ltr" className={linkClass}>
                {settings.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.storeName}. {t("footer.rights")}
          </p>
          <LangToggle className="text-cream/90" />
        </div>
      </div>
    </footer>
  );
}
