"use client";

import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`max-w-2xl ${isCenter ? "mx-auto text-center" : "text-start"}`}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-6 bg-gold-400" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={`heading-lg mt-4 ${light ? "text-white" : "text-charcoal-900"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/70" : "text-charcoal-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
