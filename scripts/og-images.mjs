// Runs automatically before `npm run build`.
// Draws the link-preview cards shown when the site is shared on WhatsApp, Instagram, Facebook…
//   public/og/site.jpg                 → home page and general pages
//   public/og/products/<slug>.jpg      → each product with a photo (photo, name, price)
// JPEG and small on purpose: WhatsApp drops preview images that are too heavy.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og.js";
import { products, categories } from "../data/products.ts";
import { settings } from "../data/settings.ts";

const W = 1200;
const H = 630;
const OUT = path.join("public", "og");
const C = {
  cream: "#faf6f0",
  sand: "#eadfcf",
  wood: "#3d2c21",
  gold: "#c9a45c",
  goldLight: "#e3cd9c",
  goldDeep: "#8a6a2f",
  ink: "#1e1a17",
  muted: "#6b6158",
};

const font = (file) => fs.readFileSync(path.join("scripts", "fonts", file));
const fonts = [
  { name: "Cormorant", data: font("CormorantGaramond-Medium.ttf"), weight: 500, style: "normal" },
  { name: "Cormorant", data: font("CormorantGaramond-SemiBold.ttf"), weight: 600, style: "normal" },
  { name: "Jost", data: font("Jost-Regular.ttf"), weight: 400, style: "normal" },
  { name: "Jost", data: font("Jost-Medium.ttf"), weight: 500, style: "normal" },
];

/** Minimal JSX-free element helper for next/og (satori). */
const h = (type, style, ...children) => ({
  type,
  props: { style: { display: "flex", ...style }, children: children.flat().filter((c) => c !== null && c !== false) },
});
const img = (src, style) => ({ type: "img", props: { src, style } });

const photoData = (src) => {
  const file = path.join("public", decodeURI(src));
  if (!fs.existsSync(file)) return null;
  const mime = /\.png$/i.test(file) ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
};
const firstPhoto = (p) => p.images.map(photoData).find(Boolean) ?? null;

/** Arched photo frame (3:4), like the shop-window arches on the site. */
const arch = (src, { left, top, width, border }) => {
  const height = Math.round((width * 4) / 3);
  const r = width / 2;
  const radius = { borderTopLeftRadius: r, borderTopRightRadius: r, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 };
  return h(
    "div",
    { position: "absolute", left, top, width, height, border, overflow: "hidden", boxShadow: "0 24px 48px rgba(0,0,0,0.35)", ...radius },
    img(src, { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", ...radius }),
  );
};

const pill = (text, color, borderColor, background = "transparent") =>
  h(
    "div",
    { border: `1.5px solid ${borderColor}`, borderRadius: 999, padding: "9px 22px", fontSize: 22, color, backgroundColor: background, fontFamily: "Jost" },
    text,
  );

async function render(element, file) {
  const png = Buffer.from(await new ImageResponse(element, { width: W, height: H, fonts }).arrayBuffer());
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
  return fs.statSync(file).size;
}

// ── Site card ─────────────────────────────────────────────
function siteCard() {
  const featured = [...settings.hero.products, ...products.map((p) => p.slug)]
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p, i, list) => p && list.indexOf(p) === i)
    .map(firstPhoto)
    .filter(Boolean)
    .slice(0, 3);

  const photos =
    featured.length >= 3
      ? [
          arch(featured[1], { left: 52, top: 190, width: 205, border: `6px solid ${C.wood}` }),
          arch(featured[2], { left: 352, top: 190, width: 205, border: `6px solid ${C.wood}` }),
          arch(featured[0], { left: 172, top: 92, width: 265, border: `4px solid ${C.gold}` }),
        ]
      : featured.map((src, i) => arch(src, { left: 90 + i * 210, top: 110, width: 260, border: `4px solid ${C.gold}` }));

  return h(
    "div",
    {
      width: W,
      height: H,
      position: "relative",
      backgroundColor: C.wood,
      backgroundImage: "linear-gradient(135deg, #6a4f3b 0%, #3d2c21 55%, #241a13 100%)",
      fontFamily: "Jost",
    },
    // Wood slats
    h("div", {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "repeating-linear-gradient(90deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 46px)",
    }),
    // Thin gold frame
    h("div", { position: "absolute", left: 22, top: 22, right: 22, bottom: 22, border: "1.5px solid rgba(201,164,92,0.55)", borderRadius: 18 }),
    ...photos,
    h(
      "div",
      { position: "absolute", left: 640, top: 0, bottom: 0, width: 500, flexDirection: "column", justifyContent: "center" },
      h("div", { fontSize: 21, letterSpacing: 6, color: C.goldLight, fontWeight: 500 }, "PRÊT-À-PORTER FÉMININ"),
      h("div", { fontFamily: "Cormorant", fontWeight: 600, fontSize: 118, lineHeight: 1, color: C.cream, marginTop: 18 }, "Mery Naje"),
      h("div", { fontSize: 18, letterSpacing: 16, color: C.gold, marginTop: 6 }, "STORE"),
      h("div", { width: 130, height: 2, backgroundColor: C.gold, marginTop: 26, marginBottom: 26 }),
      h("div", { fontSize: 31, color: "rgba(250,246,240,0.92)" }, "Boutique à Casablanca"),
      h(
        "div",
        { flexWrap: "wrap", gap: 12, marginTop: 26 },
        pill("Livraison partout au Maroc", C.cream, "rgba(227,205,156,0.75)"),
        pill("Paiement à la livraison", C.cream, "rgba(227,205,156,0.75)"),
      ),
    ),
  );
}

