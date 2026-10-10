import {Easing, interpolate, spring} from 'remotion';
import {VIDEO} from '../config';

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

export const ease = Easing.bezier(0.22, 1, 0.36, 1); // easeOutQuint-ish
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

// Firm, decisive spring (little overshoot) used for most entrances.
export const pop = (frame: number, delay = 0, damping = 16, mass = 0.7) =>
  spring({
    frame: frame - delay,
    fps: VIDEO.fps,
    config: {damping, mass, stiffness: 170},
  });

// 0 → 1 between two frames with easing.
export const prog = (
  frame: number,
  start: number,
  end: number,
  easing = ease,
) => interpolate(frame, [start, end], [0, 1], {...clamp, easing});

// Scene envelope: fades in over `inDur`, out over the last `outDur` frames.
export const envelope = (
  frame: number,
  duration: number,
  inDur = 12,
  outDur = 12,
) =>
  interpolate(
    frame,
    [0, inDur, duration - outDur, duration],
    [0, 1, 1, 0],
    clamp,
  );
