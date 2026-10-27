import React from "react";
import { Composition } from "remotion";
import { Video, VideoProps } from "./Video";
import timeline from "./config/timeline.json";
import { layout } from "./config/theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Debate"
      component={Video}
      durationInFrames={timeline.totalFrames}
      fps={timeline.fps}
      width={layout.width}
      height={layout.height}
      defaultProps={{ withAudio: true, burnSubtitles: false } satisfies VideoProps}
    />
  </>
);
