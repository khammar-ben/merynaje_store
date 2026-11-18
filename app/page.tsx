import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Clientes } from "@/components/home/Clientes";
import { VisitStore } from "@/components/home/VisitStore";
import { InstagramBand } from "@/components/home/InstagramBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <CategoryTiles />
      <TrustStrip />
      <Clientes />
      <VisitStore />
      <InstagramBand />
    </>
  );
}
