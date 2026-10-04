import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import PageIntro from "@/components/PageIntro";
import { lineArt } from "@/data/artworks";

export const metadata: Metadata = {
  title: "Line Art | Art Portfolio",
  description:
    "Delicate sumi ink studies, unbroken single-contour drawings, and architectural silhouettes on archival cotton paper.",
};

export default function LineArtPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#F5EFE1] min-h-screen text-[#790D16]">
      <PageIntro text="INK ON PAPER" variant="dither" />
      <PageHeader
        categoryName="Collection 02"
        title="Line Art"
        subtitle="Studies in minimalism, continuous contours, and the delicate balance of negative space using archival carbon ink on heavy cotton."
        count={lineArt.length}
      />
      <Gallery items={lineArt} variant="line" />
    </div>
  );
}
