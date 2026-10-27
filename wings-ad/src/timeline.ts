// Single source of truth for the edit. 30 fps, 900 frames = 30 s.
// VO start times must match scripts/mix_audio.sh.
export const FPS = 30;
export const DURATION = 900;
export const XFADE = 15; // overlap between consecutive scenes (frames)

export type SceneId = 's1' | 's2' | 's3' | 's4' | 's5';

export type Scene = {
  id: SceneId;
  from: number;
  duration: number;
  clip: string; // prepared clip in public/clips (see scripts/prepare_clips.sh)
  still: string; // original photo, used when useClips=false
  sourceOrientation: 'landscape' | 'portrait';
  // where to anchor the cover-crop for the vertical cut (0..1)
  focusX: number;
  focusY: number;
  // digital camera move used when the scene is built from the still photo
  move: StillMove;
};

export type StillMove = {
  origin: [number, number]; // transform-origin in % (the point the camera pushes toward)
  scale: [number, number];
  x?: [number, number]; // % translate
  y?: [number, number];
  rotate?: [number, number]; // deg, in-plane
  rotateY?: [number, number]; // deg, subtle parallax "arc"
  focusPull?: number; // frames of rack-focus from soft to sharp at scene start
};

// false = build the spot from the original photos with digital camera moves.
// true  = use the Higgsfield/Kling clips in public/clips (run scripts/prepare_clips.sh first).
export const useClips = false;

export const SCENES: Scene[] = [
  {id: 's1', from: 0, duration: 165, clip: 'clips/s1_beans.mp4', still: 'beans.jpg', sourceOrientation: 'landscape', focusX: 0.66, focusY: 0.42,
    move: {origin: [68, 40], scale: [1.18, 1.42], x: [1.5, -2.5], y: [0, -1]}},
  {id: 's2', from: 150, duration: 195, clip: 'clips/s2_roast.mp4', still: 'beans.jpg', sourceOrientation: 'landscape', focusX: 0.32, focusY: 0.6,
    move: {origin: [38, 62], scale: [1.12, 1.3], x: [2, -2], rotate: [-2.2, 2.2]}},
  {id: 's3', from: 330, duration: 225, clip: 'clips/s3_hero.mp4', still: 'bags.jpg', sourceOrientation: 'portrait', focusX: 0.5, focusY: 0.55,
    move: {origin: [55, 55], scale: [1.03, 1.13], x: [2, -2], rotateY: [3.5, -3.5]}},
  {id: 's4', from: 540, duration: 225, clip: 'clips/s4_worker.mp4', still: 'worker.jpg', sourceOrientation: 'portrait', focusX: 0.5, focusY: 0.5,
    move: {origin: [49, 50], scale: [1.04, 1.2], y: [2, 0], focusPull: 40}},
  {id: 's5', from: 750, duration: 150, clip: 'clips/s5_end.mp4', still: 'bags.jpg', sourceOrientation: 'portrait', focusX: 0.6, focusY: 0.55,
    move: {origin: [71, 60], scale: [1.08, 1.32], x: [-14, -19]}},
];

// On-screen copy (Latin brand line kept exactly as briefed).
export const COPY = {
  brand: 'WINGS ROASTERY',
  heroTagline: 'تجربة قهوة تستحق الاكتشاف',
  endLine: 'اكتشف قهوتك القادمة',
};

// VO cues (seconds) - used for reference / captions; audio itself is pre-mixed.
export const VO = [
  {at: 0.5, text: 'كل فنجان عظيم... يبدأ من حبة قهوة.'},
  {at: 6.0, text: 'وفي وينجز... التفاصيل تصنع الفرق.'},
  {at: 19.0, text: 'من التفاصيل الصغيرة... تبدأ لحظات ما تنتسى.'},
  {at: 26.0, text: 'وينجز... خلّ قهوتك تحكي.'},
];
