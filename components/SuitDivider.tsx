"use client";

import React from "react";
import { motion } from "framer-motion";

export interface SuitDividerProps {
  /** The suit/fleuron symbol: 'spade' (default), 'diamond', 'club', 'heart', or any custom character */
  suit?: "spade" | "diamond" | "club" | "heart" | string;
  /** Color of the fleuron and lines (defaults to #AEC4D4) */
  color?: string;
  /** Additional CSS class names */
  className?: string;
  /** Width of the horizontal lines on each side */
  lineWidth?: string | number;
  /** Font size of the suit fleuron icon */
  symbolSize?: string | number;
  /** Whether to animate into view */
  animate?: boolean;
}

/**
 * SuitDivider: An elegant ornamental divider / fleuron component
 * Features a central suit symbol (♠ spade by default) flanked by thin hairline gradient rules.
 */
export default function SuitDivider({
  suit = "spade",
  color = "#AEC4D4",
  className = "",
  lineWidth = "64px",
  symbolSize = "18px",
  animate = true,
}: SuitDividerProps) {
  const getSymbol = (s: string) => {
    switch (s.toLowerCase()) {
      case "spade":
      case "♠":
        return "♠";
      case "diamond":
      case "♦":
        return "♦";
      case "club":
      case "♣":
        return "♣";
      case "heart":
      case "♥":
        return "♥";
      default:
        return s;
    }
  };

  const symbol = getSymbol(suit);
  const formattedLineWidth =
    typeof lineWidth === "number" ? `${lineWidth}px` : lineWidth;
  const formattedSymbolSize =
    typeof symbolSize === "number" ? `${symbolSize}px` : symbolSize;

  const content = (
    <div
      className={`flex items-center justify-center gap-3.5 select-none pointer-events-none ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      {/* Left ornamental line with gentle fade */}
      <div
        className="h-[1px]"
        style={{
          width: formattedLineWidth,
          background: `linear-gradient(90deg, transparent 0%, ${color} 100%)`,
          opacity: 0.55,
        }}
      />

      {/* Fleuron / Suit Symbol */}
      <span
        style={{
          fontSize: formattedSymbolSize,
          lineHeight: 1,
          color: color,
          textShadow: `0 0 10px ${color}40`,
        }}
        className="inline-block transform scale-110 select-none font-serif opacity-90"
      >
        {symbol}
      </span>

      {/* Right ornamental line with gentle fade */}
      <div
        className="h-[1px]"
        style={{
          width: formattedLineWidth,
          background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
          opacity: 0.55,
        }}
      />
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
