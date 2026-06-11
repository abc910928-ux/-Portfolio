# 作品集網站

建築模型、3D 建模、動畫與渲染的個人作品集，以 Next.js 製作，部署於 GitHub Pages。

正式網址（推上 GitHub 並啟用 Pages 後）：
**https://abc910928-ux.github.io/-Portfolio/**

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
   - `slug`：網址用的英文名稱（例如 `my-new-project`），不可重複。
   - `title` / `subtitle`：作品名稱與一句話簡述。
   - `category`：建築模型 / 3D 建模 / 3D 動畫 / 渲染 / 其他。
   - `cover`：封面圖，例如 `/projects/my-new-project-cover.jpg`。
   - `gallery`：內頁圖片清單。
   - `sections`：圖文段落（標題＋說明），會依序與 gallery 圖片配對呈現。
   - `featured: true`：是否在首頁強調（目前首頁顯示全部作品）。

> 圖片路徑只要寫 `/projects/檔名`，網站會自動處理 GitHub Pages 的子路徑，不用自己加 `-Portfolio`。

**示意圖**：`public/projects/` 內目前是自動產生的示意圖，請用實際作品（.jpg / .png / .webp）覆蓋同名檔案，或改 `data/projects.ts` 內的路徑。重新產生示意圖可執行 `node scripts/gen-placeholders.mjs`。

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
