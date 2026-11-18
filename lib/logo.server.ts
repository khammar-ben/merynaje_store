// Server-only: the logo as a data URI for generated images (favicon, Open Graph).
import fs from "node:fs";
import path from "node:path";

export function getLogoDataUri(): string | null {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "logo.png"));
    // Screenshots are sometimes JPEG files saved with a .png name: detect the real type.
    const mime = buf[0] === 0xff && buf[1] === 0xd8 ? "image/jpeg" : "image/png";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}
