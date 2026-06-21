import Image from "next/image";
import { asset } from "@/data/projects";

export function SiteFooter() {
  const year = "2026";
  return (
    <footer id="contact" className="border-t border-line bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-medium">合作與聯絡</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            歡迎來信或加 LINE 討論建築模型、3D 建模、動畫與渲染相關專案，可提供完整作品檔案與報價。
          </p>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-muted">Email</dt>
              <dd>
                <a
                  href="mailto:abc24679220@gmail.com"
                  className="text-foreground transition-colors hover:text-accent"
                >
                  abc24679220@gmail.com
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-muted">電話</dt>
              <dd>
                <a
                  href="tel:0910109489"
                  className="text-foreground transition-colors hover:text-accent"
                >
                  0910-109-489
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 text-muted">LINE</dt>
              <dd className="text-foreground">Joe910928</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="text-sm text-muted">加 LINE 好友</span>
          <div className="overflow-hidden rounded-lg border border-line bg-white p-2">
            <Image
              src={asset("/line-qr.png")}
              alt="LINE 加好友 QR Code（ID：Joe910928）"
              width={160}
              height={160}
              loading="eager"
              className="h-40 w-40"
            />
          </div>
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
