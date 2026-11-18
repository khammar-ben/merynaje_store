// `npm run assets`: copies the ./assets folder (logo, store, products, clientes) into ./public.
import fs from "node:fs";

if (!fs.existsSync("assets")) {
  console.log("Aucun dossier ./assets trouvé : créez-le (voir README) puis relancez la commande.");
  process.exit(0);
}
fs.cpSync("assets", "public", { recursive: true });
console.log("Photos copiées de ./assets vers ./public. Relancez `npm run dev` pour les voir.");
