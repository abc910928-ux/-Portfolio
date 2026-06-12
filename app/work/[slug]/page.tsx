import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import {
  projects,
  getProject,
  projectTopics,
  projectGroups,
  type ProjectView,
} from "@/data/projects";
import { ModelViewer } from "@/components/model-viewer";
import { ObjViewer } from "@/components/obj-viewer";
import { ProjectMedia } from "@/components/project-media";

// 靜態匯出必須：先告訴 Next 有哪些網址要產生
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "找不到作品" };
  return {
    title: `${project.title} ｜ 作品集`,
    description: project.summary || project.subtitle,
  };
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // 專案資訊（小分類 / 概述）—— 由伺服器端組好，傳給 ProjectMedia
  const specs = (
    <section className="mx-auto max-w-4xl px-6 py-12">
      {project.specs && project.specs.length > 0 ? (
        <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {project.specs.map((s) => (
            <div key={s.label} className="border-t border-line pt-3">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-1 text-base">{s.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="grid gap-10 sm:grid-cols-3">
          {project.summary && (
            <div className="sm:col-span-2">
              <h2 className="text-sm font-medium uppercase tracking-wider text-accent">
                專案概述
              </h2>
              <p className="mt-3 text-base leading-relaxed">
                {project.summary}
              </p>
            </div>
          )}
          <dl className="space-y-4 text-sm">
            {project.role && (
              <div>
                <dt className="text-muted">角色</dt>
                <dd className="mt-1">{project.role}</dd>
              </div>
            )}
            {project.tools && project.tools.length > 0 && (
              <div>
                <dt className="text-muted">使用軟體</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line bg-card px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </section>
  );

  // 3D 模型區（FBX 優先，其次 GLB）—— 放在資訊後、照片前
  const media3d = project.model3d ? (
    <section className="mx-auto max-w-4xl px-6 pb-4">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
        互動 3D 模型（建模）
      </h2>
      <ObjViewer src={project.model3d} />
      <p className="mt-3 text-sm text-muted">
        可用滑鼠拖曳旋轉、滾輪縮放、右鍵平移，於手機上可用手指操作。
      </p>
    </section>
  ) : project.model ? (
    <section className="mx-auto max-w-4xl px-6 pb-4">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
        互動 3D 模型
      </h2>
      <ModelViewer src={project.model} alt={`${project.title} 的 3D 模型`} />
      <p className="mt-3 text-sm text-muted">
        可用滑鼠拖曳旋轉、滾輪縮放，於手機上可用手指操作。
      </p>
    </section>
  ) : null;

  return (
    <article>
      {/* 標題區 */}
      <header className="border-b border-line">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← 回作品列表
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
            {projectGroups(project).map((g) => (
              <span
                key={g}
                className="rounded-full bg-foreground/85 px-2.5 py-1 text-background"
              >
                {g}
              </span>
            ))}
            {projectTopics(project).map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-card px-2.5 py-1"
              >
                {t}
              </span>
            ))}
            {project.year && <span>{project.year}</span>}
            {project.client && <span>・{project.client}</span>}
          </div>
          <h1 className="mt-4 text-3xl font-medium sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            {project.subtitle}
          </p>
        </div>
      </header>

      <Suspense fallback={<div className="h-screen" />}>
        <ProjectMedia
          title={project.title}
          defaultCover={project.cover}
          defaultGallery={project.gallery}
          views={project.views as Record<string, ProjectView> | undefined}
          sections={project.sections}
          specs={specs}
          media3d={media3d}
        />
      </Suspense>

      {/* 下一個作品導引 */}
      <nav className="border-t border-line">
        <div className="mx-auto max-w-4xl px-6 py-10 text-center">
          <Link
            href="/"
            className="inline-block rounded-full border border-foreground px-6 py-2.5 text-sm transition-colors hover:bg-foreground hover:text-background"
          >
            瀏覽其他作品
          </Link>
        </div>
      </nav>
    </article>
  );
}
