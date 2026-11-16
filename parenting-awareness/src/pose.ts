// All character / prop animation is defined here as functions of time (seconds).
import { clamp, kf, lerp, P, ramp, win, easeOut } from "./anim";
import { KidPose, MumPose, kidGeo, mumGeo } from "./Characters";
import { T } from "./timing";

const TAU = Math.PI * 2;

/** Piecewise 2D path: keys = [time, x, y]. */
const path = (t: number, keys: [number, number, number][]): P => ({
  x: kf(t, keys.map((k) => [k[0], k[1]] as [number, number])),
  y: kf(t, keys.map((k) => [k[0], k[2]] as [number, number])),
});
const mixP = (a: P, b: P, w: number): P => ({ x: lerp(a.x, b.x, w), y: lerp(a.y, b.y, w) });

const blink = (t: number, offset: number, period = 2.9) => {
  const p = (t + offset) % period;
  return p < 0.07 ? p / 0.07 : p < 0.14 ? (0.14 - p) / 0.07 : 0;
};

export const CUP_REST = { x: 440, y: 1205 };
export const SAFE_SPOT = { x: 330, y: 1205 };
export const PUDDLE = { x: 552, y: 1430 };

/* ------------------------------ mother ------------------------------ */
export const mumPose = (t: number): MumPose => {
  const x = kf(t, [
    [T.mumEnter, 1290],
    [T.mumArrive, 850],
    [T.pointWater - 0.3, 850],
    [T.pointWater + 0.5, 858],
    [T.wipeEnd + 0.1, 858],
    [T.wipeEnd + 0.7, 890],
    [T.hugStart + 0.1, 890],
    [T.hugStart + 0.9, 800],
  ]);
  const drop = kf(t, [
    [T.mumArrive - 0.15, 0],
    [T.mumCrouched, 285],
    [T.offerCloth - 0.4, 285],
    [T.wipeStart - 0.1, 322],
    [T.wipeEnd, 322],
    [T.wipeEnd + 0.55, 285],
  ]);
  const lean = kf(t, [
    [T.offerCloth - 0.4, 0],
    [T.wipeStart - 0.1, 30],
    [T.wipeEnd, 30],
    [T.wipeEnd + 0.55, 0],
    [T.hugStart + 0.1, 0],
    [T.hugStart + 0.9, 20],
  ]);
  const walking = win(t, T.mumEnter, T.mumArrive + 0.05, 0.3);
  const bob = Math.sin(t * TAU * 2.1) * 7 * walking + Math.sin(t * 1.7) * 2;
  const shY = 830 + drop + lean * 0.6 + bob;
  const sx = x - lean;
  const sway = Math.sin(t * TAU * 1.05) * 26 * walking;
  const hangL = { x: sx - 64 + sway, y: shY + 262 };
  const hangR = { x: sx + 64 - sway, y: shY + 262 };

  const knee = { x: 772, y: 1300 };
  const wipe = win(t, T.wipeStart, T.wipeEnd, 0.15);
  const scripted = path(t, [
    [T.mumArrive, hangL.x, hangL.y],
    [T.mumCrouched - 0.15, 708, 1172], // gentle hand on his shoulder
    [T.harshIn - 0.4, 708, 1172],
    [T.harshIn + 0.1, knee.x, knee.y],
    [T.pointWater - 0.2, knee.x, knee.y],
    [T.pointWater + 0.2, 690, 1362], // points at the water
    [T.offerCloth - 0.15, 690, 1362],
    [T.offerCloth + 0.15, 698, 1262], // offers the cloth
    [T.caption2In + 0.15, 698, 1262],
    [T.wipeStart + 0.15, 655, 1418], // wipes
    [T.wipeEnd, 655, 1418],
    [T.wipeEnd + 0.45, knee.x, knee.y],
    [T.pointSafe - 0.05, knee.x, knee.y],
    [T.pointSafe + 0.3, 800, 975], // points to the safe spot
    [T.cupPlaced - 0.05, 800, 975],
    [T.cupPlaced + 0.35, knee.x, knee.y],
    [T.hugStart + 0.2, knee.x, knee.y],
    [T.hugStart + 0.9, 572, 1228], // hug
  ]);
  scripted.x += Math.sin(t * TAU * 1.7) * 26 * wipe;
  const handL = t < T.mumArrive ? hangL : scripted;

  const crouchW = ramp(t, T.mumArrive, T.mumCrouched);
  const handR = mixP(hangR, { x: x + 34, y: 1338 }, crouchW);

  const nod = Math.sin((t - T.listenStart) * TAU * 1.6) * 5 * win(t, T.listenStart, T.pointSafe, 0.15);
  const hug = ramp(t, T.hugStart + 0.2, T.hugStart + 0.9);
  return {
    x,
    drop,
    lean,
    bob,
    handL,
    handR,
    headTilt: -4 * crouchW + nod - 8 * hug,
    lookX: -0.75,
    lookY: kf(t, [
      [T.mumArrive - 0.2, 0.55],
      [T.mumCrouched, 0.15],
      [T.pointWater - 0.1, 0.15],
      [T.pointWater + 0.2, 1],
      [T.offerCloth, 0.3],
      [T.wipeStart, 1],
      [T.wipeEnd, 1],
      [T.wipeEnd + 0.3, 0.15],
    ]),
    mood: kf(t, [
      [T.mumArrive, 0.2],
      [T.mumCrouched, 0.6],
      [T.harshIn - 0.2, 0.6],
      [T.harshIn + 0.1, 0.05],
      [T.harshOut, 0.05],
      [T.harshOut + 0.5, 0.6],
      [T.hugStart, 0.7],
      [T.hugStart + 0.8, 1],
    ]),
    blink: blink(t, 0.9),
    joy: ramp(t, T.hugStart + 0.75, T.hugStart + 1.0),
  };
};

