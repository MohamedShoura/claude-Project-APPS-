import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import timeline from "./config/timeline.json";
import { loadFonts } from "./fonts";
import { Background, SceneFade } from "./components/Common";
import { CreativeSpeakers, EventInfo, InspiringSpeakers, Opening } from "./scenes/Intro";
import { Chapter, Debate } from "./scenes/Debate";
import { Closing, Credit, Honoring } from "./scenes/Outro";
import type { Side } from "./config/content";

loadFonts();

export type VideoProps = {
  // withAudio: لمعاينة الصوت داخل Remotion Studio فقط. التصدير النهائي يُرندر بلا صوت ثم يُمزج الصوت بـ ffmpeg (scripts/mix-audio.py)
  withAudio: boolean;
  burnSubtitles: boolean;
};

type Scene = (typeof timeline.scenes)[number] & { side?: string; chapter?: number };

const renderScene = (s: Scene) => {
  switch (s.type) {
    case "opening": return <Opening />;
    case "event": return <EventInfo />;
    case "creative": return <CreativeSpeakers />;
    case "inspiring": return <InspiringSpeakers />;
    case "chapter": return <Chapter chapter={s.chapter!} />;
    case "debate": {
      const a = timeline.audio.find((x) => x.id === s.id)!;
      const lead = Math.round((a.start - s.from / timeline.fps) * timeline.fps);
      return <Debate id={s.id} side={s.side as Side} chapter={s.chapter!} audioFile={a.file} leadFrames={lead} durationInFrames={s.durationInFrames} />;
    }
    case "honoring": return <Honoring durationInFrames={s.durationInFrames} />;
    case "closing": return <Closing />;
    case "credit": return <Credit />;
    default: return null;
  }
};

export const Video: React.FC<VideoProps> = ({ withAudio }) => (
  <AbsoluteFill style={{ backgroundColor: "#FAF5EC" }}>
    <Background />
    {(timeline.scenes as Scene[]).map((s) => (
      <Sequence key={s.id} from={s.from} durationInFrames={s.durationInFrames} name={s.id}>
        <SceneFade duration={s.durationInFrames}>{renderScene(s)}</SceneFade>
      </Sequence>
    ))}
    {withAudio &&
      timeline.audio.map((a) => (
        <Sequence key={a.id} from={Math.round(a.start * timeline.fps)} durationInFrames={Math.ceil(a.duration * timeline.fps) + 2}>
          <Audio src={staticFile(a.file)} />
        </Sequence>
      ))}
  </AbsoluteFill>
);
