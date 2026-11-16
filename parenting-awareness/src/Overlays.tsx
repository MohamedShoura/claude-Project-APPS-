import React from "react";
import { clamp, easeOut, easeOutBack, ramp } from "./anim";
import { Kid, Mum } from "./Characters";
import { kidPose, mumPose } from "./pose";
import { T } from "./timing";

export const FONT = "Tajawal";
const INK = "#2F4E66";

/** Reels safe area: keep text away from the top bar, right-hand icons and bottom caption. */
export const SAFE = { top: 240, bottom: 420, side: 90 };

const Words: React.FC<{ text: string; t: number; start: number; stagger?: number }> = ({
  text,
  t,
  start,
  stagger = 0.09,
}) => (
  <>
    {text.split(" ").map((w, i) => {
      const p = ramp(t, start + i * stagger, start + i * stagger + 0.38, easeOut);
      return (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: p,
            transform: `translateY(${(1 - p) * 26}px)`,
            marginInline: "0.14em",
          }}
        >
          {w}
        </span>
      );
    })}
  </>
);

export const Caption: React.FC<{
  t: number;
  text: string;
  from: number;
  to: number;
  variant?: "light" | "blue";
}> = ({ t, text, from, to, variant = "light" }) => {
  if (t < from - 0.05 || t > to + 0.4) return null;
  const enter = ramp(t, from, from + 0.4, easeOutBack);
  const exit = ramp(t, to, to + 0.35);
  const blue = variant === "blue";
  return (
    <div
      style={{
        position: "absolute",
        top: SAFE.top + 24,
        left: SAFE.side,
        right: SAFE.side,
        display: "flex",
        justifyContent: "center",
        opacity: clamp(enter * 1.4) * (1 - exit),
        transform: `translateY(${(1 - enter) * -30 - exit * 26}px) scale(${0.94 + 0.06 * enter})`,
      }}
    >
      <div
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 70,
          lineHeight: 1.35,
          color: blue ? "#FFFFFF" : INK,
          background: blue ? "#4F7A9C" : "rgba(255,250,241,0.94)",
          padding: "26px 54px 22px",
          borderRadius: 48,
          boxShadow: "0 14px 40px rgba(86,62,34,0.18)",
          border: blue ? "4px solid #A9C6DB" : "4px solid #FFFFFF",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        <Words text={text} t={t} start={from + 0.08} />
      </div>
    </div>
  );
};

const Heart: React.FC<{ x: number; y: number; s: number; color: string; opacity?: number }> = ({
  x,
  y,
  s,
  color,
  opacity = 1,
}) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M 0 14 C -26 -6 -14 -26 0 -12 C 14 -26 26 -6 0 14 Z"
    fill={color}
    opacity={opacity}
  />
);

export const Hearts: React.FC<{ t: number }> = ({ t }) => (
  <g>
    {[0, 1, 2, 3].map((i) => {
      const start = T.hugStart + 0.75 + i * 0.36;
      const p = clamp((t - start) / 1.7);
      if (p <= 0 || p >= 1) return null;
      return (
        <Heart
          key={i}
          x={708 + (i % 2 ? 34 : -30) + Math.sin(p * 5 + i) * 14}
          y={930 - p * 150}
          s={(0.9 + (i % 3) * 0.3) * easeOutBack(clamp(p * 4))}
          color={i % 2 ? "#E98F7C" : "#F2B5A7"}
          opacity={1 - clamp((p - 0.6) / 0.4)}
        />
      );
    })}
  </g>
);

export const EndCard: React.FC<{ t: number }> = ({ t }) => {
  const a = ramp(t, T.endCardIn, T.endCardIn + 0.55);
  if (a <= 0) return null;
  const drift = (t - T.endCardIn) * 1;
  const rule = ramp(t, T.endLine3 - 0.3, T.endLine3 + 0.3, easeOut);
  const badge = ramp(t, T.endCardIn + 0.25, T.endCardIn + 0.8, easeOutBack);
  const still = T.hugStart + 1.9;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: a }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(120% 80% at 50% 38%, #FBF4E7 0%, #F1E3CC 70%, #E9D8BC 100%)",
        }}
      />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <circle cx={130 + drift * 2} cy={330 - drift} r={210} fill="#A9C6DB" opacity={0.28} />
        <circle cx={985 - drift * 2} cy={1560 + drift} r={260} fill="#A9C6DB" opacity={0.24} />
        <circle cx={930} cy={420 + drift * 2} r={70} fill="#E9C9A6" opacity={0.4} />
        <circle cx={150} cy={1500 - drift * 2} r={54} fill="#E9C9A6" opacity={0.4} />
        <Heart x={540} y={452} s={2.3 * badge * (1 + 0.04 * Math.sin(t * 4))} color="#E98F7C" />
        {/* the same characters, in a round vignette */}
        <g transform={`translate(540 1252) scale(${0.9 + 0.1 * badge})`} opacity={badge > 0 ? 1 : 0}>
          <circle r={196} fill="#FFFFFF" />
          <circle r={182} fill="#DCE9F1" />
          <clipPath id="vignette">
            <circle r={182} />
          </clipPath>
          <g clipPath="url(#vignette)">
            <g transform="scale(0.82) translate(-700 -1128)">
              <rect x={300} y={1330} width={800} height={300} fill="#CFE0EB" />
              <Kid pose={kidPose(still)} part="body" />
              <Mum pose={mumPose(still)} part="body" />
              <Kid pose={kidPose(still)} part="frontArm" />
              <Mum pose={mumPose(still)} part="frontArm" />
            </g>
          </g>
        </g>
      </svg>
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 540,
          left: SAFE.side,
          right: SAFE.side,
          textAlign: "center",
          fontFamily: FONT,
          color: INK,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 112, lineHeight: 1.32 }}>
          <div>
            <Words text="صحّح السلوك…" t={t} start={T.endLine1} stagger={0.16} />
          </div>
          <div style={{ color: "#4F7A9C" }}>
            <Words text="واحفظ كرامته" t={t} start={T.endLine2} stagger={0.16} />
          </div>
        </div>
        <div
          style={{
            width: 220 * rule,
            height: 8,
            borderRadius: 4,
            background: "#E9C46A",
            margin: "34px auto 26px",
          }}
        />
        <div style={{ fontWeight: 700, fontSize: 60, color: "#6A8AA3" }}>
          <Words text="التربية حنان وحدود" t={t} start={T.endLine3} stagger={0.12} />
        </div>
      </div>
    </div>
  );
};
