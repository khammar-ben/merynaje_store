"use client";

import { settings } from "@/data/settings";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

/** Subtotal, delivery (placeholder until the fee is known) and total. */
export function CartTotals() {
  const { t, l, price } = useI18n();
  const { subtotal } = useCart();
  const fee = settings.deliveryFee;

  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between gap-4">
        <dt className="text-muted">{t("cart.subtotal")}</dt>
        <dd className="tabular-nums">{price(subtotal)}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-muted">{t("cart.delivery")}</dt>
        <dd className="text-end">
          {fee === null ? (
            <>
              <span className="text-muted">{t("cart.deliveryPending")}</span>
              <span className="block text-xs text-muted/80">{l(settings.deliveryFeeLabel)}</span>
            </>
          ) : (
            price(fee)
          )}
        </dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 border-t border-gold/30 pt-3">
        <dt className="font-medium">{t("cart.total")}</dt>
        <dd className="font-serif text-2xl tabular-nums">
          {price(subtotal + (fee ?? 0))}
          {fee === null && <span className="ms-1 font-sans text-xs text-muted">{t("cart.plusDelivery")}</span>}
        </dd>
      </div>
    </dl>
  );
}
