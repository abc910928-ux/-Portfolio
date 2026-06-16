// 把 public/projects 的 JPEG 轉成 WebP（加快網頁載入），轉完刪除原 JPEG。
// 用法：node scripts/to-webp.mjs
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join, dirname, resolve, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = resolve(__dirname, "../public/projects");
const MAX = 1400;
const QUALITY = 80;

const files = readdirSync(dir).filter((f) => /\.(jpe?g)$/i.test(f));
let before = 0,
  after = 0;

for (const f of files) {
  const src = join(dir, f);
  const out = join(dir, basename(f, extname(f)) + ".webp");
  before += statSync(src).size;
  await sharp(src)
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  after += statSync(out).size;
  unlinkSync(src); // 刪掉原 JPEG
}

console.log(
  `轉換 ${files.length} 張：${(before / 1024 / 1024).toFixed(1)}MB → ${(
    after /
    1024 /
    1024
  ).toFixed(1)}MB（省 ${Math.round((1 - after / before) * 100)}%）`,
);
