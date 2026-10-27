import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { closing, event, honoring } from "../config/content";
import { theme } from "../config/theme";
import { Chip, MediaFrame, Rise, Serration } from "../components/Common";
import { Stage } from "../components/Stage";
import { PhotoImg } from "./Intro";

// صور التكريم المستخرجة من المصدر (استُبعدت صورة p11 لظهور كشوف أسماء الحضور فيها)
export const HONOR_PAGES = [
  ["p01", "p03", "p05", "p02"],
  ["p07", "p08", "p06", "p10"],
  ["p12", "p13", "p09", "p04"],
];

export const Honoring: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const per = Math.floor((durationInFrames - 30) / HONOR_PAGES.length);
  return (
    <AbsoluteFill style={{ alignItems: "center", direction: "rtl", paddingTop: 150 }}>
      <Rise delay={2}>
        <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 84, color: theme.maroon, textAlign: "center" }}>{honoring.heading}</div>
      </Rise>
      <Rise delay={10} style={{ marginTop: 6 }}>
        <Chip size={36}>{honoring.sub}</Chip>
      </Rise>
      <div style={{ position: "relative", width: 940, height: 760, marginTop: 56 }}>
        {HONOR_PAGES.map((page, p) => {
          const start = 14 + p * per;
          const o = interpolate(frame, [start, start + 16, start + per, start + per + 16], [0, 1, 1, p === HONOR_PAGES.length - 1 ? 1 : 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          if (o <= 0) return null;
          return (
            <div key={p} style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, opacity: o }}>
              {page.map((id, i) => (
                <Rise key={id} delay={start + i * 5} dist={24}>
                  <MediaFrame width={456} height={350} zoomFrames={per + 40}>
                    <PhotoImg id={id} />
                  </MediaFrame>
                </Rise>
              ))}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Closing: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", direction: "rtl", paddingTop: 240 }}>
    <Rise delay={4}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 700, fontSize: 70, color: theme.ink, textAlign: "center", lineHeight: 1.5 }}>{closing.line1}</div>
    </Rise>
    <Rise delay={70}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 700, fontSize: 70, color: theme.ink, textAlign: "center", lineHeight: 1.5 }}>{closing.line2}</div>
    </Rise>
    <Rise delay={120} style={{ marginTop: 26 }}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 124, color: theme.maroon, textAlign: "center" }}>{closing.highlight}</div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}><Serration width={340} height={28} /></div>
    </Rise>
    <Rise delay={190} style={{ marginTop: 40 }}>
      <Chip size={44} bg={theme.maroon} color={theme.cream}>{event.slogan}</Chip>
    </Rise>
    <div style={{ position: "absolute", bottom: 330 }}>
      <Stage active="both" enterDelay={20} />
    </div>
  </AbsoluteFill>
);

export const Credit: React.FC = () => (
  <AbsoluteFill style={{ background: theme.maroon, alignItems: "center", justifyContent: "center", direction: "rtl" }}>
    <div style={{ position: "absolute", top: 0 }}><Serration width={1080} height={44} color={theme.cream} /></div>
    <div style={{ position: "absolute", bottom: 0 }}><Serration width={1080} height={44} color={theme.cream} flip /></div>
    <Rise delay={6}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 70, color: theme.cream, textAlign: "center", lineHeight: 1.5, maxWidth: 900 }}>{event.credit}</div>
    </Rise>
    <Rise delay={20} style={{ marginTop: 40 }}>
      <div style={{ fontFamily: theme.fontBody, fontWeight: 500, fontSize: 40, color: theme.goldSoft, textAlign: "center" }}>
        {event.kicker} · {event.title}
      </div>
    </Rise>
  </AbsoluteFill>
);
