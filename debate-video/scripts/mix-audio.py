#!/usr/bin/env python3
"""المزج الصوتي النهائي وفق src/config/timeline.json:
- توحيد مستوى كل مقطع (تعليق: -16 LUFS، مقاطع المناظرة: -18 LUFS) بكسب ثابت دون ضغط إضافي.
- موسيقى خلفية أصلية تنخفض تلقائيًا أثناء الكلام (ducking) وترتفع قليلًا في المشاهد البصرية.
- مؤثر انتقال خفيف (swell) قبل بطاقات المحاور فقط.
- تطبيع نهائي بمرحلتين إلى -16 LUFS وقمة حقيقية لا تتجاوز -1.5 dBTP.
الاستخدام: python3 scripts/mix-audio.py [--allow-missing-narration]
"""
import json, pathlib, re, subprocess, sys
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
SR = 48000
TL = json.loads((ROOT / "src/config/timeline.json").read_text(encoding="utf-8"))
OUT = ROOT / "out"; OUT.mkdir(exist_ok=True)
ALLOW_MISSING = "--allow-missing-narration" in sys.argv
LEVEL = {"narration": -16.0, "debate": -18.0}
MUSIC = {"open": -27.0, "under_narration": -33.0, "under_debate": -38.0}  # LUFS تقريبية للموسيقى

def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).copy()

def lufs_of(x):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-f", "f32le", "-ac", "2", "-ar", str(SR), "-i", "-", "-af", "ebur128", "-f", "null", "-"],
                       input=x.astype(np.float32).tobytes(), capture_output=True)
    m = re.findall(r"I:\s+(-?[\d.]+) LUFS", p.stderr.decode())
    return float(m[-1]) if m else -70.0

total = TL["totalFrames"] / TL["fps"]
N = int(total * SR) + SR
voice = np.zeros((N, 2), np.float32)
speech_mask = np.zeros(N, np.float32)   # 1 = تعليق صوتي
debate_mask = np.zeros(N, np.float32)   # 1 = صوت أصلي
missing = []

for a in TL["audio"]:
    f = ROOT / "public" / a["file"]
    if not f.exists():
        missing.append(a["id"]); continue
    x = load(f)
    g = 10 ** ((LEVEL[a["kind"]] - lufs_of(x)) / 20)
    s = int(a["start"] * SR); e = min(N, s + len(x))
    voice[s:e] += x[: e - s] * g
    (speech_mask if a["kind"] == "narration" else debate_mask)[s:e] = 1

if missing:
    msg = f"ملفات تعليق صوتي غير موجودة: {missing} — شغّل scripts/fetch-narration.sh"
    if not ALLOW_MISSING: sys.exit(msg)
    print("تحذير:", msg)

# الموسيقى
music_path = ROOT / "public/assets/audio/music/bed.wav"
subprocess.run([sys.executable, "-I", str(ROOT / "scripts/make-music.py"), f"{total + 1:.2f}", str(music_path)], check=True)
mus = load(music_path)[:N]
mus = np.pad(mus, ((0, N - len(mus)), (0, 0)))
mus *= 10 ** ((MUSIC["open"] - lufs_of(mus)) / 20)

def smooth(m, attack=0.25, release=0.6):
    # تنعيم أُسّي على عينات مخفّضة لتسريع الحساب
    v = 0.0; step = 480; ds = m[::step]; o = np.empty_like(ds)
    a = 1 - np.exp(-step / (attack * SR)); r = 1 - np.exp(-step / (release * SR))
    for i, t in enumerate(ds):
        v += (t - v) * (a if t > v else r); o[i] = v
    return np.repeat(o, step)[: len(m)]

duck_n = smooth(speech_mask, 0.15, 0.7)
duck_d = smooth(debate_mask, 0.4, 1.0)
gdb = duck_n * (MUSIC["under_narration"] - MUSIC["open"]) + duck_d * (MUSIC["under_debate"] - MUSIC["open"])
mus *= (10 ** (gdb / 20))[:, None]

# مؤثر انتقال خفيف قبل بطاقات المحاور: نَفَس ضوضاء مُرشّح يتصاعد ثم يخفت
rng = np.random.default_rng(3)
for sc in TL["scenes"]:
    if sc["type"] != "chapter": continue
    t0 = sc["from"] / TL["fps"] - 0.6; L = int(1.4 * SR); s = max(0, int(t0 * SR))
    n = rng.standard_normal(L).astype(np.float32)
    k = np.hanning(64); k /= k.sum(); n = np.convolve(n, k, "same")
    env = np.sin(np.linspace(0, np.pi, L)) ** 2
    sw = (n * env * 0.012)[:, None] * np.array([[0.9, 1.0]], np.float32)
    e = min(N, s + L); voice[s:e] += sw[: e - s]

mix = voice + mus
mix = mix[: int(total * SR)]
tmp = OUT / "mix-pre.wav"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ac", "2", "-ar", str(SR), "-i", "-", "-c:a", "pcm_f32le", str(tmp)], input=mix.tobytes(), check=True)

# تطبيع بمرحلتين
p = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(tmp), "-af", "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True)
js = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", p.stderr.decode(), re.S).group(0))
af = (f"loudnorm=I=-16:TP=-1.5:LRA=11:measured_I={js['input_i']}:measured_TP={js['input_tp']}:"
      f"measured_LRA={js['input_lra']}:measured_thresh={js['input_thresh']}:offset={js['target_offset']}:linear=true,"
      "alimiter=limit=0.84:attack=5:release=50:level=false,aresample=48000")
final = OUT / "mix-final.wav"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp), "-af", af, "-ar", str(SR), "-c:a", "pcm_s24le", str(final)], check=True)
m = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(final), "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True).stderr.decode()
I = re.findall(r"I:\s+(-?[\d.]+) LUFS", m)[-1]; TP = re.findall(r"Peak:\s+(-?[\d.]+) dBFS", m)[-1]
print(f"mix ok → {final.name}: {I} LUFS, true peak {TP} dBTP")
