"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X, Sparkles, Trophy } from "lucide-react";

function CustomGameSlot() {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-[#42060b] border border-[#E5D3AF]/40 flex items-center justify-center text-[#E5D3AF] shadow-[0_0_25px_rgba(121,13,22,0.3)]">
          <Gamepad2 className="w-10 h-10 animate-bounce text-[#E5D3AF]" />
        </div>
        <div className="absolute -top-2 -right-2 text-[#E5D3AF] animate-spin">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <h3 className="font-[var(--font-playfair)] italic text-3xl sm:text-4xl text-[#F5EFE1] font-normal mb-3">
        Interactive Canvas Coming Soon
      </h3>

      <p className="font-[var(--font-inter)] text-sm sm:text-base text-[#F5EFE1]/85 max-w-md mb-8 leading-relaxed font-light">
        An interactive creative sandbox is currently in development. You will soon be able to mix mineral glazes, test fluid brush dynamics, and discover hidden sketchbook easter eggs!
      </p>

      {/* Mini teaser card */}
      <div className="w-full max-w-sm p-4 rounded-xl bg-[#42060b]/90 border border-[#E5D3AF]/25 flex items-center gap-4 text-left">
        <div className="p-2.5 rounded-lg bg-[#E5D3AF]/15 text-[#E5D3AF] shrink-0">
          <Trophy className="w-5 h-5 text-[#E5D3AF]" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-[#E5D3AF] font-semibold">
            Teaser
          </div>
          <div className="text-xs text-[#F5EFE1]/90 mt-0.5">
            Secret studio gallery unlocks & generative pigment brushes
          </div>
        </div>
      </div>
    </div>
  );
}

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameModal({ isOpen, onClose }: GameModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close with Esc key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Secret Game Zone"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#790D16]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-[#570910] border border-[#E5D3AF]/40 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close game modal"
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-[#E5D3AF] hover:text-[#F5EFE1] bg-[#42060b]/70 hover:bg-[#42060b] border border-[#E5D3AF]/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Slot */}
            <CustomGameSlot />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
