import { projects } from "@/data/projects";
import { WorkGallery } from "@/components/work-gallery";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Selected Works
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-light leading-tight sm:text-5xl">
            <span className="font-medium">模型・建模・數位製造</span>
            <br />
            從 1:100 到 1:1
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            以 Rhino 與 Grasshopper 建立參數化模型，製作展覽與競圖用的建築模型，
            <br className="hidden sm:inline" />
            並參與 1:1 裝置的構造設計、施工圖與現場施工。
          </p>
        </div>
      </section>

      {/* 作品列表（含兩層篩選） */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-2xl font-medium">作品案例</h2>
        <WorkGallery projects={projects} />
      </section>
    </>
  );
}