/* ------------------------------- child ------------------------------ */
export const kidPose = (t: number): KidPose => {
  const x = kf(t, [
    [T.pointSafe - 0.3, 640],
    [T.cupGrab - 0.1, 650],
    [T.cupGrab + 0.25, 650],
    [T.cupPlaced - 0.2, 490],
    [T.cupPlaced + 0.2, 490],
    [T.hugStart + 0.65, 612],
  ]);
  const squat = kf(t, [
    [T.caption2In, 0],
    [T.wipeStart + 0.1, 85],
    [T.wipeEnd - 0.05, 85],
    [T.wipeEnd + 0.35, 0],
  ]);
  const lean =
    kf(t, [
      [0, 14],
      [0.38, 24],
      [0.75, 0],
    ]) +
    kf(t, [
      [T.caption2In, 0],
      [T.wipeStart + 0.1, 26],
      [T.wipeEnd - 0.05, 26],
      [T.wipeEnd + 0.35, 0],
    ]) +
    10 * win(t, T.cupGrab - 0.2, T.cupPlaced + 0.3, 0.2);
  const hop = -16 * win(t, 0.5, 0.86, 0.15);
  const walking =
    win(t, T.pointSafe - 0.3, T.cupGrab - 0.1, 0.1) +
    win(t, T.cupGrab + 0.25, T.cupPlaced - 0.2, 0.12) +
    win(t, T.cupPlaced + 0.2, T.hugStart + 0.65, 0.12);
  const phi = t * TAU * 2.6;
  const footLift: [number, number] = [
    Math.max(0, Math.sin(phi)) * 15 * walking,
    Math.max(0, -Math.sin(phi)) * 15 * walking,
  ];

  const wipe = win(t, T.wipeStart, T.wipeEnd, 0.15);
  const hangR = { x: x + 52, y: 1296 + squat };

  const handL = path(t, [
    [0, 560, 1200],
    [0.38, 466, 1166], // reaches for the cup… and knocks it
    [0.62, 540, 1150],
    [1.1, 606, 1122], // "oops" hands near the mouth
    [1.9, 618, 1282], // nervous clasped hands
    [T.offerCloth, 618, 1282],
    [T.caption2In + 0.05, 688, 1258], // takes the cloth
    [T.wipeStart + 0.15, 532, 1416], // wipes
    [T.wipeEnd - 0.05, 532, 1416],
    [T.wipeEnd + 0.35, 588, 1296],
    [T.cupGrab - 0.25, 548, 1296],
    [T.cupGrab, 490, 1168], // picks up the cup
    [T.cupGrab + 0.3, 470, 1105],
    [T.cupPlaced - 0.2, 330, 1105],
    [T.cupPlaced, 330, 1168], // puts it down on the safe spot
    [T.cupPlaced + 0.35, 416, 1296],
    [T.hugStart + 0.3, 560, 1290],
    [T.hugStart + 0.9, 690, 1252], // hug
  ]);
  handL.x += Math.sin(t * TAU * 1.9 + 1) * 24 * wipe;

  const talk = win(t, T.listenStart + 0.05, T.pointSafe, 0.12);
  const early = path(t, [
    [0, 690, 1290],
    [0.62, 704, 1180],
    [1.1, 672, 1122],
    [1.9, 662, 1282],
    [T.caption2In, 662, 1282],
    [T.wipeStart + 0.1, 694, 1376],
    [T.wipeEnd - 0.05, 694, 1376],
    [T.wipeEnd + 0.3, 716, 1214], // gestures while explaining
    [T.pointSafe - 0.15, 716, 1214],
    [T.pointSafe + 0.2, hangR.x, hangR.y],
  ]);
  early.y += Math.sin(t * TAU * 2.2) * 9 * talk;
  const hugW = ramp(t, T.hugStart + 0.25, T.hugStart + 0.9);
  const handR = mixP(t < T.pointSafe + 0.2 ? early : hangR, { x: 762, y: 1214 }, hugW);

  const talkMouth = talk * clamp(0.45 + 0.45 * Math.sin(t * TAU * 4.4));
  return {
    x,
    squat,
    lean,
    hop,
    handL,
    handR,
    footLift,
    headTilt:
      5 * win(t, 1.3, T.mumCrouched, 0.4) +
      -4 * win(t, T.harshIn, T.harshOut + 0.3, 0.2) +
      8 * hugW,
    lookX: kf(t, [
      [0.9, -1],
      [1.35, 0.9],
      [T.pointWater + 0.1, 0.9],
      [T.pointWater + 0.4, 0.1],
      [T.offerCloth - 0.1, 0.1],
      [T.offerCloth + 0.15, 0.9],
      [T.wipeStart - 0.1, 0.9],
      [T.wipeStart + 0.15, -0.2],
      [T.wipeEnd - 0.05, -0.2],
      [T.wipeEnd + 0.25, 0.9],
      [T.cupGrab - 0.3, 0.9],
      [T.cupGrab - 0.05, -0.9],
      [T.cupPlaced + 0.15, -0.9],
      [T.cupPlaced + 0.45, 0.9],
    ]),
    lookY: kf(t, [
      [0, 0.6],
      [0.9, 0.9],
      [1.4, -0.2],
      [T.mumArrive, -0.6],
      [T.mumCrouched, 0],
      [T.harshIn, 0],
      [T.harshIn + 0.25, 0.9],
      [T.harshOut + 0.2, 0.9],
      [T.pointWater, 0],
      [T.pointWater + 0.4, 1],
      [T.offerCloth - 0.1, 1],
      [T.offerCloth + 0.15, 0.2],
      [T.wipeStart + 0.15, 1],
      [T.wipeEnd - 0.05, 1],
      [T.wipeEnd + 0.25, 0],
      [T.cupGrab - 0.05, 0.5],
      [T.cupPlaced + 0.15, 0.5],
      [T.cupPlaced + 0.45, 0],
    ]),
    mood: kf(t, [
      [0.45, 0.3],
      [0.65, -1],
      [T.mumArrive + 0.4, -0.9],
      [T.mumCrouched + 0.4, -0.45],
      [T.harshIn - 0.1, -0.45],
      [T.harshIn + 0.2, -1],
      [T.harshOut, -1],
      [T.pointWater + 0.2, -0.1],
      [T.caption2In, 0.35],
      [T.wipeEnd, 0.55],
      [T.cupPlaced, 0.6],
      [T.cupPlaced + 0.3, 1],
    ]),
    blink: blink(t, 0.2, 3.3),
    mouthOpen: Math.max(0.9 * win(t, 0.5, 1.35, 0.15), talkMouth),
    joy: ramp(t, T.hugStart + 0.75, T.hugStart + 1.0),
  };
};

