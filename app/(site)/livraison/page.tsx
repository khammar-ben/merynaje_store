import type { Metadata } from "next";
import { InfoPageView } from "@/components/pages/InfoPageView";

export const metadata: Metadata = {
  title: "Livraison",
  description: "Livraison partout au Maroc : frais, délais et déroulement de la livraison Mery Naje.",
};

export default function Page() {
  return <InfoPageView slug="livraison" />;
}
