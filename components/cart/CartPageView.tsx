"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NoExchangeNotice } from "@/components/product/NoExchangeNotice";
import { CartLine } from "./CartLine";
import { CartTotals } from "./CartTotals";
import { CheckoutForm } from "./CheckoutForm";

export function CartPageView() {
  const cart = useCart();
  const { t } = useI18n();

  return (
    <div className="container-site py-10 md:py-14">
      <SectionHeading as="h1" title={t("cart.pageTitle")} />

      {/* Height reserved while the saved cart loads, so the footer doesn't jump. */}
      <div className="min-h-[34rem]">
        {!cart.hydrated ? (
          <div
            className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_1fr]"
            aria-busy="true"
          >
            <div className="skeleton h-72 rounded-2xl" />
            <div className="skeleton h-96 rounded-2xl" />
          </div>
        ) : cart.items.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand text-gold-deep">
              <ShoppingBag className="h-7 w-7" strokeWidth={1.4} />
            </span>
            <p className="mt-5 font-serif text-2xl">{t("cart.empty")}</p>
            <p className="mt-2 text-muted">{t("cart.emptyText")}</p>
            <Link href="/collection/" className="btn btn-gold mt-6">
              {t("hero.cta")}
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <section
              aria-labelledby="cart-items"
              className="rounded-2xl bg-ivory p-5 shadow-[0_1px_2px_rgb(30_26_23/0.06)] ring-1 ring-gold/20 md:p-7"
            >
              <h2 id="cart-items" className="font-serif text-2xl">
                {t("cart.title")} ({cart.count})
              </h2>
              <ul className="mt-2 divide-y divide-gold/20">
                {cart.items.map((item) => (
                  <CartLine key={item.key} item={item} />
                ))}
              </ul>
              <div className="mt-2 border-t border-gold/30 pt-5">
                <CartTotals />
              </div>
              <NoExchangeNotice className="mt-5" />
            </section>

            <section
              id="commande"
              aria-labelledby="checkout-title"
              className="rounded-2xl bg-ivory p-5 shadow-[0_1px_2px_rgb(30_26_23/0.06)] ring-1 ring-gold/20 md:p-7 lg:sticky lg:top-[calc(var(--header-h)-1rem)]"
            >
              <h2 id="checkout-title" className="font-serif text-2xl">
                {t("checkout.title")}
              </h2>
              <p className="mt-1 mb-6 text-sm text-muted">
                {t("checkout.subtitle")}
              </p>
              <CheckoutForm />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
