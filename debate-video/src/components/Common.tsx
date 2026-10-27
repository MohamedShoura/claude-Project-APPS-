import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { layout, theme } from "../config/theme";

// خلفية ثابتة هادئة لكل الفيديو: سماء فاتحة تتدرج إلى العاجي + أفق مدينة خافت (إشارة لخلفية الفيديو المرجعي).
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = frame * 0.004; // انجراف شبه ساكن
  const towers = [
    [0, 380], [70, 520], [150, 300], [210, 640], [300, 420], [370, 560], [450, 340], [520, 700],
    [610, 460], [680, 600], [760, 380], [830, 540], [910, 320], [980, 620], [1040, 440],
  ];
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${theme.sky} 0%, #EEF3F7 38%, ${theme.cream} 100%)` }}>
      <div style={{ position: "absolute", top: -260, left: 540 - 520, width: 1040, height: 1040, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)" }} />
      <svg width={layout.width} height={760} style={{ position: "absolute", bottom: 0, left: -drift, opacity: 0.5 }}>
        {towers.map(([x, h], i) => (
          <g key={i}>
            <rect x={x} y={760 - h} width={64 + (i % 3) * 8} height={h} rx={6} fill={i % 2 ? "#D6E2EC" : "#DCE6EF"} />
            <rect x={x + 10} y={760 - h + 18} width={44 + (i % 3) * 8} height={h - 18} rx={3} fill="none" stroke="#C9D7E3" strokeWidth={2} strokeDasharray="4 18" />
          </g>
        ))}
      </svg>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 520, background: `linear-gradient(180deg, rgba(250,245,236,0) 0%, ${theme.cream} 85%)` }} />
    </AbsoluteFill>
  );
};

// شريط مُسنّن (زخرفة مستوحاة من الحافة المسننة بالعنابي والأبيض في منطاد الفيديو المرجعي)
export const Serration: React.FC<{ width: number; height?: number; teeth?: number; color?: string; flip?: boolean }> = ({
  width, height = 26, teeth = 9, color = theme.maroon, flip,
}) => {
  const step = width / teeth;
  return (
    <svg width={width} height={height} style={{ display: "block", transform: flip ? "scaleY(-1)" : undefined }}>
      <path d={`M0 0 ${Array.from({ length: teeth }, (_, i) => `L${i * step + step / 2} ${height} L${(i + 1) * step} 0`).join(" ")} Z`} fill={color} />
    </svg>
  );
};

export const useEnter = (delay = 0, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

// ظهور ناعم: رفع بسيط + شفافية
export const Rise: React.FC<{ delay?: number; dist?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay = 0, dist = 40, children, style }) => {
  const e = useEnter(delay);
  return <div style={{ opacity: e, transform: `translateY(${interpolate(e, [0, 1], [dist, 0])}px)`, ...style }}>{children}</div>;
};

export const Chip: React.FC<{ children: React.ReactNode; color?: string; bg?: string; size?: number }> = ({ children, color = theme.maroon, bg = theme.paper, size = 34 }) => (
  <div
    style={{
      display: "inline-flex", alignItems: "center", gap: 14, padding: `${size * 0.36}px ${size * 0.9}px`, borderRadius: 999,
      background: bg, color, fontFamily: theme.fontHead, fontWeight: 700, fontSize: size, direction: "rtl",
      boxShadow: "0 6px 18px rgba(40,14,26,0.10)", border: `2px solid ${color}22`,
    }}
  >
    {children}
  </div>
);

// إطار نظيف للمقاطع والصور الأصلية مع تكبير بطيء وتظليل بسيط
export const MediaFrame: React.FC<{ width: number; height: number; children: React.ReactNode; zoomFrames?: number }> = ({ width, height, children, zoomFrames = 300 }) => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [0, zoomFrames], [1, 1.045], { extrapolateRight: "clamp" });
  return (
    <div style={{ width, height, borderRadius: 30, padding: 12, background: theme.paper, boxShadow: theme.shadow }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 20, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${z})` }}>{children}</div>
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 60px rgba(0,0,0,0.18)", borderRadius: 20 }} />
      </div>
    </div>
  );
};

// ظهور واختفاء المشهد
export const SceneFade: React.FC<{ duration: number; children: React.ReactNode }> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  const f = layout.fade;
  const o = interpolate(frame, [0, f, duration - f, duration], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};
