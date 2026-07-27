import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");
const publicDir = path.resolve(__dirname, "../public");
mkdirSync(assetsDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

/* ------------------------------------------------------------------ */
/*  A refined, studio-style NORA can rendered as SVG.                  */
/*  Transparent background, soft contact shadow, cylinder shading.     */
/* ------------------------------------------------------------------ */
// Canvas is 460 x 1040; can centered at x=230.
function canGroup({ id, body, bodyDark, bodyLight, textLight, flavor1, flavor2 }) {
  return `
  <defs>
    <linearGradient id="body-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="${bodyDark}"/>
      <stop offset="16%" stop-color="${body}"/>
      <stop offset="46%" stop-color="${bodyLight}"/>
      <stop offset="62%" stop-color="${body}"/>
      <stop offset="100%" stop-color="${bodyDark}"/>
    </linearGradient>
    <linearGradient id="sheen-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="10%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="90%" stop-color="#000000" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.14"/>
    </linearGradient>
    <linearGradient id="lid-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#9a9a9a"/>
      <stop offset="22%" stop-color="#ececec"/>
      <stop offset="50%" stop-color="#f8f8f8"/>
      <stop offset="80%" stop-color="#cccccc"/>
      <stop offset="100%" stop-color="#8c8c8c"/>
    </linearGradient>
    <filter id="soft-${id}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="16"/>
    </filter>
  </defs>

  <!-- contact shadow -->
  <ellipse cx="230" cy="946" rx="118" ry="22" fill="#7a5a48" opacity="0.20" filter="url(#soft-${id})"/>

  <!-- lid -->
  <ellipse cx="230" cy="104" rx="94" ry="17" fill="url(#lid-${id})"/>
  <ellipse cx="230" cy="101" rx="80" ry="12" fill="#f1f1f1"/>
  <ellipse cx="230" cy="100" rx="80" ry="10" fill="none" stroke="#b9b9b9" stroke-width="1.2"/>

  <!-- body -->
  <path d="M126 118
           Q230 100 334 118
           L334 900
           Q230 928 126 900 Z"
        fill="url(#body-${id})"/>
  <path d="M126 118
           Q230 100 334 118
           L334 900
           Q230 928 126 900 Z"
        fill="url(#sheen-${id})"/>
  <!-- specular highlight -->
  <rect x="162" y="132" width="9" height="760" rx="4.5" fill="#ffffff" opacity="0.18"/>

  <!-- top label -->
  <text x="230" y="214" font-family="Inter, sans-serif" font-size="11.5"
    letter-spacing="2.4" fill="${textLight}" fill-opacity="0.9" text-anchor="middle">SKIN HYDRATION DRINK</text>

  <!-- wordmark -->
  <text x="230" y="452" font-family="Georgia, 'Cormorant Garamond', serif" font-size="62"
    letter-spacing="5" fill="${textLight}" text-anchor="middle">NORA</text>

  <!-- flavor -->
  <text x="230" y="580" font-family="Inter, sans-serif" font-size="20"
    letter-spacing="3" fill="${textLight}" fill-opacity="0.96" text-anchor="middle">${flavor1}</text>
  <text x="230" y="612" font-family="Inter, sans-serif" font-size="20"
    letter-spacing="3" fill="${textLight}" fill-opacity="0.96" text-anchor="middle">${flavor2}</text>

  <!-- divider -->
  <rect x="185" y="652" width="90" height="1.3" fill="${textLight}" opacity="0.55"/>

  <!-- stats -->
  <text x="230" y="700" font-family="Inter, sans-serif" font-size="12.5"
    letter-spacing="1.4" fill="${textLight}" fill-opacity="0.86" text-anchor="middle">20 CAL  ·  5G COLLAGEN</text>
  <text x="230" y="742" font-family="Inter, sans-serif" font-size="11.5"
    letter-spacing="1" fill="${textLight}" fill-opacity="0.8" text-anchor="middle">355 mL / 12 fl oz</text>`;
}

const strawberry = {
  id: "sb",
  body: "#E9AEBC",
  bodyDark: "#D890A2",
  bodyLight: "#F3C9D3",
  textLight: "#ffffff",
  flavor1: "STRAWBERRY",
  flavor2: "PEARL",
};
const lemon = {
  id: "lm",
  body: "#EFDCA0",
  bodyDark: "#E3CB84",
  bodyLight: "#F7EBC2",
  textLight: "#ffffff",
  flavor1: "LEMON",
  flavor2: "ELDERFLOWER",
};

async function renderCan(cfg, out) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="920" height="2080" viewBox="0 0 460 1040">${canGroup(
    cfg,
  )}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("wrote", path.basename(out));
}

