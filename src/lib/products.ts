import strawberryImg from "@/assets/strawberry-pearl.png";
import lemonImg from "@/assets/lemon-elderflower.png";
import blendImg from "@/assets/nora-cans-blend.png";

export type PackSize = 6 | 12;

export interface EditorialReview {
  name: string;
  rating: number;
  text: string;
}

export interface ProductEditorial {
  handle: string;
  flavor: string;
  shopifyHandles: Record<PackSize, string>;
  fallbackImage: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  taste: string;
  ingredients: string[];
  highlights: string[];
  benefits: string[];
  badge?: string;
  reviews: EditorialReview[];
}

export const productEditorial: Record<string, ProductEditorial> = {
  "strawberry-pearl": {
    handle: "strawberry-pearl",
    flavor: "Strawberry Pearl",
    shopifyHandles: { 6: "strawberry-pearl", 12: "strawberry-pearl-12-pack" },
    fallbackImage: strawberryImg,
    tagline: "Soft, ripe strawberry with a whisper of cream.",
    shortDescription:
      "A delicate sparkling strawberry with a pearl-soft finish, formulated with collagen, vitamin C, and electrolytes.",
    longDescription:
      "Strawberry Pearl is a gentle, sun-ripe strawberry lifted by fine bubbles and a clean, creamy finish. Every can carries 5g of collagen, a full pour of vitamin C, and balancing electrolytes, so hydration feels like a ritual rather than a routine. Light on sugar, never syrupy, it is the drink you reach for when you want to glow from the inside out.",
    taste:
      "Ripe strawberry up front, softly sparkling, with a smooth pearl-like finish. Barely sweet, never cloying.",
    ingredients: [
      "Sparkling water",
      "Marine collagen peptides (5g)",
      "Vitamin C",
      "Electrolyte blend (potassium, magnesium)",
      "Hyaluronic acid",
      "Natural strawberry flavor",
      "A touch of fruit sugar",
    ],
    highlights: [
      "5g collagen per can",
      "Vitamin C for radiance",
      "Electrolytes for hydration",
      "20 calories, low sugar",
    ],
    benefits: [
      "Supports skin hydration and bounce",
      "Everyday hydration that feels intentional",
      "A lighter alternative to sugary sodas",
    ],
    reviews: [],
  },

  "lemon-elderflower": {
    handle: "lemon-elderflower",
    flavor: "Lemon Elderflower",
    shopifyHandles: { 6: "lemon-elderflower", 12: "lemon-elderflower-12-pack" },
    fallbackImage: lemonImg,
    tagline: "Bright Amalfi lemon meets delicate elderflower.",
    shortDescription:
      "A crisp, floral sparkling lemon with elderflower, formulated with collagen, vitamin C, and electrolytes.",
    longDescription:
      "Lemon Elderflower is bright and garden-fresh, sharp citrus softened by the honeyed lift of elderflower blossom. It is effervescent and clean, with 5g of collagen, vitamin C, and electrolytes woven in. This is the can for slow mornings and long afternoons, a beauty ritual that tastes like sunlight.",
    taste:
      "Crisp lemon zest, delicate elderflower florals, and a dry, refreshing sparkle. Clean and grown-up.",
    ingredients: [
      "Sparkling water",
      "Marine collagen peptides (5g)",
      "Vitamin C",
      "Electrolyte blend (potassium, magnesium)",
      "Hyaluronic acid",
      "Natural lemon flavor",
      "Natural elderflower flavor",
    ],
    highlights: [
      "5g collagen per can",
      "Vitamin C for radiance",
      "Electrolytes for hydration",
      "20 calories, low sugar",
    ],
    benefits: [
      "Supports skin hydration and bounce",
      "Refreshing citrus with a floral finish",
      "A lighter alternative to sugary sodas",
    ],
    reviews: [],
  },

  "variety-pack": {
    handle: "variety-pack",
    flavor: "Variety Pack",
    shopifyHandles: { 6: "variety-pack-6-pack", 12: "variety-pack" },
    fallbackImage: blendImg,
    tagline: "Both flavors, one beautiful box.",
    shortDescription:
      "A mixed selection of Strawberry Pearl and Lemon Elderflower, so you never have to choose.",
    longDescription:
      "The Variety Pack brings both NORA flavors together, an even split of Strawberry Pearl and Lemon Elderflower. It is the easiest way to find your ritual, or to keep two moods on hand at once. Same clean formula in every can, 5g collagen, vitamin C, and electrolytes, just twice the ways to glow.",
    taste:
      "The best of both: soft, creamy strawberry and bright, floral lemon elderflower.",
    ingredients: [
      "Sparkling water",
      "Marine collagen peptides (5g)",
      "Vitamin C",
      "Electrolyte blend (potassium, magnesium)",
      "Hyaluronic acid",
      "Natural fruit and botanical flavors",
    ],
    highlights: [
      "Both signature flavors",
      "5g collagen per can",
      "Vitamin C and electrolytes",
      "20 calories, low sugar",
    ],
    benefits: [
      "Try both flavors in one order",
      "Supports skin hydration and bounce",
      "The most popular way to start",
    ],
    badge: "Most Popular",
    reviews: [],
  },
};

export const productOrder = [
  "strawberry-pearl",
  "lemon-elderflower",
  "variety-pack",
];
