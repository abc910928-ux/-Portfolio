import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

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

      {/* 作品列表 */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-medium">作品案例</h2>
          <span className="text-sm text-muted">共 {projects.length} 件</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
