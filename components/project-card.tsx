import Image from "next/image";
import Link from "next/link";
import type { Project, Group } from "@/data/projects";
import { projectTopics, projectGroups, viewFor } from "@/data/projects";

export function ProjectCard({
  project,
  viewGroup,
}: {
  project: Project;
  viewGroup?: Group | "全部"; // 目前篩選的大分類，用來決定封面與連結
}) {
  // 依情境取得封面（建模情境換建模封面）
  const { cover } = viewFor(project, viewGroup);
  // 只有當作品對該分類有專屬視圖時，連結才帶上 ?view=，讓詳情頁同步切換
  const hasView =
    viewGroup && viewGroup !== "全部" && project.views?.[viewGroup];
  const href = hasView
    ? `/work/${project.slug}?view=${encodeURIComponent(viewGroup)}`
    : `/work/${project.slug}`;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-line bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {(project.model || project.model3d) && (
          <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
            可旋轉 3D
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted">
          {projectGroups(project).map((g) => (
            <span
              key={g}
              className="rounded-full bg-foreground/85 px-2 py-0.5 text-background"
            >
              {g}
            </span>
          ))}
          {projectTopics(project).map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-background px-2 py-0.5"
            >
              {t}
            </span>
          ))}
          {project.year && <span>{project.year}</span>}
        </div>
        <h3 className="mt-3 text-lg font-medium">{project.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {project.subtitle}
        </p>
      </div>
    </Link>
  );
}
