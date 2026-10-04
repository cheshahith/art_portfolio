import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import PageIntro from "@/components/PageIntro";
import { uglyArt } from "@/data/artworks";

export const metadata: Metadata = {
  title: "Ugly | Art Portfolio",
  description:
    "An affectionate retrospective of failed anatomy, accidental smudges, and hilarious sketchbook misadventures.",
};

export default function UglyPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#F5EFE1] min-h-screen text-[#790D16]">
      <PageIntro text="UGLY" />
      <PageHeader
        categoryName="Collection 03 &bull; Sketchbook Bloopers"
        title="Ugly"
        subtitle="Proof that I wasn't always good at this — a humorous exhibition of questionable perspectives, rogue fingers, and glorious creative chaos."
        count={uglyArt.length}
      />
      <Gallery items={uglyArt} variant="ugly" />
    </div>
  );
}
