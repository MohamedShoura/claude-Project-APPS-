import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {COLORS, VIDEO} from '../config';
import {clamp} from './anim';

type Props = {
  intensity?: number; // 0..1 overall opacity
  speed?: number; // forward speed multiplier
  count?: number;
  vanishY?: number; // vanishing point (fraction of height)
  seed?: string;
};

// Gold light trails rushing toward the viewer from a vanishing point.
// Each trail travels along a fixed ray; depth is derived from the frame,
// so the result is fully deterministic per frame.
export const LightPaths: React.FC<Props> = ({
  intensity = 1,
  speed = 1,
  count = 46,
  vanishY = 0.42,
  seed = 'paths',
}) => {
  const frame = useCurrentFrame();
  const {width, height} = VIDEO;
  const cx = width / 2;
  const cy = height * vanishY;
  const maxR = Math.hypot(width, height) * 0.75;

  const trails = useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        angle: random(`${seed}-a-${i}`) * Math.PI * 2,
        offset: random(`${seed}-o-${i}`),
        rate: 0.55 + random(`${seed}-r-${i}`) * 0.8,
        width: 1.5 + random(`${seed}-w-${i}`) * 3.5,
        len: 0.08 + random(`${seed}-l-${i}`) * 0.12,
      })),
    [count, seed],
  );

  return (
    <AbsoluteFill style={{opacity: intensity}}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <radialGradient id={`vp-${seed}`} cx="50%" cy={`${vanishY * 100}%`} r="35%">
            <stop offset="0%" stopColor={COLORS.goldLight} stopOpacity={0.28} />
            <stop offset="100%" stopColor={COLORS.gold} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill={`url(#vp-${seed})`} />
        {trails.map((t, i) => {
          // depth z in [0,1): 0 = far (vanishing point), 1 = past the camera
          const z = (t.offset + (frame / VIDEO.fps) * 0.32 * t.rate * speed) % 1;
          const persp = (d: number) => Math.pow(d, 2.6); // perspective acceleration
          const r1 = persp(z) * maxR;
          const r2 = persp(Math.min(z + t.len, 1)) * maxR;
          const x1 = cx + Math.cos(t.angle) * r1;
          const y1 = cy + Math.sin(t.angle) * r1;
          const x2 = cx + Math.cos(t.angle) * r2;
          const y2 = cy + Math.sin(t.angle) * r2;
          const op = interpolate(z, [0, 0.25, 0.85, 1], [0, 0.85, 0.7, 0], clamp);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 5 === 0 ? COLORS.goldLight : COLORS.gold}
              strokeWidth={t.width * (0.4 + z * 1.4)}
              strokeLinecap="round"
              opacity={op}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
