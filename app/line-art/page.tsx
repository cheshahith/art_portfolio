import React from "react";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ComicPanelGallery from "@/components/ComicPanelGallery";
import { lineArtImages } from "@/data/lineart";

export const metadata: Metadata = {
  title: "Line Art | Art Portfolio",
  description:
    "A comic-panel scroll gallery showcasing original ink drawings, dynamic perspectives, and expressive sketchbook linework.",
};

export default function LineArtPage() {
  return (
    <>
      <PageIntro text="LINE ART" />
      <ComicPanelGallery images={lineArtImages} />
    </>
  );
}
