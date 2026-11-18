import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollection } from "@/lib/catalog";
import { shareMetadata } from "@/lib/seo.server";
import { CollectionView } from "@/components/collection/CollectionView";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collection/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  const description = `${c.intro.fr} Mery Naje, prêt-à-porter féminin à Casablanca. Livraison partout au Maroc.`;
  return {
    title: c.name.fr,
    description,
    ...shareMetadata({ title: `${c.name.fr} · Mery Naje`, description }),
  };
}

export default async function CollectionPage({ params }: PageProps<"/collection/[slug]">) {
  const { slug } = await params;
  if (!getCollection(slug)) notFound();
  return <CollectionView slug={slug} />;
}
