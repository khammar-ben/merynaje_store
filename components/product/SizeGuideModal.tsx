"use client";

import { settings } from "@/data/settings";
import { useI18n } from "@/lib/i18n";
import { waLink, GREETING } from "@/lib/whatsapp";
import { Sheet } from "@/components/ui/Sheet";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, l } = useI18n();
  const guide = settings.sizeGuide;

  return (
    <Sheet open={open} onClose={onClose} side="center" title={t("sizeGuide.title")}>
      <div className="px-5 py-5">
        <p className="text-sm text-muted">{t("sizeGuide.unit")}</p>
        <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-gold/30">
          <table className="w-full min-w-[26rem] text-center text-sm">
            <thead className="bg-sand/70">
              <tr>
                {guide.columns.map((c, i) => (
                  <th key={i} scope="col" className="px-3 py-3 font-medium">
                    {l(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15 bg-ivory">
              {guide.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-3 py-2.5 font-serif text-base font-semibold">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="px-3 py-2.5 tabular-nums text-muted">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed">{l(guide.note)}</p>
        <a
          href={waLink(`${GREETING} J'ai besoin d'aide pour choisir ma taille.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline mt-5 w-full sm:w-auto"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#1f7a4d]" /> WhatsApp
        </a>
      </div>
    </Sheet>
  );
}
