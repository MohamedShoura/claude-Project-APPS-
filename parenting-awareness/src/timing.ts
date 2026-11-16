// Single source of truth for timing. All values are in seconds.
// Voice-over word timings come from assets/audio/vo_words.json (+ VO_OFFSET).
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const TOTAL_SEC = 19; // keep in sync with scripts/build_audio.py
export const TOTAL_FRAMES = TOTAL_SEC * FPS;
export const VO_OFFSET = 0.7;

const vo = (t: number) => t + VO_OFFSET;

export const T = {
  // Scene 1 — the spill, mum comes down to eye level
  cupTip: 0.42,
  mumEnter: 1.2,
  mumArrive: 2.9,
  mumCrouched: 3.75,
  caption1In: 1.9,
  caption1Out: 4.35,
  // Scene 2 — "إنت مهمل" fades away, cleaning together
  harshIn: vo(4.4), // "إنت مهمل!"
  harshOut: vo(5.55),
  pointWater: vo(6.2), // "الميّه اتكبت"
  offerCloth: vo(6.95),
  caption2In: vo(7.3), // "يلا ننضّفها سوا"
  wipeStart: vo(7.55),
  wipeEnd: vo(8.6),
  caption2Out: vo(8.72),
  // Scene 3 — listen, then show the safe place
  listenStart: vo(8.68), // "اسمعه"
  caption3In: vo(9.0),
  pointSafe: vo(9.45), // "ووضّح له الصح"
  cupGrab: vo(9.8),
  cupPlaced: vo(10.85),
  caption3Out: vo(11.25),
  // Scene 4 — hug, then end card
  hugStart: vo(11.3), // "التربية حنان وحدود"
  endCardIn: vo(13.2),
  endLine1: vo(13.4), // "صحّح السلوك"
  endLine2: vo(14.55), // "واحفظ كرامته"
  endLine3: vo(15.5),
};
