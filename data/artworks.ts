// =======================================================================
// ARTWORK DATA SOURCE
// =======================================================================

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  note?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}

// -----------------------------------------------------------------------
// 1. OIL PAINTINGS (/oil-paintings)
// -----------------------------------------------------------------------
export const oilPaintings: Artwork[] = [
  {
    id: "oil-1",
    title: "Medusa Rondanini Study",
    medium: "Oil on Circular Shield Panel",
    year: "2024",
    src: "/art/oil/oil-1.jpeg",
    alt: "Classical Medusa shield portrait with coiled serpentine hair and intense expression.",
    width: 900,
    height: 1600,
    aspectRatio: "portrait",
    note: "Painted on a circular wood panel with rich earthen ochres and glazed viridian serpent coils.",
  },
  {
    id: "oil-2",
    title: "Portrait in Viridian & Ochre",
    medium: "Oil on Wood Panel",
    year: "2024",
    src: "/art/oil/oil-2.jpeg",
    alt: "Expressive figurative portrait with contemplative gaze and textured brushstrokes.",
    width: 2127,
    height: 2900,
    aspectRatio: "portrait",
    note: "Exploring direct gaze and impasto brushwork over raw warm woodgrain undertones.",
  },
  {
    id: "oil-3",
    title: "Portrait of an Elder in Warm Ochre",
    medium: "Oil on Canvas Board",
    year: "2023",
    src: "/art/oil/oil-3.jpeg",
    alt: "Smiling portrait of an elder with white hair illuminated by warm sunlight.",
    width: 1322,
    height: 1600,
    aspectRatio: "portrait",
    note: "Capturing warm natural sunlight, joyous expression, and loose impressionistic strokes.",
  },
  {
    id: "oil-4",
    title: "Portrait with Amber Corona",
    medium: "Glazed Oil on Canvas",
    year: "2023",
    src: "/art/oil/oil-4.jpeg",
    alt: "Warm portrait crowned with a vibrant amber and crimson halo rim light.",
    width: 2197,
    height: 3048,
    aspectRatio: "portrait",
    note: "Layered with translucent magenta glazes and warm dramatic backlighting.",
  },
  {
    id: "oil-5",
    title: "Still Life with Autumn Fruits",
    medium: "Oil Impasto on Panel",
    year: "2024",
    src: "/art/oil/oil-5.jpeg",
    alt: "Classical still life arrangement featuring pear, peach, and cluster of dark grapes.",
    width: 2519,
    height: 2976,
    aspectRatio: "portrait",
    note: "A classical master study exploring fruit volumes, glossy grape skins, and warm ambient light.",
  },
];

