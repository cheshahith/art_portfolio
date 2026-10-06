"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Lightbox from "./Lightbox";
import SuitDivider from "./SuitDivider";
import { Artwork } from "@/data/artworks";
import { ZoomIn } from "lucide-react";

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
  }));

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto my-16 rounded-2xl bg-[#FBF7F0] border-2 border-[#2A0A0A] shadow-md">
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
    <div className="w-full min-h-screen bg-[#6C1A1A] text-[#F5EFE1] flex flex-col selection:bg-[#AEC4D4] selection:text-[#6C1A1A] overflow-x-hidden">
      {/* ===================================================================
          1. COMIC PAGE HEADER
          =================================================================== */}
      <header className="pt-16 sm:pt-28 pb-8 sm:pb-12 px-4 text-center max-w-4xl mx-auto w-full">
        {/* Collection Badge with Rummy Card Symbol */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-3.5 rounded-full text-xs font-[Georgia,'Times_New_Roman',serif] font-semibold tracking-widest uppercase text-[#AEC4D4] bg-[#521313]/80 border border-[#AEC4D4]/30 shadow-md"
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
          className="font-[Georgia,'Times_New_Roman',serif] text-4xl sm:text-7xl md:text-8xl text-[#F5EFE1] font-bold tracking-tight leading-none mb-3"
        >
          Line Art
        </motion.h1>

        {/* Rummy Suit Divider */}
        <div className="my-3.5 sm:my-4">
          <SuitDivider
            suit="club"
            color="#AEC4D4"
            lineWidth="56px"
            symbolSize="15px"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="font-[Georgia,'Times_New_Roman',serif] italic text-sm sm:text-xl text-[#F5EFE1]/90 max-w-lg mx-auto leading-relaxed px-2"
        >
          ink, patience, and a lot of erasing
        </motion.p>
      </header>

      {/* ===================================================================
          2. COMIC PANEL GRID GALLERY (Tight Spacing & Sideways Scroll Entrance)
          =================================================================== */}
      <main className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full pb-36">
        <div className="columns-1 md:columns-2 gap-5 sm:gap-7 space-y-5 sm:space-y-7 [column-fill:_balance]">
          {images.map((item, index) => {
            const isPriority = index < 2;
            const isEven = index % 2 === 0;

            // Sideways scroll entrance: alternating from left (-80px) and right (+80px)
            const initialX = isEven ? -80 : 80;

            // Subtle rotation for comic frame character
            const tiltClass = isEven
              ? "-rotate-[0.4deg] sm:-rotate-[0.8deg]"
              : "rotate-[0.4deg] sm:rotate-[0.8deg]";

            return (
              <motion.div
                key={item.id}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: initialX,
                        scale: 0.96,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? {}
                    : {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }
                }
                viewport={{ once: true, amount: 0.15, margin: "-20px" }}
                transition={{
                  duration: 0.65,
                  delay: shouldReduceMotion ? 0 : (index % 2) * 0.08,
                  ease: [0.22, 1, 0.36, 1], // Smooth cinematic bezier
                }}
                className={`break-inside-avoid inline-block w-full mb-5 sm:mb-7 ${tiltClass} group cursor-pointer transition-all duration-300 hover:scale-[1.015] active:scale-[0.98] hover:z-10`}
                onClick={() => setSelectedArtworkIndex(index)}
              >
                {/* Comic Panel Container with snug white border */}
                <div className="relative overflow-hidden bg-[#FBF7F0] border-[2.5px] sm:border-[3px] border-[#2A0A0A] rounded-[4px] p-2 sm:p-2.5 shadow-[5px_5px_0_rgba(0,0,0,0.45)] sm:shadow-[7px_7px_0_rgba(0,0,0,0.5)] group-hover:shadow-[9px_9px_0_rgba(0,0,0,0.65)] transition-all duration-300">
                  
                  {/* Corner Comic Registration Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-[2px] bg-[#2A0A0A] text-[#FBF7F0] font-[Georgia,'Times_New_Roman',serif] text-[10px] sm:text-xs font-bold tracking-wider select-none shadow-sm opacity-90 group-hover:opacity-100">
                    #{String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Corner Hover Zoom Cue */}
                  <div className="absolute top-2.5 right-2.5 z-10 p-1 rounded-full bg-[#2A0A0A]/80 text-[#FBF7F0] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <ZoomIn className="w-3 h-3" />
                  </div>

                  {/* Artwork Canvas snugly fitted inside white panel */}
                  <div className="relative w-full overflow-hidden rounded-[2px] bg-[#FBF7F0] flex items-center justify-center">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      priority={isPriority}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="w-full h-auto object-contain block transform group-hover:scale-[1.01] transition-transform duration-500 ease-out select-none"
                    />
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
