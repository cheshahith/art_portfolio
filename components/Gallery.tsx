"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Artwork } from "@/data/artworks";
import Lightbox from "./Lightbox";
import { Eye, Sparkles, ZoomIn } from "lucide-react";

interface GalleryProps {
  items: Artwork[];
  variant?: "oil" | "line" | "worst" | "ugly";
}

export default function Gallery({ items, variant = "oil" }: GalleryProps) {
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Empty State
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto my-12 rounded-2xl bg-[#E5D3AF] border border-[#790D16]/20">
        <Sparkles className="w-8 h-8 text-[#790D16] mb-3 opacity-80" />
        <h3 className="font-[var(--font-playfair)] italic text-2xl text-[#790D16] font-normal mb-2">
          Curating the Collection
        </h3>
        <p className="font-[var(--font-inter)] text-sm text-[#790D16]/80 leading-relaxed">
          Artworks are currently being cataloged for this collection. Please check back shortly!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-36 overflow-x-hidden">
        {/* Responsive CSS Column Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8 [column-fill:_balance]">
          {items.map((artwork, index) => {
            const isFirstRow = index < 3;
            const isEven = index % 2 === 0;
            const isUglyVariant = variant === "worst" || variant === "ugly";

            // Sideways scroll entrance for ugly art and galleries
            const initialX = isEven ? -75 : 75;

            // Rotation angle for ugly/worst art variant
            const tiltRotation = isUglyVariant
              ? isEven
                ? "-rotate-1 sm:-rotate-2"
                : "rotate-1 sm:rotate-2"
              : "";

            return (
              <motion.div
                key={artwork.id}
                initial={
                  shouldReduceMotion
                    ? false
                    : isUglyVariant
                    ? { opacity: 0, x: initialX, scale: 0.96 }
                    : { opacity: 0, y: 24 }
                }
                whileInView={
                  shouldReduceMotion
                    ? {}
                    : isUglyVariant
                    ? { opacity: 1, x: 0, scale: 1 }
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.15, margin: "-20px" }}
                transition={{
                  duration: isUglyVariant ? 0.65 : 0.5,
                  delay: shouldReduceMotion ? 0 : (index % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="break-inside-avoid inline-block w-full mb-6 sm:mb-8"
              >
                {/* Variant 1: OIL PAINTINGS (Refined Museum Gold Framed Presentation) */}
                {variant === "oil" && (() => {
                  const isFrameA = index % 2 === 0;
                  const frameSrc = isFrameA ? "/ornate-gold-a.png" : "/ornate-gold-b.png";
                  const insets = isFrameA
                    ? { top: "12%", bottom: "11.5%", left: "16.2%", right: "16.3%" }
                    : { top: "12.1%", bottom: "11.5%", left: "17.2%", right: "17.2%" };

                  return (
                    <div
                      onClick={() => setSelectedArtworkIndex(index)}
                      className="group relative cursor-pointer select-none transition-all duration-300 active:scale-[0.98] hover:-translate-y-2 mb-4"
                    >
                      {/* Ambient Wall Glow */}
                      <div className="absolute inset-2 sm:inset-3 rounded-2xl bg-black/40 blur-xl opacity-70 group-hover:opacity-90 group-hover:blur-2xl transition-all duration-500 pointer-events-none" />

                      {/* Frame Container with Deep Drop-Shadow */}
                      <div className="relative w-full aspect-[650/950] transition-all duration-500 [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.55))_drop-shadow(0_20px_36px_rgba(0,0,0,0.45))]">
                        
                        {/* Artwork Canvas mounted inside frame */}
                        <div
                          className="absolute overflow-hidden bg-[#1A0507]"
                          style={{
                            top: insets.top,
                            bottom: insets.bottom,
                            left: insets.left,
                            right: insets.right,
                          }}
                        >
                          <Image
                            src={artwork.src}
                            alt={artwork.alt}
                            fill
                            priority={isFirstRow}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          />

                          {/* Subtle inner canvas shadow */}
                          <div className="absolute inset-0 shadow-[inset_0_2px_12px_rgba(0,0,0,0.75)] pointer-events-none" />

                          {/* Desktop Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#260508]/95 via-[#260508]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex flex-col justify-end p-4 text-[#F5EFE1]">
                            <div className="flex items-center gap-1.5 text-[#E5D3AF] text-xs font-[var(--font-inter)] font-semibold uppercase tracking-wider mb-1">
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Detail</span>
                            </div>
                            <h3 className="font-[var(--font-playfair)] italic text-lg sm:text-xl text-[#F5EFE1] font-normal leading-snug">
                              {artwork.title}
                            </h3>
                          </div>
                        </div>

                        {/* Ornate Gold Frame PNG overlay */}
                        <img
                          src={frameSrc}
                          alt="Ornate Gold Frame"
                          className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 select-none filter contrast-105"
                        />
                      </div>

                      {/* Museum Brass Plaque / Caption */}
                      <div className="mt-3 sm:mt-4 px-3.5 py-2.5 text-center rounded-xl bg-[#4A0E12]/80 backdrop-blur-md border border-[#E5D3AF]/20 shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-[#E5D3AF]/40 group-hover:bg-[#521313]/90">
                        <div className="flex items-center justify-center gap-1.5">
                          <h4 className="font-[var(--font-playfair)] italic text-base sm:text-xl text-[#F5EFE1] font-normal tracking-wide group-hover:text-[#E5D3AF] transition-colors">
                            {artwork.title}
                          </h4>
                          {/* Mobile Tap Cue */}
                          <ZoomIn className="w-3.5 h-3.5 text-[#E5D3AF]/70 sm:hidden shrink-0" />
                        </div>
                        <p className="font-[var(--font-inter)] text-[11px] sm:text-xs text-[#E5D3AF]/85 mt-1 tracking-wider uppercase font-light">
                          {artwork.medium} &bull; {artwork.year}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Variant 2: LINE ART (Cream paper panels) */}
                {variant === "line" && (
                  <div
                    onClick={() => setSelectedArtworkIndex(index)}
                    className="group relative rounded-xl p-3.5 sm:p-4 bg-[#F5EFE1] border border-[#790D16]/25 hover:border-[#790D16]/70 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-[#FFFFFF] border border-[#790D16]/15 p-2">
                      <Image
                        src={artwork.src}
                        alt={artwork.alt}
                        width={artwork.width}
                        height={artwork.height}
                        priority={isFirstRow}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-auto object-contain transform group-hover:scale-102 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </div>
                )}

                {/* Variant 3: UGLY ART (Tactile Polaroid-Style Sketchbook Cards without description) */}
                {isUglyVariant && (
                  <div
                    onClick={() => setSelectedArtworkIndex(index)}
                    className={`group relative rounded-2xl p-3.5 sm:p-4 bg-[#E5D3AF] border border-[#790D16]/25 shadow-md hover:shadow-xl ${tiltRotation} transition-all duration-300 active:scale-[0.98] cursor-pointer overflow-visible`}
                  >
                    {/* Washi Tape Graphic */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#C9B595]/90 border-b border-[#A69376] shadow-sm transform -rotate-1 rounded-sm pointer-events-none opacity-85 z-10"
                    />

                    {/* Image Canvas Container */}
                    <div className="relative overflow-hidden rounded-xl bg-[#F5EFE1] border-2 border-[#790D16]/20 shadow-inner p-1 mt-1">
                      <Image
                        src={artwork.src}
                        alt={artwork.alt}
                        width={artwork.width}
                        height={artwork.height}
                        priority={isFirstRow}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-auto object-cover rounded-lg transform group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>

                    {/* Subtle Polaroid Bottom Strip with Title & Year (No Description) */}
                    <div className="mt-2.5 px-1 flex items-center justify-between gap-2">
                      <h3 className="font-[var(--font-caveat)] text-xl sm:text-2xl text-[#790D16] font-bold leading-tight truncate">
                        {artwork.title}
                      </h3>
                      <span className="font-[var(--font-caveat)] text-base sm:text-lg text-[#790D16]/75 shrink-0">
                        {artwork.year}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Reusable Lightbox */}
      <Lightbox
        items={items}
        currentIndex={selectedArtworkIndex}
        onClose={() => setSelectedArtworkIndex(null)}
        onNavigate={(newIndex) => setSelectedArtworkIndex(newIndex)}
      />
    </>
  );
}
