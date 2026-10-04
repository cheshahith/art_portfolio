"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIntro } from "@/components/IntroProvider";

// =======================================================================
// 1. EDITABLE HOME CONSTANTS (Edit colors, greetings, and paths here)
// =======================================================================
const HOME_BG = "#6C1A1A"; // Measured from mockup; switch to #790D16 if desired
const HOME_TEXT = "#AEC4D4"; // Soft blue greeting & accent text
const HERO_GREETING = "Hello, I'm Che"; // Arched greeting text (exact spacing)

// Path to circular portrait photo (stored in /public/images/home/che.jpg)
const PHOTO_PATH = "/images/home/che.jpg";

// Arc path for the SVG greeting (hugs the top curve of the circular photo)
const ARC_PATH = "M 88 150 A 112 112 0 0 1 312 150";

export default function HomePage() {
  const { hasSeenIntro, isReducedMotion } = useIntro();

  // Content entrance timing based on intro curtain completion
  const baseDelay = isReducedMotion ? 0 : hasSeenIntro ? 0.05 : 0.2;

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden selection:bg-[#AEC4D4] selection:text-[#6C1A1A]">
      {/* =======================================================================
          FIXED FULL-SCREEN VELVET TEXTURE LAYER (z-index 0)
          ======================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isReducedMotion ? 0 : 0.8, ease: "easeOut" }}
        style={{ backgroundColor: HOME_BG }}
        className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden"
      >
        {/* Authentic Velvet Background Texture Image (Quality 80, Priority, <400KB) */}
        <Image
          src="/textures/home-bg.webp"
          alt="Velvet Background Texture"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover pointer-events-none"
        />

        {/* Translucent Soft Radial Dark Vignette: ~20-25% darker in center, fading to transparent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.1) 45%, rgba(0, 0, 0, 0) 75%)",
          }}
        />
      </motion.div>

      {/* =======================================================================
          PAGE CONTENT (Position Relative, z-index 10)
          ======================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col pb-36">
        {/* =====================================================================
            2. HERO SECTION (Centered Cluster with Arched Greeting, Photo & Tagline)
            ===================================================================== */}
        <section className="relative min-h-screen min-h-svh flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          {/* Visually Hidden Semantic Heading for Accessibility & SEO */}
          <h1 className="sr-only">{HERO_GREETING}</h1>

          {/* Centered Hero Cluster */}
          <div className="relative flex flex-col items-center justify-center my-auto pt-6 pb-12 w-full max-w-xl mx-auto">
            {/* Fixed Aspect Ratio Cluster Container (400 / 260) */}
            <div
              style={{
                width: "clamp(300px, 40vw, 480px)",
                aspectRatio: "400 / 260",
              }}
              className="relative select-none"
            >
              {/* 1. Circular Portrait Photo (No border, no shadow, centered face framing) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
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
                className="aspect-square rounded-full overflow-hidden"
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

              {/* 2. Arched Greeting SVG (Hugs circular photo top, tight but not touching) */}
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
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
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

            {/* 3. Upright/Italic Serif Tagline in Georgia */}
            <motion.h2
              initial={
                isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isReducedMotion ? 0 : 0.7,
                delay: isReducedMotion ? 0 : baseDelay + 0.2,
                ease: "easeOut",
              }}
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                lineHeight: 1.2,
                color: "#F3E6D3",
                letterSpacing: "0.01em",
                textAlign: "center",
                textShadow: "0 2px 12px rgba(40, 8, 8, 0.45)",
                textWrap: "balance",
              }}
              className="mt-3 px-4 max-w-xl mx-auto"
            >
              Oil, ink, and a few honest disasters
            </motion.h2>

            {/* Subtle Diamond Divider below Tagline */}
            <motion.div
              initial={
                isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isReducedMotion ? 0 : 0.7,
                delay: isReducedMotion ? 0 : baseDelay + 0.35,
                ease: "easeOut",
              }}
              style={{ marginTop: "16px", marginBottom: "16px" }}
              className="flex items-center justify-center gap-3 select-none pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="h-[1px] w-[48px]"
                style={{ backgroundColor: "rgba(243, 230, 211, 0.4)" }}
              />
              <div
                className="w-[6px] h-[6px] rotate-45"
                style={{ backgroundColor: "rgba(243, 230, 211, 0.7)" }}
              />
              <div
                className="h-[1px] w-[48px]"
                style={{ backgroundColor: "rgba(243, 230, 211, 0.4)" }}
              />
            </motion.div>

            {/* 4. Description Paragraph in Georgia */}
            <motion.p
              initial={
                isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isReducedMotion ? 0 : 0.7,
                delay: isReducedMotion ? 0 : baseDelay + 0.5,
                ease: "easeOut",
              }}
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                lineHeight: 1.75,
                color: "rgba(232, 213, 192, 0.9)",
                maxWidth: "34rem",
                marginInline: "auto",
                textAlign: "center",
                textShadow: "0 2px 12px rgba(40, 8, 8, 0.45)",
                textWrap: "pretty",
              }}
              className="px-4"
            >
              I draw, I paint, and I watch way too many movies. Some of it turns
              out beautiful, some of it is a glorious mess, and I&apos;m proud of
              both.
            </motion.p>
          </div>

          {/* Scroll Indicator Chevron */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ delay: baseDelay + 0.6, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce"
          >
            <a
              href="#about"
              aria-label="Scroll to about story"
              style={{ color: HOME_TEXT }}
              className="hover:opacity-100 transition-opacity"
            >
              <ChevronDown className="w-5 h-5" />
            </a>
          </motion.div>
        </section>

        {/* =====================================================================
            3. ABOUT THE ARTIST SECTION
            ===================================================================== */}
        <section id="about" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#AEC4D4]/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl bg-[#521313]/90 backdrop-blur-md p-8 sm:p-12 border border-[#AEC4D4]/25 relative overflow-hidden shadow-2xl"
          >
            {/* Watermark */}
            <div
              style={{ color: HOME_TEXT }}
              className="absolute -bottom-10 -right-10 font-[var(--font-playfair)] italic text-9xl font-bold select-none pointer-events-none opacity-5"
            >
              ART
            </div>

            <h2
              style={{
                color: "#B6C3D2",
                fontFamily: "var(--font-rozha), serif",
                fontWeight: 400,
                fontStyle: "normal",
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                lineHeight: 1.05,
              }}
              className="text-[36px] sm:text-[clamp(40px,5.5vw,64px)] mb-8"
            >
              Behind the Canvas
            </h2>

            <div className="space-y-8 text-[#F5EFE1]">
              <div>
                <strong
                  style={{
                    color: "#B6C3D2",
                    fontFamily: "var(--font-rozha), serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                  className="text-[22px] sm:text-[28px] block mb-2"
                >
                  Why I Make Art
                </strong>
                <p
                  style={{
                    fontFamily: "var(--font-instrument), Georgia, serif",
                  }}
                  className="text-xl sm:text-2xl text-[#F5EFE1]/90 leading-relaxed font-normal"
                >
                  I make art because it&apos;s the only time my head goes quiet. Most of my days are loud, fast and half-finished. A brush and some paint slow all of that down, and for a few hours I&apos;m just here, doing one thing, feeling peaceful.
                </p>
              </div>

              <div>
                <strong
                  style={{
                    color: "#B6C3D2",
                    fontFamily: "var(--font-rozha), serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                  className="text-[22px] sm:text-[28px] block mb-2"
                >
                  What My Work Is About
                </strong>
                <p
                  style={{
                    fontFamily: "var(--font-instrument), Georgia, serif",
                  }}
                  className="text-xl sm:text-2xl text-[#F5EFE1]/90 leading-relaxed font-normal mb-4"
                >
                  My work is about the rush before the calm. It&apos;s the fun, the excitement, and the restless &ldquo;when will this finally end?&rdquo; that builds up in me until I have to put it somewhere. Some of it ends up on the canvas looking beautiful. Some of it ends up looking like a disaster.
                </p>

                <blockquote
                  style={{
                    color: "#B6C3D2",
                    fontFamily: "var(--font-rozha), serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    textTransform: "uppercase",
                    fontSize: "clamp(26px, 3.5vw, 36px)",
                    lineHeight: 1.25,
                  }}
                  className="mt-4 block"
                >
                  I keep both, because both are honest.
                </blockquote>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#AEC4D4]/20">
              <img
                src="/signature.png"
                alt="Che's signature"
                className="w-[110px] sm:w-[140px] h-auto block mt-[8px]"
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
