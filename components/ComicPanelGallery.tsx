"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Lightbox from "./Lightbox";
import SuitDivider from "./SuitDivider";
import { Artwork } from "@/data/artworks";

export interface LineArtImageItem {
  id: string;
  filename: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: "portrait" | "landscape" | "square";
}

interface ComicPanelGalleryProps {
  images: LineArtImageItem[];
}

// 12-Column Repeating Comic Layout Spans for Desktop
const COMIC_LAYOUT_PATTERNS = [
  {
    desktopCol: "lg:col-span-8",
    tabletCol: "md:col-span-2",
    minHeight: "min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]",
    badge: "Wide Feature",
  },
  {
    desktopCol: "lg:col-span-4",
    tabletCol: "md:col-span-1",
    minHeight: "min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]",
    badge: "Tall Accent",
  },
  {
    desktopCol: "lg:col-span-6",
    tabletCol: "md:col-span-1",
    minHeight: "min-h-[380px] sm:min-h-[440px]",
    badge: "Medium Half",
  },
  {
    desktopCol: "lg:col-span-6",
    tabletCol: "md:col-span-1",
    minHeight: "min-h-[380px] sm:min-h-[440px]",
    badge: "Medium Half",
  },
  {
    desktopCol: "lg:col-span-5",
    tabletCol: "md:col-span-1",
    minHeight: "min-h-[420px] sm:min-h-[480px]",
    badge: "Portrait Focus",
  },
  {
    desktopCol: "lg:col-span-7",
    tabletCol: "md:col-span-1",
    minHeight: "min-h-[420px] sm:min-h-[480px]",
    badge: "Action Splash",
  },
];

export default function ComicPanelGallery({ images }: ComicPanelGalleryProps) {
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Map to Artwork interface for reusable full-screen Lightbox
  const lightboxItems: Artwork[] = images.map((img) => ({
    id: img.id,
    title: img.caption,
    medium: "Archival Ink on Paper",
    year: "Sketchbook Archive",
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
    aspectRatio: img.aspectRatio,
    note: `Original ink drawing (${img.filename}). Rendered with archival pigment pen on textured paper.`,
  }));

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto my-16 rounded-[2px] bg-[#FBF7F0] border-[3px] border-[#2A0A0A] shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
        <h3 className="font-[Georgia,'Times_New_Roman',serif] text-2xl text-[#6C1A1A] font-bold mb-2">
          No Line Art Images Found
        </h3>
        <p className="font-[Georgia,'Times_New_Roman',serif] italic text-sm text-[#6C1A1A]/80 leading-relaxed">
          Please add images to the <code className="font-mono bg-[#6C1A1A]/10 px-1 py-0.5 rounded text-xs">/public/lineart_images</code> folder to display them here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#6C1A1A] text-[#F5EFE1] flex flex-col selection:bg-[#AEC4D4] selection:text-[#6C1A1A]">
      {/* ===================================================================
          1. COMIC PAGE HEADER
          =================================================================== */}
      <header className="pt-20 sm:pt-28 pb-10 sm:pb-14 px-4 text-center max-w-4xl mx-auto w-full">
        {/* Collection Badge with Rummy Card Symbol */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full text-xs font-[Georgia,'Times_New_Roman',serif] font-semibold tracking-widest uppercase text-[#AEC4D4] bg-[#521313]/80 border border-[#AEC4D4]/30 shadow-md"
        >
          <span>♣ Collection 02</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#AEC4D4]/60" />
          <span>{images.length} Panels</span>
        </motion.div>

        {/* Page Title: Line Art in Georgia / Times New Roman */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-[Georgia,'Times_New_Roman',serif] text-5xl sm:text-7xl md:text-8xl text-[#F5EFE1] font-bold tracking-tight leading-none mb-3"
        >
          Line Art
        </motion.h1>

        {/* Rummy Suit Divider */}
        <div className="my-4">
          <SuitDivider
            suit="club"
            color="#AEC4D4"
            lineWidth="64px"
            symbolSize="16px"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="font-[Georgia,'Times_New_Roman',serif] italic text-base sm:text-xl text-[#F5EFE1]/90 max-w-lg mx-auto leading-relaxed"
        >
          ink, patience, and a lot of erasing
        </motion.p>
      </header>

      {/* ===================================================================
          2. COMIC PANEL GRID GALLERY
          =================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 w-full">
          {images.map((item, index) => {
            const pattern = COMIC_LAYOUT_PATTERNS[index % COMIC_LAYOUT_PATTERNS.length];
            const isPriority = index < 2;
            const isEven = index % 2 === 0;

            // Rotation for hand-placed comic feel (-0.6deg / 0.6deg on tablet/desktop, 0 on mobile)
            const rotationClass = isEven
              ? "rotate-0 sm:-rotate-[0.6deg]"
              : "rotate-0 sm:rotate-[0.6deg]";

            return (
              <motion.div
                key={item.id}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 40,
                        x: isEven ? -24 : 24,
                        scale: 0.97,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? {}
                    : {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        scale: 1,
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : (index % 3) * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`col-span-1 ${pattern.tabletCol} ${pattern.desktopCol} ${rotationClass} group cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:z-10`}
                onClick={() => setSelectedArtworkIndex(index)}
              >
                {/* Comic Panel Container */}
                <div className="relative flex flex-col justify-between overflow-hidden bg-[#FBF7F0] border-[3px] border-[#2A0A0A] rounded-[2px] shadow-[6px_6px_0_rgba(0,0,0,0.45)] group-hover:shadow-[9px_9px_0_rgba(0,0,0,0.65)] transition-all duration-300 h-full">
                  
                  {/* Comic Corner Registration / Panel Number Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-[1px] bg-[#2A0A0A] text-[#FBF7F0] font-[Georgia,'Times_New_Roman',serif] text-[10px] sm:text-xs font-bold tracking-wider select-none shadow-sm">
                    #{String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Drawing Container with paper-white #FBF7F0 background */}
                  <div
                    className={`relative w-full ${pattern.minHeight} p-4 sm:p-7 flex items-center justify-center bg-[#FBF7F0] overflow-hidden`}
                  >
                    {/* Comic Halftone / Paper Texture Subtle Overlay */}
                    <div className="absolute inset-0 bg-radial from-transparent to-[#2A0A0A]/[0.03] pointer-events-none" />

                    {/* Image with object-fit: contain (Never cropped) */}
                    <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        priority={isPriority}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 66vw, 50vw"
                        className="object-contain p-1 transform group-hover:scale-[1.02] transition-transform duration-500 ease-out select-none"
                      />
                    </div>
                  </div>

                  {/* ===================================================================
                      3. CAPTION STRIP
                      =================================================================== */}
                  <div className="border-t-[2px] border-[#2A0A0A]/20 bg-[#FBF7F0] px-4 py-2.5 flex items-center justify-between text-[#6C1A1A]">
                    <span className="font-[Georgia,'Times_New_Roman',serif] italic text-xs sm:text-sm text-[#6C1A1A] font-medium tracking-wide truncate pr-2">
                      {item.caption}
                    </span>
                    <span className="font-[Georgia,'Times_New_Roman',serif] text-[10px] sm:text-xs text-[#6C1A1A]/70 uppercase tracking-widest font-bold shrink-0">
                      Ink on Paper
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Reusable Lightbox for High-Resolution Inspection */}
      <Lightbox
        items={lightboxItems}
        currentIndex={selectedArtworkIndex}
        onClose={() => setSelectedArtworkIndex(null)}
        onNavigate={(newIndex) => setSelectedArtworkIndex(newIndex)}
      />
    </div>
  );
}
