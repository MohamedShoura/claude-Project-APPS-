import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { chapters, quotes, Side } from "../config/content";
import { theme } from "../config/theme";
import { Chip, MediaFrame, Rise, Serration } from "../components/Common";
import { QuoteCard, useSpeech } from "../components/Quote";
import { Stage } from "../components/Stage";

// مقاطع حقيقية تُعرض فوق بطاقة العبارة في مقاطع معينة (المصدر: نفس لحظة المقطع في الفيديو المرجعي)
const clipFor: Record<string, { src: string; rate: number }> = {
  d09: { src: "assets/clips/hall-slide-2.mp4", rate: 0.8 },
};

// بطاقة المحور
export const Chapter: React.FC<{ chapter: number }> = ({ chapter }) => {
  const c = chapters[chapter];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", direction: "rtl" }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 45%, rgba(107,26,54,0.10) 0%, rgba(107,26,54,0) 60%)" }} />
      <Rise delay={2}>
        <div style={{ fontFamily: theme.fontHead, fontWeight: 700, fontSize: 52, color: theme.gold, textAlign: "center" }}>{c.label}</div>
      </Rise>
      <Rise delay={8} style={{ margin: "30px 0" }}>
        <Serration width={300} height={26} />
      </Rise>
      <Rise delay={14}>
        <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 100, color: theme.maroon, textAlign: "center", lineHeight: 1.35, maxWidth: 940 }}>{c.title}</div>
      </Rise>
    </AbsoluteFill>
  );
};

type Props = { id: string; side: Side; chapter: number; audioFile: string; leadFrames: number; durationInFrames: number };

export const Debate: React.FC<Props> = ({ id, side, chapter, audioFile, leadFrames, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { energy, values } = useSpeech(audioFile, leadFrames);
  const q = quotes[id];
  const clip = clipFor[id];
  // في المقاطع الطويلة: تبديل هادئ للتكوين كل 20 ثانية (عام ↔ قريب) للحفاظ على الانتباه دون إرباك
  const long = durationInFrames > 30 * fps;
  const period = 20 * fps;
  const phase = long ? Math.floor(frame / period) % 2 : 0;
  const into = long ? frame % period : period;
  const toFocus = phase === 1 ? interpolate(into, [0, 24], [0, 1], { extrapolateRight: "clamp" }) : interpolate(into, [0, 24], [1, 0], { extrapolateRight: "clamp" });
  const focus = long && frame > period ? toFocus : 0;
  const stageScale = 1 + focus * 0.14;

  return (
    <AbsoluteFill style={{ alignItems: "center", direction: "rtl" }}>
      <div style={{ position: "absolute", top: 120 }}>
        <Rise delay={0} dist={16}>
          <Chip size={32}>
            <span style={{ color: theme.gold }}>{chapters[chapter].label}</span>
            <span style={{ opacity: 0.35 }}>|</span>
            <span>{chapters[chapter].title}</span>
          </Chip>
        </Rise>
      </div>
      {clip && (
        <div style={{ position: "absolute", top: 240 }}>
          <Rise delay={2}>
            <MediaFrame width={760} height={538} zoomFrames={durationInFrames}>
              <OffthreadVideo src={staticFile(clip.src)} muted playbackRate={clip.rate} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </MediaFrame>
          </Rise>
        </div>
      )}
      <div style={{ position: "absolute", top: clip ? 830 : 330 + focus * -40, transform: `scale(${1 - focus * 0.12})`, transformOrigin: "50% 0%" }}>
        <QuoteCard lines={q.lines} side={side} values={values} compact={!!clip} />
      </div>
      <div style={{ position: "absolute", bottom: 330 - focus * 20 }}>
        <Stage active={side} energy={energy} enterDelay={0} scale={clip ? 0.8 : stageScale * 1.08} />
      </div>
    </AbsoluteFill>
  );
};
