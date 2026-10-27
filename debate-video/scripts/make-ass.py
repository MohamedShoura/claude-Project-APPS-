#!/usr/bin/env python3
"""يحوّل ترجمة التعليق الصوتي إلى ASS بتنسيق أنيق لحرقها داخل الفيديو (اختياري).
تُعرض أسطر التعليق فقط، لأن العبارة المحورية لكل مقطع أصلي ظاهرة أصلًا في بطاقة على الشاشة.
الموضع: منطقة الترجمة المحجوزة أسفل الشاشة (لا تغطي البطاقات أو الشخصيات)."""
import pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
srt = (ROOT / "out/subtitles.ar.srt").read_text(encoding="utf-8")
def t(s):
    h, m, rest = s.split(":"); sec, ms = rest.split(",")
    return f"{int(h)}:{m}:{sec}.{ms[:2]}"
head = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,Cairo,54,&H00FFFFFF,&H00FFFFFF,&H5A240F4A,&H5A240F4A,-1,0,0,0,100,100,0,0,3,18,0,2,110,110,190,178

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
ev = []
for block in srt.strip().split("\n\n"):
    lines = block.split("\n")
    s, e = lines[1].split(" --> ")
    text = " ".join(l.replace("‫", "") for l in lines[2:])
    if text.startswith("[صوت أصلي"): continue
    ev.append(f"Dialogue: 0,{t(s)},{t(e)},Sub,,0,0,0,,{text}")
(ROOT / "out/subtitles.ar.ass").write_text(head + "\n".join(ev) + "\n", encoding="utf-8")
print("ass ok", len(ev))
