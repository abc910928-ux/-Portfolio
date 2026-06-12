"use client";

import { useMemo, useState } from "react";
import type { Project, Group } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

type Level1 = "全部" | Group;
const LEVEL1: Level1[] = ["全部", "建模", "模型"];

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [group, setGroup] = useState<Level1>("全部");
  const [topic, setTopic] = useState<string>("全部");

  // 第二層選項：依目前選的 group，從作品資料自動產生細分主題
  const topics = useMemo(() => {
    if (group === "全部") return [];
    const list = Array.from(
      new Set(projects.filter((p) => p.group === group).map((p) => p.topic)),
    );
    return ["全部", ...list];
  }, [group, projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (group !== "全部" && p.group !== group) return false;
      if (group !== "全部" && topic !== "全部" && p.topic !== topic) return false;
      return true;
    });
  }, [group, topic, projects]);

  function selectGroup(g: Level1) {
    setGroup(g);
    setTopic("全部"); // 切換第一層時，第二層重設為全部
  }

  return (
    <div>
      {/* 第一層 */}
      <div className="flex flex-wrap gap-2">
        {LEVEL1.map((g) => {
          const active = group === g;
          return (
            <button
              key={g}
              onClick={() => selectGroup(g)}
              className={
                "rounded-full px-5 py-2 text-sm transition-colors " +
                (active
                  ? "bg-foreground text-background"
                  : "border border-line bg-card text-muted hover:text-foreground")
              }
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* 第二層（選了建模 / 模型才出現） */}
      {topics.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
          <span className="mr-1 text-xs text-muted">細分主題</span>
          {topics.map((t) => {
            const active = topic === t;
            return (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors " +
                  (active
                    ? "bg-accent text-white"
                    : "border border-line text-muted hover:text-foreground")
                }
              >
                {t}
              </button>
            );
          })}
        </div>
      )}

      {/* 件數 */}
      <div className="mt-6 text-sm text-muted">共 {filtered.length} 件</div>

      {/* 作品格 */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted">
          此分類目前沒有作品。
        </p>
      )}
    </div>
  );
}
