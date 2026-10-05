"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Artwork } from "@/data/artworks";
import Lightbox from "./Lightbox";
import { Eye, AlertCircle, Sparkles } from "lucide-react";

interface GalleryProps {
  items: Artwork[];
  variant?: "oil" | "line" | "worst" | "ugly";
}

export default function Gallery({ items, variant = "oil" }: GalleryProps) {
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);

  // Empty State
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto my-12 rounded-2xl bg-[#E5D3AF] border border-[#790D16]/20">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Responsive CSS Column Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]">
          {items.map((artwork, index) => {
            const isFirstRow = index < 3;

            // Rotation angle for ugly/worst art variant
            const isUglyVariant = variant === "worst" || variant === "ugly";
            const tiltRotation = isUglyVariant
              ? index % 2 === 0
                ? "-rotate-1 sm:-rotate-2"
                : "rotate-1 sm:rotate-2"
              : "";

            return (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="break-inside-avoid inline-block w-full mb-8"
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
                      className="group relative cursor-pointer select-none transition-all duration-500 hover:-translate-y-2 mb-8"
                    >
                      {/* Subtle Ambient Wall Shadow (Clean & Balanced) */}
                      <div className="absolute inset-2 sm:inset-3 rounded-2xl bg-black/35 blur-xl opacity-60 group-hover:opacity-85 group-hover:blur-2xl transition-all duration-500 pointer-events-none" />

                      {/* Frame Container with Refined Realistic Drop-Shadow */}
                      <div className="relative w-full aspect-[650/950] transition-all duration-500 [filter:drop-shadow(0_8px_16px_rgba(0,0,0,0.45))_drop-shadow(0_18px_32px_rgba(0,0,0,0.35))] group-hover:[filter:drop-shadow(0_12px_24px_rgba(0,0,0,0.55))_drop-shadow(0_24px_42px_rgba(0,0,0,0.45))]">
                        
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
                          <div className="absolute inset-0 shadow-[inset_0_2px_12px_rgba(0,0,0,0.7)] pointer-events-none" />

                          {/* Hover Detail Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#260508]/95 via-[#260508]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#F5EFE1]">
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
                      <div className="mt-4 px-3 py-2 text-center rounded-xl bg-[#521313]/50 backdrop-blur-sm border border-[#E5D3AF]/15 shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:border-[#E5D3AF]/35 group-hover:bg-[#521313]/70">
                        <h4 className="font-[var(--font-playfair)] italic text-lg sm:text-xl text-[#F5EFE1] font-normal tracking-wide group-hover:text-[#E5D3AF] transition-colors">
                          {artwork.title}
                        </h4>
                        <p className="font-[var(--font-inter)] text-xs text-[#E5D3AF]/85 mt-1 tracking-wider uppercase font-light">
                          {artwork.medium} &bull; {artwork.year}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Variant 2: LINE ART (Cream paper panels with thin burgundy ink borders) */}
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

                      {/* Ink Vignette on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#790D16]/90 via-[#790D16]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-[#F5EFE1]">
                        <span className="text-xs uppercase tracking-widest text-[#E5D3AF] font-semibold">
                          Minimalist Ink
                        </span>
                        <h3 className="font-[var(--font-playfair)] italic text-xl font-normal">
                          {artwork.title}
                        </h3>
                      </div>
                    </div>

                    {/* Paper caption label */}
                    <div className="mt-3 pt-2 border-t border-[#790D16]/15 flex items-center justify-between text-xs text-[#790D16]">
                      <div>
                        <span className="font-[var(--font-playfair)] italic text-base font-normal text-[#790D16] block">
                          {artwork.title}
                        </span>
                        <span className="font-[var(--font-inter)] text-[#790D16]/70">{artwork.medium}</span>
                      </div>
                      <span className="font-mono text-[#790D16]/80 font-semibold shrink-0 ml-2">
                        {artwork.year}
                      </span>
                    </div>
                  </div>
                )}

                {/* Variant 3: UGLY ART (Sand cards with slight tilt, Caveat captions in burgundy) */}
                {(variant === "worst" || variant === "ugly") && (
                  <div
                    onClick={() => setSelectedArtworkIndex(index)}
                    className={`group relative rounded-xl p-4 sm:p-5 bg-[#E5D3AF] border border-[#790D16]/25 hover:border-[#790D16]/70 shadow-sm hover:shadow-lg ${tiltRotation} hover:rotate-0 transition-all duration-300 cursor-pointer overflow-visible`}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg bg-[#F5EFE1] border border-[#790D16]/15">
                      <Image
                        src={artwork.src}
                        alt={artwork.alt}
                        width={artwork.width}
                        height={artwork.height}
                        priority={isFirstRow}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-auto object-cover transform group-hover:scale-104 transition-transform duration-300"
                      />
                    </div>

                    {/* Playful Handwritten Caption (Caveat font in Burgundy) */}
                    <div className="mt-4 pt-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-[var(--font-caveat)] text-2xl sm:text-3xl text-[#790D16] font-bold leading-tight">
                          {artwork.title}
                        </h3>
                        <span className="font-[var(--font-caveat)] text-lg text-[#790D16]/70 shrink-0">
                          ({artwork.year})
                        </span>
                      </div>

                      {/* What Went Wrong Callout */}
                      {artwork.note && (
                        <div className="mt-2.5 p-3 rounded-lg bg-[#F5EFE1] border border-[#790D16]/20 text-xs">
                          <div className="flex items-center gap-1.5 text-[#790D16] font-semibold uppercase tracking-wider mb-1">
                            <AlertCircle className="w-3.5 h-3.5 text-[#790D16]" />
                            <span>What went wrong:</span>
                          </div>
                          <p className="font-[var(--font-caveat)] text-base sm:text-lg text-[#790D16]/90 leading-snug">
                            {artwork.note}
                          </p>
                        </div>
                      )}
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
