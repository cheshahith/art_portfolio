import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { worstArt } from "@/data/artworks";

export const metadata: Metadata = {
  title: "Worst Art | Art Portfolio",
  description:
    "An affectionate retrospective of failed anatomy, accidental smudges, and hilarious sketchbook misadventures.",
};

export default function WorstArtPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#F5EFE1] min-h-screen text-[#790D16]">
      <PageHeader
        categoryName="Collection 03 &bull; Sketchbook Bloopers"
        title="Worst Art"
        subtitle="Proof that I wasn't always good at this — a humorous exhibition of questionable perspectives, rogue fingers, and glorious creative chaos."
        count={worstArt.length}
      />
      <Gallery items={worstArt} variant="worst" />
    </div>
  );
}
