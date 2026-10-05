"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import GameModal from "./GameModal";
import { useIntro } from "./IntroProvider";

export default function GameButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasSeenIntro, isIntroComplete } = useIntro();

  // Show only after intro reveals or if already seen
  const shouldShow = hasSeenIntro || isIntroComplete;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={shouldShow ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-4 right-4 sm:top-5 sm:right-5 z-40"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          aria-label="Open interactive drawing note"
          className="relative group p-2.5 sm:p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#521313]/85 hover:bg-[#6C1A1A] border border-[#AEC4D4]/50 text-[#AEC4D4] backdrop-blur-xl transition-all duration-300 shadow-lg active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#AEC4D4]"
        >
          {/* Soft pulse animation */}
          <span className="absolute inset-0 rounded-full border border-[#AEC4D4]/40 animate-ping opacity-50 pointer-events-none" />

          <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#AEC4D4] group-hover:rotate-12 transition-transform duration-300 relative z-10" />
        </button>
      </motion.div>

      <GameModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
