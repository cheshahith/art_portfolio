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

  // Determine Title Font Class
  let defaultTitleClasses =
    "font-[var(--font-playfair)] italic text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight";

  if (fontVariant === "cinzel") {
    defaultTitleClasses =
      "font-[var(--font-cinzel)] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold text-3xl sm:text-5xl md:text-6xl not-italic drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]";
  } else if (fontVariant === "rozha") {
    defaultTitleClasses =
      "font-[var(--font-rozha)] uppercase tracking-[0.04em] font-normal text-4xl sm:text-6xl md:text-7xl not-italic";
  }

  return (
    <div className="pt-20 sm:pt-24 pb-10 sm:pb-12 px-4 max-w-5xl mx-auto text-center">
      {/* Category Pill / Breadcrumb */}
      {categoryName && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full text-xs font-[var(--font-inter)] font-semibold tracking-widest uppercase ${
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
      <div className="my-5">
        <SuitDivider
          suit={suit || (isDark ? "diamond" : "heart")}
          color={isDark ? "#E5D3AF" : "#790D16"}
          lineWidth="64px"
          symbolSize="16px"
        />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className={`font-[var(--font-inter)] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-[#F5EFE1]/80" : "text-[#790D16]/80"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
