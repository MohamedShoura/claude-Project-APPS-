# parenting-awareness — ريل توعوي عن تربية الطفل (19 ثانية)

فيديو رأسي 1080×1920 / 30fps مبني بـ Remotion (رسوم SVG متحركة أصلية بالكامل).
الملف النهائي: `out/parenting_awareness_20s.mp4` (H.264 + AAC).

## التشغيل
```bash
npm install
npm run dev      # معاينة وتعديل في Remotion Studio
npm run audio    # إعادة بناء مكس الصوت (python3 + numpy + ffmpeg)
REMOTION_BROWSER=/path/to/chrome-headless-shell npm run render
```

## أين أعدّل؟
| الملف | المحتوى |
|---|---|
| `src/timing.ts` | كل التوقيتات (مربوطة بتوقيت كلمات التعليق الصوتي) |
| `src/pose.ts` | حركة الأم والطفل والكوب والماء والكاميرا |
| `src/Characters.tsx` | رسم الشخصيتين وألوانهما |
| `src/Room.tsx` | الغرفة والطاولة والكوب وقطعة القماش |
| `src/Overlays.tsx` | النصوص العربية، القلوب، بطاقة النهاية، هوامش الأمان |
| `src/Composition.tsx` | تجميع المشهد والمؤثرات البصرية |
| `scripts/build_audio.py` | المكس: مستوى الصوت، خفض الموسيقى تلقائيًا، المؤثر، المحدِّد |

## الأصول
- `assets/audio/vo_take1.mp3` (المستخدم) و`vo_take2.mp3` (بديل): تعليق صوتي ElevenLabs، صوت «Heba» مصري، نموذج eleven_v4.
- `assets/audio/vo_words.json`: توقيت كل كلمة.
- `assets/audio/music.mp3`: موسيقى آلية مولّدة بـ ElevenLabs Music. `sfx_spill_b.mp3`: مؤثر سكب الماء (ElevenLabs SFX).
- `public/fonts`: خط Tajawal (رخصة SIL OFL) محليًا.
- `public/audio/mix.wav` المكس النهائي + مسارات منفصلة (vo / music_ducked / sfx).

عند تغيير التعليق الصوتي: حدّث `VO_OFFSET`/`TOTAL` في `scripts/build_audio.py` و`src/timing.ts` ثم `npm run audio`.
