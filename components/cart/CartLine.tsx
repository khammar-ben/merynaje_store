"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useAssets } from "@/lib/assets";
import { useCart, type CartItem } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { SmartImage } from "@/components/ui/SmartImage";

export function CartLine({ item, onNavigate }: { item: CartItem; onNavigate?: () => void }) {
  const { t, productName, colorName, sizeName, price } = useI18n();
  const { imagesOf } = useAssets();
  const cart = useCart();
  const { product } = item;
  const name = productName(product);
  const showColor = item.color && item.color !== "Comme sur la photo";

  return (
    <li className="flex gap-4 py-4">
      <Link href={`/produit/${product.slug}/`} onClick={onNavigate} className="shrink-0 rounded-lg">
        <SmartImage
          src={imagesOf(product)[0]}
          alt={name}
          label={name}
          sizes="88px"
          className="aspect-3/4 w-[5.25rem] rounded-lg"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/produit/${product.slug}/`} onClick={onNavigate} className="font-serif text-lg leading-snug hover:text-gold-deep">
              {name}
            </Link>
            <p className="mt-0.5 text-xs text-muted">
              {t("product.size")} : {sizeName(item.size)}
              {showColor && ` · ${colorName(item.color)}`}
            </p>
          </div>
          <p className="shrink-0 text-sm font-medium tabular-nums">
            {price(product.price === null ? null : product.price * item.qty)}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper size="sm" value={item.qty} onChange={(n) => cart.setQty(item.key, n)} />
          <button
            type="button"
            onClick={() => cart.remove(item.key)}
            aria-label={t("cart.removeItem", { name })}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs text-muted transition-colors hover:text-danger"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.5} /> {t("cart.remove")}
          </button>
        </div>
      </div>
    </li>
  );
}
