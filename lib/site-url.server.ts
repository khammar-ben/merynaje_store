// Server-only: the public address of the site, used for metadata, sitemap and robots.txt.
import { settings } from "@/data/settings";

export function getSiteUrl() {
  if (settings.siteUrl) return settings.siteUrl;
  // Set by Vercel at build time (e.g. "merynaje-store.vercel.app").
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
