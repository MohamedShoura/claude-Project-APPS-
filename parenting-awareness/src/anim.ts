export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Keyframe interpolation: keys = [[time, value], ...] sorted by time. */
export const kf = (
  t: number,
  keys: [number, number][],
  easing: (t: number) => number = easeInOut,
): number => {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i];
    if (t <= t1) {
      const [t0, v0] = keys[i - 1];
      return lerp(v0, v1, easing(clamp((t - t0) / (t1 - t0))));
    }
  }
  return keys[keys.length - 1][1];
};

/** 0→1 between a and b (eased). */
export const ramp = (t: number, a: number, b: number, easing = easeInOut) =>
  easing(clamp((t - a) / (b - a)));

/** 1 while a<t<b, with soft edges of width e. */
export const win = (t: number, a: number, b: number, e = 0.25) =>
  ramp(t, a, a + e) * (1 - ramp(t, b - e, b));

export type P = { x: number; y: number };

/** Two-bone IK. bend = 1 or -1 selects the elbow side. */
export const ik = (s: P, target: P, l1: number, l2: number, bend: number) => {
  let dx = target.x - s.x;
  let dy = target.y - s.y;
  let d = Math.hypot(dx, dy) || 0.001;
  const max = l1 + l2 - 0.5;
  if (d > max) {
    dx *= max / d;
    dy *= max / d;
    d = max;
  }
  const a = Math.atan2(dy, dx);
  const A = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
  const ea = a + bend * A;
  return {
    elbow: { x: s.x + l1 * Math.cos(ea), y: s.y + l1 * Math.sin(ea) },
    hand: { x: s.x + dx, y: s.y + dy },
  };
};
