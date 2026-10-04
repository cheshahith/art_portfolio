"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  categoryName?: string;
}

export default function PageHeader({
  title,
  subtitle,
  count,
  categoryName,
}: PageHeaderProps) {
  return (
    <div className="pt-20 sm:pt-24 pb-10 sm:pb-12 px-4 max-w-5xl mx-auto text-center">
      {/* Category Pill / Breadcrumb */}
      {categoryName && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-[var(--font-inter)] font-semibold tracking-widest uppercase text-[#790D16] bg-[#E5D3AF]/60 border border-[#790D16]/20"
        >
          <span>{categoryName}</span>
          {typeof count === "number" && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#790D16]/50" />
              <span>{count} Works</span>
            </>
          )}
        </motion.div>
      )}

      {/* Main Title: Burgundy in Playfair Display italic */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="font-[var(--font-playfair)] italic text-4xl sm:text-6xl md:text-7xl font-normal text-[#790D16] tracking-tight leading-tight"
      >
        {title}
      </motion.h1>

      {/* Thin Sand Hairline Divider */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "80px", opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="h-[1.5px] bg-[#E5D3AF] mx-auto my-5"
      />

      {/* Subtitle: Burgundy in Inter font */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="font-[var(--font-inter)] text-sm sm:text-base text-[#790D16]/80 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
