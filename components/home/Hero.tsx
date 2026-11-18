"use client";

import Image from "next/image";
import Link from "next/link";
import { settings } from "@/data/settings";
import { cn } from "@/lib/cn";
import { useAssets } from "@/lib/assets";
import { getProduct } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { waLink, GREETING } from "@/lib/whatsapp";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

// Arch for a 3:4 frame: top radius = half the width on both axes, small bottom corners.
const ARCH = "rounded-[50%_50%_1rem_1rem/37.5%_37.5%_1rem_1rem]";

export function Hero() {
  const { t, l, productName } = useI18n();
  const { store, logo, imagesOf } = useAssets();
  // A shop photo becomes the full background; otherwise warm wood slats + featured products.
  const background = store[0] ?? null;
  const featured = settings.hero.products
    .map((slug) => getProduct(slug))
    .flatMap((p) => (p && imagesOf(p)[0] ? [{ product: p, src: imagesOf(p)[0] }] : []))
    .slice(0, 2);

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden text-cream md:min-h-[92svh] md:items-center">
      {background ? (
        <SmartImage
          src={background}
          alt={t("visit.photoAlt")}
          sizes="100vw"
          preload
          className="absolute inset-0 -z-20"
          imgClassName="object-[center_30%]"
        />
      ) : (
        <div aria-hidden="true" className="wood-slats absolute inset-0 -z-20" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(30_26_23/0.82),rgb(30_26_23/0.28)_55%,rgb(30_26_23/0.45))]"
      />

      <div className="container-site grid items-center gap-8 pt-[calc(var(--header-h)+1.5rem)] pb-14 md:grid-cols-[1.15fr_1fr] md:gap-10 md:pb-10">
        <div className="order-2 max-w-xl animate-fade-up md:order-1">
          <p className="eyebrow text-gold-light">{l(settings.hero.eyebrow)}</p>
          <h1 className="mt-4 font-serif text-[3.1rem] leading-[1.02] font-medium tracking-tight md:text-7xl lg:text-[5.4rem]">
            {l(settings.hero.title)}
          </h1>
          <div className="mt-5 h-px w-24 bg-gold" />
          <p className="mt-5 text-lg tracking-wide text-cream/90">{l(settings.hero.subtitle)}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/collection/" className="btn btn-gold">
              {t("hero.cta")}
            </Link>
            <a href={waLink(GREETING)} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              <WhatsAppIcon className="h-5 w-5" /> {t("hero.whatsapp")}
            </a>
          </div>
        </div>

        {!background && featured.length > 0 && (
          // Two arched product photos, like display windows.
          <div className="relative order-1 mx-auto h-64 w-full max-w-[19rem] animate-fade-up sm:h-80 sm:max-w-[23rem] md:order-2 md:h-[36rem] md:max-w-[30rem]">
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 aspect-square w-[88%] -translate-1/2 rounded-full border border-gold/35"
            />
            {featured.map(({ product, src }, i) => (
              <Link
                key={product.id}
                href={`/produit/${product.slug}/`}
                aria-label={productName(product)}
                className={cn("absolute", ARCH, i === 0 ? "end-0 top-0 w-[60%]" : "start-0 bottom-0 w-[50%]")}
              >
                <SmartImage
                  src={src}
                  alt={productName(product)}
                  sizes="(min-width: 768px) 290px, 185px"
                  preload={i === 0}
                  className={cn(
                    "aspect-3/4 shadow-2xl",
                    ARCH,
                    i === 0 ? "ring-1 ring-gold/70" : "ring-4 ring-[#3b2b20]",
                  )}
                />
              </Link>
            ))}
          </div>
        )}

        {/* Round logo medallion when there is no photo at all (desktop). */}
        {!background && featured.length === 0 && (
          <div aria-hidden="true" className="order-1 hidden justify-center md:order-2 md:flex">
            <div className="flex aspect-square w-80 items-center justify-center rounded-full bg-ivory/95 shadow-2xl ring-1 ring-gold/70 lg:w-96">
              {logo ? (
                <Image src={logo} alt="" width={384} height={384} className="h-full w-full rounded-full object-cover" />
              ) : (
                <div className="text-center text-gold-deep">
                  <p className="font-serif text-5xl tracking-[0.14em] uppercase lg:text-6xl">Mery Naje</p>
                  <div className="gold-rule mx-auto my-4 w-32" />
                  <p className="text-sm tracking-[0.6em] uppercase">Store</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
