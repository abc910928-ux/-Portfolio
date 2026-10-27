// ─────────────────────────────────────────────────────────────
// 作品資料：要新增 / 修改作品，編輯這個檔案即可，不需要動其他程式。
//
// 圖片放在 public/projects/ 資料夾，cover 與 gallery 用「/projects/檔名」即可，
// basePath 會由 next/image 自動處理，不用自己加 /-Portfolio。
//
// 篩選分兩層：
//   第一層 group：「模型」（實體模型）、「建模」（數位 3D）或「數位製造」（1:1 裝置與構造實作）
//   第二層 topic：細分主題（自由命名，例如「室內渲染」「建築模型」），
//                 相同 topic 的作品會被歸在同一個篩選按鈕底下。
// ─────────────────────────────────────────────────────────────

export type Group = "模型" | "建模" | "數位製造";

// 第一層分類的顯示順序
export const groupOrder: Group[] = ["模型", "建模", "數位製造"];

// 第二層細分主題的「預先定義清單」：
//   有列在這裡的 group，會固定顯示這些主題按鈕（即使某主題還沒有作品，方便日後分類）；
//   沒列在這裡的 group（例如「建模」），則依現有作品自動產生主題。
export const topicOrder: Partial<Record<Group, string[]>> = {
  模型: ["素模", "材質呈現", "室內", "外觀模型", "含周遭環境", "環境模"],
  建模: ["grasshopper"], // 建模的細分主題
  數位製造: [], // 目前不做細分主題
};

export type ProjectSection = {
  heading: string;
  body: string;
};

export type ProjectSpec = {
  label: string; // 小分類名稱，例如「模型比例」
  value: string; // 內容，例如「1:50」
};

// 某個大分類專屬的封面與圖庫排序（用於同時屬於多分類、想切換呈現的作品）
export type ProjectView = {
  cover: string;
  gallery: string[];
};

export type Project = {
  slug: string; // 網址用，請用英文與連字號，例如 "riverside-pavilion"
  title: string; // 作品名稱
  subtitle: string; // 一句話簡述
  group: Group | Group[]; // 第一層分類：建模 / 模型；可同時屬於多個（寫成陣列）
  topic: string | string[]; // 第二層細分主題；可填多個（作品會同時出現在多個篩選）
  year?: string; // 年份（可留空）
  client?: string; // 業主 / 委託單位（可留空）
  role?: string; // 你的角色（可留空）
  tools?: string[]; // 使用軟體（可留空）
  cover: string; // 預設封面圖（「全部」與未指定 view 時使用）
  gallery: string[]; // 預設圖庫（首圖以外的照片）
  // 各大分類專屬的封面與排序：例如建模時換成建模封面、建模照片優先。
  // 沒列到的分類就用上面的預設 cover / gallery。
  views?: Partial<Record<Group, ProjectView>>;
  model?: string; // 可互動的 3D 模型（.glb / .gltf），放在 public/models/，用 model-viewer
  model3d?: string; // 可互動的 OBJ 模型（.obj，同資料夾含 .mtl 與貼圖），用 three.js 預覽
  summary?: string; // 文字版專案概述（可留空）
  specs?: ProjectSpec[]; // 小分類清單（模型用途、比例、材料…）；有填就取代「專案概述」文字
  sections: ProjectSection[]; // 圖文案例的段落（可給空陣列）
  featured?: boolean; // 是否在首頁精選
};

