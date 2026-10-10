import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COLORS, SCENES, TEXT} from '../config';
import {envelope, pop, prog} from '../components/anim';
import {PersonGlyph} from '../components/Icons';
import {LineWipe, WordReveal} from '../components/Typo';

const PANEL = {x: 130, y: 740, w: 820, h: 620};
// Roadmap rising from bottom-left (start) to top-right (goal) — charts keep
// the universal left→right convention so the trend never reads as a decline.
const NODES = [
  {x: 130, y: 500},
  {x: 300, y: 380},
  {x: 490, y: 300},
  {x: 670, y: 150},
];
const PATH = `M 60 560 C 120 520, 120 500, 130 500 S 220 400, 300 380 S 420 330, 490 300 S 610 210, 670 150`;
const PATH_LEN = 820;

// 11–15 s — consulting: a team, a roadmap drawn milestone by milestone,
// and an illustrative upward trend (no numbers, no claims).
export const Consulting: React.FC = () => {
  const frame = useCurrentFrame();
  const env = envelope(frame, SCENES.consulting.duration + 4, 12, 16);
  const panelIn = pop(frame, 4, 16, 0.8);
  const draw = prog(frame, 16, 74);

  return (
    <AbsoluteFill style={{opacity: env}}>
      <div style={{position: 'absolute', top: 340, left: 110, right: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
        <WordReveal text={TEXT.consulting.title} size={98} weight={900} delay={9} stagger={5} />
        <LineWipe text={TEXT.consulting.sub} size={56} weight={700} delay={40} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: PANEL.x,
          top: PANEL.y,
          width: PANEL.w,
          height: PANEL.h,
          borderRadius: 34,
          background: 'linear-gradient(200deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
          border: '1.5px solid rgba(201,162,93,0.4)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          transform: `translateY(${(1 - panelIn) * 70}px) scale(${0.94 + panelIn * 0.06})`,
          opacity: panelIn,
          overflow: 'hidden',
        }}
      >
        {/* faint grid */}
        <svg width={PANEL.w} height={PANEL.h} style={{position: 'absolute', inset: 0}}>
          {new Array(7).fill(0).map((_, i) => (
            <line key={`h${i}`} x1={0} x2={PANEL.w} y1={i * 100 + 20} y2={i * 100 + 20} stroke="white" strokeOpacity={0.05} />
          ))}
          {new Array(9).fill(0).map((_, i) => (
            <line key={`v${i}`} y1={0} y2={PANEL.h} x1={i * 100 + 10} x2={i * 100 + 10} stroke="white" strokeOpacity={0.05} />
          ))}
          {/* illustrative rising bars (no values) */}
          {[0, 1, 2, 3, 4].map((i) => {
            const h = [90, 140, 190, 250, 320][i] * prog(frame, 20 + i * 5, 46 + i * 5);
            const x = 50 + i * 130;
            return <rect key={i} x={x} y={PANEL.h - 30 - h} width={70} height={h} rx={10} fill={COLORS.gold} opacity={0.12} />;
          })}
          {/* roadmap */}
          <path d={PATH} fill="none" stroke={COLORS.gold} strokeOpacity={0.25} strokeWidth={10} strokeLinecap="round" strokeDasharray="2 22" />
          <path
            d={PATH}
            fill="none"
            stroke={COLORS.goldLight}
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={PATH_LEN}
            strokeDashoffset={PATH_LEN * (1 - draw)}
            style={{filter: 'drop-shadow(0 0 10px rgba(230,203,149,0.7))'}}
          />
          {NODES.map((n, i) => {
            const at = 16 + (i + 1) * 13;
            const p = pop(frame, at, 12, 0.5);
            const last = i === NODES.length - 1;
            return (
              <g key={i} transform={`translate(${n.x} ${n.y}) scale(${p})`}>
                <circle r={last ? 34 : 22} fill={COLORS.maroonDeep} stroke={COLORS.gold} strokeWidth={5} />
                <circle r={last ? 14 : 8} fill={COLORS.goldLight} />
                {last && <circle r={52} fill="none" stroke={COLORS.gold} strokeOpacity={0.4 * p} strokeWidth={3} />}
              </g>
            );
          })}
        </svg>

        {/* team cluster at the roadmap start */}
        <div style={{position: 'absolute', left: 30, bottom: 26, display: 'flex', alignItems: 'flex-end', gap: 4}}>
          {[0, 1, 2].map((i) => {
            const p = pop(frame, 10 + i * 4, 15, 0.6);
            return (
              <div key={i} style={{opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
                <PersonGlyph size={i === 1 ? 92 : 74} color={i === 1 ? COLORS.goldLight : COLORS.cream} />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
