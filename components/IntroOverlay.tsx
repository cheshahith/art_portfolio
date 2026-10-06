"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "./IntroProvider";

// =======================================================================
// INTRO THEME CONSTANTS
// =======================================================================
const INTRO_BG = "#AEC4D4";
const INTRO_TEXT = "#790D16";
const NUM_BLOCKS = 6; // Number of cinematic vertical curtain blocks

// =======================================================================
// GREETINGS (Order: வணக்கம். -> Hello. -> Hola. -> Bonjour. -> Olá.)
// Upright, minimal, smaller font, burgundy #790D16 on blue #AEC4D4
// =======================================================================
export const GREETINGS = [
  {
    id: "ta",
    text: "வணக்கம்.",
    lang: "ta",
    isTamil: true,
  },
  {
    id: "en",
    text: "Hello.",
    lang: "en",
    isTamil: false,
  },
  {
    id: "es",
    text: "Hola.",
    lang: "es",
    isTamil: false,
  },
  {
    id: "fr",
    text: "Bonjour.",
    lang: "fr",
    isTamil: false,
  },
  {
    id: "pt",
    text: "Olá.",
    lang: "pt",
    isTamil: false,
  },
];

// Snappier, faster greeting hold time (in milliseconds)
const GREETING_HOLD_MS = 550;

export default function IntroOverlay() {
  const pathname = usePathname();
  const { hasSeenIntro, isIntroPlaying, isReducedMotion, finishIntro } =
    useIntro();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // If user is directly on a subpage, automatically mark intro complete so they can view the subpage
  useEffect(() => {
    if (pathname !== "/" && !hasSeenIntro) {
      finishIntro();
    }
  }, [pathname, hasSeenIntro, finishIntro]);

  // Lock body scroll while intro plays, unlock when complete
  useEffect(() => {
    if (pathname === "/" && isIntroPlaying && !hasSeenIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [pathname, isIntroPlaying, hasSeenIntro]);

  // Handle prefers-reduced-motion
  useEffect(() => {
    if (isReducedMotion && isIntroPlaying && !hasSeenIntro) {
      setIsSlidingUp(true);
    }
  }, [isReducedMotion, isIntroPlaying, hasSeenIntro]);

  // Fast sequential cycling through greetings
  useEffect(() => {
    if (pathname !== "/" || !isIntroPlaying || hasSeenIntro || isSlidingUp || isReducedMotion) return;

    if (currentIndex < GREETINGS.length) {
      timerRef.current = setTimeout(() => {
        if (currentIndex < GREETINGS.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Reached end of greetings -> trigger cinematic block-by-block slide up
          handleSlideUp();
        }
      }, GREETING_HOLD_MS + 280); // Hold time after fast fade-in
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, currentIndex, isIntroPlaying, hasSeenIntro, isSlidingUp, isReducedMotion]);

  const handleSlideUp = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsSlidingUp(true);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    handleSlideUp();
  };

  if (pathname !== "/" || (hasSeenIntro && !isSlidingUp)) {
    return null;
  }

  const currentGreeting = GREETINGS[currentIndex];
  const blocks = Array.from({ length: NUM_BLOCKS });

  return (
    <AnimatePresence>
      {!hasSeenIntro && (
        <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none">
          {/* Cinematic Block-by-Block Curtain Layer */}
          <div className="absolute inset-0 flex w-full h-full pointer-events-none">
            {blocks.map((_, idx) => (
              <motion.div
                key={`curtain-block-${idx}`}
                initial={{ y: "0%" }}
                animate={
                  isReducedMotion && isSlidingUp
                    ? { opacity: 0 }
                    : { y: isSlidingUp ? "-100%" : "0%" }
                }
                transition={{
                  duration: isReducedMotion ? 0.4 : 0.85,
                  delay: isReducedMotion ? 0 : idx * 0.065,
                  ease: [0.76, 0, 0.24, 1], // Cinematic bezier
                }}
                onAnimationComplete={() => {
                  // When the last block finishes sliding up, complete intro
                  if (idx === NUM_BLOCKS - 1 && isSlidingUp) {
                    finishIntro();
                  }
                }}
                style={{ backgroundColor: INTRO_BG }}
                className="flex-1 h-full border-r last:border-r-0 border-[#AEC4D4]"
              />
            ))}
          </div>

          {/* Intro Greeting Content Layer */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isSlidingUp ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center justify-center w-full h-screen px-4 pointer-events-none"
          >
            <AnimatePresence mode="wait">
              {currentGreeting && !isSlidingUp && (
                <motion.div
                  key={currentGreeting.id}
                  lang={currentGreeting.lang}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{
                    duration: 0.26,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="flex items-center justify-center text-center"
                >
                  <span
                    style={{
                      fontFamily: currentGreeting.isTamil
                        ? "var(--font-tamil), serif"
                        : "var(--font-instrument), var(--font-playfair), Georgia, serif",
                      fontWeight: 400,
                      fontStyle: "normal",
                      color: INTRO_TEXT,
                      fontSize: "clamp(26px, 4.2vw, 54px)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                    }}
                    className="select-none"
                  >
                    {currentGreeting.text}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tiny "Skip" link in burgundy at bottom center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isSlidingUp ? 0 : 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
          >
            <button
              onClick={handleSkip}
              aria-label="Skip introduction"
              style={{ color: INTRO_TEXT }}
              className="text-xs sm:text-sm tracking-wider uppercase opacity-75 hover:opacity-100 transition-opacity duration-200 cursor-pointer focus:outline-none"
            >
              Skip
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
