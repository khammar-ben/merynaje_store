import type { Metadata } from "next";
import { ThanksView } from "@/components/cart/ThanksView";

export const metadata: Metadata = {
  title: "Merci pour votre commande",
  robots: { index: false },
};

export default function ThanksPage() {
  return <ThanksView />;
}
