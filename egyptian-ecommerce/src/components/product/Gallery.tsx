"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse">
      <div
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-2xl bg-neutral-100"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn("object-cover transition-transform duration-200", zooming && "scale-[1.9]")}
          style={zooming ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto sm:w-20 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 sm:w-full",
              active === i ? "border-brand-600" : "border-transparent"
            )}
          >
            <Image src={img} alt={`${alt} ${i + 1}`} fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
