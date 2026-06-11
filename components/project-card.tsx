import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-line bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.model && (
          <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white">
            可旋轉 3D
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-background px-2 py-0.5">
            {project.category}
          </span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-3 text-lg font-medium">{project.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {project.subtitle}
        </p>
      </div>
    </Link>
  );
}