export const projects: Project[] = [
  {
    slug: "mist-light-yuejin",
    title: "光電獸 #46 - 霧幻光景",
    subtitle: "2026 月津港燈節・水面霧光裝置",
    group: "數位製造",
    topic: "裝置",
    year: "2026",
    role: "構造設計、施工圖繪製、1:1 打樣",
    cover: "/projects/yj-1.webp",
    gallery: [
      "/projects/yj-2.webp", // 設計理念：空拍夜景
      "/projects/yj-5.webp", // 參數化構造模型：爆炸圖
      "/projects/yj-3.webp", // 1:1 打樣：工廠內的浮體單元
      "/projects/yj-6.webp",
    ],
    specs: [
      { label: "類型", value: "團隊作品｜實踐大學 VISION BASE" },
      { label: "展期與地點", value: "2026/2/7–3/8，臺南鹽水月津港親水公園" },
      { label: "尺寸", value: "200m × 200m × 16cm，共 32 組單元" },
      { label: "材料", value: "木材、金屬、燈光、水霧、馬達、電子設備、喇叭" },
      { label: "藝術家", value: "姚仲涵 + VISION BASE" },
      { label: "數位設計與製造", value: "盧彥臣助理教授／實踐大學 VISION BASE" },
      { label: "負責項目", value: "構造設計、施工圖繪製、1:1 打樣" },
      { label: "使用軟體", value: "Rhino、Grasshopper" },
    ],
    sections: [
      {
        heading: "設計理念",
        body: "作品以霧氣與光為核心語言，霧氣在水面上擴散，燈光穿透其中形成層層光域。聲音取樣自鹽水蜂炮，轉化為電聲節奏，沿著水岸行走於霧光之間，如同進入一個可呼吸的數據雲層。",
      },
      {
        heading: "參數化構造模型",
        body: "單元漂浮於水面，需承載燈具、霧氣設備與喇叭，浮體尺寸必須反覆調整。從一開始即以 Grasshopper 建立參數化模型，每次修改即可同步更新模型與圖面；施工圖與加工圖由同一模型產出，確保圖面與最終尺寸一致。",
      },
      {
        heading: "1:1 打樣與施工圖",
        body: "以 1:1 打樣驗證構件接合、設備安裝、浮力與實際光霧效果，將結果回饋修正圖面，最後繪製完整的施工與加工圖說，作為發包、製作與現場施工的依據。",
      },
    ],
    featured: true,
  },
  {
    slug: "wall-of-voices",
    title: "Wall Of Voices 聲之牆",
    subtitle: "遷徙博物館《聽夢》・廣慈社宅雙曲面聲學裝置",
    group: "數位製造",
    topic: "裝置",
    year: "2024",
    role: "施工可行性評估、拆件與施工圖、1:1 打樣、現場施工",
    cover: "/projects/wov-1.webp",
    gallery: [
      "/projects/wov-2.webp", // 設計理念：外觀
      "/projects/wov-7.webp", // 聲鏡平面：平面圖
      "/projects/wov-8.webp", // 從曲面模型到施工：工廠預組
      "/projects/wov-3.webp",
      "/projects/wov-4.webp",
      "/projects/wov-5.webp",
      "/projects/wov-6.webp",
      "/projects/wov-9.webp",
      "/projects/wov-10.webp",
      "/projects/wov-11.webp",
      "/projects/wov-12.webp",
    ],
    specs: [
      { label: "類型", value: "團隊作品｜實踐大學 VISION BASE" },
      { label: "地點", value: "台北廣慈社宅" },
      { label: "尺寸", value: "10m × 20m × 3.5m" },
      { label: "材料", value: "木材（合板）、金屬、燈光、水霧、馬達、電子設備、喇叭" },
      { label: "藝術家", value: "Florian Claar" },
      { label: "計畫發起", value: "藝術方有限公司" },
      { label: "數位設計與製造", value: "盧彥臣助理教授／實踐大學 VISION BASE" },
      { label: "負責項目", value: "施工可行性評估、模型拆件與施工圖、工程分包對接、1:1 打樣、現場施工" },
    ],
    sections: [
      {
        heading: "設計理念",
        body: "《聲之牆》以社區居民的遷徙經驗與夢想為主題，透過雙曲面的「聲學鏡」劇場，將收集而來的聲音放大、反射，形成屬於這個地方的聲景。作品同時是聲學裝置與表演空間，開幕演出由林強與台北室內合唱團，以居民談夢想的訪談錄音共同創作。",
      },
      {
        heading: "聲鏡平面",
        body: "平面由數段內凹弧牆圍合而成，每段弧牆都是一面「聲鏡」，將聲音反射並聚焦於聆聽者耳高。弧牆的半徑、高度、角度與間距皆依聲學模擬決定，而非造型偏好。",
      },
      {
        heading: "從曲面模型到施工",
        body: "在整體曲面模型完成後，由我接手推進到施工階段：評估組裝方式與施工順序，將構件拆解為可加工的零件並繪製施工與加工圖說，對接協力廠商。牆體以肋骨為骨架、平板木料沿肋骨彎折貼附，以 2D 板材加工取代耗料的 3D 銑削，構件依人力可搬運的尺寸拆分並預留公差，現場依編號放樣組裝。",
      },
    ],
    featured: true,
  },
  {
    slug: "blue-ocean-dome",
    title: "BLUE OCEAN DOME",
    subtitle: "Grasshopper 參數化格柵穹頂",
    group: "建模",
    topic: "grasshopper",
    role: "參數化建模",
    cover: "/projects/bod-1.webp",
    gallery: ["/projects/bod-2.webp", "/projects/bod-3.webp"],
    model: "/models/blue-ocean-dome.glb",
    specs: [
      { label: "模型用途", value: "學生 case study" },
      { label: "使用軟體", value: "Rhino、Grasshopper" },
    ],
    sections: [],
    featured: true,
  },
  {
    slug: "fire-station-competition",
    title: "消防局競圖模型",
    subtitle: "消防廳舍・外觀競圖模型",
    group: "模型",
    topic: ["材質呈現", "外觀模型"],
    role: "模型製作",
    cover: "/projects/fire-1.webp",
    gallery: [
      "/projects/fire-2.webp",
      "/projects/fire-3.webp",
      "/projects/fire-4.webp",
      "/projects/fire-5.webp",
    ],
    specs: [
      { label: "模型用途", value: "競圖" },
      { label: "模型比例", value: "1:30" },
      { label: "模型材料", value: "牛奶板、噴漆" },
      { label: "使用軟體", value: "Rhino" },
    ],
    sections: [],
    featured: true,
  },
  {
    slug: "park-228-competition",
    title: "228公園競圖模型",
    subtitle: "下沉式圓形紀念廣場・競圖提案模型",
    group: "模型",
    topic: "材質呈現",
    role: "模型製作",
    cover: "/projects/park228-1.webp",
    gallery: [
      "/projects/park228-2.webp",
      "/projects/park228-3.webp",
      "/projects/park228-4.webp",
      "/projects/park228-5.webp",
    ],
    specs: [
      { label: "模型比例", value: "1:30" },
      { label: "模型材料", value: "水泥砂、3D 列印" },
      { label: "使用軟體", value: "Rhino" },
    ],
    sections: [],
    featured: true,
  },
  {
    slug: "terrain-model",
    title: "地形模",
    subtitle: "等高線地形與配置量體模型",
    group: "模型",
    topic: ["素模", "環境模"],
    role: "模型製作",
    cover: "/projects/terrain-1.webp",
    gallery: [
      "/projects/terrain-2.webp",
      "/projects/terrain-3.webp",
      "/projects/terrain-4.webp",
      "/projects/terrain-5.webp",
      "/projects/terrain-6.webp",
    ],
    specs: [
      { label: "模型用途", value: "學生作業" },
      { label: "模型比例", value: "1:300" },
      { label: "模型材料", value: "密集板、珍珠板" },
      { label: "使用軟體", value: "Rhino、Vcurve（CNC）" },
    ],
    sections: [],
    featured: true,
  },
  {
    slug: "grand-parc-renovation",
    title: "Cité du Grand Parc 單層剖面模型",
    subtitle: "The renovation of Cité du Grand Parc, France",
    group: "模型",
    topic: ["室內", "素模"],
    role: "模型製作",
    cover: "/projects/grand-parc-1.webp",
    gallery: [
      "/projects/grand-parc-2.webp",
      "/projects/grand-parc-3.webp",
      "/projects/grand-parc-4.webp",
      "/projects/grand-parc-5.webp",
    ],
    // 「小分類」會取代詳情頁的「專案概述」文字
    specs: [
      {
        label: "模型用途",
        value:
          "台灣博物館鐵道部特展「當我們同宅一起：公宅設計與理想現代生活」展覽模型",
      },
      { label: "模型比例", value: "1:50" },
      { label: "模型材料", value: "牛奶板、3D 列印（家具）、壓克力" },
      { label: "使用軟體", value: "Rhino、AutoCAD" },
    ],
    sections: [], // 不放圖文段落，照片以圖庫形式呈現
    featured: true,
  },
  {
    slug: "nerima-apartment",
    title: "練馬公寓",
    subtitle: "Nerima Apartment ｜ 集合住宅案例研究模型",
    group: "模型",
    topic: ["室內", "外觀模型", "材質呈現"],
    role: "模型製作",
    cover: "/projects/nerima-1.webp",
    gallery: [
      "/projects/nerima-2.webp",
      "/projects/nerima-3.webp",
      "/projects/nerima-4.webp",
      "/projects/nerima-5.webp",
      "/projects/nerima-6.webp",
      "/projects/nerima-7.webp",
      "/projects/nerima-8.webp",
      "/projects/nerima-9.webp",
    ],
    specs: [
      { label: "模型用途", value: "學生 case study" },
      { label: "模型比例", value: "1:50" },
      {
        label: "模型材料",
        value: "清水模紙板、3D 列印（家具）、透明 PVC、噴漆",
      },
      { label: "使用軟體", value: "Rhino" },
    ],
    sections: [],
    featured: true,
  },
  {
    slug: "roman-ruins-shelter",
    title: "Shelter for Roman Ruins 結構模型",
    subtitle: "木構造遮蔽所・結構與外觀研究模型",
    group: ["建模", "模型"], // 同時屬於建模與模型（兩個獨立大分類）
    topic: ["外觀模型", "材質呈現"],
    role: "建模・模型製作",
    // 預設（全部 / 模型）：模型封面、模型照片優先
    cover: "/projects/roman-1.webp",
    gallery: [
      "/projects/roman-2.webp",
      "/projects/roman-3.webp",
      "/projects/roman-4.webp",
      "/projects/roman-5.webp",
      "/projects/roman-6.webp",
      "/projects/roman-7.webp",
      "/projects/roman-8.webp",
      "/projects/roman-9.webp",
    ],
    // 建模情境：建模封面（8），建模照片（8、9）優先
    views: {
      建模: {
        cover: "/projects/roman-8.webp",
        gallery: [
          "/projects/roman-9.webp",
          "/projects/roman-1.webp",
          "/projects/roman-2.webp",
          "/projects/roman-3.webp",
          "/projects/roman-4.webp",
          "/projects/roman-5.webp",
          "/projects/roman-6.webp",
          "/projects/roman-7.webp",
        ],
      },
    },
    model: "/models/roman-ruins.glb",
    specs: [
      { label: "模型用途", value: "學生 case study" },
      { label: "模型比例", value: "1:20" },
      { label: "模型材料", value: "木條、水泥、石頭、紙板" },
      { label: "使用軟體", value: "Rhino" },
    ],
    sections: [],
    featured: true,
  },
  {
    slug: "sheng-kung-hospital",
    title: "高雄聖功醫院",
    subtitle: "醫院與教堂・建築展示模型",
    group: ["建模", "模型"], // 同時屬於建模與模型
    topic: ["外觀模型", "材質呈現"],
    role: "建模・模型製作",
    // 預設（全部 / 模型）：模型封面、模型照片優先
    cover: "/projects/sheng-kung-1.webp",
    gallery: [
      "/projects/sheng-kung-2.webp",
      "/projects/sheng-kung-3.webp",
      "/projects/sheng-kung-4.webp",
      "/projects/sheng-kung-5.webp",
    ],
    // 建模情境：建模封面（5＝數位渲染），建模圖優先
    views: {
      建模: {
        cover: "/projects/sheng-kung-5.webp",
        gallery: [
          "/projects/sheng-kung-1.webp",
          "/projects/sheng-kung-2.webp",
          "/projects/sheng-kung-3.webp",
          "/projects/sheng-kung-4.webp",
        ],
      },
    },
    // 188MB OBJ 已轉為 Draco 壓縮 GLB（7MB），用 model-viewer 預覽
    model: "/models/sheng-kung.glb",
    specs: [
      { label: "模型用途", value: "醫院展示模型" },
      { label: "模型比例", value: "1:100" },
      { label: "模型材料", value: "牛奶板、3D 列印、壓克力、噴漆" },
      { label: "使用軟體", value: "Rhino" },
    ],
    sections: [],
    featured: true,
  },
  {
    slug: "husin-ait-structure",
    title: "湖芯AIT結構模型",
    subtitle: "銷售中心・結構展示模型",
    group: "模型",
    topic: ["外觀模型", "素模"],
    role: "模型製作",
    cover: "/projects/husin-1.webp",
    gallery: [
      "/projects/husin-2.webp",
      "/projects/husin-3.webp",
      "/projects/husin-4.webp",
    ],
    specs: [
      { label: "模型用途", value: "銷售中心展示模型" },
      { label: "模型比例", value: "1:80" },
      { label: "模型材料", value: "牛奶板、壓克力" },
      { label: "使用軟體", value: "Rhino" },
    ],
    sections: [],
    featured: true,
  },
];

