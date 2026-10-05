"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageIntroProps {
  text: string;
  variant?: "plain" | "linen" | "dither";
}

export default function PageIntro({ text }: PageIntroProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Skip intro if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setPhase("done");
      return;
    }

    // Lock scroll during the intro animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 1. Text fades in over 1.2s -> switches to hold phase
    const holdTimer = setTimeout(() => {
      setPhase("hold");
    }, 1200);

    // 2. Text holds for 1.3s (1.2s + 1.3s = 2.5s) -> switches to exit phase
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 2500);

    // 3. Overlay fades out over 1.2s (2.5s + 1.2s = 3.7s) -> finishes and unmounts
    const doneTimer = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = originalOverflow;
    }, 3700);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (phase === "done" || prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="page-intro-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center text-[#F5EFE1] pointer-events-auto select-none overflow-hidden bg-[#6C1A1A]"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{
            opacity:
              phase === "enter" || phase === "hold" || phase === "exit" ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
          className="relative z-10 italic text-[22px] sm:text-[32px] tracking-[0.05em] uppercase text-center px-6 leading-relaxed font-normal text-[#F5EFE1]"
        >
          {text}
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
