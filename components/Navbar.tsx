"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useIntro } from "./IntroProvider";

// =======================================================================
// NAV ITEMS CONFIGURATION
// =======================================================================
export const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Oil Paintings", href: "/oil-paintings" },
  { name: "Line Art", href: "/line-art" },
  { name: "Ugly", href: "/ugly" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { hasSeenIntro, isIntroComplete } = useIntro();

  // Reveal only after intro finishes or if previously seen
  const shouldShow = hasSeenIntro || isIntroComplete;

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={shouldShow ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: hasSeenIntro ? 0.1 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-label="Main Navigation"
      className="fixed bottom-6 sm:bottom-10 inset-x-0 z-40 flex justify-center items-center px-3 sm:px-4 pointer-events-none pb-[env(safe-area-inset-bottom)]"
    >
      <div className="pointer-events-auto flex items-center gap-0.5 sm:gap-1.5 p-1 sm:p-2 rounded-full bg-[#AEC4D4]/95 border border-[#790D16]/25 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.45)] max-w-full overflow-x-auto no-scrollbar backdrop-blur-xl">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-[var(--font-inter)] tracking-wide transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#790D16] active:scale-95 ${
                isActive
                  ? "text-[#F5EFE1] font-semibold"
                  : "text-[#790D16] hover:text-[#570910] font-medium"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-[#790D16] rounded-full shadow-md"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
