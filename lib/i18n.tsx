"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations, type TranslationKey } from "@/data/translations";
import { settings, type Localized } from "@/data/settings";
import type { Product } from "@/data/products";
import { readStorage, writeStorage } from "./storage";

export type Lang = "fr" | "ar";

const LANG_KEY = "mn-lang";

type I18n = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  /** Interface text, with {placeholders} replaced. */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  /** Picks the current language from a { fr, ar } object. */
  l: (value: Localized) => string;
  productName: (p: Product) => string;
  productDescription: (p: Product) => string;
  colorName: (color: string) => string;
  sizeName: (size: string) => string;
  price: (price: number | null) => string;
};

const I18nContext = createContext<I18n | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = readStorage<Lang>(LANG_KEY, "fr");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring the saved choice after hydration
    if (saved === "ar") setLangState("ar");
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeStorage(LANG_KEY, next);
  }, []);

  const value = useMemo<I18n>(() => {
    const dict = translations[lang];
    const t: I18n["t"] = (key, vars) => {
      let text: string = dict[key] ?? translations.fr[key];
      if (vars) for (const [k, v] of Object.entries(vars)) text = text.replaceAll(`{${k}}`, String(v));
      return text;
    };
    const ar = lang === "ar";
    return {
      lang,
      dir: ar ? "rtl" : "ltr",
      setLang,
      t,
      l: (v) => (ar ? v.ar || v.fr : v.fr),
      productName: (p) => (ar && p.nameAr) || p.name,
      productDescription: (p) => (ar && p.descriptionAr) || p.description,
      colorName: (c) => (ar ? settings.colors[c]?.ar || c : c),
      sizeName: (s) => (ar && s === "Taille standard" ? "مقاس موحد" : s),
      price: (p) => (p === null ? t("product.priceOnRequest") : `${p} ${t("common.currency")}`),
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
