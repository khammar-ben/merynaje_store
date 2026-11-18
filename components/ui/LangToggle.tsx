"use client";

import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const item = (active: boolean) =>
    cn(
      "min-h-9 rounded-full px-2.5 py-1 transition-opacity",
      active
        ? "font-medium underline decoration-gold decoration-2 underline-offset-[6px]"
        : "opacity-70 hover:opacity-100",
    );
  return (
    <div role="group" aria-label={t("lang.label")} className={cn("flex items-center text-sm", className)}>
      <button type="button" lang="fr" aria-pressed={lang === "fr"} onClick={() => setLang("fr")} className={item(lang === "fr")}>
        FR
      </button>
      <span aria-hidden="true" className="opacity-40">
        |
      </span>
      <button type="button" lang="ar" aria-pressed={lang === "ar"} onClick={() => setLang("ar")} className={item(lang === "ar")}>
        العربية
      </button>
    </div>
  );
}
