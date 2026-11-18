import { categories, products, type CategoryId, type Product } from "@/data/products";
import type { Localized } from "@/data/settings";

/** Minimum number of items shown in "Nouveautés": new items first, completed by the most recent. */
const NEW_ARRIVALS_MIN = 8;

export type Collection = {
  slug: string;
  name: Localized;
  intro: Localized;
  /** Hidden collections have a page but no chip in the filters bar. */
  hidden?: boolean;
  products: () => Product[];
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export function getNewArrivals(min = NEW_ARRIVALS_MIN) {
  const fresh = products.filter((p) => p.isNew);
  const rest = products.filter((p) => !p.isNew);
  return [...fresh, ...rest].slice(0, Math.max(min, fresh.length));
}

export function getRelated(product: Product, count = 4) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  if (sameCategory.length >= 2) return sameCategory.slice(0, count);
  // Not enough items in this category: complete with new arrivals.
  const fill = getNewArrivals().filter((p) => p.id !== product.id && !sameCategory.includes(p));
  return [...sameCategory, ...fill].slice(0, count);
}

const categoryIntros: Record<CategoryId, Localized> = {
  robes: {
    fr: "Du quotidien aux grandes occasions, la robe qui vous va.",
    ar: "من الحياة اليومية إلى المناسبات الكبرى، الفستان اللي يليق بيك.",
  },
  ensembles: {
    fr: "Des looks coordonnés, élégants et sans effort.",
    ar: "إطلالات متناسقة وأنيقة بدون مجهود.",
  },
  manteaux: {
    fr: "Des manteaux chics pour toutes les saisons.",
    ar: "معاطف راقية لكل المواسم.",
  },
  combinaisons: {
    fr: "Des combinaisons ajustées, confortables et chics.",
    ar: "جمبسوت مريح وأنيق يُبرز القوام.",
  },
  hauts: {
    fr: "Chemises et hauts faciles à associer.",
    ar: "قمصان وبلوزات سهلة التنسيق.",
  },
  bas: {
    fr: "Pantalons et jeans confortables, coupe impeccable.",
    ar: "سراويل وجينز مريحة بقصّة مثالية.",
  },
  pulls: {
    fr: "Douceur et chaleur pour les journées fraîches.",
    ar: "نعومة ودفء للأيام الباردة.",
  },
};

export const collections: Collection[] = [
  {
    slug: "nouveautes",
    name: { fr: "Nouveautés", ar: "جديدنا" },
    intro: { fr: "Les dernières pièces arrivées en boutique.", ar: "آخر القطع اللي وصلات للمحل." },
    products: () => getNewArrivals(),
  },
  ...categories.map<Collection>((c) => ({
    slug: c.id,
    name: { fr: c.name, ar: c.nameAr },
    intro: categoryIntros[c.id],
    products: () => products.filter((p) => p.category === c.id),
  })),
  {
    slug: "hauts-et-bas",
    name: { fr: "Hauts & Bas", ar: "بلوزات وسراويل" },
    intro: {
      fr: "Les essentiels à mixer pour composer vos tenues.",
      ar: "القطع الأساسية لتنسيق إطلالاتك.",
    },
    hidden: true,
    products: () => products.filter((p) => p.category === "hauts" || p.category === "bas"),
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "36", "38", "40", "42", "44", "Taille standard"];

export function sortSizes(sizes: string[]) {
  return [...sizes].sort((a, b) => {
    const ia = SIZE_ORDER.indexOf(a);
    const ib = SIZE_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

export type PriceRange = "lt200" | "200to300" | "gt300";

export function inPriceRange(price: number | null, range: PriceRange) {
  if (price === null) return false;
  if (range === "lt200") return price < 200;
  if (range === "200to300") return price >= 200 && price <= 300;
  return price > 300;
}

export type SortKey = "new" | "priceAsc" | "priceDesc";

export function sortProducts(list: Product[], sort: SortKey) {
  const order = new Map(products.map((p, i) => [p.id, i]));
  const byRecency = (a: Product, b: Product) =>
    Number(b.isNew) - Number(a.isNew) || order.get(a.id)! - order.get(b.id)!;
  if (sort === "new") return [...list].sort(byRecency);
  // Items without a price ("Prix sur WhatsApp") always go last.
  return [...list].sort((a, b) => {
    if (a.price === null) return b.price === null ? byRecency(a, b) : 1;
    if (b.price === null) return -1;
    return sort === "priceAsc" ? a.price - b.price : b.price - a.price;
  });
}

/** Lowercase, accent-free version of a string, for search. */
export function normalizeText(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Image of a product matching a color name ("Noir" → "...-noir.jpg"), if any. */
export function imageIndexForColor(images: string[], color: string) {
  const key = normalizeText(color).replace(/\s+/g, "-");
  return images.findIndex((src) => normalizeText(src).includes(key));
}
