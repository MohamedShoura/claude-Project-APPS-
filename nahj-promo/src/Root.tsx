import React from 'react';
import {Composition} from 'remotion';
import {VIDEO} from './config';
import {NahjPromo} from './NahjPromo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="NahjPromo"
    component={NahjPromo}
    durationInFrames={VIDEO.durationInFrames}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
  />
);
