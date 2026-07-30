import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = "/tmp/claude-0/-home-user-Nora-Website/9376b5bf-da93-5b7a-80d4-7c7c2645a9f1/scratchpad";

// Brand colours (from the site palette)
const PLUM = "#3a2530";
const DEEP_ROSE = "#c8386a"; // peach-deep
const PINK = "#ec5f92"; // primary

// Canvas 480 x 1080, can centred at x=240
function can({ id, top, mid, bot, word, flavorColor, flavor1, flavor2, accentBg }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="2160" viewBox="0 0 480 1080">
  <defs>
    <linearGradient id="body-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${bot}"/>
      <stop offset="15%" stop-color="${mid}"/>
      <stop offset="47%" stop-color="${top}"/>
      <stop offset="63%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${bot}"/>
    </linearGradient>
    <linearGradient id="sheen-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="12%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="88%" stop-color="#000000" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.16"/>
    </linearGradient>
    <linearGradient id="lid-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#9a9a9a"/><stop offset="22%" stop-color="#ededed"/>
      <stop offset="50%" stop-color="#fafafa"/><stop offset="80%" stop-color="#cfcfcf"/>
      <stop offset="100%" stop-color="#8f8f8f"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="38%" cy="26%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft-${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="15"/></filter>
  </defs>

  <ellipse cx="240" cy="1000" rx="120" ry="22" fill="#7a3a52" opacity="0.20" filter="url(#soft-${id})"/>

  <!-- lid -->
  <ellipse cx="240" cy="112" rx="96" ry="17" fill="url(#lid-${id})"/>
  <ellipse cx="240" cy="109" rx="82" ry="12" fill="#f1f1f1"/>
  <ellipse cx="240" cy="108" rx="82" ry="10" fill="none" stroke="#b9b9b9" stroke-width="1.2"/>

  <!-- body -->
  <path d="M132 126 Q240 108 348 126 L348 936 Q240 966 132 936 Z" fill="url(#body-${id})"/>
  <path d="M132 126 Q240 108 348 126 L348 936 Q240 966 132 936 Z" fill="url(#glow-${id})"/>
  <path d="M132 126 Q240 108 348 126 L348 936 Q240 966 132 936 Z" fill="url(#sheen-${id})"/>

  <!-- top caps -->
  <text x="240" y="228" font-family="DejaVu Sans, Arial, sans-serif" font-size="12"
    letter-spacing="3" fill="${word}" fill-opacity="0.62" text-anchor="middle">SKIN HYDRATION DRINK</text>

  <!-- wordmark -->
  <text x="240" y="452" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="92"
    letter-spacing="1" fill="${word}" text-anchor="middle">NORA</text>

  <!-- divider -->
  <rect x="188" y="512" width="104" height="3" rx="1.5" fill="${flavorColor}"/>

  <!-- flavour -->
  <text x="240" y="590" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="30"
    letter-spacing="1" fill="${flavorColor}" text-anchor="middle">${flavor1}</text>
  <text x="240" y="628" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="30"
    letter-spacing="1" fill="${flavorColor}" text-anchor="middle">${flavor2}</text>

  <!-- stats pill -->
  <rect x="120" y="690" width="240" height="40" rx="20" fill="${accentBg}"/>
  <text x="240" y="716" font-family="DejaVu Sans, Arial, sans-serif" font-size="15"
    letter-spacing="1" fill="#ffffff" text-anchor="middle" font-weight="bold">20 CAL · 5G COLLAGEN</text>

  <text x="240" y="778" font-family="DejaVu Sans, Arial, sans-serif" font-size="13"
    letter-spacing="1" fill="${word}" fill-opacity="0.6" text-anchor="middle">355 mL / 12 FL OZ</text>
</svg>`;
}

const strawberry = {
  id: "sb", top: "#F8CCD8", mid: "#F2AEC0", bot: "#E796AD",
  word: PLUM, flavorColor: DEEP_ROSE, flavor1: "STRAWBERRY", flavor2: "PEARL", accentBg: PINK,
};
const lemon = {
  id: "lm", top: "#F9EFC9", mid: "#F1E0A0", bot: "#E7D488",
  word: PLUM, flavorColor: DEEP_ROSE, flavor1: "LEMON", flavor2: "ELDERFLOWER", accentBg: PINK,
};

await sharp(Buffer.from(can(strawberry))).png().toFile(`${OUT}/can-strawberry.png`);
console.log("wrote can-strawberry.png");
await sharp(Buffer.from(can(lemon))).png().toFile(`${OUT}/can-lemon.png`);
console.log("wrote can-lemon.png");
