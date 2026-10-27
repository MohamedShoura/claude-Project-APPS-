# فيديو تعليمي — «بالقيم نرتقي.. وبالحركة نتميز»

فيديو تعليمي (1920×1080، 30 إطارًا/ث، H.264 + AAC، 1:53) يشرح إعلان برنامج مدرسة الخور الابتدائية للبنات، مبني برمجيًا بـ HTML/CSS + Playwright + FFmpeg.

## المخرجات (`output/`)
| الملف | الوصف |
|---|---|
| `values-movement-explainer.mp4` | الفيديو النهائي (ترجمة عربية مدمجة + موسيقى خلفية هادئة مولّدة برمجيًا) |
| `values-movement-explainer.ar.srt` | ملف ترجمة منفصل مطابق للتوقيتات |
| `cover.png` | صورة الغلاف |

السيناريو وجدول المشاهد: `docs/script.md` — نص التعليق الصوتي بتوقيتاته: `docs/narration.md`.

> **التعليق الصوتي:** لم تتوفر أداة توليد صوت عربي مصرح بها داخل البيئة، فالنسخة الحالية **بلا تعليق صوتي** (نصوص وترجمة كاملة + موسيقى). لإضافته: سجّل النص من `docs/narration.md` واحفظه في `assets/audio/narration.wav` ثم أعد الرندر؛ سيُدمج تلقائيًا مع خفض الموسيقى تحته.

## التشغيل
المتطلبات: Node 18+، Playwright مع Chromium، Python 3 + numpy، FFmpeg.

```bash
node scripts/render.mjs              # الرندر الكامل: SRT + الغلاف + الفيديو
node scripts/render.mjs --skip-video # SRT والغلاف فقط
node scripts/server.mjs 8080         # معاينة: http://127.0.0.1:8080/src/index.html?play  (أو ?t=30 لإطار محدد، ?cover للغلاف)
node scripts/snap.mjs <dir> 12 45 cover   # لقطات ثابتة للمراجعة
```

## التعديل
كل ما يُعدَّل عادةً موجود في **`config/config.json`**:
- `scenes[].duration` و`scenes[].narration` (`[بداية، نهاية، نص]` بالثواني نسبةً لبداية المشهد) — تُبنى منها الترجمة وملف SRT.
- `facts` (الشعار، الوصف، الشهر…)، `pillars`، `quiz`، `example`، `cover`.
- `colors` و`fonts`، و`audio` (تشغيل الموسيقى، مستواها، ملف التعليق).
- `poster.regions`: مستطيلات القص من البوستر `[x, y, عرض, ارتفاع]` بالبكسل.

التخطيط والحركة لكل مشهد في `src/scenes.js`، ومحرك التوقيت في `src/engine.js`.

## الهيكل
```
assets/images/poster.jpg   الصورة الأصلية
assets/fonts/              خطّا Cairo وTajawal (رخصة SIL OFL)
assets/audio/              music.wav المولَّد + narration.wav (اختياري)
config/config.json         النصوص والتوقيتات والألوان
src/                       index.html, styles.css, engine.js, scenes.js
scripts/                   render.mjs, server.mjs, snap.mjs, make_music.py
docs/                      script.md, narration.md
output/                    MP4, SRT, cover.png
```
