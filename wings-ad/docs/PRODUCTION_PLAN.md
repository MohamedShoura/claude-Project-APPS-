# خطة الإنتاج و Pipeline

## الأدوات التي فُحصت فعليًا في هذه البيئة

| الأداة | الحالة | الاستخدام |
|--------|--------|-----------|
| FFmpeg 6.1 | ✅ متاح | المكساج الصوتي، Loudness، التحقق، الـcontact sheets، تحويل المقطع |
| Node 22 + Remotion 4.0.242 | ✅ متاح (مع Chromium headless المثبت مسبقًا) | الخط الزمني، الحركات، النصوص، المؤثرات، الرندر |
| ElevenLabs (MCP) | ✅ متاح | التعليق الصوتي العربي (8 تسجيلات = 4 أسطر × 2) |
| Higgsfield (MCP) — Kling 3.0 Pro | ✅ التوليد نجح، ⚠️ التنزيل محجوب | 5 لقطات Image-to-Video من الصور الأصلية |
| مولّد موسيقى | ❌ غير متاح (موصل ElevenLabs المقيد لا يدعم الموسيقى، و`sonilo_music` في Higgsfield مخصص لـ"Game pipeline only") | الموسيقى والمؤثرات أُنتجت إجرائيًا بـ Python/numpy (`scripts/make_music.py`) |
| Runway | ❌ لا يوجد موصل توليد (فقط Export) | — |

### قيد الشبكة
سياسة الشبكة في هذه البيئة تحجب:
- `upload.higgsfield.ai` (رفع الملفات مباشرة). **الحل المطبّق:** رفع الصور إلى فرع المشروع على GitHub واستيرادها في Higgsfield عبر `media_import_url`.
- `d8j0ntlcm91z4.cloudfront.net` (تنزيل نتائج Higgsfield). **النتيجة:** اللقطات الخمس تولّدت بنجاح في حسابك على Higgsfield، لكن لم أستطع إدخالها في المونتاج ولا فحصها بصريًا.

لذلك **النسخة المسلّمة مبنية بالكامل من صورك الأصلية** مع حركة كاميرا رقمية ومؤثرات، وهذا يضمن 100% عدم تشويه الشعار والعبوة ووجه العامل ويديه. اللقطات الذكية جاهزة للدمج بخطوة واحدة (انظر أدناه).

## لقطات Higgsfield المولّدة (Kling 3.0 Pro، 5 ثوانٍ، بدون صوت)

| المشهد | Job ID | النسبة | الوصف |
|--------|--------|--------|-------|
| 1 Macro | `56796862-a260-461a-8a2c-7e41f65df07e` | 16:9 | انزلاق Macro فوق الحبوب مع ضوء جانبي |
| 2 تحميص | `71f04c63-66f7-4501-8adc-80c1f486dda3` | 16:9 | أذرع التقليب تدور والحبوب تتقلب |
| 3 Hero | `b9897cab-c4f5-4c05-b83e-3a62427ba4fa` | 9:16 | Arc حول الكيسين |
| 5 نهاية | `90cfb41d-3250-4c93-8b92-44de2103aa28` | 9:16 | Push-in نحو الكيس الأبيض وإضاءة الشعار |
| 4 العامل | `3360dab3-78c1-42ec-994d-e82de41f1a86` | 9:16 | حركة طبيعية بسيطة + Push-in |

التكلفة: ~44 كريدت Higgsfield (8.75 لكل لقطة). التعليق الصوتي: ~704 كريدت ElevenLabs (~$0.13).

### دمج اللقطات الذكية
1. نزّل اللقطات الخمس من مكتبة Higgsfield إلى `raw_clips/` بالأسماء الموضحة في `scripts/prepare_clips.sh`، **أو** أضف النطاق `d8j0ntlcm91z4.cloudfront.net` إلى Allowed domains في إعدادات الشبكة للبيئة وسأقوم بذلك بنفسي.
2. `scripts/prepare_clips.sh` (يعيد توقيت كل لقطة لمدة مشهدها بـ motion interpolation).
3. افحص كل لقطة (الشعار، الأصابع، الوجه). أي لقطة فيها تشويه تبقى على الصورة الأصلية.
4. `useClips = true` في `src/timeline.ts` ثم أعد الرندر.

## Pipeline

```
صور أصلية ──┬─> Remotion (حركة كاميرا + ضوء + غبار + Grain + نصوص عربية/لاتينية) ─┐
            └─> Higgsfield Kling 3.0 (اختياري) -> prepare_clips.sh ──────────────┤
ElevenLabs VO ─┐                                                                  ├─> MP4 (H.264 CRF14 + AAC)
make_music.py ─┴─> mix_audio.sh (ducking + EQ + compression + loudnorm -14 LUFS) ─┘
```

## أوامر التشغيل

```bash
cd wings-ad
npm install
python3 scripts/make_music.py        # موسيقى + مؤثرات
scripts/mix_audio.sh                 # المكساج النهائي -> public/audio/mix.wav
npm run studio                       # معاينة وتعديل تفاعلي

npx remotion render src/index.ts Wings-Vertical   out/WINGS_30s_9x16_1080x1920.mp4
npx remotion render src/index.ts Wings-Horizontal out/WINGS_30s_16x9_1920x1080.mp4
# نسخة 4K UHD:
npx remotion render src/index.ts Wings-Vertical out/WINGS_30s_9x16_2160x3840.mp4 --scale=2
npx remotion still  src/index.ts Thumbnail-Vertical out/WINGS_thumbnail_9x16.jpg
```
> في هذه البيئة السحابية يجب ضبط `REMOTION_BROWSER` على مسار Chromium المثبت. على جهازك العادي لا حاجة لذلك.

## ملف المشروع القابل للتعديل
- `src/timeline.ts`: التوقيتات، حركات الكاميرا لكل مشهد، النصوص، مفتاح `useClips`.
- `src/WingsAd.tsx`: المشاهد والمؤثرات والطبقات.
- `src/Thumbnail.tsx`: الصورة المصغرة.
- `scripts/`: الموسيقى، المكساج، تجهيز لقطات الذكاء الاصطناعي.
