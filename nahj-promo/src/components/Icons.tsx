import React from 'react';
import {COLORS} from '../config';

type P = {size?: number; color?: string; stroke?: number};

export const BookIcon: React.FC<P> = ({size = 96, color = COLORS.gold, stroke = 6}) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="round" strokeLinecap="round">
    <path d="M48 26 C38 18 22 18 12 22 V74 C22 70 38 70 48 78 Z" />
    <path d="M48 26 C58 18 74 18 84 22 V74 C74 70 58 70 48 78 Z" />
  </svg>
);

export const GearIcon: React.FC<P> = ({size = 96, color = COLORS.gold, stroke = 6}) => {
  const teeth = new Array(8).fill(0).map((_, i) => {
    const a = (i / 8) * Math.PI * 2;
    const x1 = 48 + Math.cos(a) * 28;
    const y1 = 48 + Math.sin(a) * 28;
    const x2 = 48 + Math.cos(a) * 40;
    const y2 = 48 + Math.sin(a) * 40;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round">
      {teeth}
      <circle cx="48" cy="48" r="26" />
      <circle cx="48" cy="48" r="10" />
    </svg>
  );
};

export const GrowthIcon: React.FC<P> = ({size = 96, color = COLORS.gold, stroke = 6}) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="round" strokeLinecap="round">
    <path d="M84 72 L60 48 L44 62 L12 30" />
    <path d="M12 52 V30 H34" />
  </svg>
);

export const CheckIcon: React.FC<P & {progress?: number}> = ({size = 40, color = COLORS.gold, stroke = 6, progress = 1}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="round" strokeLinecap="round">
    <path d="M8 21 L17 29 L32 11" strokeDasharray={40} strokeDashoffset={40 * (1 - progress)} />
  </svg>
);

// Neutral person glyph (no faces, no identity) for team / participant cues.
export const PersonGlyph: React.FC<{size?: number; color?: string}> = ({size = 80, color = COLORS.cream}) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill={color}>
    <circle cx="40" cy="26" r="14" />
    <path d="M14 72 C14 52 26 44 40 44 C54 44 66 52 66 72 Z" />
  </svg>
);
