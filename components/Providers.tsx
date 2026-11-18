"use client";

import { AssetsProvider, type AssetManifest } from "@/lib/assets";
import { CartProvider } from "@/lib/cart";
import { LanguageProvider } from "@/lib/i18n";

export function Providers({ assets, children }: { assets: AssetManifest; children: React.ReactNode }) {
  return (
    <AssetsProvider manifest={assets}>
      <LanguageProvider>
        <CartProvider>{children}</CartProvider>
      </LanguageProvider>
    </AssetsProvider>
  );
}
