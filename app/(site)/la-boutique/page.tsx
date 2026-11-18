import type { Metadata } from "next";
import { StoreView } from "@/components/pages/StoreView";

export const metadata: Metadata = {
  title: "La boutique",
  description:
    "Mery Naje, prêt-à-porter féminin à Casablanca : Hay Adil, rue 19, numéro 14. Ouvert tous les jours de 09:00 à 21:00.",
};

export default function StorePage() {
  return <StoreView />;
}
