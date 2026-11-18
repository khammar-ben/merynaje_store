"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { readStorage } from "@/lib/storage";
import { LAST_ORDER_KEY } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function ThanksView() {
  const { t } = useI18n();
  const [orderUrl, setOrderUrl] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only readable after hydration
    setOrderUrl(readStorage<string | null>(LAST_ORDER_KEY, null, "session"));
  }, []);

  return (
    <div className="container-site flex min-h-[60svh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-20 w-20 animate-fade-up items-center justify-center rounded-full bg-gold/20 text-gold-deep ring-1 ring-gold/50">
        <Check className="h-9 w-9" strokeWidth={1.4} />
      </span>
      <p className="eyebrow mt-8">{t("thanks.eyebrow")}</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">{t("thanks.title")}</h1>
      <div className="gold-rule mx-auto mt-5 w-24" />
      <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/85">{t("thanks.text")}</p>

      <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
        <Link href="/collection/" className="btn btn-gold">
          {t("thanks.back")}
        </Link>
        {orderUrl && (
          <div className="mt-4 text-sm text-muted">
            <p>{t("thanks.notOpened")}</p>
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-10 items-center gap-2 font-medium text-[#1f7a4d] underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="h-4 w-4" /> {t("thanks.resend")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
