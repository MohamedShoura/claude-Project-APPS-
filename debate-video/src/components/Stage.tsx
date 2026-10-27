import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "./Character";
import { sides, Side } from "../config/content";
import { theme } from "../config/theme";

// المنصة: الجيل المُبدع يمينًا (أول ما تقرؤه العين العربية)، والجيل المُبهر يسارًا، متقابلتان.
const Podium: React.FC<{ label: string; color: string; active: boolean }> = ({ label, color, active }) => (
  <div style={{ position: "relative", width: 360, height: 250 }}>
    <div
      style={{
        position: "absolute", inset: 0, borderRadius: "18px 18px 8px 8px",
        background: `linear-gradient(180deg, ${color} 0%, ${theme.maroonDeep} 100%)`,
        boxShadow: active ? `0 0 0 4px ${theme.goldSoft}, ${theme.shadow}` : theme.shadow,
      }}
    />
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 22, borderRadius: "18px 18px 0 0", background: "rgba(255,255,255,0.18)" }} />
    <div
      style={{
        position: "absolute", top: 58, left: 34, right: 34, height: 74, borderRadius: 14,
        background: theme.paper, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: theme.fontHead, fontWeight: 800, fontSize: 38, color, direction: "rtl",
      }}
    >
      {label}
    </div>
    <div style={{ position: "absolute", bottom: 26, left: 34, right: 34, height: 6, borderRadius: 3, background: theme.gold, opacity: 0.85 }} />
  </div>
);

type Props = { active: Side | "none"; energy?: number; enterDelay?: number; scale?: number };

export const Stage: React.FC<Props> = ({ active, energy = 0, enterDelay = 0, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - enterDelay, fps, config: { damping: 200 } });
  const cOn = active === "creative" || active === "both";
  const iOn = active === "inspiring" || active === "both";
  const glow = (on: boolean) => (
    <div
      style={{
        position: "absolute", bottom: 120, left: "50%", width: 520, height: 520, marginLeft: -260, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(255,240,205,${on ? 0.85 : 0}) 0%, rgba(255,240,205,0) 65%)`,
        transition: "none",
      }}
    />
  );
  const Slot: React.FC<{ kind: "creative" | "inspiring"; on: boolean }> = ({ kind, on }) => (
    <div style={{ position: "relative", width: 440, height: 720, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
      {glow(on)}
      <div style={{ position: "absolute", bottom: 175 }}>
        <Character kind={kind} active={on} energy={on ? energy : 0} facing={kind === "creative" ? "left" : "right"} height={540} seed={kind === "creative" ? 0 : 3} />
      </div>
      <div style={{ position: "absolute", bottom: 4, width: 380, height: 40, borderRadius: "50%", background: "rgba(40,14,26,0.16)", filter: "blur(10px)" }} />
      <div style={{ position: "relative" }}>
        <Podium label={sides[kind].label} color={kind === "creative" ? theme.creative : theme.inspiring} active={on} />
      </div>
    </div>
  );
  return (
    <div
      style={{
        display: "flex", flexDirection: "row-reverse", justifyContent: "center", gap: 40,
        opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [60, 0])}px) scale(${scale})`, transformOrigin: "50% 100%",
      }}
    >
      <Slot kind="creative" on={cOn} />
      <Slot kind="inspiring" on={iOn} />
    </div>
  );
};
