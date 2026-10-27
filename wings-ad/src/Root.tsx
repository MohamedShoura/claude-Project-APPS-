import React from 'react';
import {Composition, Still} from 'remotion';
import {WingsAd} from './WingsAd';
import {Thumbnail} from './Thumbnail';
import {DURATION, FPS} from './timeline';

// Master resolution is 1080p (sources are 2000 px photos / 1080p AI clips).
// Pass --scale=2 at render time for a 2160x3840 / 3840x2160 (4K UHD) deliverable.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Wings-Vertical" component={WingsAd} durationInFrames={DURATION} fps={FPS}
      width={1080} height={1920} defaultProps={{layout: 'vertical' as const}} />
    <Composition id="Wings-Horizontal" component={WingsAd} durationInFrames={DURATION} fps={FPS}
      width={1920} height={1080} defaultProps={{layout: 'horizontal' as const}} />
    <Still id="Thumbnail-Vertical" component={Thumbnail} width={1080} height={1920}
      defaultProps={{layout: 'vertical' as const}} />
    <Still id="Thumbnail-Horizontal" component={Thumbnail} width={1920} height={1080}
      defaultProps={{layout: 'horizontal' as const}} />
  </>
);
