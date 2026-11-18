import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site-url.server";
import { infoNav } from "@/lib/nav";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/collection/",
    ...collections.map((c) => `/collection/${c.slug}/`),
    ...products.map((p) => `/produit/${p.slug}/`),
    "/la-boutique/",
    ...infoNav.map((i) => i.href),
  ];
  const base = getSiteUrl();
  return paths.map((p) => ({ url: new URL(p, base).toString() }));
}
