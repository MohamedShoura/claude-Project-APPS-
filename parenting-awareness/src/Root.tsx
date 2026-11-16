import React from "react";
import { Composition } from "remotion";
import { ParentingAwareness } from "./Composition";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "./timing";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ParentingAwareness"
    component={ParentingAwareness}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
