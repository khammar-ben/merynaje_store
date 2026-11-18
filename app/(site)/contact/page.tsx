import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Mery Naje sur WhatsApp au 07 14 19 19 62, sur Instagram @merynaje.store, ou passez en boutique à Casablanca.",
};

export default function ContactPage() {
  return <ContactView />;
}
