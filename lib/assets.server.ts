// Server-only: scans /public at build time (and on each request in dev) so the site
// knows which photos exist. Missing photos are replaced by placeholders, never broken images.
import fs from "node:fs";
import path from "node:path";
import { products } from "@/data/products";
import type { AssetManifest } from "./assets";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

export function publicFileExists(src: string) {
  try {
    return fs.statSync(path.join(PUBLIC_DIR, decodeURI(src))).isFile();
  } catch {
    return false;
  }
}

/** All images of a /public sub-folder, sorted by name (01-…, 02-… to control the order). */
export function listPublicImages(dir: string) {
  try {
    return fs
      .readdirSync(path.join(PUBLIC_DIR, dir))
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }))
      .map((f) => `/${dir}/${encodeURI(f)}`);
  } catch {
    return [];
  }
}

export function getAssetManifest(): AssetManifest {
  const productImages = products.flatMap((p) => p.images).filter(publicFileExists);
  return {
    logo: publicFileExists("/logo.png") ? "/logo.png" : null,
    store: listPublicImages("store"),
    clientes: listPublicImages("clientes"),
    productImages: [...new Set(productImages)],
  };
}
