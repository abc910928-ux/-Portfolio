"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { LightboxProvider, LightboxImage } from "@/components/lightbox";
import type { ProjectSection, ProjectView } from "@/data/projects";

type Props = {
  title: string;
  defaultCover: string;
  defaultGallery: string[];
  // 各分類專屬的封面與排序（key 為大分類名稱）
  views?: Record<string, ProjectView>;
  sections: ProjectSection[];
  specs?: React.ReactNode; // 專案資訊（小分類 / 概述），由伺服器端組好傳入
  media3d?: React.ReactNode; // 3D 模型區（FBX / GLB），放在資訊後、照片前
};

export function ProjectMedia({
  title,
  defaultCover,
  defaultGallery,
  views,
  sections,
  specs,
  media3d,
}: Props) {
  const params = useSearchParams();
  const view = params.get("view");
  const chosen =
    view && views && views[view]
      ? views[view]
      : { cover: defaultCover, gallery: defaultGallery };

  return (
    <>
      {/* 封面（依情境切換） */}
      <div className="mx-auto max-w-5xl px-6 pt-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line">
          <Image
            src={chosen.cover}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* 專案資訊 */}
      {specs}

      {/* 3D 模型（資訊後、照片前） */}
      {media3d}

      {/* 圖文段落 + 圖庫（點圖放大、左右切換） */}
      {chosen.gallery.length > 0 && (
        <LightboxProvider images={chosen.gallery} alt={title}>
          <section className="mx-auto max-w-4xl space-y-16 px-6 pb-16">
            {sections.map((sec, i) => (
              <div key={i} className="grid gap-6">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-medium">{sec.heading}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{sec.body}</p>
                </div>
                {chosen.gallery[i] && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line">
                    <LightboxImage
                      index={i}
                      src={chosen.gallery[i]}
                      alt={`${title} - ${sec.heading}`}
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* 其餘未配對到段落的圖片 */}
            {chosen.gallery.length > sections.length && (
              <div className="grid gap-6 sm:grid-cols-2">
                {chosen.gallery.slice(sections.length).map((img, i) => {
                  const galleryIndex = sections.length + i;
                  return (
                    <div
                      key={galleryIndex}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line"
                    >
                      <LightboxImage
                        index={galleryIndex}
                        src={img}
                        alt={`${title} 圖 ${galleryIndex + 1}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </LightboxProvider>
      )}
    </>
  );
}
