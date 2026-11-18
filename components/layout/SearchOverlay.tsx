"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { useAssets } from "@/lib/assets";
import { getCategory, normalizeText } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { collectionNav } from "@/lib/nav";
import { Sheet } from "@/components/ui/Sheet";
import { SmartImage } from "@/components/ui/SmartImage";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, l, productName, price } = useI18n();
  const { imagesOf } = useAssets();
  const [query, setQuery] = useState("");
  const inputId = useId();

  const results = useMemo(() => {
    const q = normalizeText(query.trim());
    if (!q) return [];
    return products.filter((p) => {
      const c = getCategory(p.category);
      const haystack = normalizeText([p.name, p.nameAr, c.name, c.nameAr, p.id].join(" "));
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [query]);

  const close = () => {
    onClose();
    setQuery("");
  };

  return (
    <Sheet open={open} onClose={close} side="top" title={t("search.title")} className="rounded-b-2xl">
      <div className="container-site max-w-3xl py-5">
        <label htmlFor={inputId} className="sr-only">
          {t("search.title")}
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            strokeWidth={1.6}
          />
          <input
            id={inputId}
            data-autofocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="field ps-12"
            autoComplete="off"
          />
        </div>

        {query.trim() === "" ? (
          <div className="mt-6">
            <p className="eyebrow mb-3">{t("search.suggestions")}</p>
            <div className="flex flex-wrap gap-2">
              {collectionNav.map((c) => (
                <Link key={c.href} href={c.href} onClick={close} className="chip">
                  {l(c.label)}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-5" aria-live="polite">
            <p className="text-sm text-muted">
              {results.length ? t("search.results", { n: results.length }) : t("search.noResults", { q: query })}
            </p>
            <ul className="mt-3 divide-y divide-gold/20">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/produit/${p.slug}/`}
                    onClick={close}
                    className="flex items-center gap-4 rounded-xl py-3 transition-colors hover:bg-sand/50"
                  >
                    <SmartImage
                      src={imagesOf(p)[0]}
                      alt=""
                      label={productName(p)}
                      sizes="56px"
                      className="h-[4.5rem] w-14 shrink-0 rounded-lg"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-serif text-lg">{productName(p)}</span>
                      <span className="block text-xs text-muted">
                        {l({ fr: getCategory(p.category).name, ar: getCategory(p.category).nameAr })} · {t("product.ref")}{" "}
                        {p.id}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-medium">{price(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Sheet>
  );
}