// -----------------------------------------------------------------------
// 2. LINE ART (/line-art)
// Paper-like parchment panels with high-contrast ink lines
// -----------------------------------------------------------------------
export const lineArt: Artwork[] = [
  {
    id: "line-1",
    title: "Botanical Equilibrium",
    medium: "Archival Ink & Gold Leaf on 300gsm Cotton Paper",
    year: "2024",
    src: "/art/line/line-1.svg",
    alt: "Minimalist vertical botanical drawing with delicate leaves and gold accent circle.",
    width: 900,
    height: 1200,
    aspectRatio: "portrait",
    note: "Drawn in a single meditative session using a Japanese dip pen and sumi ink.",
  },
  {
    id: "line-2",
    title: "Continuous Contour Profile",
    medium: "Single-Line Sumi Ink on Washi Paper",
    year: "2024",
    src: "/art/line/line-2.svg",
    alt: "Continuous single unbroken line tracing a side profile with a warm gold watercolor halo.",
    width: 850,
    height: 1150,
    aspectRatio: "portrait",
    note: "The pen never lifted from the paper from initial touch to final signature.",
  },
  {
    id: "line-3",
    title: "Architectural Solitude (Arch IX)",
    medium: "Technical Ink & Pale Ochre Wash",
    year: "2023",
    src: "/art/line/line-3.svg",
    alt: "Clean architectural arches casting precise geometric shadows in warm paper tone.",
    width: 1100,
    height: 800,
    aspectRatio: "landscape",
    note: "An homage to classical Mediterranean arcade geometry.",
  },
  {
    id: "line-4",
    title: "Hands in Resonance",
    medium: "Carbon Ink on Cold Press Paper",
    year: "2024",
    src: "/art/line/line-4.svg",
    alt: "Two expressive minimalist hands reaching across a subtle gold circle.",
    width: 1000,
    height: 1000,
    aspectRatio: "square",
    note: "Studies on posture and silent dialogue without words.",
  },
  {
    id: "line-5",
    title: "Oceanic Wave Crests",
    medium: "Indigo & Carbon Ink on Deckle Edge Paper",
    year: "2023",
    src: "/art/line/line-5.svg",
    alt: "Rhythmic rolling wave crests formed by precise parallel ink curves.",
    width: 1200,
    height: 750,
    aspectRatio: "landscape",
    note: "Over 3,000 individually measured strokes capturing kinetic wave motion.",
  },
  {
    id: "line-6",
    title: "Serenade of Curves & Shadows",
    medium: "Sumi Ink on Handmade Khadi Paper",
    year: "2023",
    src: "/art/line/line-6.svg",
    alt: "Abstract rhythmic curves intertwining across a warm textured background.",
    width: 800,
    height: 1100,
    aspectRatio: "portrait",
    note: "Exploration of negative space and balance on rough deckle-edge paper.",
  },
  {
    id: "line-7",
    title: "Constellation of Thoughts",
    medium: "Gold Leaf & Micro-Pigment Ink",
    year: "2024",
    src: "/art/line/line-7.svg",
    alt: "Astronomical-inspired map of geometric points connected by thin gold threads.",
    width: 1000,
    height: 1000,
    aspectRatio: "square",
    note: "Mapping navigational constellations through an abstract personal lens.",
  },
  {
    id: "line-8",
    title: "Sparrow on a Golden Bough",
    medium: "Traditional Chinese Ink & Gold Flake",
    year: "2024",
    src: "/art/line/line-8.svg",
    alt: "Minimalist line drawing of a small sparrow perched on a single graceful branch.",
    width: 900,
    height: 1200,
    aspectRatio: "portrait",
    note: "Capturing the lightness of feathers with swift, confident dry-brush strokes.",
  },
];

// -----------------------------------------------------------------------
// 3. UGLY ART (/ugly)
// Playful, tilted cards, washi tape aesthetics, humorous 'what went wrong' notes
// -----------------------------------------------------------------------
export const uglyArt: Artwork[] = [
  {
    id: "ugly-1",
    title: "The Uncomfortable Potato Cat",
    medium: "Colored Pencil on Ruled Homework Paper",
    year: "2018",
    src: "/art/ugly/ugly-1.jpeg",
    alt: "A sketchbook experiment with unusual character anatomy and bold outlines.",
    width: 1096,
    height: 1600,
    aspectRatio: "portrait",
    note: "I tried drawing a majestic Scottish Fold. It turned into a carbohydrate with existential dread.",
  },
  {
    id: "ugly-2",
    title: "Seven-Fingered Hand of Regret",
    medium: "Ballpoint Pen on Paper",
    year: "2019",
    src: "/art/ugly/ugly-2.jpeg",
    alt: "A study of perspective and proportions gone beautifully wrong.",
    width: 1927,
    height: 2658,
    aspectRatio: "portrait",
    note: "I lost count halfway through adding knuckles. Midjourney before Midjourney was even a thing.",
  },
  {
    id: "ugly-3",
    title: "Perspective? Never Heard of Her",
    medium: "Sketch on Cardboard",
    year: "2017",
    src: "/art/ugly/ugly-3.jpeg",
    alt: "An experiment where lighting and geometry take an unexpected turn.",
    width: 1184,
    height: 1600,
    aspectRatio: "portrait",
    note: "Two-point perspective vanished and took all Euclidean geometry down with it.",
  },
  {
    id: "ugly-4",
    title: "Anatomy Was Merely a Suggestion",
    medium: "Ink & Pencil on Bristol Paper",
    year: "2019",
    src: "/art/ugly/ugly-4.jpeg",
    alt: "A dynamic and chaotic figurative study.",
    width: 2606,
    height: 3441,
    aspectRatio: "portrait",
    note: "The model was sitting down, but somehow my drawing looks like a freshly spawned Slender Man.",
  },
];

// Backwards compatibility alias
export const worstArt = uglyArt;
