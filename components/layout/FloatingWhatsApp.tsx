"use client";

import { useI18n } from "@/lib/i18n";
import { waLink, GREETING } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function FloatingWhatsApp() {
  const { t } = useI18n();
  return (
    <a
      href={waLink(GREETING)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("wa.float")}
      title={t("wa.float")}
      className="group fixed right-4 bottom-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgb(30_26_23/0.45)] ring-2 ring-gold ring-offset-2 ring-offset-cream transition-transform duration-200 hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
