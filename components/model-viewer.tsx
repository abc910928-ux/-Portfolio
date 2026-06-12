"use client";

import { useEffect, useState } from "react";

// GitHub Pages 子路徑：model-viewer 是原生 Web Component，不會像 next/image 自動補 basePath，
// 所以這裡手動補上。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Props = {
  /** 模型路徑，例如 "/models/sample-building.glb" */
  src: string;
  /** 無障礙描述 */
  alt: string;
  /** 顯示高度，預設 480px */
  height?: number;
};

export function ModelViewer({ src, alt, height = 480 }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 只在瀏覽器端載入這個較大的 Web Component
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  const resolved = src.startsWith("/") ? `${basePath}${src}` : src;

  // model-viewer 是自訂元素，用 ElementType 規避 JSX 型別宣告
  const MV = "model-viewer" as unknown as React.ElementType;

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-line bg-card"
      style={{ height }}
    >
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
          3D 模型載入中…
        </div>
      )}
      {ready && (
        <MV
          src={resolved}
          alt={alt}
          loading="eager"
          reveal="eager"
          camera-controls=""
          auto-rotate=""
          auto-rotate-delay="0"
          rotation-per-second="20deg"
          interaction-prompt="none"
          shadow-intensity="1"
          exposure="1.1"
          camera-orbit="35deg 70deg auto"
          style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
        />
      )}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
        拖曳可旋轉・滾輪縮放
      </div>
    </div>
  );
}
