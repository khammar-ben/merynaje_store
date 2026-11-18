import type { Metadata } from "next";
import { InfoPageView } from "@/components/pages/InfoPageView";

export const metadata: Metadata = {
  title: "Pas d'échange",
  description: "Les articles Mery Naje ne sont pas échangés : vérifiez bien votre taille avant de commander.",
};

export default function Page() {
  return <InfoPageView slug="pas-d-echange" />;
}
