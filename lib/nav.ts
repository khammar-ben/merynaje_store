import type { Localized } from "@/data/settings";
import { infoPages } from "@/data/pages";
import { collections } from "./catalog";

export type NavLink = { href: string; label: Localized };

const collectionLink = (slug: string): NavLink => {
  const c = collections.find((x) => x.slug === slug)!;
  return { href: `/collection/${c.slug}/`, label: c.name };
};

/** Header menu (desktop). */
export const mainNav: NavLink[] = [
  collectionLink("nouveautes"),
  collectionLink("robes"),
  collectionLink("ensembles"),
  collectionLink("manteaux"),
  { href: "/la-boutique/", label: { fr: "Boutique", ar: "المحل" } },
];

/** All visible collections (mobile menu, footer, filters). */
export const collectionNav: NavLink[] = collections.filter((c) => !c.hidden).map((c) => collectionLink(c.slug));

export const allProductsLink: NavLink = {
  href: "/collection/",
  label: { fr: "Toute la collection", ar: "كل المجموعة" },
};

export const infoNav: NavLink[] = [
  ...infoPages.map((p) => ({ href: `/${p.slug}/`, label: p.title })),
  { href: "/contact/", label: { fr: "Contact", ar: "تواصل معنا" } },
];

/** "/collection/robes/" and "/collection/robes" are the same page. */
export const samePath = (a: string, b: string) => a.replace(/\/+$/, "") === b.replace(/\/+$/, "");
