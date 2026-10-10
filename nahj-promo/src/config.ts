// =============================================================
//  Nahj promo — central configuration
//  Edit texts, colors, timings and asset paths here only.
// =============================================================

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 600, // 20 s exactly
};

export const COLORS = {
  maroon: '#6A0F24',
  maroonDeep: '#3E0714',
  maroonDarkest: '#24030B',
  maroonLight: '#8A1D36',
  gold: '#C9A25D',
  goldLight: '#E6CB95',
  goldDeep: '#9C7A3C',
  white: '#FFFFFF',
  cream: '#F7F1E8',
};

export const FONT = {
  family: 'Cairo',
  weights: [400, 600, 700, 800, 900] as const,
};

// Safe area for Reels / TikTok / Shorts UI (px, on a 1080x1920 canvas).
// The bottom is the tallest band (caption + buttons); the right edge
// holds the like/comment column.
export const SAFE = {
  top: 250,
  bottom: 420,
  left: 110,
  right: 150,
};

export const ASSETS = {
  logo: 'brand/nahj_logo.png', // official logo (maroon + gold, transparent)
  logoAspect: 1788 / 1098,
  fonts: 'fonts',
  music: 'audio/music.wav',
  sfx: 'audio/sfx.wav',
  vo: (i: number) => `audio/vo/vo_${i}.wav`,
};

// Scene boundaries in frames.  Scenes overlap by TRANSITION frames.
export const TRANSITION = 12;
export const SCENES = {
  hook: {from: 0, duration: 90}, // 0–3 s
  training: {from: 90, duration: 120}, // 3–7 s
  ai: {from: 210, duration: 120}, // 7–11 s
  consulting: {from: 330, duration: 120}, // 11–15 s
  endCard: {from: 450, duration: 150}, // 15–20 s (fully settled by frame 510)
};

export const TEXT = {
  hook: {line1: 'جاهز', line2: 'للخطوة الجاية؟'},
  training: {
    title: 'تدريب يطوّر\nمهاراتك',
    words: ['معرفة', 'تطبيق', 'تطوّر'],
  },
  ai: {
    title: 'ذكاء اصطناعي\nفي شغلك',
    sub: 'مهارات عملية للأفراد والشركات',
  },
  consulting: {
    title: 'استشارات تدعم\nقراراتك',
    sub: 'رؤية أوضح. خطوات مدروسة.',
  },
  endCard: {
    brand: 'نهج',
    name: 'نهج للاستشارات والتدريب',
    tagline: 'خطوتك نحو التطوّر',
    cta: 'تواصل معنا لمعرفة البرامج',
    location: 'قطر | لوسيل',
  },
};

// Voice-over lines: start frame + text (files in public/audio/vo/).
// Durations are measured from the delivered clips; see VOICEOVER.md.
export const VOICEOVER = [
  {from: 8, text: 'جاهز للخطوة الجاية؟'},
  {from: 92, text: 'مع نهج للاستشارات والتدريب… طوّر مهاراتك،'},
  {from: 216, text: 'ووظّف الذكاء الاصطناعي في شغلك.'},
  {from: 332, text: 'تدريب عملي، واستشارات تدعم قراراتك.'},
  {from: 450, text: 'نهج… خطوتك نحو التطوّر.'},
  {from: 530, text: 'تواصل معنا لمعرفة البرامج.'},
];

export const AUDIO = {
  enabled: true,
  voiceEnabled: true,
  musicVolume: 0.55,
  musicDuckedVolume: 0.16, // under voice-over
  sfxVolume: 0.8,
  voiceVolume: 1,
};
