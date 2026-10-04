"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Palette, Info } from "lucide-react";
import { Artwork } from "@/data/artworks";

interface LightboxProps {
  items: Artwork[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const item = isOpen ? items[currentIndex] : null;

  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    onNavigate(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    onNavigate(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation & Esc key
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Touch swipe handling for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Artwork detail: ${item.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-10 select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Burgundy Backdrop at ~92% opacity with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#790D16]/92 backdrop-blur-md transition-opacity cursor-pointer"
          />

          {/* Close Button: Sand controls */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full text-[#E5D3AF] hover:text-[#F5EFE1] bg-[#570910]/80 hover:bg-[#570910] border border-[#E5D3AF]/40 hover:border-[#E5D3AF] backdrop-blur-md shadow-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Right Navigation Buttons (Desktop & Tablet): Sand controls */}
          {items.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous artwork"
                className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full text-[#E5D3AF] hover:text-[#F5EFE1] bg-[#570910]/80 hover:bg-[#570910] border border-[#E5D3AF]/40 hover:border-[#E5D3AF] backdrop-blur-md shadow-xl transition-all cursor-pointer hidden sm:flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next artwork"
                className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full text-[#E5D3AF] hover:text-[#F5EFE1] bg-[#570910]/80 hover:bg-[#570910] border border-[#E5D3AF]/40 hover:border-[#E5D3AF] backdrop-blur-md shadow-xl transition-all cursor-pointer hidden sm:flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Modal Content Window */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-40 max-w-5xl w-full max-h-[92vh] flex flex-col lg:flex-row rounded-2xl bg-[#570910] border border-[#E5D3AF]/30 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
          >
            {/* Image Container */}
            <div className="relative flex-1 bg-[#42060b] flex items-center justify-center min-h-[280px] sm:min-h-[380px] lg:min-h-[500px] max-h-[55vh] lg:max-h-[85vh] p-4 sm:p-6 overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                priority
                className="max-h-[50vh] lg:max-h-[78vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-transform duration-300"
              />
            </div>

            {/* Artwork Details Panel: Burgundy background with Cream text & Sand controls */}
            <div className="w-full lg:w-80 xl:w-96 p-6 sm:p-8 bg-[#570910] border-t lg:border-t-0 lg:border-l border-[#E5D3AF]/20 flex flex-col justify-between overflow-y-auto max-h-[35vh] lg:max-h-[85vh]">
              <div>
                {/* Index counter in sand */}
                <div className="text-xs uppercase tracking-widest text-[#E5D3AF] font-semibold mb-2 flex items-center justify-between">
                  <span>Artwork</span>
                  <span>
                    {(currentIndex ?? 0) + 1} / {items.length}
                  </span>
                </div>

                {/* Title: Cream text in Playfair Display italic */}
                <h2 className="font-[var(--font-playfair)] italic text-2xl sm:text-3xl font-normal text-[#F5EFE1] leading-tight mb-4">
                  {item.title}
                </h2>

                {/* Metadata List: Cream text */}
                <div className="space-y-3 text-xs sm:text-sm text-[#F5EFE1]/85 pt-2 border-t border-[#E5D3AF]/20">
                  <div className="flex items-start gap-2.5">
                    <Palette className="w-4 h-4 text-[#E5D3AF] shrink-0 mt-0.5" />
                    <span>{item.medium}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#E5D3AF] shrink-0" />
                    <span>Created in {item.year}</span>
                  </div>
                </div>

                {/* Note / Curator commentary */}
                {item.note && (
                  <div className="mt-5 p-3.5 rounded-xl bg-[#42060b]/80 border border-[#E5D3AF]/20">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#E5D3AF] font-semibold mb-1">
                      <Info className="w-3.5 h-3.5 text-[#E5D3AF]" />
                      <span>Artist Note</span>
                    </div>
                    <p className="font-[var(--font-inter)] text-xs sm:text-sm text-[#F5EFE1]/90 italic leading-relaxed">
                      &ldquo;{item.note}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile Prev / Next Controls */}
              <div className="flex sm:hidden items-center justify-between gap-4 mt-6 pt-4 border-t border-[#E5D3AF]/20">
                <button
                  onClick={handlePrev}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#42060b] border border-[#E5D3AF]/30 text-xs text-[#E5D3AF] font-medium flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#42060b] border border-[#E5D3AF]/30 text-xs text-[#E5D3AF] font-medium flex items-center justify-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
