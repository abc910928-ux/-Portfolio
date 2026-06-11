import type { NextConfig } from "next";

// GitHub Pages 部署在子路徑 https://abc910928-ux.github.io/-Portfolio/
// 本機開發時 basePath 留空，正式建置（GitHub Actions）時才套用，避免本機預覽連結錯誤。
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/-Portfolio" : "";

const nextConfig: NextConfig = {
  // 產生純靜態網站（out/），GitHub Pages 才能託管
  output: "export",
  basePath,
  // 讓 CSS/圖片等資源也指向正確子路徑
  assetPrefix: basePath || undefined,
  // 靜態匯出不支援 Next 內建影像最佳化，需關閉
  images: { unoptimized: true },
  // 產生 about/ 而非 about.html，網址更乾淨
  trailingSlash: true,
  // 讓元件能讀到 basePath（用於手動組裝圖片路徑）
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
