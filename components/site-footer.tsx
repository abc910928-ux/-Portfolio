export function SiteFooter() {
  const year = "2025";
  return (
    <footer
      id="contact"
      className="border-t border-line bg-card/40"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-medium">合作與聯絡</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            歡迎來信討論建築模型、3D 建模、動畫與渲染相關專案，可提供完整作品檔案與報價。
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm sm:items-end">
          {/* 把下面改成你的真實聯絡資訊 */}
          <a
            href="mailto:your-email@example.com"
            className="text-foreground transition-colors hover:text-accent"
          >
            your-email@example.com
          </a>
          <span className="text-muted">＠你的社群或作品平台</span>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-xs text-muted">
          <span>© {year} 個人作品集</span>
          <span>以 Next.js 建置・部署於 GitHub Pages</span>
        </div>
      </div>
    </footer>
  );
}
