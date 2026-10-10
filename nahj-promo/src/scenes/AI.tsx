import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {COLORS, SCENES, TEXT} from '../config';
import {clamp, easeInOut, envelope, pop, prog} from '../components/anim';
import {CheckIcon} from '../components/Icons';
import {LineWipe, WordReveal} from '../components/Typo';

const CARD_W = 372;
const CARD_H = 112;
const GAP_X = 28;
const GAP_Y = 24;
const GRID_TOP = 1010;
const CORE = {x: 540, y: 850};
const ORGANIZE_AT = 38; // local frame where cards start snapping into order

// 7–11 s — AI at work: scattered task cards are pulled into an ordered
// grid by a calm "core", then each gets a check mark. Abstract UI only.
export const AI: React.FC = () => {
  const frame = useCurrentFrame();
  const env = envelope(frame, SCENES.ai.duration + 4, 12, 14);

  const gridLeft = (1080 - (CARD_W * 2 + GAP_X)) / 2;
  const cards = new Array(6).fill(0).map((_, i) => {
    const col = i % 2; // 0 = right column (RTL order)
    const row = Math.floor(i / 2);
    const tx = gridLeft + (1 - col) * (CARD_W + GAP_X);
    const ty = GRID_TOP + row * (CARD_H + GAP_Y);
    // chaotic start
    const sx = 80 + random(`ai-x-${i}`) * (1080 - CARD_W - 160);
    const sy = 700 + random(`ai-y-${i}`) * 700;
    const sr = (random(`ai-r-${i}`) - 0.5) * 34;
    return {tx, ty, sx, sy, sr, i};
  });

  const corePulse = 1 + Math.sin(frame / 6) * 0.04;
  const coreIn = pop(frame, 6, 14, 0.8);

  return (
    <AbsoluteFill style={{opacity: env}}>
      {/* Title + support line */}
      <div style={{position: 'absolute', top: 340, left: 110, right: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
        <WordReveal text={TEXT.ai.title} size={100} weight={900} delay={9} stagger={5} />
        <LineWipe text={TEXT.ai.sub} size={54} weight={700} delay={22} />
      </div>

      {/* Core: concentric rings with rotating dashes */}
      <svg
        width={1080}
        height={1920}
        style={{position: 'absolute', inset: 0}}
      >
        <g transform={`translate(${CORE.x} ${CORE.y}) scale(${coreIn * corePulse})`}>
          <circle r={86} fill="none" stroke={COLORS.gold} strokeOpacity={0.25} strokeWidth={2} />
          <circle
            r={70}
            fill="none"
            stroke={COLORS.gold}
            strokeWidth={4}
            strokeDasharray="18 14"
            transform={`rotate(${frame * 2.2})`}
          />
          <circle r={46} fill={COLORS.maroonDeep} stroke={COLORS.goldLight} strokeWidth={3} />
          {/* minimal spark mark, not a robot */}
          <path
            d="M0 -22 L6 -6 L22 0 L6 6 L0 22 L-6 6 L-22 0 L-6 -6 Z"
            fill={COLORS.goldLight}
            transform={`rotate(${frame * -1.2})`}
          />
        </g>
        {/* connectors core → card, drawn as cards settle */}
        {cards.map((c) => {
          const settle = prog(frame, ORGANIZE_AT + c.i * 4, ORGANIZE_AT + c.i * 4 + 22, easeInOut);
          const x2 = c.tx + CARD_W / 2;
          const y2 = c.ty;
          const len = Math.hypot(x2 - CORE.x, y2 - (CORE.y + 86));
          return (
            <line
              key={c.i}
              x1={CORE.x}
              y1={CORE.y + 86}
              x2={x2}
              y2={y2}
              stroke={COLORS.gold}
              strokeOpacity={0.3}
              strokeWidth={2}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - settle)}
            />
          );
        })}
      </svg>

      {/* Task cards */}
      {cards.map((c) => {
        const appear = pop(frame, 2 + c.i * 3, 16, 0.6);
        const settle = prog(frame, ORGANIZE_AT + c.i * 4, ORGANIZE_AT + c.i * 4 + 22, easeInOut);
        const jitter = (1 - settle) * Math.sin(frame / 5 + c.i * 2) * 6;
        const x = interpolate(settle, [0, 1], [c.sx, c.tx]) + jitter;
        const y = interpolate(settle, [0, 1], [c.sy, c.ty]);
        const r = interpolate(settle, [0, 1], [c.sr, 0]);
        const check = prog(frame, ORGANIZE_AT + 30 + c.i * 4, ORGANIZE_AT + 42 + c.i * 4);
        const barW = [0.72, 0.55, 0.64, 0.48, 0.7, 0.58][c.i];
        return (
          <div
            key={c.i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: CARD_W,
              height: CARD_H,
              transform: `rotate(${r}deg) scale(${0.85 + appear * 0.15})`,
              opacity: appear * (0.55 + settle * 0.45),
              borderRadius: 20,
              background: `linear-gradient(200deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))`,
              border: `1.5px solid rgba(201,162,93,${0.25 + settle * 0.45})`,
              boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'row-reverse', // RTL: badge on the right
              alignItems: 'center',
              padding: '0 24px',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                border: `2px solid ${COLORS.gold}`,
                background: check > 0 ? `rgba(201,162,93,${0.18 * check})` : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckIcon size={38} progress={check} color={COLORS.goldLight} />
            </div>
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12}}>
              <div style={{width: `${barW * 100}%`, height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.75)'}} />
              <div style={{width: `${(barW - 0.2) * 100}%`, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.32)'}} />
            </div>
          </div>
        );
      })}

      {/* thin scan line that sweeps once as order is achieved */}
      <div
        style={{
          position: 'absolute',
          left: gridLeft - 20,
          width: CARD_W * 2 + GAP_X + 40,
          top: interpolate(frame, [ORGANIZE_AT + 26, ORGANIZE_AT + 60], [GRID_TOP - 20, GRID_TOP + 3 * (CARD_H + GAP_Y)], clamp),
          height: 3,
          background: `linear-gradient(90deg, rgba(230,203,149,0), ${COLORS.goldLight}, rgba(230,203,149,0))`,
          opacity: interpolate(frame, [ORGANIZE_AT + 26, ORGANIZE_AT + 32, ORGANIZE_AT + 54, ORGANIZE_AT + 60], [0, 0.9, 0.9, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};
