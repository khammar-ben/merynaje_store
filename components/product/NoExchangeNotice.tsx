"use client";

import Link from "next/link";
import { Ruler } from "lucide-react";
import { settings } from "@/data/settings";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

/** Kind but clear reminder: items are not exchanged. */
export function NoExchangeNotice({ className }: { className?: string }) {
  const { l, t } = useI18n();
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl bg-sand/60 px-4 py-3 text-sm leading-relaxed text-ink ring-1 ring-gold/30",
        className,
      )}
    >
      <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
      <p>
        <span className="font-medium">{t("notice.noExchange")}</span> · {l(settings.noExchangeNotice)}{" "}
        <Link href="/pas-d-echange/" className="whitespace-nowrap underline decoration-gold-deep underline-offset-2 hover:text-gold-deep">
          {t("notice.learnMore")}
        </Link>
      </p>
    </div>
  );
}
