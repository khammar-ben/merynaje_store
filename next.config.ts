import type { NextConfig } from "next";
import { DEVICE_SIZES, IMAGE_SIZES } from "./lib/image-widths.mjs";

// Site 100 % statique : `npm run build` génère le dossier `out/`,
// déployable tel quel sur Vercel (ou n'importe quel hébergeur statique).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // No image server in a static export: photos are resized ahead of time into
    // /public/_img (scripts/image-variants.mjs) and lib/image-loader.ts picks the right size.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
  },
  turbopack: {
    // Project root (a package-lock.json higher up in the user folder would otherwise be picked).
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
