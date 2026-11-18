import type { MetadataRoute } from "next";
import { settings } from "@/data/settings";
import { getSiteUrl } from "@/lib/site-url.server";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Demo: hidden from search engines until `allowIndexing` is set to true in data/settings.ts.
  if (!settings.allowIndexing) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/panier/", "/merci/"] },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