// ── Product card ──────────────────────────────────────────
function productCard(p, photo) {
  const category = categories.find((c) => c.id === p.category)?.name ?? "";
  const price = p.price === null ? "Prix sur WhatsApp" : `${p.price} DH`;
  const sizes = p.sizes.join(" · ");
  const badges = [
    p.isNew && pill("Nouveau", C.goldDeep, C.gold),
    !p.inStock && pill("Rupture de stock", C.cream, C.ink, C.ink),
  ].filter(Boolean);

  return h(
    "div",
    {
      width: W,
      height: H,
      position: "relative",
      backgroundColor: C.cream,
      backgroundImage: "linear-gradient(135deg, #fffdf9 0%, #faf6f0 50%, #efe5d6 100%)",
      fontFamily: "Jost",
    },
    h("div", { position: "absolute", left: 22, top: 22, right: 22, bottom: 22, border: `1.5px solid ${C.gold}`, borderRadius: 18 }),
    // Soft circle behind the photo
    h("div", { position: "absolute", left: 70, top: 75, width: 420, height: 420, borderRadius: 999, backgroundColor: C.sand }),
    arch(photo, { left: 115, top: 70, width: 330, border: `4px solid ${C.gold}` }),
    h(
      "div",
      { position: "absolute", left: 535, top: 0, bottom: 0, width: 600, flexDirection: "column", justifyContent: "center" },
      h("div", { fontSize: 22, letterSpacing: 8, color: C.goldDeep, fontWeight: 500 }, `MERY NAJE · ${category.toUpperCase()}`),
      h("div", { fontFamily: "Cormorant", fontWeight: 600, fontSize: p.name.length > 18 ? 70 : 84, lineHeight: 1.05, color: C.ink, marginTop: 16 }, p.name),
      badges.length ? h("div", { gap: 12, marginTop: 20 }, ...badges) : null,
      h(
        "div",
        {
          fontSize: p.price === null ? 40 : 60,
          fontWeight: 500,
          color: p.price === null ? C.goldDeep : C.ink,
          marginTop: 24,
        },
        price,
      ),
      h("div", { fontSize: 24, color: C.muted, marginTop: 10 }, `Tailles : ${sizes}`),
      h("div", { width: 110, height: 2, backgroundColor: C.gold, marginTop: 28, marginBottom: 22 }),
      h("div", { fontSize: 23, color: C.muted }, "Livraison partout au Maroc · Paiement à la livraison"),
      h("div", { fontSize: 20, color: C.muted, marginTop: 8, opacity: 0.85 }, `Réf. ${p.id} · Commande sur WhatsApp`),
    ),
  );
}

fs.rmSync(OUT, { recursive: true, force: true });
const sizes = [await render(siteCard(), path.join(OUT, "site.jpg"))];
let count = 0;
for (const p of products) {
  const photo = firstPhoto(p);
  if (!photo) continue;
  sizes.push(await render(productCard(p, photo), path.join(OUT, "products", `${p.slug}.jpg`)));
  count++;
}
const max = Math.round(Math.max(...sizes) / 1024);
console.log(`og-images: site card + ${count} product card(s), largest ${max} KB`);
