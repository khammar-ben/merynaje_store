"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Clock } from "lucide-react";
import { settings } from "@/data/settings";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { allProductsLink, collectionNav, infoNav, samePath } from "@/lib/nav";
import { waLink, GREETING } from "@/lib/whatsapp";
import { Sheet } from "@/components/ui/Sheet";
import { LangToggle } from "@/components/ui/LangToggle";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { t, l } = useI18n();

  const link = (href: string, label: string, big = false) => (
    <Link
      href={href}
      onClick={onClose}
      aria-current={samePath(pathname, href) ? "page" : undefined}
      className={cn(
        "flex items-center justify-between py-3 transition-colors aria-[current=page]:text-gold-deep",
        big ? "font-serif text-2xl" : "text-[0.95rem] text-muted hover:text-ink",
      )}
    >
      {label}
      {big && <ChevronRight className="h-4 w-4 text-gold rtl:rotate-180" strokeWidth={1.5} />}
    </Link>
  );

  return (
    <Sheet open={open} onClose={onClose} side="start" title={t("nav.menu")} hideTitle bodyClassName="flex flex-col">
      <div className="px-6 pt-5 pb-4">
        <Logo />
      </div>
      <div className="gold-rule mx-6" />
      <nav aria-label={t("nav.menu")} className="flex-1 px-6 py-4">
        <ul className="divide-y divide-gold/15">
          {collectionNav.map((item) => (
            <li key={item.href}>{link(item.href, l(item.label), true)}</li>
          ))}
          <li>{link(allProductsLink.href, l(allProductsLink.label), true)}</li>
          <li>{link("/la-boutique/", t("nav.boutique"), true)}</li>
        </ul>
        <p className="eyebrow mt-8 mb-1">{t("nav.infos")}</p>
        <ul>
          {infoNav.map((item) => (
            <li key={item.href}>{link(item.href, l(item.label))}</li>
          ))}
        </ul>
      </nav>
      <div className="space-y-4 border-t border-gold/25 bg-sand/40 px-6 py-5">
        <LangToggle className="-ms-2.5" />
        <p className="flex items-center gap-2 text-sm text-muted">
          <Clock className="h-4 w-4 text-gold-deep" strokeWidth={1.6} /> {l(settings.hours)}
        </p>
        <div className="flex gap-3">
          <a href={waLink(GREETING)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp min-h-11 flex-1 px-4 text-sm">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={settings.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline min-h-11 flex-1 px-4 text-sm"
          >
            <InstagramIcon className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>
    </Sheet>
  );
}
