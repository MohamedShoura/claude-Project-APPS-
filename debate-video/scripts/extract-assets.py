#!/usr/bin/env python3
"""يستخرج الأصول من الفيديو المرجعي: مقاطع القاعة، صور التكريم، ومقاطع صوت المناظرة.
الاستخدام: python3 scripts/extract-assets.py [input/source.mp4]"""
import json, subprocess, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "input" / "source.mp4")
cfg = json.loads((ROOT / "scripts" / "segments.json").read_text(encoding="utf-8"))
A = ROOT / "public" / "assets"

def ff(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)

# 1) مقاطع القاعة الحقيقية: قص النافذة فقط، تحسين معتدل للتعريض والألوان، دون تكبير مبالغ فيه
for c in cfg["clips"]:
    x, y, w, h = c["crop"]
    vf = (f"crop={w}:{h}:{x}:{y},scale={w*2}:{h*2}:flags=lanczos,"
          "eq=contrast=1.06:saturation=1.08:brightness=0.01,unsharp=5:5:0.6,fps=30,format=yuv420p")
    ff("-ss", str(c["start"]), "-to", str(c["end"]), "-i", SRC, "-an", "-vf", vf,
       "-c:v", "libx264", "-crf", "16", "-preset", "slow", str(A / "clips" / f"{c['id']}.mp4"))

# 2) صور التكريم: قص كل صورة من الشبكة الأصلية بإطارها الداخلي فقط
for p in cfg["photos"]:
    x, y, w, h = cfg["tiles"][p["tile"]]
    vf = f"crop={w}:{h}:{x}:{y},scale={w*2}:{h*2}:flags=lanczos,eq=contrast=1.05:saturation=1.06,unsharp=5:5:0.5"
    ff("-ss", str(p["t"]), "-i", SRC, "-frames:v", "1", "-vf", vf, "-q:v", "2", str(A / "photos" / f"{p['id']}.jpg"))

# 3) صوت المناظرة الأصلي: تنظيف معتدل (إزالة الهمهمة المنخفضة، تقليل ضوضاء القاعة، تسوية مستوى المتحدثات)
af = ("highpass=f=85,lowpass=f=11000,afftdn=nr=8:nf=-42:tn=1,"
      "equalizer=f=250:t=q:w=1.2:g=-2,equalizer=f=3200:t=q:w=1.0:g=2.5,"
      "dynaudnorm=f=300:g=21:p=0.7:m=6,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=180,"
      "afade=t=in:d=0.12,areverse,afade=t=in:d=0.18,areverse")
for d in cfg["debate"]:
    ff("-ss", str(d["start"]), "-to", str(d["end"]), "-i", SRC, "-vn", "-af", af,
       "-ac", "1", "-ar", "48000", "-c:a", "pcm_s16le", str(A / "audio" / "debate" / f"{d['id']}.wav"))
print("assets ok")