/* -------------------------------- props ----------------------------- */
export const cupState = (t: number, kid: KidPose) => {
  const hand = kidGeo(kid).armL.hand;
  const held = { x: hand.x, y: hand.y + 37 };
  if (t < T.cupGrab) {
    const nudge = win(t, 0.3, T.cupTip + 0.05, 0.08) * -3;
    return {
      x: CUP_REST.x + nudge,
      y: CUP_REST.y,
      rot: kf(t, [
        [T.cupTip, 0],
        [T.cupTip + 0.28, 97],
        [T.cupTip + 0.4, 87],
        [T.cupTip + 0.52, 90],
      ]),
      fill: 0.85 * (1 - ramp(t, T.cupTip + 0.1, T.cupTip + 0.7)),
    };
  }
  if (t < T.cupPlaced) {
    const w = ramp(t, T.cupGrab, T.cupGrab + 0.3);
    // while lying, the glass sits one "rotation" to the right of its base
    const lying = { x: CUP_REST.x, y: CUP_REST.y };
    return { ...mixP(lying, held, w), rot: 90 * (1 - w), fill: 0 };
  }
  return { ...SAFE_SPOT, rot: 0, fill: 0 };
};

export const waterState = (t: number) => {
  const grow = kf(
    t,
    [
      [T.cupTip + 0.45, 0],
      [T.cupTip + 1.5, 1],
    ],
    easeOut,
  );
  const cleaned = ramp(t, T.wipeStart + 0.1, T.wipeEnd);
  return {
    puddle: grow * (1 - cleaned),
    tablePuddle: ramp(t, T.cupTip + 0.15, T.cupTip + 0.6) * (1 - ramp(t, T.wipeStart, T.wipeEnd)),
    streamHead: ramp(t, T.cupTip + 0.2, T.cupTip + 0.5, (v) => v * v),
    streamTail: ramp(t, T.cupTip + 0.75, T.cupTip + 1.35, (v) => v),
  };
};

