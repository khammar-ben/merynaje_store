import type { Metadata } from "next";
import { InfoPageView } from "@/components/pages/InfoPageView";

export const metadata: Metadata = {
  title: "Paiement à la livraison",
  description: "Payez en espèces à la réception de votre colis, partout au Maroc.",
};

export default function Page() {
  return <InfoPageView slug="paiement-a-la-livraison" />;
}
