import type { Metadata } from "next";
import { NotFoundView } from "@/components/pages/NotFoundView";

export const metadata: Metadata = { title: "Page introuvable" };

export default function NotFound() {
  return <NotFoundView />;
}
