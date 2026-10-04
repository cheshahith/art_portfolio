import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { oilPaintings } from "@/data/artworks";

export const metadata: Metadata = {
  title: "Oil Paintings | Art Portfolio",
  description:
    "Explore original oil paintings featuring glazed amber minerals, indigo impasto, and deep textures on canvas.",
};

export default function OilPaintingsPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#F5EFE1] min-h-screen text-[#790D16]">
      <PageHeader
        categoryName="Collection 01"
        title="Oil Paintings"
        subtitle="Exploring the depths of maritime indigo, translucent amber glazes, and heavy impasto textures layered with mineral pigments."
        count={oilPaintings.length}
      />
      <Gallery items={oilPaintings} variant="oil" />
    </div>
  );
}
