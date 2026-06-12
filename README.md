# 作品集網站

建築模型、3D 建模、動畫與渲染的個人作品集，以 Next.js 製作，部署於 GitHub Pages。

正式網址（推上 GitHub 並啟用 Pages 後）：
**https://abc910928-ux.github.io/-Portfolio/**

### 網站功能

- 首頁作品牆，**兩層分類篩選**（模型／建模 → 細分主題，第二層可複選、AND 邏輯、可清除重選）
- 作品詳情頁：封面、**小分類規格**、圖文段落
- 圖庫照片**點擊放大**，左右箭頭／鍵盤切換、Esc 關閉
- 作品可掛**可互動 3D 模型**（網頁中直接旋轉、縮放）
- 一個作品可同時歸入**多個細分主題**

---

## 懶人包：兩個一鍵腳本（雙擊即可）

不想打指令的話，直接用這兩個檔案：

- **`preview.cmd`** — 雙擊就會在本機開啟預覽（第一次會自動安裝元件），然後打開瀏覽器到 http://localhost:3000 看效果。
- **`update.cmd`** — 改好作品後雙擊它，輸入一句更新說明後按 Enter，就會自動上傳並讓網站更新。

下面是完整的手動說明，供需要時參考。

---

## 一、本機預覽

需要先安裝 Node.js（已安裝過可略過）。在專案資料夾執行：

```powershell
npm install      # 第一次或換電腦時執行，安裝依賴
npm run dev      # 啟動本機預覽
```

接著打開瀏覽器：http://localhost:3000

修改檔案後畫面會自動更新。

---

## 二、怎麼新增 / 修改作品

**所有作品內容都集中在一個檔案：`data/projects.ts`**

1. 把作品圖片放進 `public/projects/` 資料夾。
2. 在 `data/projects.ts` 的 `projects` 陣列裡，複製一段現有的物件、改成你的內容：

   | 欄位 | 必填 | 說明 |
   | --- | :--: | --- |
   | `slug` | ✓ | 網址用的英文名稱（例如 `my-project`），不可重複 |
   | `title` / `subtitle` | ✓ | 作品名稱與一句話簡述 |
   | `group` | ✓ | 第一層分類：`"模型"` 或 `"建模"` |
   | `topic` | ✓ | 第二層細分主題。單一寫字串 `"室內"`；要同時歸到多個分類寫陣列 `["室內", "素模"]` |
   | `cover` | ✓ | 封面圖，例如 `/projects/my-project-1.jpg` |
   | `gallery` | ✓ | 內頁圖片清單（首圖以外的照片，點擊可放大、左右切換） |
   | `specs` | | 小分類清單（模型用途／比例／材料／軟體…），**有填就會取代「專案概述」文字** |
   | `summary` | | 文字版專案概述（沒填 specs 時才顯示） |
   | `sections` | ✓ | 圖文段落（標題＋說明）；不需要就給空陣列 `[]` |
   | `model` | | 可互動 3D 模型路徑（見下方） |
   | `year` / `client` / `role` / `tools` | | 年份／業主／角色／使用軟體，皆可留空 |
   | `featured` | | `true` 代表首頁精選 |

> 圖片路徑只要寫 `/projects/檔名`，網站會自動處理 GitHub Pages 的子路徑，不用自己加 `-Portfolio`。

**篩選分類怎麼運作**

- 第一層（全部／模型／建模）順序由 `groupOrder` 決定。
- 模型的第二層主題是**預先定義**在 `topicOrder`（素模／上色／室內／外觀模型／含周遭環境），即使某主題還沒作品也會顯示按鈕；建模則依現有作品自動產生。
- 第二層**可複選**，選多個時作品需「同時符合全部所選主題」才顯示，標籤列末端有「清除重選」鈕。

**小分類（specs）範例**

```ts
specs: [
  { label: "模型用途", value: "展覽使用" },
  { label: "模型比例", value: "1:50" },
  { label: "模型材料", value: "牛奶板、3D 列印（家具）、壓克力" },
  { label: "使用軟體", value: "Rhino" },
],
```

**示意圖**：`public/projects/` 內預設為自動產生的示意圖，請用實際作品（.jpg / .png / .webp）覆蓋，或改 `data/projects.ts` 內的路徑。重新產生示意圖可執行 `node scripts/gen-placeholders.mjs`。

**聯絡資訊**：請編輯 `components/site-footer.tsx`，把 email 與社群連結換成你的。

### 加入可互動的 3D 模型

作品頁支援直接在網頁中旋轉觀看 3D 模型（拖曳旋轉、滾輪縮放、手機可觸控）。

1. 在建模軟體把模型**匯出成 `.glb`**（建議）或 `.gltf`：
   - **Blender**：File → Export → glTF 2.0（.glb）
   - **SketchUp**：用 glTF 匯出外掛，或先轉到 Blender 再匯出
   - **Rhino**：File → Export Selected → 選 .glb（Rhino 7 以上內建支援）
   - 小提醒：把模型體積控制在數十 MB 以內，網頁載入較快。
2. 把檔案放進 `public/models/`，例如 `public/models/my-house.glb`。
3. 在 `data/projects.ts` 對應的作品加一行：
   ```ts
   model: "/models/my-house.glb",
   ```
   該作品頁就會自動出現可互動的 3D 檢視器，列表卡片也會顯示「可旋轉 3D」標記。

> 範例模型 `public/models/sample-building.glb` 可以直接刪除或替換。

---

## 三、上線到 GitHub Pages

已內建自動部署。第一次設定：

1. 把專案推到 GitHub：

   ```powershell
   git add -A
   git commit -m "建立作品集網站"
   git push -u origin main
   ```

2. 到 GitHub 倉庫頁 → **Settings → Pages** → 把 **Source** 設為 **GitHub Actions**。
3. 之後每次 `git push` 到 `main`，網站就會自動重新建置並更新，網址為
   **https://abc910928-ux.github.io/-Portfolio/**

---

## 四、技術說明

- **框架**：Next.js 16（App Router）+ TypeScript + Tailwind CSS v4
- **輸出**：`output: "export"` 純靜態網站，部署於 GitHub Pages
- **子路徑**：`next.config.ts` 內以 `basePath = "/-Portfolio"` 對應倉庫名稱（僅在正式建置時套用，本機預覽不受影響）

### 常用指令

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 本機預覽 |
| `npm run build` | 正式建置，產出靜態檔到 `out/` |
| `npm run lint` | 檢查程式碼 |
