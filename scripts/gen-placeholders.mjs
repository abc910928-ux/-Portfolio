// 產生作品集的佔位示意圖（SVG）。日後用真實圖片覆蓋 public/projects 下的同名檔即可。
// 執行：node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../public/projects");
mkdirSync(outDir, { recursive: true });

// 每組一個色票，營造不同的視覺氛圍
const palettes = {
  riverside: ["#2f4858", "#86a3b0", "#e8eef0"],
  housing: ["#3a2f2a", "#9a7b5f", "#ece4d8"],
  loft: ["#33302b", "#b5552f", "#efe9df"],
  facade: ["#2b3a34", "#7fa08f", "#e7eee9"],
  chair: ["#242424", "#8a8a8a", "#efefef"],
  site: ["#26303a", "#6f8a9c", "#e6ecf0"],
};

// 要產生的檔案：[檔名前綴, 張數]
const sets = [
  ["riverside", 4],
  ["housing", 3],
  ["loft", 3],
  ["facade", 2],
  ["chair", 2],
  ["site", 2],
];

function svg([dark, mid, light], label, seed) {
  // 用 seed 產生一些簡單的「建築線條」紋理
  let lines = "";
  for (let i = 0; i < 7; i++) {
    const x = 120 + ((seed * 53 + i * 97) % 720);
    const h = 120 + ((seed * 31 + i * 67) % 360);
    const w = 60 + ((seed * 17 + i * 23) % 90);
    lines += `<rect x="${x}" y="${600 - h}" width="${w}" height="${h}" fill="${dark}" opacity="0.18"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${light}"/>
      <stop offset="1" stop-color="${mid}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <g>${lines}</g>
  <rect x="0" y="640" width="1200" height="160" fill="${dark}" opacity="0.85"/>
  <text x="60" y="722" font-family="system-ui, sans-serif" font-size="40" fill="${light}" font-weight="600">${label}</text>
  <text x="60" y="768" font-family="system-ui, sans-serif" font-size="22" fill="${light}" opacity="0.7">示意圖 ・ 請替換為實際作品</text>
</svg>`;
}

let count = 0;
for (const [name, n] of sets) {
  const pal = palettes[name];
  for (let i = 0; i < n; i++) {
    const file = i === 0 ? `${name}-cover.svg` : `${name}-${i}.svg`;
    const label = i === 0 ? `${name}` : `${name} ${i}`;
    writeFileSync(resolve(outDir, file), svg(pal, label, i + 1));
    count++;
  }
}
console.log(`已產生 ${count} 張示意圖到 public/projects/`);
