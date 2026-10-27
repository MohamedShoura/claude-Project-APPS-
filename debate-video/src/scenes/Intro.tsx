import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { creativeSpeakers, event, inspiringSpeakers } from "../config/content";
import { theme } from "../config/theme";
import { Chip, MediaFrame, Rise, Serration } from "../components/Common";
import { Stage } from "../components/Stage";

const col: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", direction: "rtl" };

// المشهد 1 — الافتتاحية: العنوان + الجيلان متقابلان
export const Opening: React.FC = () => (
  <AbsoluteFill style={{ ...col, paddingTop: 230 }}>
    <Rise delay={6}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 700, fontSize: 44, color: theme.gold, letterSpacing: 0 }}>{event.kicker}</div>
    </Rise>
    <Rise delay={14}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 132, color: theme.maroon, lineHeight: 1.25, marginTop: 18 }}>{event.title}</div>
    </Rise>
    <Rise delay={24} style={{ marginTop: 26 }}>
      <Serration width={360} height={30} />
    </Rise>
    <Rise delay={32}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 700, fontSize: 70, color: theme.ink, marginTop: 34 }}>{event.subtitle}</div>
    </Rise>
    <div style={{ position: "absolute", bottom: 330 }}>
      <Stage active="both" enterDelay={44} />
    </div>
  </AbsoluteFill>
);

// المشهد 2 — الفعالية: مقطع حقيقي من القاعة + التاريخ والوقت والشعار
export const EventInfo: React.FC = () => (
  <AbsoluteFill style={{ ...col, paddingTop: 200 }}>
    <Rise delay={4}>
      <MediaFrame width={800} height={612} zoomFrames={330}>
        <OffthreadVideo src={staticFile("assets/clips/hall-slide.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} playbackRate={0.62} />
      </MediaFrame>
    </Rise>
    <Rise delay={10}>
      <div style={{ fontFamily: theme.fontBody, fontWeight: 500, fontSize: 30, color: theme.inkSoft, marginTop: 20 }}>{event.hallCaption}</div>
    </Rise>
    <Rise delay={30} style={{ marginTop: 70 }}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 64, color: theme.maroon, textAlign: "center", lineHeight: 1.4 }}>{event.kicker}</div>
    </Rise>
    <Rise delay={44} style={{ marginTop: 40, display: "flex", gap: 26, direction: "rtl" }}>
      <Chip size={40}>{event.date}</Chip>
      <Chip size={40}>{event.time}</Chip>
    </Rise>
    <Rise delay={70} style={{ marginTop: 70 }}>
      <div style={{ ...col, background: theme.maroon, borderRadius: 28, padding: "30px 70px 34px", boxShadow: theme.shadow }}>
        <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 54, color: theme.cream }}>{event.slogan}</div>
      </div>
    </Rise>
  </AbsoluteFill>
);

// المشهد 3 — المتحدثات من الجيل المبدع (الأسماء والجهات كما في المصدر)
export const CreativeSpeakers: React.FC = () => (
  <AbsoluteFill style={{ ...col, paddingTop: 170 }}>
    <Rise delay={4}>
      <Chip size={46} bg={theme.maroon} color={theme.cream}>{creativeSpeakers.heading}</Chip>
    </Rise>
    <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 24, width: 912 }}>
      {creativeSpeakers.list.map((s, i) => (
        <Rise key={s.name} delay={22 + i * 42} dist={30}>
          <div style={{ background: theme.paper, borderRadius: 28, padding: "26px 40px", boxShadow: "0 10px 28px rgba(40,14,26,0.10)", borderRight: `10px solid ${theme.maroon}`, direction: "rtl" }}>
            <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 54, color: theme.ink, lineHeight: 1.3 }}>{s.name}</div>
            <div style={{ fontFamily: theme.fontBody, fontWeight: 500, fontSize: 36, color: theme.inkSoft, lineHeight: 1.45, marginTop: 4 }}>
              {[s.role, s.org].filter(Boolean).join(" · ")}
            </div>
          </div>
        </Rise>
      ))}
    </div>
    <Rise delay={22 + 5 * 42 + 10} style={{ marginTop: 34 }}>
      <Chip size={42} color={theme.maroon}>{creativeSpeakers.extra}</Chip>
    </Rise>
  </AbsoluteFill>
);

// المشهد 4 — الجيل المبهر
export const InspiringSpeakers: React.FC = () => (
  <AbsoluteFill style={{ ...col, paddingTop: 200 }}>
    <Rise delay={4}>
      <Chip size={46} bg={theme.inspiring} color={theme.cream}>{inspiringSpeakers.heading}</Chip>
    </Rise>
    <Rise delay={16} style={{ marginTop: 70 }}>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 700, fontSize: 72, color: theme.inkSoft, textAlign: "center" }}>{inspiringSpeakers.line1}</div>
      <div style={{ fontFamily: theme.fontHead, fontWeight: 800, fontSize: 116, color: theme.inspiring, textAlign: "center", lineHeight: 1.35 }}>{inspiringSpeakers.line2}</div>
    </Rise>
    <div style={{ position: "absolute", bottom: 330 }}>
      <Stage active="inspiring" enterDelay={26} />
    </div>
  </AbsoluteFill>
);

export const PhotoImg: React.FC<{ id: string }> = ({ id }) => (
  <Img src={staticFile(`assets/photos/${id}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
);
