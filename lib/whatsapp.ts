// WhatsApp messages are always written in French so the shop reads every order the same way.
import { settings } from "@/data/settings";
import type { Product } from "@/data/products";
import type { CartItem } from "./cart";

export function waLink(text?: string) {
  const base = `https://wa.me/${settings.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

const dh = (n: number) => `${n} DH`;

function describeLine(p: Product, size: string, color: string, qty: number) {
  const parts = [`${p.name} (Réf. ${p.id})`, size === "Taille standard" ? size : `Taille ${size}`];
  if (color && color !== "Comme sur la photo") parts.push(color);
  parts.push(`x${qty}`, p.price === null ? "prix à confirmer" : dh(p.price * qty));
  return `• ${parts.join(" — ")}`;
}

export type Customer = {
  name: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
};

export function buildOrderMessage(items: CartItem[], customer: Customer) {
  const subtotal = items.reduce((sum, i) => sum + (i.product.price ?? 0) * i.qty, 0);
  const fee = settings.deliveryFee;
  const total =
    fee === null
      ? `Total : ${dh(subtotal)} (+ livraison)`
      : `Total : ${dh(subtotal + fee)} (dont livraison ${dh(fee)})`;
  return [
    "Bonjour Mery Naje 👋 Nouvelle commande :",
    ...items.map((i) => describeLine(i.product, i.size, i.color, i.qty)),
    total,
    `Nom : ${customer.name} | Tél : ${customer.phone} | Ville : ${customer.city} | Adresse : ${customer.address}`,
    customer.note ? `Note : ${customer.note}` : null,
    "Paiement à la livraison.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildProductMessage(p: Product, size: string, color: string, qty: number) {
  return [
    "Bonjour Mery Naje 👋 Je souhaite commander :",
    describeLine(p, size, color, qty),
    "Paiement à la livraison. Merci !",
  ].join("\n");
}

export function buildPriceQuestion(p: Product, size?: string) {
  const sizeText = size ? ` (taille ${size})` : "";
  return `Bonjour Mery Naje 👋 Quel est le prix de cet article : ${p.name}, Réf. ${p.id}${sizeText} ? Merci !`;
}

export function buildRestockQuestion(p: Product) {
  return `Bonjour Mery Naje 👋 L'article ${p.name} (Réf. ${p.id}) sera-t-il de nouveau disponible ? Merci de me prévenir 🤍`;
}

export const GREETING = "Bonjour Mery Naje 👋";

/** sessionStorage key of the last order link (offered again on the thank-you page). */
export const LAST_ORDER_KEY = "mn-last-order";
