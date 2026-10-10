import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from '../config';
import {clamp, ease, pop} from './anim';

export const baseText: React.CSSProperties = {
  fontFamily: `'${FONT.family}', sans-serif`,
  direction: 'rtl',
  textAlign: 'center',
  color: COLORS.white,
  margin: 0,
  // Never break Arabic letter joining: no letter-spacing, no per-letter spans.
  letterSpacing: 0,
  fontFeatureSettings: '"liga" 1, "calt" 1',
  textRendering: 'geometricPrecision',
};

type RevealProps = {
  text: string;
  delay?: number;
  size: number;
  weight?: number;
  color?: string;
  lineHeight?: number;
  style?: React.CSSProperties;
  stagger?: number; // frames between words
  rise?: number; // px each word travels up
};

// Word-by-word mask reveal. Words are kept whole so Arabic letters stay
// connected; each word slides up from behind an overflow-hidden mask.
// Order follows the reading direction (right → left).
export const WordReveal: React.FC<RevealProps> = ({
  text,
  delay = 0,
  size,
  weight = 800,
  color = COLORS.white,
  lineHeight = 1.35,
  style,
  stagger = 4,
  rise = 1,
}) => {
  const frame = useCurrentFrame();
  // "\n" forces a line break; words stay whole so Arabic letters remain joined.
  const lines = text.split('\n').map((l) => l.split(' '));
  let idx = 0;
  return (
    <div
      style={{
        ...baseText,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style,
      }}
    >
      {lines.map((words, li) => (
        <div
          key={li}
          style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', columnGap: size * 0.26}}
        >
          {words.map((w) => {
            const i = idx++;
            const p = pop(frame, delay + i * stagger, 18, 0.6);
            const y = interpolate(p, [0, 1], [size * 1.1 * rise, 0]);
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  paddingTop: size * 0.08,
                  paddingBottom: size * 0.18,
                  marginBottom: -size * 0.18,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    transform: `translateY(${y}px)`,
                    opacity: interpolate(p, [0, 0.4], [0, 1], clamp),
                  }}
                >
                  {w}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Whole-line clip reveal sweeping right → left (RTL reading direction).
export const LineWipe: React.FC<
  RevealProps & {duration?: number}
> = ({text, delay = 0, size, weight = 600, color = COLORS.goldLight, lineHeight = 1.4, style, duration = 16}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + duration], [0, 1], {...clamp, easing: ease});
  return (
    <div
      style={{
        ...baseText,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight,
        clipPath: `inset(-20% 0 -20% ${100 - p * 100}%)`,
        transform: `translateX(${(1 - p) * -24}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

// Gold rule that draws from the right.
export const GoldRule: React.FC<{delay?: number; width?: number; dur?: number; thickness?: number}> = ({
  delay = 0,
  width = 220,
  dur = 18,
  thickness = 5,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + dur], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{width, height: thickness, display: 'flex', justifyContent: 'flex-end'}}>
      <div
        style={{
          width: width * p,
          height: thickness,
          borderRadius: thickness,
          background: `linear-gradient(270deg, ${COLORS.goldLight}, ${COLORS.gold} 60%, ${COLORS.goldDeep})`,
          boxShadow: `0 0 18px rgba(201,162,93,0.55)`,
        }}
      />
    </div>
  );
};
