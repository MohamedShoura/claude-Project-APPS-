import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ASSETS, COLORS, TEXT} from '../config';
import {clamp, ease, pop, prog} from '../components/anim';
import {baseText, GoldRule, WordReveal} from '../components/Typo';

// Everything is fully in place by local frame 58 (global 508 ≈ 16.9 s)
// and stays perfectly still for the last ~3 s.
export const SETTLED_AT = 58;

const LOGO_W = 520;
const LOGO_H = LOGO_W / ASSETS.logoAspect;

export const EndCard: React.FC = () => {
  // Freeze the clock once settled so nothing drifts during the hold.
  const f = Math.min(useCurrentFrame(), SETTLED_AT);
  const bgIn = prog(f, 0, 18);

  const plate = pop(f, 6, 17, 0.8);
  const plateMask = prog(f, 6, 26);
  const frame = prog(f, 10, 40);

  return (
    <AbsoluteFill style={{opacity: bgIn}}>
      {/* deep maroon field with soft gold bloom */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(90% 55% at 50% 38%, ${COLORS.maroonLight} 0%, ${COLORS.maroon} 38%, ${COLORS.maroonDeep} 75%, ${COLORS.maroonDarkest} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(45% 22% at 50% 36%, rgba(201,162,93,0.28), rgba(201,162,93,0) 70%)',
        }}
      />

      {/* thin gold frame corners */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[
          {x: 80, y: 190, sx: 1, sy: 1},
          {x: 1000, y: 190, sx: -1, sy: 1},
          {x: 80, y: 1560, sx: 1, sy: -1},
          {x: 1000, y: 1560, sx: -1, sy: -1},
        ].map((c, i) => (
          <path
            key={i}
            d={`M ${c.x} ${c.y + c.sy * 120} L ${c.x} ${c.y} L ${c.x + c.sx * 120} ${c.y}`}
            fill="none"
            stroke={COLORS.gold}
            strokeWidth={3}
            strokeDasharray={240}
            strokeDashoffset={240 * (1 - frame)}
            opacity={0.8}
          />
        ))}
      </svg>

      {/* Logo plate (keeps original logo colours & proportions) */}
      <div
        style={{
          position: 'absolute',
          top: 400,
          left: (1080 - (LOGO_W + 80)) / 2,
          width: LOGO_W + 80,
          height: LOGO_H + 50,
          borderRadius: 40,
          background: COLORS.white,
          boxShadow: `0 30px 80px rgba(0,0,0,0.35), 0 0 0 3px rgba(201,162,93,${0.9 * plate})`,
          transform: `scale(${0.86 + plate * 0.14})`,
          clipPath: `inset(0 0 0 0 round 40px)`,
          opacity: interpolate(plateMask, [0, 0.3], [0, 1], clamp),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{clipPath: `inset(0 0 0 ${100 - plateMask * 100}%)`}}>
          <Img src={staticFile(ASSETS.logo)} style={{width: LOGO_W, height: LOGO_H, display: 'block'}} />
        </div>
      </div>

      {/* Name + tagline */}
      <div style={{position: 'absolute', top: 830, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <WordReveal text={TEXT.endCard.name} size={68} weight={900} delay={18} stagger={3} style={{whiteSpace: 'nowrap'}} />
        <div style={{height: 8}} />
        <WordReveal text={TEXT.endCard.tagline} size={64} weight={800} color={COLORS.goldLight} delay={28} stagger={3} />
        <div style={{marginTop: 34}}>
          <GoldRule delay={34} width={260} thickness={4} />
        </div>
      </div>

      {/* CTA + location */}
      <div style={{position: 'absolute', top: 1170, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
        {(() => {
          const p = pop(f, 38, 16, 0.7);
          return (
            <div
              style={{
                ...baseText,
                fontSize: 50,
                fontWeight: 800,
                color: COLORS.maroonDeep,
                background: `linear-gradient(270deg, ${COLORS.goldLight}, ${COLORS.gold})`,
                padding: '14px 52px 20px',
                borderRadius: 999,
                boxShadow: '0 14px 40px rgba(0,0,0,0.3)',
                transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + p * 0.1})`,
                opacity: interpolate(p, [0, 0.4], [0, 1], clamp),
              }}
            >
              {TEXT.endCard.cta}
            </div>
          );
        })()}
        <div
          style={{
            ...baseText,
            fontSize: 46,
            fontWeight: 700,
            color: COLORS.cream,
            opacity: prog(f, 44, 56),
            transform: `translateY(${(1 - prog(f, 44, 58, ease)) * 20}px)`,
          }}
        >
          {TEXT.endCard.location}
        </div>
      </div>
    </AbsoluteFill>
  );
};
