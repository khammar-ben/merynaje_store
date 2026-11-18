// Runs automatically after `npm run build`.
// Works around a Next.js 16 bug when building on Windows: the prefetch files of nested routes
// are written as folders (__next.!x/collection/$d$slug/__PAGE__.txt) instead of flat files
// (__next.!x.collection.$d$slug.__PAGE__.txt), so page links 404 on prefetch.
// On macOS/Linux (and on Vercel) there is nothing to fix and this script does nothing.
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
let fixed = 0;

function collect(dir, parts, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(full, [...parts, entry.name], files);
    else files.push({ src: full, name: [...parts, entry.name].join(".") });
  }
  return files;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (!entry.name.startsWith("__next.")) {
      walk(full);
      continue;
    }
    for (const file of collect(full, [entry.name], [])) {
      fs.copyFileSync(file.src, path.join(dir, file.name));
      fixed++;
    }
    fs.rmSync(full, { recursive: true });
  }
}

if (fs.existsSync(outDir)) {
  walk(outDir);
  if (fixed) console.log(`fix-windows-export: flattened ${fixed} prefetch file(s) in out/`);
}
