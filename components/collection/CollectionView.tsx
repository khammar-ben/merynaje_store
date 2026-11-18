"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";
import { useAssets } from "@/lib/assets";
import {
  getCollection,
  inPriceRange,
  sortProducts,
  sortSizes,
  type PriceRange,
  type SortKey,
} from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { allProductsLink, collectionNav, samePath } from "@/lib/nav";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PRICE_RANGES: PriceRange[] = ["lt200", "200to300", "gt300"];

export function CollectionView({ slug }: { slug?: string }) {
  const { t, l, sizeName } = useI18n();
  const { photosFirst } = useAssets();
  const uid = useId();
  const collection = slug ? getCollection(slug) : undefined;
  const base = useMemo(
    () => (collection ? collection.products() : products),
    [collection],
  );

  const [sizes, setSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [sort, setSort] = useState<SortKey>("new");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const availableSizes = useMemo(
    () => sortSizes([...new Set(base.flatMap((p) => p.sizes))]),
    [base],
  );

  const visible = useMemo(() => {
    const filtered = base.filter(
      (p) =>
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))) &&
        (priceRange === null || inPriceRange(p.price, priceRange)),
    );
    // "Nouveautés" keeps its curated order unless a price sort is chosen.
    const sorted =
      sort === "new" && slug === "nouveautes"
        ? filtered
        : sortProducts(filtered, sort);
    return sort === "new" ? photosFirst(sorted) : sorted;
  }, [base, sizes, priceRange, sort, slug, photosFirst]);

  const activeCount = sizes.length + (priceRange ? 1 : 0);
  const reset = () => {
    setSizes([]);
    setPriceRange(null);
  };
  const toggleSize = (s: string) =>
    setSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const title = collection ? l(collection.name) : t("collection.all");
  const currentHref = collection
    ? `/collection/${collection.slug}/`
    : allProductsLink.href;
  const chips = [
    { href: allProductsLink.href, label: t("collection.allShort") },
    ...collectionNav.map((c) => ({ href: c.href, label: l(c.label) })),
  ];

  return (
    <div className="container-site py-10 md:py-14">
      <SectionHeading
        as="h1"
        eyebrow={t("nav.boutique")}
        title={title}
        subtitle={collection ? l(collection.intro) : undefined}
      />

      <nav aria-label={t("collection.categoriesLabel")} className="mt-8">
        <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {chips.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="chip"
                aria-current={
                  samePath(c.href, currentHref) ? "page" : undefined
                }
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 flex items-center justify-between gap-3 border-y border-gold/25 py-3">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          aria-controls={`${uid}-filters`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors hover:bg-sand"
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.6} />
          {t("collection.filters")}
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.7rem] text-ink">
              {activeCount}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              filtersOpen && "rotate-180",
            )}
            strokeWidth={1.6}
          />
        </button>

        <p className="hidden text-sm text-muted sm:block" aria-live="polite">
          {visible.length === 1
            ? t("collection.countOne")
            : t("collection.count", { n: visible.length })}
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor={`${uid}-sort`}
            className="hidden text-sm text-muted md:block"
          >
            {t("collection.sort")}
          </label>
          <div className="relative">
            <select
              id={`${uid}-sort`}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label={t("collection.sort")}
              className="min-h-11 appearance-none rounded-full border border-ink/15 bg-ivory ps-4 pe-9 text-sm focus:border-gold-deep focus:outline-none"
            >
              <option value="new">{t("collection.sort.new")}</option>
              <option value="priceAsc">{t("collection.sort.priceAsc")}</option>
              <option value="priceDesc">
                {t("collection.sort.priceDesc")}
              </option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div
        id={`${uid}-filters`}
        hidden={!filtersOpen}
        className="animate-fade-up border-b border-gold/25 py-5"
      >
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-5">
            <fieldset>
              <legend className="eyebrow mb-3">{t("collection.sizes")}</legend>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="chip min-w-12"
                    aria-pressed={sizes.includes(s)}
                    onClick={() => toggleSize(s)}
                  >
                    {sizeName(s)}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="eyebrow mb-3">{t("collection.price")}</legend>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="chip"
                    aria-pressed={priceRange === r}
                    onClick={() =>
                      setPriceRange((cur) => (cur === r ? null : r))
                    }
                  >
                    {t(`collection.price.${r}`)}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="btn btn-outline min-h-10 self-start px-5 text-sm md:self-end"
            >
              {t("collection.reset")}
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted sm:hidden" aria-live="polite">
        {visible.length === 1
          ? t("collection.countOne")
          : t("collection.count", { n: visible.length })}
      </p>

      {visible.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl">{t("collection.empty")}</p>
          <button type="button" onClick={reset} className="btn btn-gold mt-6">
            {t("collection.reset")}
          </button>
        </div>
      ) : (
        <>
          <h2 className="sr-only">{title}</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:mt-8 lg:grid-cols-4 lg:gap-x-6">
            {visible.map((p, i) => (
              <li
                key={p.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
              >
                <ProductCard product={p} preload={i < 2} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
