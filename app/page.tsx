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
            <span className="font-medium">模型與建模</span>
            <br />
            把空間想像做成拿得到手上的東西
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            實體建築模型、參數化建模與 3D 展示。
            從數位模型到實體成品，記錄每個專案的製作過程。
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
