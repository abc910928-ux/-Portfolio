"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";

type LightboxCtxValue = { open: (index: number) => void };
const LightboxCtx = createContext<LightboxCtxValue | null>(null);

/**
 * 把含有可放大圖片的區塊包起來。images 為可瀏覽的圖片清單（順序＝瀏覽順序）。
 * 子元件用 <LightboxImage index=...> 觸發放大。
 */
export function LightboxProvider({
  images,
  alt,
  children,
}: {
  images: string[];
  alt: string;
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  // 鍵盤操作 + 開啟時鎖住背景捲動
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  return (
    <LightboxCtx.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="圖片放大檢視"
        >
          {/* 關閉 */}
          <button
            type="button"
            aria-label="關閉"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {/* 上一張 */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="上一張"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              ‹
            </button>
          )}

          {/* 圖片 */}
          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* 下一張 */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="下一張"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              ›
            </button>
          )}

          {/* 頁碼 */}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              {index + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </LightboxCtx.Provider>
  );
}

/**
 * 可點擊放大的圖片。需放在 LightboxProvider 內，且外層容器要有定位與尺寸
 * （例如 relative aspect-[4/3]）。index 對應 LightboxProvider 的 images 索引。
 */
export function LightboxImage({
  index,
  src,
  alt,
  sizes,
}: {
  index: number;
  src: string;
  alt: string;
  sizes?: string;
}) {
  const ctx = useContext(LightboxCtx);
  return (
    <button
      type="button"
      onClick={() => ctx?.open(index)}
      className="group absolute inset-0 h-full w-full cursor-zoom-in"
      aria-label="放大檢視圖片"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/55 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        點擊放大
      </span>
    </button>
  );
}
