// ─────────────────────────────────────────────────────────────
// 作品資料：要新增 / 修改作品，編輯這個檔案即可，不需要動其他程式。
//
// 圖片放在 public/projects/ 資料夾，cover 與 gallery 用「/projects/檔名」即可，
// basePath 會由 next/image 自動處理，不用自己加 /-Portfolio。
// ─────────────────────────────────────────────────────────────

export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string; // 網址用，請用英文與連字號，例如 "riverside-pavilion"
  title: string; // 作品名稱
  subtitle: string; // 一句話簡述
  category: "建築模型" | "3D 建模" | "3D 動畫" | "渲染" | "其他";
  year: string;
  client?: string; // 業主 / 委託單位（可留空）
  role: string; // 你的角色
  tools: string[]; // 使用軟體
  cover: string; // 封面圖路徑
  gallery: string[]; // 內頁圖片
  model?: string; // 可互動的 3D 模型路徑（.glb / .gltf），放在 public/models/，可留空
  summary: string; // 列表頁與詳情頁開頭的概述
  sections: ProjectSection[]; // 圖文案例的段落
  featured?: boolean; // 是否在首頁精選
};

export const projects: Project[] = [
  {
    slug: "riverside-pavilion",
    title: "河岸藝文展演廳",
    subtitle: "以連續曲面屋頂呼應水岸地景的公共建築提案",
    category: "建築模型",
    year: "2025",
    client: "概念競圖",
    role: "建築模型製作・空間規劃",
    tools: ["Rhino", "SketchUp", "實體模型"],
    cover: "/projects/riverside-cover.svg",
    gallery: [
      "/projects/riverside-1.svg",
      "/projects/riverside-2.svg",
      "/projects/riverside-3.svg",
    ],
    model: "/models/sample-building.glb", // 範例：可在網頁中直接旋轉的 3D 量體
    summary:
      "結合實體量體模型與數位建模的展演空間提案，從基地分析、量體推演到 1:200 實體模型完整呈現設計思考過程。",
    sections: [
      {
        heading: "設計概念",
        body: "屋頂以連續的曲面延伸至水岸，創造半戶外的灰空間，讓室內展演與戶外散步動線自然交織。量體刻意壓低，避免遮擋既有的河岸天際線。",
      },
      {
        heading: "模型製作",
        body: "以 1:200 比例製作實體模型，搭配雷射切割壓克力與木皮表現主結構，並利用數位模型驗證採光與動線，確保提案在評圖時能清楚傳達空間感。",
      },
    ],
    featured: true,
  },
  {
    slug: "urban-housing-mass",
    title: "都市集合住宅量體研究",
    subtitle: "退縮、錯層與綠陽台的密度實驗",
    category: "3D 建模",
    year: "2025",
    role: "3D 建模・量體研究",
    tools: ["Rhino", "Grasshopper", "Blender"],
    cover: "/projects/housing-cover.svg",
    gallery: ["/projects/housing-1.svg", "/projects/housing-2.svg"],
    summary:
      "針對高密度街廓進行的量體研究，透過參數化調整退縮與錯層，平衡採光、私密性與綠化空間。",
    sections: [
      {
        heading: "量體推演",
        body: "以 Grasshopper 建立可調參數的量體系統，快速比較不同退縮率下的日照與視線，最終收斂出兼顧密度與居住品質的方案。",
      },
      {
        heading: "綠陽台系統",
        body: "在錯層之間嵌入連續的綠陽台，為每戶提供半戶外的緩衝，同時軟化整體立面的量體感。",
      },
    ],
    featured: true,
  },
  {
    slug: "interior-render-loft",
    title: "挑高 Loft 室內渲染",
    subtitle: "材質、光線與氛圍的寫實呈現",
    category: "渲染",
    year: "2025",
    role: "材質設定・燈光・渲染",
    tools: ["3ds Max", "Corona Renderer", "Photoshop"],
    cover: "/projects/loft-cover.svg",
    gallery: ["/projects/loft-1.svg", "/projects/loft-2.svg"],
    summary:
      "挑高 Loft 住宅的室內寫實渲染，著重自然光的時間變化與材質質感，協助業主在施工前確認空間氛圍。",
    sections: [
      {
        heading: "光線設定",
        body: "以 HDRI 搭配人工補光，模擬下午斜射光線進入挑高空間的效果，強調樓梯與鐵件的層次。",
      },
      {
        heading: "材質與後製",
        body: "針對木地板、水泥粉光與金屬件分別調整粗糙度與反射，渲染後再以 Photoshop 微調對比與色溫，讓畫面更貼近實際視覺。",
      },
    ],
    featured: true,
  },
  {
    slug: "facade-detail-study",
    title: "立面細部構造模型",
    subtitle: "從整體到節點的構造拆解",
    category: "建築模型",
    year: "2024",
    role: "細部建模・構造研究",
    tools: ["Rhino", "AutoCAD"],
    cover: "/projects/facade-cover.svg",
    gallery: ["/projects/facade-1.svg"],
    summary: "針對遮陽立面進行的細部構造研究，將整體系統拆解到節點層級，驗證可施作性。",
    sections: [
      {
        heading: "節點拆解",
        body: "把遮陽格柵與帷幕系統拆解成可組裝的節點模型，確認固定件、排水與熱橋處理的合理性。",
      },
    ],
  },
  {
    slug: "product-cgi-chair",
    title: "家具產品 CGI",
    subtitle: "單椅的產品級建模與打光",
    category: "渲染",
    year: "2024",
    role: "產品建模・渲染",
    tools: ["Blender", "Cycles"],
    cover: "/projects/chair-cover.svg",
    gallery: ["/projects/chair-1.svg"],
    summary: "單椅產品的 CGI 視覺，以乾淨的棚拍打光呈現曲線與材質，可用於型錄與電商。",
    sections: [
      {
        heading: "建模與材質",
        body: "以曲面細分建立平滑的椅身，搭配實木與布面材質，呈現產品的觸感與細節。",
      },
    ],
  },
  {
    slug: "site-context-diorama",
    title: "基地環境地景模型",
    subtitle: "把建築放回它所屬的城市紋理",
    category: "3D 建模",
    year: "2024",
    role: "地景建模・環境分析",
    tools: ["SketchUp", "QGIS", "Blender"],
    cover: "/projects/site-cover.svg",
    gallery: ["/projects/site-1.svg"],
    summary: "結合地理資料的基地環境模型，將提案建築放回真實的街廓與地形中檢視。",
    sections: [
      {
        heading: "資料整合",
        body: "匯入地形與街廓資料建立環境底模，讓設計討論能在真實尺度與周邊紋理下進行。",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
