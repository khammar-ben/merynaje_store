import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Jost, Tajawal } from "next/font/google";
import { settings } from "@/data/settings";
import { getAssetManifest } from "@/lib/assets.server";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

// Font stacks are assembled in globals.css (Latin font → Arabic font → fallbacks).
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});
// Arabic fonts are only downloaded when Arabic text is displayed.
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const title = "Mery Naje — Prêt-à-porter féminin à Casablanca";
const description =
  "Robes, ensembles, manteaux et plus : la boutique de prêt-à-porter féminin Mery Naje à Casablanca (Hay Adil). Livraison partout au Maroc, paiement à la livraison, commande facile sur WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(settings.siteUrl),
  title: { default: title, template: "%s · Mery Naje" },
  description,
  applicationName: settings.storeName,
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: settings.storeName,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: settings.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf6f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const assets = getAssetManifest();
  return (
    <html
      lang="fr"
      dir="ltr"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable} ${amiri.variable} ${tajawal.variable} h-full antialiased`}
    >
      <head>
        {/* Enables scroll animations only when JavaScript runs (content stays visible otherwise). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers assets={assets}>
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
    >
      Aller au contenu
    </a>
  );
}
