"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import { ImageIcon } from "lucide-react";

interface FigureProps {
  src: string;
  alt: string;
  /** Aspect ratio helper for the frame. */
  ratio?: "landscape" | "portrait" | "square" | "wide" | "auto";
  className?: string;
  /** Optional lucide icon name shown on the branded placeholder. */
  icon?: string;
  /** Label shown on the placeholder (e.g. "Training Photo"). */
  label?: string;
  priority?: boolean;
  rounded?: boolean;
}

const ratioClass: Record<NonNullable<FigureProps["ratio"]>, string> = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
  auto: "",
};

/**
 * Optimized image with a branded fallback.
 *
 * Real uploaded assets render through next/image (lazy-loaded + optimized).
 * When an asset is missing (placeholder path), an elegant branded frame is
 * shown instead — so the site never displays broken images. Drop real files
 * into /public at the referenced paths to replace the placeholders.
 */
export function Figure({
  src,
  alt,
  ratio = "landscape",
  className = "",
  icon,
  label,
  priority = false,
  rounded = true,
}: FigureProps) {
  const [errored, setErrored] = useState(false);
  const radius = rounded ? "rounded-2xl" : "";

  return (
    <div
      className={`relative overflow-hidden ${radius} ${ratioClass[ratio]} ${className}`}
    >
      {!errored ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={priority}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-burgundy-600 via-burgundy-700 to-charcoal-800">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #C9A25D 0, transparent 40%), radial-gradient(circle at 80% 80%, #C9A25D 0, transparent 35%)",
            }}
            aria-hidden
          />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-white/5 text-gold-300">
            {icon ? (
              <Icon name={icon} className="h-6 w-6" />
            ) : (
              <ImageIcon className="h-6 w-6" aria-hidden />
            )}
          </div>
          {label && (
            <span className="relative px-4 text-center text-xs font-medium uppercase tracking-widest text-gold-200/80">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
