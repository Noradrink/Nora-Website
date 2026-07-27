import sharp from "sharp";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");
const publicDir = path.resolve(__dirname, "../public");
mkdirSync(assetsDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

// A stylized NORA can as an SVG. Transparent-friendly.
function canSvg({ body, bodyDark, flavorLine1, flavorLine2 }) {
  return `
  <g>
    <defs>
      <linearGradient id="canBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${body}"/>
        <stop offset="100%" stop-color="${bodyDark}"/>
      </linearGradient>
      <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
        <stop offset="18%" stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="82%" stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    <!-- can lid -->
    <rect x="150" y="70" width="200" height="26" rx="12" fill="#cfcfcf"/>
    <rect x="158" y="60" width="184" height="24" rx="12" fill="#e6e6e6"/>
    <!-- body -->
    <rect x="140" y="86" width="220" height="620" rx="46" fill="url(#canBody)"/>
    <rect x="140" y="86" width="220" height="620" rx="46" fill="url(#sheen)"/>
    <!-- top small caps -->
    <text x="250" y="210" font-family="Inter, sans-serif" font-size="15"
      letter-spacing="3" fill="#ffffff" fill-opacity="0.85" text-anchor="middle">SKIN HYDRATION DRINK</text>
    <!-- wordmark -->
    <text x="250" y="380" font-family="Georgia, 'Cormorant Garamond', serif" font-size="88"
      letter-spacing="10" fill="#ffffff" text-anchor="middle">NORA</text>
    <!-- flavor -->
    <text x="250" y="500" font-family="Inter, sans-serif" font-size="30"
      letter-spacing="4" fill="#ffffff" fill-opacity="0.95" text-anchor="middle">${flavorLine1}</text>
    <text x="250" y="536" font-family="Inter, sans-serif" font-size="30"
      letter-spacing="4" fill="#ffffff" fill-opacity="0.95" text-anchor="middle">${flavorLine2}</text>
    <!-- stats -->
    <text x="250" y="596" font-family="Inter, sans-serif" font-size="16"
      letter-spacing="2" fill="#ffffff" fill-opacity="0.8" text-anchor="middle">20 CALORIES  |  5G COLLAGEN</text>
    <text x="250" y="632" font-family="Inter, sans-serif" font-size="14"
      letter-spacing="1" fill="#ffffff" fill-opacity="0.75" text-anchor="middle">355 mL / 12 fl oz</text>
  </g>`;
}

const strawberry = {
  body: "#EBB9C4",
  bodyDark: "#E3A6B4",
  flavorLine1: "STRAWBERRY",
  flavorLine2: "PEARL",
};
const lemon = {
  body: "#F1E3B8",
  bodyDark: "#EAD79E",
  flavorLine1: "LEMON",
  flavorLine2: "ELDERFLOWER",
};

async function renderCan(config, out, width = 500, height = 760) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 500 760">${canSvg(
    config,
  )}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("wrote", out);
}

async function renderDuo(out, { wide = false } = {}) {
  const w = wide ? 1400 : 900;
  const h = wide ? 760 : 760;
  const bg = wide
    ? `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="#FBEFE6"/>
         <stop offset="50%" stop-color="#F7E3D4"/>
         <stop offset="100%" stop-color="#F3D9CE"/>
       </linearGradient></defs><rect width="${w}" height="${h}" fill="url(#bg)"/>`
    : "";
  const leftX = wide ? 420 : 30;
  const rightX = wide ? 700 : 400;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${bg}
    <g transform="translate(${leftX},0) scale(0.94)">${canSvg(strawberry)}</g>
    <g transform="translate(${rightX},0) scale(0.94)">${canSvg(lemon)}</g>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("wrote", out);
}

async function renderLifestyle(out, { from, via, to, label }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="55%" stop-color="${via}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="1500" fill="url(#g)"/>
    <rect width="1200" height="1500" fill="url(#glow)"/>
    <text x="600" y="770" font-family="Georgia, serif" font-size="120"
      letter-spacing="14" fill="#ffffff" fill-opacity="0.9" text-anchor="middle">NORA</text>
    <text x="600" y="850" font-family="Inter, sans-serif" font-size="30"
      letter-spacing="8" fill="#ffffff" fill-opacity="0.85" text-anchor="middle">${label}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(out);
  console.log("wrote", out);
}

async function renderOg(out) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FBEFE6"/>
      <stop offset="100%" stop-color="#F3D9CE"/>
    </linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="600" y="300" font-family="Georgia, serif" font-size="130"
      letter-spacing="16" fill="#3a2b22" text-anchor="middle">NORA</text>
    <text x="600" y="380" font-family="Inter, sans-serif" font-size="34"
      letter-spacing="8" fill="#8a6f5f" text-anchor="middle">DRINK TO GLOW</text>
    <text x="600" y="440" font-family="Inter, sans-serif" font-size="22"
      letter-spacing="2" fill="#a3897a" text-anchor="middle">Collagen · Vitamin C · Electrolytes</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(out);
  console.log("wrote", out);
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#FFC2A1"/>
  <text x="32" y="44" font-family="Georgia, serif" font-size="38" fill="#3a2b22" text-anchor="middle">N</text>
</svg>`;

await renderCan(strawberry, path.join(assetsDir, "strawberry-pearl.png"));
await renderCan(lemon, path.join(assetsDir, "lemon-elderflower.png"));
await renderDuo(path.join(assetsDir, "nora-cans-blend.png"));
await renderDuo(path.join(assetsDir, "hero-duo.png"), { wide: true });
await renderLifestyle(path.join(assetsDir, "lifestyle-strawberry.jpg"), {
  from: "#F4CAD2",
  via: "#EAB4BE",
  to: "#D98B98",
  label: "STRAWBERRY PEARL",
});
await renderLifestyle(path.join(assetsDir, "lifestyle-lemon.jpg"), {
  from: "#F6EAC1",
  via: "#EFDDA2",
  to: "#E4CE86",
  label: "LEMON ELDERFLOWER",
});
await renderOg(path.join(publicDir, "og-image.jpg"));

import { writeFileSync } from "fs";
writeFileSync(path.join(publicDir, "favicon.svg"), favicon);
console.log("wrote favicon.svg");
