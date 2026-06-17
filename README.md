# 作品集網站

建築模型、3D 建模、動畫與渲染的個人作品集，以 Next.js 製作，部署於 GitHub Pages。

正式網址（推上 GitHub 並啟用 Pages 後）：
**https://abc910928-ux.github.io/-Portfolio/**

### 網站功能

- 首頁作品牆，**兩層分類篩選**（模型／建模 → 細分主題，第二層可複選、AND 邏輯、可清除重選）
- 作品詳情頁：封面、**小分類規格**、圖文段落
- 圖庫照片**點擊放大**，左右箭頭／鍵盤切換、Esc 關閉
- 作品可掛**可互動 3D 模型**（GLB 或含材質的 OBJ，網頁中直接旋轉、縮放）
- 一個作品可同時歸入**多個細分主題**，也可**同時屬於建模＋模型**並依篩選情境切換封面與排序

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
   | `group` | ✓ | 第一層大分類：`"模型"` 或 `"建模"`；**同時屬於兩者寫陣列** `["建模", "模型"]` |
   | `topic` | ✓ | 第二層細分主題。單一寫字串 `"室內"`；要同時歸到多個分類寫陣列 `["外觀模型", "材質呈現"]` |
   | `cover` | ✓ | 預設封面圖，例如 `/projects/my-project-1.jpg` |
   | `gallery` | ✓ | 內頁圖片清單（首圖以外的照片，點擊可放大、左右切換） |
   | `views` | | 各大分類專屬的封面與排序（見下方「同屬建模＋模型」） |
   | `specs` | | 小分類清單（模型用途／比例／材料／軟體…），**有填就會取代「專案概述」文字** |
   | `summary` | | 文字版專案概述（沒填 specs 時才顯示） |
   | `sections` | ✓ | 圖文段落（標題＋說明）；不需要就給空陣列 `[]` |
   | `model` | | 可互動 GLB 3D 模型路徑（見下方） |
   | `model3d` | | 可互動 OBJ 3D 模型路徑（見下方） |
   | `year` / `client` / `role` / `tools` | | 年份／業主／角色／使用軟體，皆可留空 |
   | `featured` | | `true` 代表首頁精選 |

> 圖片路徑只要寫 `/projects/檔名`，網站會自動處理 GitHub Pages 的子路徑，不用自己加 `-Portfolio`。

**篩選分類怎麼運作**

- 第一層（全部／模型／建模）順序由 `groupOrder` 決定。大分類標籤在卡片／詳情頁以**深色**顯示，和小分類（淺色）區隔。
- 第二層主題在 `topicOrder` 設定：
  - `模型`：預先定義為 素模／材質呈現／室內／外觀模型／含周遭環境（即使某主題還沒作品也會顯示按鈕）。
  - `建模`：設為空陣列 `[]`，代表**目前不做細分主題**（選建模時不顯示第二層）。
  - 想自動依現有作品產生主題：把該分類從 `topicOrder` 整個移除即可。
- 第二層**可複選**，選多個時作品需「同時符合全部所選主題」才顯示，標籤列末端有「清除重選」鈕。

**同屬建模＋模型（情境切換封面／排序）**

若一個作品同時有實體模型與數位建模，`group` 寫成 `["建模", "模型"]`，再用 `views` 讓不同分類顯示不同封面與排序：

```ts
group: ["建模", "模型"],
cover: "/projects/x-1.jpg",          // 平常 / 模型情境：模型封面
gallery: ["/projects/x-2.jpg", ...], // 模型照片優先
views: {
  建模: {                             // 篩選到建模時改用這組
    cover: "/projects/x-8.jpg",       // 建模封面
    gallery: ["/projects/x-9.jpg", ...], // 建模圖優先
  },
},
```

卡片在「建模」篩選下會自動換成建模封面，點進去詳情頁也會同步（網址帶 `?view=建模`）。

**小分類（specs）範例**

```ts
specs: [
  { label: "模型用途", value: "展覽使用" },
  { label: "模型比例", value: "1:50" },
  { label: "模型材料", value: "牛奶板、3D 列印（家具）、壓克力" },
  { label: "使用軟體", value: "Rhino" },
],
```

**照片最佳化**：建議把照片轉成 WebP 以加快載入。先 `npm install --no-save sharp`，再 `node scripts/to-webp.mjs`（會把 `public/projects/` 內的 JPEG 轉成 WebP 並刪除原檔）。

**聯絡資訊**：請編輯 `components/site-footer.tsx`，把 email 與社群連結換成你的。

### 加入可互動的 3D 模型

作品頁可直接在網頁中旋轉觀看 3D 模型（拖曳旋轉、滾輪縮放、手機可觸控）。支援兩種格式：

**方式 A：GLB（建議，最佳化、檔案小）— 用 `model` 欄位**

1. 匯出成 `.glb`（Blender：File → Export → glTF 2.0；Rhino 7+：Export Selected 選 .glb）。
2. 放進 `public/models/`，例如 `public/models/my-house.glb`。
3. 在作品加一行：`model: "/models/my-house.glb",`

**方式 B：OBJ（含材質貼圖）— 用 `model3d` 欄位**

1. 把 `.obj`、同名 `.mtl`、以及所有貼圖檔放進**同一個子資料夾**，例如 `public/models/my-model/`。
2. 在作品加一行：`model3d: "/models/my-model/3Dmodel.obj",`（程式會自動找同資料夾的 `.mtl` 與貼圖）。

兩種方式都會在「專案資訊後、照片前」自動出現 3D 檢視器，卡片也會顯示「可旋轉 3D」標記。

**模型太大怎麼辦（OBJ 數百 MB）**

OBJ 動輒上百 MB，GitHub 單檔上限 100MB、瀏覽器也載不動。用純 Node 工具轉成精簡的 GLB（實測 188MB → 4MB），再用 `model:` 引用：

```powershell
# 在含 obj/mtl/貼圖 的資料夾執行
npx obj2gltf -i 3Dmodel.obj -o raw.glb
# 簡化網格 + 量化 + WebP 貼圖 + 置中（不用 Draco，避免相容性問題）
npx @gltf-transform/cli optimize raw.glb opt.glb --compress quantize --texture-compress webp --texture-size 1024 --simplify true --simplify-error 0.008
npx @gltf-transform/cli center opt.glb model.glb --pivot center
```

> 注意：避免使用 Draco 壓縮（`KHR_draco_mesh_compression`）—— 它需要瀏覽器另外從 CDN 下載解碼器，部分網路環境會載不到而導致 3D 顯示不出來。量化（quantize）與 WebP 都是瀏覽器原生支援、無外部依賴。

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