// 靜態匯出 + GitHub Pages 子路徑：next/image 在 unoptimized 模式不會自動補 basePath，
// 圖片 src 需手動補上（本機 basePath 為空字串，等於原樣）。
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function asset(path: string): string {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

// 取得作品的所有細分主題（topic 可能是字串或字串陣列，統一轉成陣列）
export function projectTopics(p: Project): string[] {
  return Array.isArray(p.topic) ? p.topic : [p.topic];
}

// 取得作品所屬的所有大分類（group 可能是字串或字串陣列，統一轉成陣列）
export function projectGroups(p: Project): Group[] {
  return Array.isArray(p.group) ? p.group : [p.group];
}

// 取得某情境下要用的封面與圖庫：
//   指定大分類且該作品有對應 views 設定時用它，否則用預設 cover / gallery。
export function viewFor(p: Project, group?: Group | "全部"): ProjectView {
  if (group && group !== "全部" && p.views?.[group]) {
    return p.views[group] as ProjectView;
  }
  return { cover: p.cover, gallery: p.gallery };
}

// 取得某個 group 的第二層細分主題：
//   若該 group 有預先定義清單（topicOrder）就用它，否則依現有作品自動產生。
export function topicsOf(group: Group): string[] {
  const predefined = topicOrder[group];
  // 有設定 topicOrder 就以它為準（空陣列＝刻意不做細分主題）；沒設定才自動產生
  if (predefined) return predefined;
  const set = new Set<string>();
  projects
    .filter((p) => projectGroups(p).includes(group))
    .forEach((p) => projectTopics(p).forEach((t) => set.add(t)));
  return Array.from(set);
}
