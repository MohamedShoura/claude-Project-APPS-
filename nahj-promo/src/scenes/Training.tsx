import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, SCENES, TEXT} from '../config';
import {clamp, ease, envelope, pop, prog} from '../components/anim';
import {BookIcon, GearIcon, GrowthIcon, PersonGlyph} from '../components/Icons';
import {baseText, GoldRule, WordReveal} from '../components/Typo';

const STEP_W = 236;
const STEP_GAP = 22;
const BASE_Y = 1330; // floor line of the staircase
const HEIGHTS = [150, 270, 390];
const ICONS = [BookIcon, GearIcon, GrowthIcon];
// keyword i reveals at this local frame (and lights step i)
const WORD_AT = [44, 60, 76];

// 3–7 s — training: a staircase of three steps rising right → left
// (reading direction), each lit with its keyword.
export const Training: React.FC = () => {
  const frame = useCurrentFrame();
  const env = envelope(frame, SCENES.training.duration + 4, 12, 14);
  const enter = prog(frame, 0, 16);

  const totalW = STEP_W * 3 + STEP_GAP * 2;
  const left0 = (1080 - totalW) / 2;

  // climbing marker
  const climb = interpolate(frame, [WORD_AT[0], WORD_AT[1], WORD_AT[2], WORD_AT[2] + 14], [0, 1, 2, 2.0001], {...clamp, easing: ease});

  return (
    <AbsoluteFill
      style={{
        opacity: env,
        transform: `translateY(${(1 - enter) * 60}px)`,
      }}
    >
      {/* Title */}
      <div style={{position: 'absolute', top: 380, left: 110, right: 150 - 40, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <WordReveal text={TEXT.training.title} size={104} weight={900} delay={9} stagger={5} />
        <div style={{marginTop: 26}}>
          <GoldRule delay={16} width={200} />
        </div>
      </div>

      {/* Participant row — neutral glyphs suggesting a workshop audience */}
      <div style={{position: 'absolute', top: 700, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 34}}>
        {[0, 1, 2, 3, 4].map((i) => {
          const p = pop(frame, 10 + i * 3, 16, 0.6);
          return (
            <div key={i} style={{opacity: 0.22 * p, transform: `translateY(${(1 - p) * 30}px)`}}>
              <PersonGlyph size={i === 2 ? 92 : 74} />
            </div>
          );
        })}
      </div>

      {/* Staircase (step 0 on the right) */}
      {HEIGHTS.map((h, i) => {
        const p = pop(frame, 8 + i * 6, 15, 0.7);
        const lit = prog(frame, WORD_AT[i], WORD_AT[i] + 10);
        const x = left0 + (2 - i) * (STEP_W + STEP_GAP);
        const hh = h * p;
        const Icon = ICONS[i];
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                left: x,
                top: BASE_Y - hh,
                width: STEP_W,
                height: hh,
                borderRadius: '22px 22px 6px 6px',
                background: `linear-gradient(180deg, rgba(255,255,255,${0.1 + lit * 0.06}) 0%, rgba(255,255,255,0.03) 100%)`,
                border: `2px solid rgba(201,162,93,${0.35 + lit * 0.65})`,
                boxShadow: lit > 0 ? `0 0 ${40 * lit}px rgba(201,162,93,${0.35 * lit}), inset 0 0 40px rgba(201,162,93,${0.12 * lit})` : 'none',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 8,
                  background: `linear-gradient(270deg, ${COLORS.goldLight}, ${COLORS.gold})`,
                  opacity: 0.35 + lit * 0.65,
                }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                left: x,
                width: STEP_W,
                top: BASE_Y - h - 130,
                display: 'flex',
                justifyContent: 'center',
                opacity: p * (0.35 + lit * 0.65),
                transform: `translateY(${(1 - lit) * 16}px) scale(${0.9 + lit * 0.1})`,
              }}
            >
              <Icon size={104} color={lit > 0.5 ? COLORS.goldLight : COLORS.gold} />
            </div>
          </React.Fragment>
        );
      })}

      {/* Climbing light marker */}
      {(() => {
        const i0 = Math.floor(climb);
        const f = climb - i0;
        const xi = (k: number) => left0 + (2 - k) * (STEP_W + STEP_GAP) + STEP_W / 2;
        const yi = (k: number) => BASE_Y - HEIGHTS[k] - 4;
        const k1 = Math.min(i0 + 1, 2);
        const x = xi(i0) + (xi(k1) - xi(i0)) * f;
        const y = yi(i0) + (yi(k1) - yi(i0)) * f - Math.sin(f * Math.PI) * 60;
        const vis = prog(frame, WORD_AT[0] - 4, WORD_AT[0] + 4);
        return (
          <div
            style={{
              position: 'absolute',
              left: x - 14,
              top: y - 14,
              width: 28,
              height: 28,
              borderRadius: 14,
              background: COLORS.goldLight,
              boxShadow: `0 0 30px 10px rgba(230,203,149,0.6)`,
              opacity: vis,
            }}
          />
        );
      })()}

      {/* Floor line */}
      <div
        style={{
          position: 'absolute',
          top: BASE_Y + 14,
          left: left0 - 30,
          width: (totalW + 60) * prog(frame, 6, 26),
          height: 2,
          background: `linear-gradient(270deg, rgba(201,162,93,0), ${COLORS.gold}, rgba(201,162,93,0))`,
        }}
      />

      {/* Keywords: معرفة • تطبيق • تطوّر (support line) */}
      <div
        style={{
          position: 'absolute',
          top: 1388,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          direction: 'rtl',
          gap: 26,
        }}
      >
        {TEXT.training.words.map((w, i) => {
          const p = pop(frame, WORD_AT[i], 14, 0.6);
          return (
            <React.Fragment key={w}>
              {i > 0 && (
                <span style={{...baseText, fontSize: 56, color: COLORS.gold, opacity: p, fontWeight: 700}}>•</span>
              )}
              <span
                style={{
                  ...baseText,
                  fontSize: 66,
                  fontWeight: 800,
                  color: COLORS.white,
                  opacity: interpolate(p, [0, 0.4], [0, 1], clamp),
                  transform: `translateY(${(1 - p) * 34}px) scale(${0.85 + p * 0.15})`,
                  display: 'inline-block',
                }}
              >
                {w}
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
