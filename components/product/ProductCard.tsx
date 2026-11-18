"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { useAssets } from "@/lib/assets";
import { sortSizes } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";

const CARD_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

export function ProductCard({ product, className, preload }: { product: Product; className?: string; preload?: boolean }) {
  const { t, productName, price, sizeName } = useI18n();
  const { imagesOf } = useAssets();
  const [first, second] = imagesOf(product);
  const name = productName(product);
  const sizes = sortSizes(product.sizes);

  return (
    <Link
      href={`/produit/${product.slug}/`}
      className={cn("group block rounded-xl focus-visible:outline-offset-4", className)}
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-sand shadow-[0_1px_2px_rgb(30_26_23/0.06)] transition-shadow duration-300 group-hover:shadow-[0_14px_30px_-14px_rgb(74_55_42/0.45)]">
        <SmartImage
          src={first}
          alt={name}
          label={name}
          sizes={CARD_SIZES}
          preload={preload}
          className="absolute inset-0"
          imgClassName="transition-transform duration-500 ease-(--ease-soft) group-hover:scale-[1.03]"
        />
        {second && (
          <SmartImage
            src={second}
            alt=""
            label={name}
            sizes={CARD_SIZES}
            className="absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
          />
        )}
        <div className="absolute start-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {product.isNew && <Badge tone="new">{t("product.new")}</Badge>}
          {!product.inStock && <Badge tone="soldOut">{t("product.soldOut")}</Badge>}
        </div>
      </div>

      <div className="px-0.5 pt-3">
        <h3 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-gold-deep md:text-xl">
          {name}
        </h3>
        <p className={cn("mt-0.5 text-[0.95rem] font-medium", product.price === null && "text-sm text-gold-deep")}>
          {price(product.price)}
        </p>
        <ul className="mt-2 flex flex-wrap gap-1" aria-label={t("product.sizesAvailable")}>
          {sizes.map((s) => (
            <li
              key={s}
              className="rounded-md border border-ink/12 px-1.5 py-0.5 text-[0.65rem] leading-none tracking-wide text-muted"
            >
              {sizeName(s)}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
