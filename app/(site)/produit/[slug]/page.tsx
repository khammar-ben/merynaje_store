import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { settings } from "@/data/settings";
import { getProduct } from "@/lib/catalog";
import { shareMetadata } from "@/lib/seo.server";
import { ProductView } from "@/components/product/ProductView";
import { RelatedProducts } from "@/components/product/RelatedProducts";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produit/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const priceText = p.price === null ? "Prix sur WhatsApp" : `${p.price} DH`;
  const description = `${p.description} Livraison partout au Maroc, paiement à la livraison.`;
  return {
    title: `${p.name} — ${priceText}`,
    description,
    ...shareMetadata({
      title: `${p.name} — ${priceText} · ${settings.storeName}`,
      description,
      card: `/og/products/${p.slug}.jpg`,
    }),
  };
}

export default async function ProductPage({ params }: PageProps<"/produit/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <>
      <ProductView product={product} />
      <RelatedProducts slug={slug} />
    </>
  );
}
