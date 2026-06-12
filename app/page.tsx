import { projects } from "@/data/projects";
import { WorkGallery } from "@/components/work-gallery";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Portfolio
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-light leading-tight sm:text-5xl">
            建築模型、3D 建模
            <br />
            到動畫與渲染的
            <span className="font-medium">空間敘事</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            從實體模型到數位視覺，完整呈現每個專案的設計思考與製作過程。
            以下為精選案例，歡迎進一步了解合作方式。
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