export const clothState = (t: number, mum: MumPose, kid: KidPose) => {
  const mh = mumGeo(mum).armL.hand;
  const kh = kidGeo(kid).armL.hand;
  const given = t >= T.caption2In + 0.05;
  const out = 1 - ramp(t, T.wipeEnd + 0.05, T.wipeEnd + 0.4);
  return {
    // the cloth mum offers, which the child then takes
    a: {
      ...(given ? { x: kh.x, y: kh.y + 14 } : { x: mh.x - 8, y: mh.y + 6 }),
      scale: ramp(t, T.offerCloth - 0.1, T.offerCloth + 0.15) * out,
      rot: given ? Math.sin(t * 12) * 6 : -12,
    },
    // mum's own cloth
    b: {
      x: mh.x,
      y: mh.y + 14,
      scale: ramp(t, T.caption2In + 0.2, T.wipeStart + 0.1) * out,
      rot: 8 + Math.sin(t * 11) * 6,
    },
  };
};

/** Camera: world point (fx, fy) is placed at screen (540, 1010) with scale s. */
export const camera = (t: number) => {
  const keys: [number, number, number, number][] = [
    [0, 500, 1170, 1.5],
    [1.3, 590, 1120, 1.3],
    [2.6, 690, 1010, 1.12],
    [3.9, 745, 1085, 1.42],
    [4.9, 745, 1085, 1.44],
    [5.4, 735, 1020, 1.34],
    [6.6, 720, 1040, 1.36],
    [7.6, 650, 1200, 1.42],
    [9.3, 640, 1215, 1.46],
    [10.2, 585, 1085, 1.15],
    [11.6, 575, 1090, 1.17],
    [12.6, 690, 1085, 1.45],
    [14.4, 705, 1080, 1.62],
  ];
  const pick = (i: number) => kf(t, keys.map((k) => [k[0], k[i]] as [number, number]));
  const s = pick(3);
  return { s, tx: 540 - pick(1) * s, ty: 1010 - pick(2) * s };
};
