import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../config';

// Luxurious maroon base: radial light core + vignette + fine grain lines.
export const Backdrop: React.FC<{glowY?: number; glow?: number}> = ({
  glowY = 42,
  glow = 1,
}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(120% 70% at 50% ${glowY}%, ${COLORS.maroonLight} 0%, ${COLORS.maroon} 32%, ${COLORS.maroonDeep} 68%, ${COLORS.maroonDarkest} 100%)`,
    }}
  >
    <AbsoluteFill
      style={{
        opacity: 0.35 * glow,
        background: `radial-gradient(60% 30% at 50% ${glowY}%, rgba(201,162,93,0.35), rgba(201,162,93,0) 70%)`,
      }}
    />
    {/* subtle diagonal sheen */}
    <AbsoluteFill
      style={{
        opacity: 0.07,
        backgroundImage:
          'repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 14px)',
      }}
    />
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(100% 100% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)',
      }}
    />
  </AbsoluteFill>
);
