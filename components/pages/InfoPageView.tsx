"use client";

import Link from "next/link";
import { infoPages } from "@/data/pages";
import { useI18n } from "@/lib/i18n";
import { infoNav, samePath } from "@/lib/nav";
import { waLink, GREETING } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Shared layout for the policy pages, with links to the other info pages. */
export function InfoShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const { l } = useI18n();
  return (
    <div className="container-site grid gap-10 py-10 md:grid-cols-[14rem_1fr] md:gap-16 md:py-16">
      <nav aria-label="Infos" className="order-last md:order-first">
        <ul className="flex flex-wrap gap-2 md:flex-col md:gap-1">
          {infoNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={samePath(item.href, `/${slug}/`) ? "page" : undefined}
                className="chip md:w-full md:justify-start md:rounded-lg md:border-transparent md:bg-transparent md:aria-[current=page]:bg-ink"
              >
                {l(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="max-w-2xl animate-fade-up">{children}</div>
    </div>
  );
}

export function InfoPageView({ slug }: { slug: string }) {
  const { t, l } = useI18n();
  const page = infoPages.find((p) => p.slug === slug)!;

  return (
    <InfoShell slug={slug}>
      <SectionHeading as="h1" align="start" eyebrow={t("nav.infos")} title={l(page.title)} />
      <p className="mt-6 text-lg leading-relaxed">{l(page.intro)}</p>
      <div className="mt-10 space-y-8">
        {page.sections.map((s, i) => (
          <section key={i} className="rounded-2xl bg-ivory p-6 ring-1 ring-gold/25">
            <h2 className="font-serif text-2xl">{l(s.title)}</h2>
            <p className="mt-2 leading-relaxed text-ink/80">{l(s.body)}</p>
          </section>
        ))}
      </div>
      <a href={waLink(GREETING)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-10">
        <WhatsAppIcon className="h-5 w-5" /> {t("trust.whatsapp")}
      </a>
    </InfoShell>
  );
}
