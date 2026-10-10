import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, SCENES, TEXT} from '../config';
import {clamp, ease, envelope, pop} from '../components/anim';
import {baseText, GoldRule} from '../components/Typo';

// 0–3 s — attention hook: decisive slam-in of the question over light paths.
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const out = envelope(frame, SCENES.hook.duration + 2, 1, 14);

  const p1 = pop(frame, 6, 13, 0.55);
  const p2 = pop(frame, 12, 13, 0.55);
  const scale1 = interpolate(p1, [0, 1], [1.9, 1]);
  const scale2 = interpolate(p2, [0, 1], [1.6, 1]);
  const blur1 = interpolate(p1, [0, 0.7], [18, 0], clamp);
  const blur2 = interpolate(p2, [0, 0.7], [14, 0], clamp);

  // flash on impact
  const flash = interpolate(frame, [6, 8, 18], [0, 0.12, 0], clamp);
  // slow push-in after the hit
  const drift = interpolate(frame, [20, 102], [1, 1.06], {...clamp, easing: ease});

  return (
    <AbsoluteFill
      style={{
        opacity: out,
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${drift})`,
      }}
    >
      <AbsoluteFill style={{background: COLORS.goldLight, opacity: flash, mixBlendMode: 'overlay'}} />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -60}}>
        <div
          style={{
            ...baseText,
            fontSize: 240,
            fontWeight: 900,
            lineHeight: 1.15,
            transform: `scale(${scale1})`,
            filter: `blur(${blur1}px)`,
            opacity: interpolate(p1, [0, 0.25], [0, 1], clamp),
            textShadow: '0 12px 50px rgba(0,0,0,0.45)',
          }}
        >
          {TEXT.hook.line1}
        </div>
        <div
          style={{
            ...baseText,
            fontSize: 116,
            fontWeight: 800,
            lineHeight: 1.3,
            color: COLORS.goldLight,
            transform: `scale(${scale2})`,
            filter: `blur(${blur2}px)`,
            opacity: interpolate(p2, [0, 0.25], [0, 1], clamp),
            textShadow: '0 10px 40px rgba(0,0,0,0.45)',
          }}
        >
          {TEXT.hook.line2}
        </div>
        <div style={{marginTop: 40}}>
          <GoldRule delay={20} width={300} dur={16} thickness={6} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
