"""Original light sport-pop bed, 20.0 s, 120 BPM — synthesized from scratch (no samples, no third-party rights).
Usage: python3 make_music.py out.wav"""
import sys, wave, numpy as np
SR = 44100; DUR = 20.0; BPM = 120; BEAT = 60 / BPM; N = int(SR * DUR)
rng = np.random.default_rng(7)
out = np.zeros((N, 2))

def add(sig, t, pan=0.0, gain=1.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if i >= N: return
    s = sig[: j - i] * gain
    out[i:j, 0] += s * (1 - max(pan, 0)); out[i:j, 1] += s * (1 + min(pan, 0))

def env(n, a=0.005, d=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)

def kick():
    n = int(.35 * SR); t = np.arange(n) / SR
    f = 45 + 95 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .002, .12)

def clap():
    n = int(.25 * SR); x = rng.standard_normal(n)
    x = np.diff(np.concatenate([[0], x]))  # brighten
    e = env(n, .001, .07)
    for k in (0.010, 0.020): e += np.roll(env(n, .001, .012), int(k * SR)) * .6
    return x * e * .45

def hat(open_=False):
    n = int((.18 if open_ else .05) * SR); x = rng.standard_normal(n)
    x = np.diff(np.diff(np.concatenate([[0, 0], x])))
    return x * env(n, .001, .06 if open_ else .015) * .12

def tone(freq, length, kind='saw', d=.25, det=0.0):
    n = int(length * SR); t = np.arange(n) / SR
    ph = (freq * (1 + det)) * t
    if kind == 'saw': w = 2 * (ph % 1) - 1
    elif kind == 'tri': w = 2 * np.abs(2 * (ph % 1) - 1) - 1
    else: w = np.sin(2 * np.pi * ph)
    return w * env(n, .004, d)

def lp(x, a=.12):  # one-pole low-pass
    y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x): acc += a * (v - acc); y[i] = acc
    return y

midi = lambda m: 440 * 2 ** ((m - 69) / 12)
# C – G – Am – F, two bars each (bar = 2 s)
prog = [(48, [60, 64, 67]), (43, [59, 62, 67]), (45, [60, 64, 69]), (41, [60, 65, 69])]
END = 18.0  # groove stops; final chord rings out under the end card
bars = int(END / (4 * BEAT))
for b in range(bars):
    root, chord = prog[(b // 2) % 4]
    t0 = b * 4 * BEAT
    for q in range(4):
        tb = t0 + q * BEAT
        if not (b == 0 and q == 0): add(kick(), tb, gain=.9)
        if q in (1, 3) and b > 0: add(clap(), tb, gain=.8)
        add(hat(), tb + BEAT / 2, pan=.3); add(hat(), tb + BEAT * .75, pan=-.3, gain=.6)
        # off-beat bass
        add(lp(tone(midi(root), BEAT * .45, 'saw', .12), .08), tb + BEAT / 2, gain=.55)
    if b % 2 == 1: add(hat(True), t0 + 3.5 * BEAT, pan=.2)
    # pluck arpeggio, 8th notes
    pat = [0, 1, 2, 1, 2, 0, 1, 2]
    for s in range(8):
        f = midi(chord[pat[s]] + 12)
        p = lp(tone(f, .3, 'saw', .09) + tone(f, .3, 'saw', .09, det=.004), .2)
        add(p, t0 + s * BEAT / 2, pan=(-.25 if s % 2 else .25), gain=.16)
    # soft pad
    pad = sum(tone(midi(m), 4 * BEAT, 'tri', 1.6) for m in chord) / 3
    add(lp(pad, .05), t0, gain=.12)
# riser into the end card + final ring-out chord
n = int(1.0 * SR); r = rng.standard_normal(n) * np.linspace(0, 1, n) ** 2 * .06
add(np.diff(np.concatenate([[0], r])), END - 1.0)
add(kick(), END, gain=.9); add(clap(), END, gain=.6)
for m in [48, 60, 64, 67, 72]:
    add(lp(tone(midi(m), 2.0, 'saw', .9), .1), END, gain=.09)
    add(tone(midi(m), 2.0, 'tri', 1.2), END, gain=.07)
# master: fade-in 0.15 s, fade-out 18.9→19.85 s, hard silence to 20.0
t = np.arange(N) / SR
g = np.minimum(1, t / .15) * np.clip((19.85 - t) / .95, 0, 1)
out *= g[:, None]
out /= np.max(np.abs(out)) + 1e-9; out *= .89
with wave.open(sys.argv[1] if len(sys.argv) > 1 else 'music.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype('<i2').tobytes())
