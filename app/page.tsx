"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { useIntro } from "@/components/IntroProvider";
import SuitDivider from "@/components/SuitDivider";

// =======================================================================
// 1. EDITABLE HOME CONSTANTS
// =======================================================================
const HOME_BG = "#6C1A1A";
const HOME_TEXT = "#AEC4D4";
const HERO_GREETING = "Hello, I'm Che";

// Path to circular portrait photo (stored in /public/images/home/che.jpg)
const PHOTO_PATH = "/images/home/che.jpg";

// Arc path for the SVG greeting (curves gracefully around the circular photo)
const ARC_PATH = "M 88 150 A 112 112 0 0 1 312 150";

export default function HomePage() {
  const { hasSeenIntro, isReducedMotion } = useIntro();

  // Content entrance timing based on intro curtain completion
  const baseDelay = isReducedMotion ? 0 : hasSeenIntro ? 0.05 : 0.2;

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden selection:bg-[#AEC4D4] selection:text-[#6C1A1A]">
      {/* =======================================================================
          FIXED FULL-SCREEN VELVET TEXTURE LAYER
          ======================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isReducedMotion ? 0 : 0.8, ease: "easeOut" }}
        style={{ backgroundColor: HOME_BG }}
        className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden"
      >
        <Image
          src="/textures/home-bg.webp"
          alt="Velvet Background Texture"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover pointer-events-none opacity-90"
        />

        {/* Soft Radial Dark Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.1) 45%, rgba(0, 0, 0, 0) 75%)",
          }}
        />
      </motion.div>

      {/* =======================================================================
          PAGE CONTENT
          ======================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col pb-36">
        {/* =====================================================================
            2. HERO SECTION
            ===================================================================== */}
        <section className="relative min-h-[90svh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-12 sm:pt-6 pb-16 overflow-hidden">
          <h1 className="sr-only">{HERO_GREETING}</h1>

          {/* Centered Hero Cluster */}
          <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-xl mx-auto">
            {/* Arched Photo & Greeting Container */}
            <div
              style={{
                width: "clamp(260px, 75vw, 420px)",
                aspectRatio: "400 / 260",
              }}
              className="relative select-none mb-2"
            >
              {/* Circular Portrait Photo with subtle halo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: isReducedMotion ? 0 : 0.8,
                  delay: baseDelay,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  left: "25%",
                  width: "50%",
                  top: "19.2%",
                }}
                className="aspect-square rounded-full overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.5)] ring-2 ring-[#AEC4D4]/30"
              >
                <Image
                  src={PHOTO_PATH}
                  alt="Portrait of Che"
                  fill
                  priority
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 240px"
                  className="object-cover"
                  style={{ objectPosition: "50% 20%" }}
                />
              </motion.div>

              {/* Arched Greeting SVG */}
              <motion.svg
                viewBox="0 0 400 260"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: isReducedMotion ? 0 : 0.7,
                  delay: baseDelay + 0.2,
                  ease: "easeOut",
                }}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              >
                <defs>
                  <path id="hero-arc" d={ARC_PATH} fill="none" stroke="none" />
                </defs>
                <text
                  fill={HOME_TEXT}
                  style={{
                    fontFamily: "var(--font-instrument), Georgia, serif",
                    fontSize: "30px",
                    letterSpacing: "0.01em",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                  xmlSpace="preserve"
                >
                  <textPath
                    href="#hero-arc"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {HERO_GREETING}
                  </textPath>
                </text>
              </motion.svg>
            </div>

            {/* Tagline */}
            <motion.h2
              initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isReducedMotion ? 0 : 0.7,
                delay: isReducedMotion ? 0 : baseDelay + 0.2,
                ease: "easeOut",
              }}
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.55)",
              }}
              className="italic font-normal text-2xl sm:text-4xl text-[#F3E6D3] text-center leading-snug px-3 max-w-md sm:max-w-xl mx-auto"
            >
              Oil, ink, and a few honest disasters
            </motion.h2>

            {/* Fleuron Divider */}
            <div className="my-4 sm:my-5">
              <SuitDivider
                suit="diamond"
                color="#AEC4D4"
                lineWidth="48px"
                symbolSize="14px"
              />
            </div>

            {/* Short Introduction Paragraph */}
            <motion.p
              initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isReducedMotion ? 0 : 0.7,
                delay: isReducedMotion ? 0 : baseDelay + 0.4,
                ease: "easeOut",
              }}
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.45)",
              }}
              className="text-sm sm:text-base text-[#F5EFE1]/90 max-w-sm sm:max-w-md mx-auto leading-relaxed px-2 font-normal"
            >
              I draw, I paint, and I watch way too many movies. Some of it turns
              out beautiful, some of it is a glorious mess, and I&apos;m proud of both.
            </motion.p>

            {/* Mobile Quick Action Buttons / Navigation Cards */}
            <motion.div
              initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isReducedMotion ? 0 : 0.7,
                delay: isReducedMotion ? 0 : baseDelay + 0.55,
                ease: "easeOut",
              }}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-7 w-full max-w-sm sm:max-w-md px-2"
            >
              <Link
                href="/oil-paintings"
                className="group flex flex-col items-center p-3 rounded-2xl bg-[#521313]/70 hover:bg-[#521313] border border-[#AEC4D4]/25 shadow-md active:scale-95 transition-all"
              >
                <span className="text-[#AEC4D4] text-base mb-0.5">♦</span>
                <span className="font-[var(--font-cinzel)] text-[10px] sm:text-xs uppercase tracking-wider text-[#F5EFE1] font-medium text-center">
                  Oil Canvas
                </span>
              </Link>

              <Link
                href="/line-art"
                className="group flex flex-col items-center p-3 rounded-2xl bg-[#521313]/70 hover:bg-[#521313] border border-[#AEC4D4]/25 shadow-md active:scale-95 transition-all"
              >
                <span className="text-[#AEC4D4] text-base mb-0.5">♣</span>
                <span className="font-[var(--font-cinzel)] text-[10px] sm:text-xs uppercase tracking-wider text-[#F5EFE1] font-medium text-center">
                  Line Art
                </span>
              </Link>

              <Link
                href="/ugly"
                className="group flex flex-col items-center p-3 rounded-2xl bg-[#521313]/70 hover:bg-[#521313] border border-[#AEC4D4]/25 shadow-md active:scale-95 transition-all"
              >
                <span className="text-[#AEC4D4] text-base mb-0.5">♥</span>
                <span className="font-[var(--font-cinzel)] text-[10px] sm:text-xs uppercase tracking-wider text-[#F5EFE1] font-medium text-center">
                  Ugly Art
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator Chevron */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: baseDelay + 0.7, duration: 0.8 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce"
          >
            <a
              href="#about"
              aria-label="Scroll to about story"
              style={{ color: HOME_TEXT }}
              className="p-2 inline-block hover:opacity-100 transition-opacity"
            >
              <ChevronDown className="w-5 h-5" />
            </a>
          </motion.div>
        </section>

        {/* =====================================================================
            3. ABOUT THE ARTIST SECTION
            ===================================================================== */}
        <section id="about" className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 border-t border-[#AEC4D4]/20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl sm:rounded-3xl bg-[#4A0E12]/85 backdrop-blur-xl p-6 sm:p-12 border border-[#AEC4D4]/20 relative overflow-hidden shadow-2xl"
          >
            {/* Watermark */}
            <div
              style={{ color: HOME_TEXT }}
              className="absolute -bottom-8 -right-8 font-[var(--font-playfair)] italic text-8xl sm:text-9xl font-bold select-none pointer-events-none opacity-5"
            >
              ART
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#AEC4D4]" />
              <h2
                style={{
                  color: "#B6C3D2",
                  fontFamily: "var(--font-josefin), sans-serif",
                  fontWeight: 300,
                  fontStyle: "normal",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  lineHeight: 1.15,
                }}
                className="text-lg sm:text-2xl md:text-3xl"
              >
                Behind the Canvas
              </h2>
            </div>

            {/* Suit Divider with ♠ Spade Ornament */}
            <div className="flex justify-start mb-6">
              <SuitDivider
                suit="spade"
                color="#AEC4D4"
                lineWidth="48px"
                symbolSize="14px"
                className="mt-0.5 mb-1"
              />
            </div>

            <div className="space-y-6 text-[#F5EFE1]">
              <div>
                <strong
                  style={{
                    color: "#B6C3D2",
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    lineHeight: 1.2,
                  }}
                  className="text-sm sm:text-lg block mb-1.5"
                >
                  Why I Make Art
                </strong>
                <p
                  style={{
                    fontFamily: "var(--font-instrument), Georgia, serif",
                  }}
                  className="text-base sm:text-xl text-[#F5EFE1]/90 leading-relaxed font-normal"
                >
                  I make art because it&apos;s the only time my head goes quiet. Most of my days are loud, fast and half-finished. A brush and some paint slow all of that down, and for a few hours I&apos;m just here, doing one thing, feeling peaceful.
                </p>
              </div>

              <div>
                <strong
                  style={{
                    color: "#B6C3D2",
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    lineHeight: 1.2,
                  }}
                  className="text-sm sm:text-lg block mb-1.5"
                >
                  What My Work Is About
                </strong>
                <p
                  style={{
                    fontFamily: "var(--font-instrument), Georgia, serif",
                  }}
                  className="text-base sm:text-xl text-[#F5EFE1]/90 leading-relaxed font-normal mb-3"
                >
                  My work is about the rush before the calm. It&apos;s the fun, the excitement, and the restless &ldquo;when will this finally end?&rdquo; that builds up in me until I have to put it somewhere. Some of it ends up on the canvas looking beautiful. Some of it ends up looking like a disaster.
                </p>

                <blockquote
                  style={{
                    color: "#B6C3D2",
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 300,
                    fontStyle: "normal",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontSize: "clamp(15px, 2vw, 20px)",
                    lineHeight: 1.35,
                  }}
                  className="mt-3 p-3 sm:p-4 rounded-xl bg-[#2D0609]/60 border-l-2 border-[#AEC4D4] block italic"
                >
                  &ldquo;I keep both, because both are honest.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-[#AEC4D4]/20 flex items-center justify-between">
              <img
                src="/signature.png"
                alt="Che's signature"
                className="w-[95px] sm:w-[130px] h-auto block"
              />
              <span className="text-[11px] sm:text-xs text-[#AEC4D4]/70 font-[var(--font-inter)] uppercase tracking-widest">
                Sketchbook Studio
              </span>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
