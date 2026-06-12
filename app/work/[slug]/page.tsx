import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProject } from "@/data/projects";
import { ModelViewer } from "@/components/model-viewer";
import { LightboxProvider, LightboxImage } from "@/components/lightbox";

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
              {project.group}
            </span>
            <span className="rounded-full bg-card px-2.5 py-1">
              {project.topic}
            </span>
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

      {/* 概述：有填 specs 就顯示小分類清單，否則顯示文字概述 + 規格 */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        {project.specs && project.specs.length > 0 ? (
          <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {project.specs.map((s) => (
              <div
                key={s.label}
                className="border-t border-line pt-3"
              >
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

      {/* 圖文段落 + 圖片（點圖可放大、左右切換） */}
      {project.gallery.length > 0 && (
        <LightboxProvider images={project.gallery} alt={project.title}>
          <section className="mx-auto max-w-4xl space-y-16 px-6 pb-16">
            {project.sections.map((sec, i) => (
              <div key={i} className="grid gap-6">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-medium">{sec.heading}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{sec.body}</p>
                </div>
                {project.gallery[i] && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line">
                    <LightboxImage
                      index={i}
                      src={project.gallery[i]}
                      alt={`${project.title} - ${sec.heading}`}
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* 其餘未配對到段落的圖片 */}
            {project.gallery.length > project.sections.length && (
              <div className="grid gap-6 sm:grid-cols-2">
                {project.gallery
                  .slice(project.sections.length)
                  .map((img, i) => {
                    const galleryIndex = project.sections.length + i;
                    return (
                      <div
                        key={galleryIndex}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line"
                      >
                        <LightboxImage
                          index={galleryIndex}
                          src={img}
                          alt={`${project.title} 圖 ${galleryIndex + 1}`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </section>
        </LightboxProvider>
      )}

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
