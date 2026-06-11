import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於 ｜ 作品集",
  description: "建築模型、3D 建模、動畫與渲染工作者的簡介與專長。",
};

const skills = [
  { group: "建築與模型", items: ["建築模型製作", "量體研究", "細部構造", "空間規劃"] },
  { group: "3D 與視覺", items: ["3D 建模", "材質與燈光", "寫實渲染", "3D 動畫（發展中）"] },
  { group: "常用軟體", items: ["Rhino / Grasshopper", "SketchUp", "Blender", "3ds Max / Corona"] },
];

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-accent">About</p>
      <h1 className="mt-4 text-3xl font-medium sm:text-4xl">關於我</h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
        <p>
          我專注於建築模型與 3D 建模，協助設計團隊與業主把抽象的空間構想，
          轉化為可被理解、可被討論的具體成果。從實體模型到數位渲染，
          重視每個專案背後的設計邏輯與製作品質。
        </p>
        <p>
          目前持續往 3D 動畫與寫實渲染發展，期望以更完整的視覺敘事，
          呈現空間在不同光線、時間與使用情境下的樣貌。
        </p>
      </div>

      <h2 className="mt-14 text-xl font-medium">專長</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group}>
            <h3 className="text-sm font-medium text-foreground">{s.group}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-lg border border-line bg-card p-6">
        <h2 className="text-lg font-medium">合作邀約</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          若有建築模型、3D 建模、動畫或渲染需求，歡迎透過頁尾的聯絡方式與我聯繫，
          可提供完整作品檔案與報價。
        </p>
      </div>
    </div>
  );
}
