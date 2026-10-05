import type { Metadata } from "next";
import {
  Instrument_Serif,
  Playfair_Display,
  Noto_Serif_Tamil,
  Inter,
  Caveat,
  Cormorant_Garamond,
  DM_Sans,
  Libre_Baskerville,
  Lobster_Two,
  Rozha_One,
  Josefin_Sans,
  Cinzel,
} from "next/font/google";
import "./globals.css";
import { IntroProvider } from "@/components/IntroProvider";
import IntroOverlay from "@/components/IntroOverlay";
import Navbar from "@/components/Navbar";
import GameButton from "@/components/GameButton";

// Cinzel: Cinematic Roman Capitals for Oil Paintings
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

// Josefin Sans for Behind the Canvas section (Light 300 for headings, Regular 400 for subheads)
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
});

// Rozha One font for Behind the Canvas section title and headings
const rozhaOne = Rozha_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rozha",
  display: "swap",
});

// Lobster Two font
const lobsterTwo = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lobster-two",
  display: "swap",
});

// Intro Greeting Font: Instrument Serif, weight 400
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Site Headings & Page Titles: Playfair Display, italic
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

// Libre Baskerville: Tagline Serif, weight 400, upright
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-tagline",
  display: "swap",
});

// Cormorant Garamond: Elegant serifs
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// DM Sans: Hero statement & modern sans-serif
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

// Tamil Greeting: Noto Serif Tamil (upright, no italic exists for Tamil)
const notoTamil = Noto_Serif_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700"],
  style: "normal",
  variable: "--font-tamil",
  display: "swap",
});

// Body Text and Navigation Labels: Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Worst Art Captions: Caveat
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://art-portfolio.vercel.app"),
  title: "Art Portfolio | Oil Paintings, Line Art & Experimental Studies",
  description:
    "An elegant showcase of original oil paintings, minimalist line art drawings, and unfiltered artistic experiments.",
  keywords: [
    "Art Portfolio",
    "Oil Paintings",
    "Line Art",
    "Contemporary Artist",
    "Gallery",
  ],
  authors: [{ name: "Artist" }],
  openGraph: {
    title: "Art Portfolio | Oil Paintings & Line Art",
    description:
      "Explore original oil paintings, delicate sumi-ink line drawings, and creative sketchbook works.",
    url: "https://art-portfolio.vercel.app",
    siteName: "Art Portfolio",
    images: [
      {
        url: "/textures/home-bg.webp",
        width: 1920,
        height: 1080,
        alt: "Art Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Portfolio | Oil Paintings & Line Art",
    description:
      "Explore original oil paintings, delicate sumi-ink line drawings, and creative sketchbook works.",
    images: ["/textures/home-bg.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${josefinSans.variable} ${rozhaOne.variable} ${lobsterTwo.variable} ${instrumentSerif.variable} ${playfair.variable} ${libreBaskerville.variable} ${cormorant.variable} ${dmSans.variable} ${notoTamil.variable} ${inter.variable} ${caveat.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#6C1A1A] text-[#F5EFE1] antialiased selection:bg-[#AEC4D4] selection:text-[#6C1A1A]">
        <IntroProvider>
          {/* Fullscreen Video Intro Layer */}
          <IntroOverlay />

          {/* Top-Right Secret Game Button */}
          <GameButton />

          {/* Main Page Content */}
          <div className="flex-1 flex flex-col">{children}</div>

          {/* Persistent Floating Navbar */}
          <Navbar />
        </IntroProvider>
      </body>
    </html>
  );
}
