import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollection } from "@/lib/catalog";
import { CollectionView } from "@/components/collection/CollectionView";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collection/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: c.name.fr,
    description: `${c.intro.fr} Mery Naje, prêt-à-porter féminin à Casablanca. Livraison partout au Maroc.`,
  };
}

export default async function CollectionPage({ params }: PageProps<"/collection/[slug]">) {
  const { slug } = await params;
  if (!getCollection(slug)) notFound();
  return <CollectionView slug={slug} />;
}
