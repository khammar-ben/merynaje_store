"use client";

import { useAssets } from "@/lib/assets";
import { getProduct, getRelated } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ slug }: { slug: string }) {
  const { t } = useI18n();
  const { photosFirst } = useAssets();
  const items = photosFirst(getRelated(getProduct(slug)!));
  if (!items.length) return null;

  return (
    <section aria-labelledby="related-title" className="container-site py-16 md:py-24">
      <Reveal>
        <SectionHeading id="related-title" title={t("product.related")} />
      </Reveal>
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4 lg:gap-x-6">
        {items.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
