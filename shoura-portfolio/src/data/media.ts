import type { Localized } from "@/i18n/types";

export type MediaCategory =
  | "training"
  | "workshops"
  | "events"
  | "certificates"
  | "speaking";

export interface MediaCategoryMeta {
  key: MediaCategory;
  label: Localized;
}

export const mediaCategories: MediaCategoryMeta[] = [
  { key: "training", label: { en: "Training", ar: "التدريب" } },
  { key: "workshops", label: { en: "Workshops", ar: "ورش العمل" } },
  { key: "events", label: { en: "Corporate Events", ar: "الفعاليات المؤسسية" } },
  { key: "certificates", label: { en: "Certificates", ar: "الشهادات" } },
  { key: "speaking", label: { en: "Speaking", ar: "المحاضرات" } },
];

/**
 * Media gallery items. `image` paths are PLACEHOLDERS — replace with real
 * photography. Landscape/portrait ratio controls the masonry layout.
 */
export interface MediaItem {
  id: string;
  category: MediaCategory;
  title: Localized;
  image: string;
  ratio: "landscape" | "portrait" | "square";
}

export const mediaItems: MediaItem[] = [
  { id: "m1", category: "training", title: { en: "Corporate Training Session", ar: "جلسة تدريب مؤسسي" }, image: "/images/gallery/gallery-1.jpg", ratio: "landscape" },
  { id: "m2", category: "workshops", title: { en: "AI Workshop", ar: "ورشة الذكاء الاصطناعي" }, image: "/images/gallery/gallery-2.jpg", ratio: "portrait" },
  { id: "m3", category: "speaking", title: { en: "Keynote Session", ar: "جلسة رئيسية" }, image: "/images/gallery/gallery-3.jpg", ratio: "landscape" },
  { id: "m4", category: "events", title: { en: "Corporate Event", ar: "فعالية مؤسسية" }, image: "/images/gallery/gallery-4.jpg", ratio: "square" },
  { id: "m5", category: "training", title: { en: "Executive Session", ar: "جلسة تنفيذية" }, image: "/images/gallery/gallery-5.jpg", ratio: "landscape" },
  { id: "m6", category: "certificates", title: { en: "Certification", ar: "شهادة" }, image: "/images/gallery/gallery-6.jpg", ratio: "portrait" },
  { id: "m7", category: "workshops", title: { en: "Hands-on Workshop", ar: "ورشة تطبيقية" }, image: "/images/gallery/gallery-7.jpg", ratio: "square" },
  { id: "m8", category: "speaking", title: { en: "Conference Talk", ar: "محاضرة مؤتمر" }, image: "/images/gallery/gallery-8.jpg", ratio: "landscape" },
  { id: "m9", category: "events", title: { en: "International Event", ar: "فعالية دولية" }, image: "/images/gallery/gallery-9.jpg", ratio: "portrait" },
];

/** Optional video embeds (YouTube). Replace IDs with real content. */
export interface VideoEmbed {
  id: string;
  title: Localized;
  youtubeId: string;
}

export const videos: VideoEmbed[] = [
  { id: "v1", title: { en: "Training Highlight (placeholder)", ar: "مقتطف تدريبي (مؤقت)" }, youtubeId: "dQw4w9WgXcQ" },
  { id: "v2", title: { en: "Speaking Engagement (placeholder)", ar: "محاضرة (مؤقت)" }, youtubeId: "dQw4w9WgXcQ" },
];
