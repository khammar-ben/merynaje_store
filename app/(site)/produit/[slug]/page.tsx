import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { settings } from "@/data/settings";
import { getProduct } from "@/lib/catalog";
import { firstProductImage } from "@/lib/assets.server";
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
  const image = firstProductImage(p.images);
  const priceText = p.price === null ? "Prix sur WhatsApp" : `${p.price} DH`;
  return {
    title: `${p.name} — ${priceText}`,
    description: `${p.description} Livraison partout au Maroc, paiement à la livraison.`,
    openGraph: {
      title: `${p.name} · ${settings.storeName}`,
      description: p.description,
      ...(image && { images: [{ url: image, alt: p.name }] }),
    },
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
