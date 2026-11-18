"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ChevronRight, HandCoins, Ruler, Truck } from "lucide-react";
import type { Product } from "@/data/products";
import { settings } from "@/data/settings";
import { cn } from "@/lib/cn";
import { useAssets } from "@/lib/assets";
import { useCart } from "@/lib/cart";
import { getCategory, imageIndexForColor, sortSizes } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { buildPriceQuestion, buildProductMessage, buildRestockQuestion, waLink } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/Badge";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { NoExchangeNotice } from "./NoExchangeNotice";
import { ProductGallery } from "./ProductGallery";
import { SizeGuideModal } from "./SizeGuideModal";

export function ProductView({ product }: { product: Product }) {
  const { t, l, productName, productDescription, colorName, sizeName, price } = useI18n();
  const { imagesOf } = useAssets();
  const cart = useCart();
  const images = imagesOf(product);
  const name = productName(product);
  const category = getCategory(product.category);
  const sizes = sortSizes(product.sizes);

  const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : "");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const sizeGroupRef = useRef<HTMLFieldSetElement>(null);
  const uid = useId();

  const canOrder = product.inStock && product.price !== null;
  const hasColorChoice = product.colors.length > 1;

  const requireSize = () => {
    if (size) return true;
    setSizeError(true);
    sizeGroupRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    sizeGroupRef.current?.querySelector("input")?.focus({ preventScroll: true });
    return false;
  };

  const chooseColor = (c: string) => {
    setColor(c);
    const i = imageIndexForColor(images, c);
    if (i >= 0) setImageIndex(i);
  };

  const addToCart = () => {
    if (!requireSize()) return;
    cart.add({ productId: product.id, size, color, qty });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
    cart.open();
  };

  const orderOnWhatsApp = () => {
    if (!requireSize()) return;
    window.open(waLink(buildProductMessage(product, size, color, qty)), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <nav aria-label={t("nav.breadcrumb")} className="container-site pt-5 pb-4 text-xs text-muted md:pt-8">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink">
              {t("nav.home")}
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 rtl:rotate-180" aria-hidden="true" />
            <Link href={`/collection/${category.id}/`} className="hover:text-ink">
              {l({ fr: category.name, ar: category.nameAr })}
            </Link>
          </li>
          <li className="flex items-center gap-1.5 text-ink" aria-current="page">
            <ChevronRight className="h-3 w-3 text-muted rtl:rotate-180" aria-hidden="true" />
            {name}
          </li>
        </ol>
      </nav>

      <div className="container-site grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
        <ProductGallery images={images} name={name} activeIndex={imageIndex} onChange={setImageIndex} />

        <div className="md:sticky md:top-[calc(var(--header-h)-1rem)] md:self-start">
          <div className="flex flex-wrap gap-2">
            {product.isNew && <Badge tone="new">{t("product.new")}</Badge>}
            {!product.inStock && <Badge tone="soldOut">{t("product.soldOut")}</Badge>}
          </div>
          <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{name}</h1>
          <p className="mt-1 text-xs tracking-wider text-muted uppercase">
            {t("product.ref")} {product.id}
          </p>
          <p className={cn("mt-4 text-2xl font-medium", product.price === null && "text-xl text-gold-deep")}>
            {price(product.price)}
          </p>

          <div className="gold-rule my-6" />

          {/* Size */}
          <fieldset ref={sizeGroupRef} aria-describedby={sizeError ? `${uid}-size-error` : undefined}>
            <div className="flex items-center justify-between">
              <legend className="text-sm font-medium">
                {t("product.size")}
                {size && <span className="ms-2 font-normal text-muted">{sizeName(size)}</span>}
              </legend>
              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                className="inline-flex min-h-9 items-center gap-1.5 text-sm text-gold-deep underline-offset-4 hover:underline"
              >
                <Ruler className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" /> {t("product.sizeGuide")}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <label key={s} className="relative">
                  <input
                    type="radio"
                    name={`${uid}-size`}
                    value={s}
                    checked={size === s}
                    onChange={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "chip min-w-12 cursor-pointer peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-deep",
                      sizeError && "border-danger/60",
                    )}
                  >
                    {sizeName(s)}
                  </span>
                </label>
              ))}
            </div>
            {sizeError && (
              <p id={`${uid}-size-error`} role="alert" className="mt-2 text-sm text-danger">
                {t("product.sizeRequired")}
              </p>
            )}
          </fieldset>

          {/* Color */}
          {hasColorChoice ? (
            <fieldset className="mt-6">
              <legend className="text-sm font-medium">
                {t("product.color")} <span className="ms-1 font-normal text-muted">{colorName(color)}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <label key={c} className="relative" title={colorName(c)}>
                    <input
                      type="radio"
                      name={`${uid}-color`}
                      value={c}
                      checked={color === c}
                      onChange={() => chooseColor(c)}
                      className="peer sr-only"
                    />
                    <span className="sr-only">{colorName(c)}</span>
                    <span
                      aria-hidden="true"
                      className="block h-10 w-10 cursor-pointer rounded-full ring-1 ring-ink/20 ring-offset-2 ring-offset-cream transition peer-checked:ring-2 peer-checked:ring-gold-deep peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-gold-deep"
                      style={{ background: settings.colors[c]?.hex || "#d9c3a3" }}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            <p className="mt-6 text-sm">
              <span className="font-medium">{t("product.color")}</span>{" "}
              <span className="ms-1 text-muted">{colorName(color)}</span>
            </p>
          )}

          {/* Quantity */}
          {canOrder && (
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium" id={`${uid}-qty`}>
                {t("product.quantity")}
              </span>
              <QuantityStepper value={qty} onChange={setQty} />
            </div>
          )}

          <NoExchangeNotice className="mt-6" />

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            {product.price === null ? (
              <a
                href={waLink(buildPriceQuestion(product, size || undefined))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full"
              >
                <WhatsAppIcon className="h-5 w-5" /> {t("product.askPrice")}
              </a>
            ) : (
              <>
                <button type="button" onClick={addToCart} disabled={!canOrder} className="btn btn-gold w-full">
                  {added ? t("product.added") : t("product.addToCart")}
                </button>
                <button type="button" onClick={orderOnWhatsApp} disabled={!canOrder} className="btn btn-whatsapp w-full">
                  <WhatsAppIcon className="h-5 w-5" /> {t("product.orderWhatsapp")}
                </button>
              </>
            )}
            {!product.inStock && (
              <div className="rounded-xl bg-ivory px-4 py-3 text-sm ring-1 ring-ink/10">
                <p className="text-muted">{t("product.soldOutNote")}</p>
                <a
                  href={waLink(buildRestockQuestion(product))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-9 items-center gap-2 font-medium text-gold-deep underline-offset-4 hover:underline"
                >
                  <WhatsAppIcon className="h-4 w-4" /> {t("product.askRestock")}
                </a>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="mt-10 space-y-8">
            <section aria-labelledby={`${uid}-desc`}>
              <h2 id={`${uid}-desc`} className="eyebrow">
                {t("product.description")}
              </h2>
              <p className="mt-3 leading-relaxed text-ink/85">{productDescription(product)}</p>
            </section>
            <section aria-labelledby={`${uid}-delivery`}>
              <h2 id={`${uid}-delivery`} className="eyebrow">
                {t("product.deliveryPayment")}
              </h2>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex gap-3">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
                  <span>
                    {t("product.deliveryText")}
                    <span className="block text-muted">
                      {l(settings.deliveryFeeLabel)} · {l(settings.deliveryDelayLabel)}
                    </span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <HandCoins className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
                  {t("product.codText")}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}
