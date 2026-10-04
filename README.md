# Art Portfolio Website

A modern, mobile-first art portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features a video intro, multilingual greetings, floating glassmorphism navigation, masonry galleries with lightboxes, and a secret mini-game slot.

---

## ✨ Features

- **Cinematic Video Intro**: Full-screen looping sea foam video with golden-hour color grading and dark vignette.
- **Multilingual Greetings**: Cycling greetings (வணக்கம் in Tamil, Hello, Hola, Bonjour, Olá) with custom typography, letter-spacing, and gold glows.
- **Intro Lifecycle & Skip**: Smooth slide-up transition once per session (`sessionStorage`), with a "Skip" button and `prefers-reduced-motion` support.
- **Floating Glassmorphism Navbar**: Fixed bottom-center pill with dynamic sliding gold highlight (`layoutId`), accessible on all screen sizes with iOS safe-area support.
- **Smooth Page Transitions**: Seamless fade/slide route transitions via `app/template.tsx`.
- **Responsive Galleries with Lightbox**:
  - **Oil Paintings**: Dark gallery theme with gold accents and rich metadata.
  - **Line Art**: Paper-like, high-contrast parchment panel presentation for delicate ink drawings.
  - **Worst Art**: Playful, tilted cards, hand-lettered *Caveat* captions, washi tape accents, and hilarious *"What went wrong"* notes.
- **Interactive Lightbox**: Full-screen modal with keyboard navigation (Esc, Arrow keys), mobile touch swipe gestures, and metadata drawer.
- **Secret Game Modal**: Top-right gamepad button with a subtle pulse animation opening an expandable game slot ready for mini-games.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the portfolio.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🎨 Customization Guide

### 1. Swapping in Your Real Artworks
1. Drop your artwork image files (`.jpg`, `.png`, `.webp`, `.svg`) into the appropriate folder:
   - Oil Paintings: `/public/art/oil/`
   - Line Art: `/public/art/line/`
   - Worst Art: `/public/art/worst/`
2. Open [`/data/artworks.ts`](file:///c:/Users/chesh/OneDrive/Desktop/art%20c/data/artworks.ts) and edit the `oilPaintings`, `lineArt`, or `worstArt` arrays:
   ```typescript
   {
     id: "oil-1",
     title: "Your Artwork Title",
     medium: "Oil on Canvas",
     year: "2024",
     src: "/art/oil/my-painting.jpg",
     alt: "Description of your artwork",
     width: 1200,
     height: 800,
     note: "Optional story or curator note.",
   }
   ```

### 2. Editing Intro Greetings & Timing
Open [`/components/IntroOverlay.tsx`](file:///c:/Users/chesh/OneDrive/Desktop/art%20c/components/IntroOverlay.tsx):
- To edit or add greetings, update the `GREETINGS` array at the top:
  ```typescript
  export const GREETINGS = [
    { text: "வணக்கம்", lang: "ta", fontClass: "font-[var(--font-tamil)]" },
    { text: "Hello", lang: "en", fontClass: "font-[var(--font-cormorant)]" },
    // Add your own greetings here!
  ];
  ```
- To adjust the color grade or vignette, tweak `OVERLAY_STYLE` at the top of the file.

### 3. Dropping in a Mini-Game
Open [`/components/GameModal.tsx`](file:///c:/Users/chesh/OneDrive/Desktop/art%20c/components/GameModal.tsx):
- Replace `<CustomGameSlot />` with your custom React game component, Three.js canvas, Phaser game, or interactive canvas element.

### 4. Updating Artist Bio & Name
Open [`/app/page.tsx`](file:///c:/Users/chesh/OneDrive/Desktop/art%20c/app/page.tsx):
- Replace `[Your Name]` in the Hero section.
- Replace the placeholder paragraphs inside the `<section id="about">` block with your artist bio, statement, and philosophy.

---

## 🚢 Deploying to Vercel

1. Push this project to your GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**.

Your art portfolio will be live with full edge optimization and global CDN caching!
