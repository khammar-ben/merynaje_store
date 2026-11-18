"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function NotFoundView() {
  const { t } = useI18n();
  return (
    <div className="container-site flex min-h-[70svh] flex-col items-center justify-center pt-(--header-h) text-center">
      <p className="font-serif text-7xl text-gold">404</p>
      <h1 className="mt-4 font-serif text-4xl">{t("notFound.title")}</h1>
      <div className="gold-rule mx-auto mt-5 w-24" />
      <p className="mt-5 text-muted">{t("notFound.text")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-gold">
          {t("nav.home")}
        </Link>
        <Link href="/collection/" className="btn btn-outline">
          {t("hero.cta")}
        </Link>
      </div>
    </div>
  );
}
