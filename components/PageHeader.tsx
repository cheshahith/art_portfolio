"use client";

import React from "react";
import { motion } from "framer-motion";
import SuitDivider from "./SuitDivider";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  categoryName?: string;
  theme?: "light" | "dark";
  fontVariant?: "cinzel" | "playfair" | "rozha";
  titleClassName?: string;
  suit?: "spade" | "diamond" | "club" | "heart" | string;
}

export default function PageHeader({
  title,
  subtitle,
  count,
  categoryName,
  theme = "light",
  fontVariant,
  titleClassName,
  suit,
}: PageHeaderProps) {
  const isDark = theme === "dark";

  // Determine Title Font Class with clean mobile responsiveness
  let defaultTitleClasses =
    "font-[var(--font-playfair)] italic text-3xl sm:text-6xl md:text-7xl font-normal tracking-tight";

  if (fontVariant === "cinzel") {
    defaultTitleClasses =
      "font-[var(--font-cinzel)] uppercase tracking-[0.1em] sm:tracking-[0.18em] font-semibold text-2xl sm:text-5xl md:text-6xl not-italic drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]";
  } else if (fontVariant === "rozha") {
    defaultTitleClasses =
      "font-[var(--font-rozha)] uppercase tracking-[0.04em] font-normal text-3xl sm:text-6xl md:text-7xl not-italic";
  }

  return (
    <div className="pt-16 sm:pt-24 pb-7 sm:pb-12 px-3.5 sm:px-4 max-w-5xl mx-auto text-center">
      {/* Category Pill / Breadcrumb */}
      {categoryName && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 mb-3 sm:mb-4 rounded-full text-[11px] sm:text-xs font-[var(--font-inter)] font-semibold tracking-widest uppercase ${
            isDark
              ? "text-[#E5D3AF] bg-[#521313]/80 border border-[#E5D3AF]/30 shadow-md"
              : "text-[#790D16] bg-[#E5D3AF]/60 border border-[#790D16]/20"
          }`}
        >
          <span>{categoryName}</span>
          {typeof count === "number" && (
            <>
              <span
                className={`w-1 h-1 rounded-full ${
                  isDark ? "bg-[#E5D3AF]/60" : "bg-[#790D16]/50"
                }`}
              />
              <span>{count} Works</span>
            </>
          )}
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className={`${titleClassName || defaultTitleClasses} leading-tight ${
          isDark ? "text-[#F5EFE1]" : "text-[#790D16]"
        }`}
      >
        {title}
      </motion.h1>

      {/* Rummy Suit Fleuron Divider */}
      <div className="my-3.5 sm:my-5">
        <SuitDivider
          suit={suit || (isDark ? "diamond" : "heart")}
          color={isDark ? "#E5D3AF" : "#790D16"}
          lineWidth="56px"
          symbolSize="15px"
        />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className={`font-[var(--font-inter)] text-xs sm:text-base max-w-xl mx-auto leading-relaxed px-2 ${
            isDark ? "text-[#F5EFE1]/85" : "text-[#790D16]/85"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