/* Both cans on a transparent stage (used on About / Variety) */
async function renderBlend(out) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="1040" viewBox="0 0 1300 1040">
    <g transform="translate(150,30) scale(0.92)">${canGroup(strawberry)}</g>
    <g transform="translate(560,80) scale(0.82)">${canGroup(lemon)}</g>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("wrote", path.basename(out));
}

/* Editorial lifestyle backdrop: rich gradient + soft bokeh, no text. */
async function renderBackdrop(out, { c1, c2, c3, bokeh }) {
  const dots = Array.from({ length: 7 }, (_, i) => {
    const x = 120 + ((i * 173) % 960);
    const y = 120 + ((i * 289) % 1160);
    const r = 26 + ((i * 37) % 60);
    const op = 0.12 + ((i % 3) * 0.06);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${bokeh}" opacity="${op}"/>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="52%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
      <radialGradient id="gl" cx="50%" cy="38%" r="60%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <filter id="b"><feGaussianBlur stdDeviation="22"/></filter>
    </defs>
    <rect width="1200" height="1500" fill="url(#bg)"/>
    <g filter="url(#b)">${dots}</g>
    <rect width="1200" height="1500" fill="url(#gl)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(out);
  console.log("wrote", path.basename(out));
}

/* Wide hero backdrop (soft, no cans/text — cans overlaid in React). */
async function renderHeroBg(out) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1200" viewBox="0 0 2000 1200">
    <defs>
      <linearGradient id="h" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FCF3EA"/>
        <stop offset="45%" stop-color="#F8E3D2"/>
        <stop offset="100%" stop-color="#F3D4CC"/>
      </linearGradient>
      <radialGradient id="hg1" cx="26%" cy="34%" r="42%">
        <stop offset="0%" stop-color="#FFD9C2" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#FFD9C2" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="hg2" cx="78%" cy="60%" r="46%">
        <stop offset="0%" stop-color="#F6C9CF" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#F6C9CF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="2000" height="1200" fill="url(#h)"/>
    <rect width="2000" height="1200" fill="url(#hg1)"/>
    <rect width="2000" height="1200" fill="url(#hg2)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(out);
  console.log("wrote", path.basename(out));
}

async function renderOg(out) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FCF3EA"/><stop offset="100%" stop-color="#F3D4CC"/>
    </linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <g transform="translate(760,-170) scale(0.60)">${canGroup(strawberry)}</g>
    <text x="120" y="300" font-family="Georgia, serif" font-size="120" letter-spacing="12" fill="#3a2b22">NORA</text>
    <text x="124" y="372" font-family="Inter, sans-serif" font-size="30" letter-spacing="6" fill="#8a6f5f">DRINK TO GLOW</text>
    <text x="124" y="430" font-family="Inter, sans-serif" font-size="21" letter-spacing="1" fill="#a3897a">Collagen · Vitamin C · Electrolytes</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(out);
  console.log("wrote", path.basename(out));
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#FFC2A1"/>
  <text x="32" y="45" font-family="Georgia, serif" font-size="40" fill="#3a2b22" text-anchor="middle">N</text>
</svg>`;

await renderCan(strawberry, path.join(assetsDir, "strawberry-pearl.png"));
await renderCan(lemon, path.join(assetsDir, "lemon-elderflower.png"));
await renderBlend(path.join(assetsDir, "nora-cans-blend.png"));
await renderHeroBg(path.join(assetsDir, "hero-duo.png"));
await renderBackdrop(path.join(assetsDir, "lifestyle-strawberry.jpg"), {
  c1: "#F6D3DA",
  c2: "#EBAEBC",
  c3: "#DE93A3",
  bokeh: "#ffffff",
});
await renderBackdrop(path.join(assetsDir, "lifestyle-lemon.jpg"), {
  c1: "#F8EEC6",
  c2: "#EFDDA0",
  c3: "#E6CE84",
  bokeh: "#ffffff",
});
await renderOg(path.join(publicDir, "og-image.jpg"));
writeFileSync(path.join(publicDir, "favicon.svg"), favicon);
console.log("wrote favicon.svg");
console.log("assets complete");
