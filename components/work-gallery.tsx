"use client";

import { useMemo, useState } from "react";
import type { Project, Group } from "@/data/projects";
import {
  groupOrder,
  topicsOf,
  projectTopics,
  projectGroups,
} from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

type Level1 = "全部" | Group;
const LEVEL1: Level1[] = ["全部", ...groupOrder];

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [group, setGroup] = useState<Level1>("全部");
  // 第二層可複選；空陣列代表「不限主題」＝顯示該分類全部
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // 第二層選項：模型用預定義清單、建模依資料自動產生（由 topicsOf 處理）
  const topics = useMemo(() => {
    if (group === "全部") return [];
    return topicsOf(group);
  }, [group]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (group !== "全部" && !projectGroups(p).includes(group)) return false;
      // 沒選主題 = 全部；有選 = 需同時符合「全部」所選主題（AND 邏輯）
      if (
        selectedTopics.length > 0 &&
        !selectedTopics.every((t) => projectTopics(p).includes(t))
      )
        return false;
      return true;
    });
  }, [group, selectedTopics, projects]);

  function selectGroup(g: Level1) {
    setGroup(g);
    setSelectedTopics([]); // 切換第一層時，清空第二層複選
  }

  function toggleTopic(t: string) {
    setSelectedTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
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

      {/* 第二層（選了建模 / 模型才出現，可複選） */}
      {topics.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
          <span className="mr-1 text-xs text-muted">
            細分主題（可複選，需全部符合）
          </span>
          {topics.map((t) => {
            const active = selectedTopics.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTopic(t)}
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

          {/* 清除重選 */}
          <button
            onClick={() => setSelectedTopics([])}
            disabled={selectedTopics.length === 0}
            className={
              "ml-1 rounded-full px-3.5 py-1.5 text-sm transition-colors " +
              (selectedTopics.length === 0
                ? "cursor-not-allowed text-muted/40"
                : "text-muted underline-offset-2 hover:text-foreground hover:underline")
            }
          >
            ✕ 清除重選
          </button>
        </div>
      )}

      {/* 件數 */}
      <div className="mt-6 text-sm text-muted">共 {filtered.length} 件</div>

      {/* 作品格 */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              viewGroup={group}
            />
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
