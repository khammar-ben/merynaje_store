"use client";

import { createContext, useContext, useMemo } from "react";
import type { Product } from "@/data/products";

export type AssetManifest = {
  logo: string | null;
  store: string[];
  clientes: string[];
  productImages: string[];
};

type Assets = AssetManifest & {
  /** Existing images of a product (missing files are skipped). */
  imagesOf: (p: Product) => string[];
  /** Same list, products with a photo first (order kept otherwise). */
  photosFirst: (list: Product[]) => Product[];
};

const AssetsContext = createContext<Assets | null>(null);

export function AssetsProvider({ manifest, children }: { manifest: AssetManifest; children: React.ReactNode }) {
  const value = useMemo<Assets>(() => {
    const existing = new Set(manifest.productImages);
    const imagesOf = (p: Product) => p.images.filter((src) => existing.has(src));
    const photosFirst = (list: Product[]) => [
      ...list.filter((p) => imagesOf(p).length > 0),
      ...list.filter((p) => imagesOf(p).length === 0),
    ];
    return { ...manifest, imagesOf, photosFirst };
  }, [manifest]);
  return <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>;
}

export function useAssets() {
  const ctx = useContext(AssetsContext);
  if (!ctx) throw new Error("useAssets must be used inside <AssetsProvider>");
  return ctx;
}
