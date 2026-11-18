"use client";

// Static export has no image server: next/image picks among WebP sizes generated
// before each build/dev run into /public/_img (see scripts/image-variants.mjs).
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/") || /\.svg$/i.test(src)) return src;
  return `/_img/${width}${src.replace(/\.[a-z0-9]+$/i, "")}.webp`;
}
