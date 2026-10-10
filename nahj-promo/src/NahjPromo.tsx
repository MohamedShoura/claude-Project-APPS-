import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {ASSETS, AUDIO, SCENES, TRANSITION, VIDEO, VOICEOVER} from './config';
import {clamp} from './components/anim';
import {Backdrop} from './components/Backdrop';
import {ensureFonts} from './components/fonts';
import {LightPaths} from './components/LightPaths';
import {AI} from './scenes/AI';
import {Consulting} from './scenes/Consulting';
import {EndCard} from './scenes/EndCard';
import {Hook} from './scenes/Hook';
import {Training} from './scenes/Training';

// Voice-over clip durations (frames), measured from the delivered files by
// scripts/make_audio.py. Used for music ducking.
import voDurations from './vo-durations.json';

ensureFonts();

const musicVolume = (f: number) => {
  if (!AUDIO.voiceEnabled) return AUDIO.musicVolume;
  let duck = 0;
  VOICEOVER.forEach((v, i) => {
    const d = (voDurations as number[])[i] ?? 60;
    const k = interpolate(f, [v.from - 6, v.from + 2, v.from + d - 2, v.from + d + 10], [0, 1, 1, 0], clamp);
    duck = Math.max(duck, k);
  });
  const base = interpolate(duck, [0, 1], [AUDIO.musicVolume, AUDIO.musicDuckedVolume]);
  // fade in / tail out
  const fade = interpolate(f, [0, 4, VIDEO.durationInFrames - 20, VIDEO.durationInFrames], [0, 1, 1, 0], clamp);
  return base * fade;
};

const SceneSeq: React.FC<{s: {from: number; duration: number}; children: React.ReactNode; first?: boolean}> = ({
  s,
  children,
  first,
}) => (
  <Sequence from={first ? s.from : s.from - TRANSITION} durationInFrames={s.duration + (first ? 0 : TRANSITION) + TRANSITION}>
    {children}
  </Sequence>
);

export const NahjPromo: React.FC = () => {
  const frame = useCurrentFrame();
  // light paths: strong in hook, calmer under content scenes, gone at the end card
  const pathIntensity = interpolate(
    frame,
    [0, 6, 80, 100, 440, 470],
    [0, 1, 1, 0.45, 0.45, 0],
    clamp,
  );
  const pathSpeed = interpolate(frame, [0, 20, 90], [2.2, 1.2, 0.8], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: '#3E0714'}}>
      <Backdrop />
      <LightPaths intensity={pathIntensity} speed={pathSpeed} />

      <SceneSeq s={SCENES.hook} first>
        <Hook />
      </SceneSeq>
      <SceneSeq s={SCENES.training}>
        <Sequence from={TRANSITION}>
          <Training />
        </Sequence>
      </SceneSeq>
      <SceneSeq s={SCENES.ai}>
        <Sequence from={TRANSITION}>
          <AI />
        </Sequence>
      </SceneSeq>
      <SceneSeq s={SCENES.consulting}>
        <Sequence from={TRANSITION}>
          <Consulting />
        </Sequence>
      </SceneSeq>
      <Sequence from={SCENES.endCard.from - 6}>
        <EndCard />
      </Sequence>

      {AUDIO.enabled && (
        <>
          <Audio src={staticFile(ASSETS.music)} volume={musicVolume} />
          <Audio src={staticFile(ASSETS.sfx)} volume={AUDIO.sfxVolume} />
          {AUDIO.voiceEnabled &&
            VOICEOVER.map((v, i) => (
              <Sequence key={i} from={v.from}>
                <Audio src={staticFile(ASSETS.vo(i))} volume={AUDIO.voiceVolume} />
              </Sequence>
            ))}
        </>
      )}
    </AbsoluteFill>
  );
};
