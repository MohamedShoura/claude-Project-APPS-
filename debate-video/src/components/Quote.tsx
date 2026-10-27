import React from "react";
import { interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { labels, sides, Side } from "../config/content";
import { theme } from "../config/theme";
import { useEnter } from "./Common";

// طاقة الكلام وأعمدة الموجة من ملف الصوت الأصلي نفسه (مزامنة حقيقية، لا حركة عشوائية)
export const useSpeech = (file: string | null, offsetFrames: number, bars = 28) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = useAudioData(file ? staticFile(file) : staticFile("assets/audio/debate/d01.wav"));
  const f = frame - offsetFrames;
  if (!file || !data || f < 0 || f / fps > data.durationInSeconds) return { energy: 0, values: new Array(bars).fill(0) };
  const v = visualizeAudio({ fps, frame: f, audioData: data, numberOfSamples: 64, smoothing: true });
  const values = v.slice(1, bars + 1).map((x) => Math.min(1, Math.pow(x * 7, 0.7)));
  const energy = Math.min(1, values.slice(0, 10).reduce((a, b) => a + b, 0) / 10 * 1.4);
  return { energy, values };
};

export const Waveform: React.FC<{ values: number[]; color: string; width?: number; height?: number }> = ({ values, color, width = 300, height = 60 }) => {
  const bw = width / values.length;
  return (
    <svg width={width} height={height}>
      {values.map((v, i) => {
        const h = Math.max(6, v * height);
        return <rect key={i} x={i * bw + bw * 0.2} y={(height - h) / 2} width={bw * 0.6} height={h} rx={bw * 0.3} fill={color} opacity={0.85} />;
      })}
    </svg>
  );
};

const sizeFor = (lines: string[]) => {
  const longest = Math.max(...lines.map((l) => l.length));
  if (longest <= 12) return 104;
  if (longest <= 18) return 88;
  if (longest <= 24) return 74;
  return 62;
};

type Props = { lines: string[]; side: Side; values: number[]; compact?: boolean; delay?: number };

export const QuoteCard: React.FC<Props> = ({ lines, side, values, compact, delay = 4 }) => {
  const frame = useCurrentFrame();
  const enter = useEnter(delay);
  const color = side === "inspiring" ? theme.inspiring : theme.creative;
  const fs = Math.round(sizeFor(lines) * (compact ? 0.78 : 1));
  const who = side === "both" ? "من حوار الجيلين" : `من ${sides[side].label}`;
  return (
    <div
      style={{
        width: 912, borderRadius: 40, background: theme.paper, boxShadow: theme.shadow, position: "relative",
        padding: compact ? "44px 64px 40px" : "70px 72px 56px", direction: "rtl",
        opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [50, 0])}px)`,
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 72, width: 140, height: 10, borderRadius: "0 0 8px 8px", background: color }} />
      <div style={{ position: "absolute", top: compact ? -6 : 6, left: 48, fontFamily: "Georgia, serif", fontSize: compact ? 150 : 210, color, opacity: 0.12, lineHeight: 1 }}>”</div>
      {lines.map((l, i) => {
        const e = interpolate(frame - delay - 8 - i * 7, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: fs, lineHeight: 1.45, color: theme.ink, textAlign: "center", opacity: e, transform: `translateY(${(1 - e) * 16}px)` }}>
            {l}
          </div>
        );
      })}
      <div style={{ marginTop: compact ? 22 : 38, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: theme.fontBody, fontWeight: 700, fontSize: 34, color }}>
          <span style={{ width: 16, height: 16, borderRadius: 8, background: color, display: "inline-block" }} />
          {who}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: theme.fontBody, fontWeight: 500, fontSize: 28, color: theme.inkSoft }}>
          <Waveform values={values.slice(0, 18)} color={color} width={170} height={46} />
          {labels.original}
        </div>
      </div>
    </div>
  );
};
