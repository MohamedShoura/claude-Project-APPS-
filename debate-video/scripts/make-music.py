#!/usr/bin/env python3
"""يولّد موسيقى خلفية أصلية هادئة (Ambient) برمجيًا، دون أي عينات خارجية، لتجنّب مشكلات الترخيص.
الاستخدام: python3 scripts/make-music.py <المدة_بالثواني> <ملف_الإخراج.wav>"""
import sys, wave, numpy as np

SR = 48000
dur = float(sys.argv[1]) if len(sys.argv) > 1 else 330
out = sys.argv[2] if len(sys.argv) > 2 else "public/assets/audio/music/bed.wav"
rng = np.random.default_rng(7)
n = int(dur * SR); t = np.arange(n) / SR
L = np.zeros(n); R = np.zeros(n)

def hz(m): return 440 * 2 ** ((m - 69) / 12)
# تقدّم هارموني دافئ: Dmaj9 – Bm9 – Gmaj9 – Asus2  (≈ 68 BPM، كل كورد 4 نبضات)
chords = [[50, 57, 61, 64, 66], [47, 54, 57, 61, 62], [43, 50, 54, 57, 59], [45, 52, 57, 59, 64]]
beat = 60 / 68; bar = 4 * beat

def env(length, a, r):
    e = np.ones(length); ai = int(a * SR); ri = int(r * SR)
    e[:ai] = np.linspace(0, 1, ai) ** 2; e[-ri:] *= np.linspace(1, 0, ri) ** 2
    return e

k = 0; pos = 0.0
while pos < dur:
    ch = chords[k % 4]; s = int(pos * SR); ln = min(int((bar + 1.5) * SR), n - s)
    if ln <= 0: break
    tt = np.arange(ln) / SR; e = env(ln, 1.2, 1.6)
    for j, m in enumerate(ch):  # طبقة Pad ناعمة بموجات جيبية مع تذبذب بسيط
        f = hz(m)
        v = (np.sin(2*np.pi*f*tt + 0.002*np.sin(2*np.pi*0.3*tt)) * 0.6 + np.sin(2*np.pi*2*f*tt) * 0.12) * e * 0.05
        pan = 0.3 + 0.4 * (j / 4)
        L[s:s+ln] += v * (1 - pan); R[s:s+ln] += v * pan
    # نقرات بيانو خفيفة (أربيجيو) على نوتات الكورد بأوكتاف أعلى
    for b in range(8):
        ps = s + int(b * beat / 2 * SR)
        if b % 2 and rng.random() < 0.5: continue
        m = ch[(b * 2 + k) % len(ch)] + 12
        pl = min(int(2.2 * SR), n - ps)
        if pl <= 0: continue
        pt = np.arange(pl) / SR; f = hz(m)
        v = (np.sin(2*np.pi*f*pt) + 0.3*np.sin(2*np.pi*2*f*pt) + 0.1*np.sin(2*np.pi*3*f*pt)) * np.exp(-pt * 2.8) * 0.035
        v[:96] *= np.linspace(0, 1, 96)
        pan = rng.uniform(0.25, 0.75)
        L[ps:ps+pl] += v * (1 - pan); R[ps:ps+pl] += v * pan
    pos += bar; k += 1

# صدى بسيط (تأخيرات متعددة) لإحساس بالمساحة
for d, g in [(0.23, 0.25), (0.37, 0.18), (0.61, 0.12)]:
    di = int(d * SR); L[di:] += R[:-di] * g; R[di:] += L[:-di] * g
# ترشيح منخفض بسيط وتلاشي البداية والنهاية
kern = np.hanning(9); kern /= kern.sum()
L = np.convolve(L, kern, "same"); R = np.convolve(R, kern, "same")
fade = int(3 * SR); g = np.ones(n); g[:fade] = np.linspace(0, 1, fade); g[-fade:] = np.linspace(1, 0, fade)
L *= g; R *= g
peak = max(np.abs(L).max(), np.abs(R).max()); L /= peak / 0.7; R /= peak / 0.7
pcm = (np.stack([L, R], 1) * 32767).astype(np.int16)
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print("music ok", out, dur)
