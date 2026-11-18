// Runs automatically before `npm run dev` and `npm run build`.
// Creates the browser tab icon and the iPhone home-screen icon as real .png files
// (app/icon.png, app/apple-icon.png): from /public/logo.png when it exists,
// otherwise a gold "MN" monogram on cream.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og.js";

const LOGO = path.join("public", "logo.png");
const font = fs.readFileSync(path.join("scripts", "fonts", "CormorantGaramond-SemiBold.ttf"));

async function monogram(size) {
  const ring = Math.max(2, Math.round(size / 22));
  const element = {
    type: "div",
    props: {
      style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#faf6f0" },
      children: {
        type: "div",
        props: {
          style: {
            width: Math.round(size * 0.92),
            height: Math.round(size * 0.92),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9999,
            border: `${ring}px solid #c9a45c`,
            color: "#8a6a2f",
            fontFamily: "Cormorant",
            fontSize: Math.round(size * 0.42),
            letterSpacing: Math.round(size * 0.02),
          },
          children: "MN",
        },
      },
    },
  };
  const res = new ImageResponse(element, {
    width: size,
    height: size,
    fonts: [{ name: "Cormorant", data: font, weight: 600, style: "normal" }],
  });
  return Buffer.from(await res.arrayBuffer());
}

async function icon(size) {
  if (fs.existsSync(LOGO)) {
    // Round logo, cropped square, on cream (iOS fills transparency with black).
    return sharp(LOGO).resize(size, size, { fit: "cover" }).flatten({ background: "#faf6f0" }).png().toBuffer();
  }
  return monogram(size);
}

fs.writeFileSync(path.join("app", "icon.png"), await icon(64));
fs.writeFileSync(path.join("app", "apple-icon.png"), await icon(180));
console.log(`icons: app/icon.png + app/apple-icon.png (${fs.existsSync(LOGO) ? "from logo.png" : "MN monogram"})`);
