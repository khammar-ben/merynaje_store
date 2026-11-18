import type { Metadata } from "next";
import { CollectionView } from "@/components/collection/CollectionView";

export const metadata: Metadata = {
  title: "Toute la collection",
  description: "Robes, ensembles, manteaux, hauts, bas et pulls Mery Naje. Livraison partout au Maroc, paiement à la livraison.",
};

export default function AllProductsPage() {
  return <CollectionView />;
}
