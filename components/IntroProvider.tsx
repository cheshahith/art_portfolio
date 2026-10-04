"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface IntroContextType {
  hasSeenIntro: boolean;
  isIntroPlaying: boolean;
  isIntroComplete: boolean;
  isReducedMotion: boolean;
  finishIntro: () => void;
  skipIntro: () => void;
}

const IntroContext = createContext<IntroContextType>({
  hasSeenIntro: false,
  isIntroPlaying: false,
  isIntroComplete: false,
  isReducedMotion: false,
  finishIntro: () => {},
  skipIntro: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(true);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const seen =
      typeof window !== "undefined"
        ? sessionStorage.getItem("art_portfolio_intro_seen")
        : null;
    const prefersReducedMotion =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    setIsReducedMotion(prefersReducedMotion);

    if (seen === "true") {
      setHasSeenIntro(true);
      setIsIntroPlaying(false);
      setIsIntroComplete(true);
    } else {
      setHasSeenIntro(false);
      setIsIntroPlaying(true);
      setIsIntroComplete(false);
    }
  }, []);

  const finishIntro = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("art_portfolio_intro_seen", "true");
    }
    setIsIntroPlaying(false);
    setIsIntroComplete(true);
    setHasSeenIntro(true);
  };

  const skipIntro = () => {
    finishIntro();
  };

  // Render nothing until mounted to prevent hydration flash
  if (!mounted) {
    return <div className="min-h-screen bg-[#6C1A1A]" />;
  }

  return (
    <IntroContext.Provider
      value={{
        hasSeenIntro,
        isIntroPlaying,
        isIntroComplete,
        isReducedMotion,
        finishIntro,
        skipIntro,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
