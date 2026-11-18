"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { Sheet } from "@/components/ui/Sheet";
import { NoExchangeNotice } from "@/components/product/NoExchangeNotice";
import { CartLine } from "./CartLine";
import { CartTotals } from "./CartTotals";

export function CartDrawer() {
  const cart = useCart();
  const { t } = useI18n();
  const empty = cart.items.length === 0;

  return (
    <Sheet
      open={cart.isOpen}
      onClose={cart.close}
      side="end"
      title={`${t("cart.title")}${empty ? "" : ` (${cart.count})`}`}
      bodyClassName="flex flex-col"
    >
      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-gold-deep">
            <ShoppingBag className="h-7 w-7" strokeWidth={1.4} />
          </span>
          <p className="mt-5 font-serif text-2xl">{t("cart.empty")}</p>
          <p className="mt-2 text-sm text-muted">{t("cart.emptyText")}</p>
          <Link href="/collection/" onClick={cart.close} className="btn btn-gold mt-6">
            {t("hero.cta")}
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-gold/20 px-5">
            {cart.items.map((item) => (
              <CartLine key={item.key} item={item} onNavigate={cart.close} />
            ))}
          </ul>
          <div className="sticky bottom-0 space-y-4 border-t border-gold/30 bg-cream px-5 pt-4 pb-5 shadow-[0_-10px_30px_-20px_rgb(30_26_23/0.4)]">
            <CartTotals />
            <NoExchangeNotice className="text-xs" />
            <Link href="/panier/#commande" onClick={cart.close} className="btn btn-gold w-full">
              {t("cart.checkout")}
            </Link>
            <button type="button" onClick={cart.close} className="btn btn-outline w-full">
              {t("cart.continue")}
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}
