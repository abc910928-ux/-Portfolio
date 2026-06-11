import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProject } from "@/data/projects";
import { ModelViewer } from "@/components/model-viewer";

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
    description: project.summary,
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
            <span className="rounded-full bg-card px-2.5 py-1">
              {project.category}
            </span>
            <span>{project.year}</span>
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

      {/* 封面 */}
      <div className="mx-auto max-w-5xl px-6 pt-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* 概述 + 規格 */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <h2 className="text-sm font-medium uppercase tracking-wider text-accent">
              專案概述
            </h2>
            <p className="mt-3 text-base leading-relaxed">{project.summary}</p>
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted">角色</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
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
          </dl>
        </div>
      </section>

      {/* 互動 3D 模型 */}
      {project.model && (
        <section className="mx-auto max-w-4xl px-6 pb-4">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
            互動 3D 模型
          </h2>
          <ModelViewer src={project.model} alt={`${project.title} 的 3D 模型`} />
          <p className="mt-3 text-sm text-muted">
            可用滑鼠拖曳旋轉、滾輪縮放，於手機上可用手指操作。
          </p>
        </section>
      )}

      {/* 圖文段落 */}
      <section className="mx-auto max-w-4xl space-y-16 px-6 pb-16">
        {project.sections.map((sec, i) => (
          <div key={i} className="grid gap-6">
            <div className="max-w-2xl">
              <h3 className="text-xl font-medium">{sec.heading}</h3>
              <p className="mt-3 leading-relaxed text-muted">{sec.body}</p>
            </div>
            {project.gallery[i] && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line">
                <Image
                  src={project.gallery[i]}
                  alt={`${project.title} - ${sec.heading}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}

        {/* 其餘未配對到段落的圖片 */}
        {project.gallery.length > project.sections.length && (
          <div className="grid gap-6 sm:grid-cols-2">
            {project.gallery.slice(project.sections.length).map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line"
              >
                <Image
                  src={img}
                  alt={`${project.title} 圖 ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>

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
