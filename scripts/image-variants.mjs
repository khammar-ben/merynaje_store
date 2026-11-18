// Runs automatically before `npm run dev` and `npm run build` (and after `npm run assets`).
// Creates small WebP versions of every photo so phones only download the size they display:
//   public/products/robe.jpg → public/_img/384/products/robe.webp, …/640/…, …/900/…
// Only new or changed photos are processed; versions of deleted photos are removed.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ALL_WIDTHS } from "../lib/image-widths.mjs";

const PUBLIC = "public";
const OUT = path.join(PUBLIC, "_img");
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

const sources = ["products", "store", "clientes"].flatMap((dir) => {
  const full = path.join(PUBLIC, dir);
  return fs.existsSync(full) ? fs.readdirSync(full).filter((f) => IMAGE.test(f)).map((f) => `${dir}/${f}`) : [];
});
if (fs.existsSync(path.join(PUBLIC, "logo.png"))) sources.push("logo.png");

const variantPath = (width, rel) => path.join(OUT, String(width), rel.replace(IMAGE, ".webp"));
const expected = new Set();
let created = 0;

await Promise.all(
  sources.map(async (rel) => {
    const src = path.join(PUBLIC, rel);
    const srcTime = fs.statSync(src).mtimeMs;
    for (const width of ALL_WIDTHS) {
      const dest = variantPath(width, rel);
      expected.add(path.resolve(dest));
      if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= srcTime) continue;
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest);
      created++;
    }
  }),
);

// Remove versions of photos that no longer exist.
let removed = 0;
const prune = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) prune(full);
    else if (!expected.has(path.resolve(full))) {
      fs.rmSync(full);
      removed++;
    }
  }
};
prune(OUT);

console.log(`image-variants: ${sources.length} photo(s), ${created} version(s) created, ${removed} removed`);
