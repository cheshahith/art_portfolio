import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import PageIntro from "@/components/PageIntro";
import { oilPaintings } from "@/data/artworks";

export const metadata: Metadata = {
  title: "Oil Paintings | Art Portfolio",
  description:
    "Explore original oil paintings featuring rich portraiture, still life studies, and deep textures on canvas.",
};

export default function OilPaintingsPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#6C1A1A] min-h-screen text-[#F5EFE1]">
      <PageIntro text="OIL ON CANVAS" />
      <PageHeader
        categoryName="♦ Collection 01"
        title="Oil Paintings"
        fontVariant="cinzel"
        count={oilPaintings.length}
        theme="dark"
        suit="diamond"
      />
      <Gallery items={oilPaintings} variant="oil" />
    </div>
  );
}
