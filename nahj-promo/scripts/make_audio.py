#!/usr/bin/env python3
"""Builds the audio assets for the Nahj promo.

* public/audio/music.wav – original corporate track, synthesized here
  (120 BPM, 20 s) – no third-party samples, so no licensing issue.
* public/audio/sfx.wav   – impact / whoosh / riser effects aligned to scenes.
* public/audio/vo/vo_N.wav + src/vo-durations.json – voice-over clips
  loudness-normalized from public/audio/vo/src/*, if present.

Usage:  python3 scripts/make_audio.py
"""
import json
import os
import subprocess
import wave

import numpy as np

SR = 48000
DUR = 20.0
N = int(SR * DUR)
FPS = 30
BPM = 120
BEAT = 60 / BPM  # 0.5 s
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'audio')
rng = np.random.default_rng(7)


def t_arr(n):
    return np.arange(n) / SR


def write_wav(path, stereo):
    stereo = np.clip(stereo, -1, 1)
    data = (stereo * 32767).astype('<i2')
    with wave.open(path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


def place(buf, sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= len(buf):
        return
    sig = sig[: len(buf) - i]
    l = np.cos((pan + 1) * np.pi / 4)
    r = np.sin((pan + 1) * np.pi / 4)
    buf[i : i + len(sig), 0] += sig * gain * l * 1.414
    buf[i : i + len(sig), 1] += sig * gain * r * 1.414


def lp_fast(x, cutoff):
    # FFT brick-ish low-pass with smooth roll-off (fast for long buffers)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))


def hp_fast(x, cutoff):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= (f / cutoff) ** 4 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))


def reverb(st, seconds=2.2, mix=0.22):
    n = int(SR * seconds)
    out = np.zeros_like(st)
    for ch in range(2):
        ir = rng.standard_normal(n) * np.exp(-t_arr(n) * 6.0 / seconds)
        ir = lp_fast(ir, 6000)
        ir /= np.sqrt(np.sum(ir ** 2))
        L = len(st) + n
        size = 1 << (L - 1).bit_length()
        wet = np.fft.irfft(np.fft.rfft(st[:, ch], size) * np.fft.rfft(ir, size), size)[: len(st)]
        out[:, ch] = st[:, ch] * (1 - mix) + wet * mix
    return out


def note(n):  # MIDI → Hz
    return 440.0 * 2 ** ((n - 69) / 12)


def env_adsr(n, a, d, s, r, total):
    e = np.ones(n) * s
    ai, di, ri = int(a * SR), int(d * SR), int(r * SR)
    ai = max(ai, 1)
    e[:ai] = np.linspace(0, 1, ai)
    e[ai : ai + di] = np.linspace(1, s, len(e[ai : ai + di]))
    sus_end = max(int(total * SR) - ri, ai + di)
    if sus_end < n:
        e[sus_end:] = np.linspace(e[sus_end - 1] if sus_end > 0 else s, 0, n - sus_end)
    return e


# ---------------------------------------------------------------- music
def make_music():
    mus = np.zeros((N, 2))
    bar = BEAT * 4  # 2 s
    # chord per bar (10 bars): Am F C G | Am F C G | F G | C (hold)
    prog = [
        [57, 60, 64], [53, 57, 60], [48, 55, 60, 64], [55, 59, 62],
        [57, 60, 64], [53, 57, 60], [48, 55, 60, 64], [55, 59, 62],
    ]
    roots = [45, 41, 36, 43, 45, 41, 36, 43]
    # bars 0..6.5 use prog; 15 s+ is the brand resolve
    t_end_prog = 15.0

    # --- pad
    for b in range(8):
        start = b * bar
        if start >= t_end_prog:
            break
        length = min(bar, t_end_prog - start) + 0.4
        n = int(length * SR)
        t = t_arr(n)
        sig = np.zeros(n)
        for m in prog[b]:
            for det in (-0.08, 0.08):
                f = note(m + 12) * (1 + det / 100)
                ph = rng.random()
                sig += (2 * ((f * t + ph) % 1) - 1) * 0.5  # saw
        sig = lp_fast(sig, 1800)
        e = env_adsr(n, 0.25, 0.3, 0.8, 0.4, length)
        gain = 0.035 if start < 3 else 0.05
        place(mus, sig * e, start, gain, pan=-0.2)
        place(mus, sig * e, start + 0.012, gain, pan=0.2)

    # --- pluck arpeggio (8th notes) from 3 s
    for b in range(8):
        for k in range(8):
            t0 = b * bar + k * BEAT / 2
            if t0 < 3.0 or t0 >= t_end_prog:
                continue
            chord = prog[b]
            m = chord[[0, 1, 2, 1, 2, 0, 1, 2][k] % len(chord)] + 12
            n = int(0.45 * SR)
            t = t_arr(n)
            f = note(m)
            s = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t))
            s *= np.exp(-t * 9)
            place(mus, s, t0, 0.055, pan=0.35 if k % 2 else -0.35)

    # --- kick + sub bass
    def kick():
        n = int(0.4 * SR)
        t = t_arr(n)
        f = 45 + 95 * np.exp(-t * 30)
        ph = 2 * np.pi * np.cumsum(f) / SR
        return np.sin(ph) * np.exp(-t * 7.5)

    k = kick()
    duck = np.ones(N)
    for i in range(int(t_end_prog / BEAT)):
        t0 = i * BEAT
        if t0 < 3.0:
            # sparse heartbeat during the hook
            if i in (1, 3, 5):
                place(mus, k, t0, 0.35)
            continue
        place(mus, k, t0, 0.5)
        j = int(t0 * SR)
        L = int(0.25 * SR)
        duck[j : j + L] = np.minimum(duck[j : j + L], 0.35 + 0.65 * np.linspace(0, 1, len(duck[j : j + L])))

    for b in range(8):
        start = b * bar
        if start < 3.0 or start >= t_end_prog:
            continue
        length = min(bar, t_end_prog - start)
        n = int(length * SR)
        t = t_arr(n)
        s = np.sin(2 * np.pi * note(roots[b]) * t) + 0.3 * np.sin(4 * np.pi * note(roots[b]) * t)
        s *= env_adsr(n, 0.01, 0.1, 0.9, 0.05, length)
        place(mus, s, start, 0.12)
    mus *= duck[:, None] * 0.6 + 0.4

    # --- hats (offbeats) from 3 s, claps on 2 & 4 from 7 s
    for i in range(int(t_end_prog / BEAT)):
        t0 = i * BEAT
        if t0 >= 3.0:
            n = int(0.06 * SR)
            hat = hp_fast(rng.standard_normal(n), 7000) * np.exp(-t_arr(n) * 70)
            place(mus, hat, t0 + BEAT / 2, 0.05, pan=0.25)
        if t0 >= 7.0 and i % 2 == 1:
            n = int(0.2 * SR)
            cl = hp_fast(rng.standard_normal(n), 1200) * np.exp(-t_arr(n) * 22)
            place(mus, cl, t0, 0.07)

    # --- brand resolve at 15 s: warm C major (add9) chord ringing out
    n = int(5.0 * SR)
    t = t_arr(n)
    sig = np.zeros(n)
    for m in [48, 55, 60, 62, 64, 67]:
        f = note(m)
        sig += np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)
    sig *= np.exp(-t * 0.45) * np.minimum(1, t / 0.02)
    place(mus, sig, 15.0, 0.06)
    # bell motif on the logo
    for idx, (m, dt) in enumerate([(72, 0.0), (76, 0.25), (79, 0.5), (84, 0.75)]):
        nn = int(2.0 * SR)
        tt = t_arr(nn)
        f = note(m)
        b = (np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(2 * np.pi * f * 2.76 * tt) * np.exp(-tt * 6)) * np.exp(-tt * 2.2)
        place(mus, b, 15.25 + dt, 0.05, pan=(-0.3 + idx * 0.2))
    # soft sub under the end card
    n = int(5.0 * SR)
    t = t_arr(n)
    sub = np.sin(2 * np.pi * note(36) * t) * np.exp(-t * 0.6) * np.minimum(1, t / 0.01)
    place(mus, sub, 15.0, 0.15)

    mus = reverb(mus, 2.4, 0.25)
    # tail fade
    fade = np.ones(N)
    fl = int(0.7 * SR)
    fade[-fl:] = np.linspace(1, 0, fl) ** 1.5
    mus *= fade[:, None]
    peak = np.max(np.abs(mus))
    return mus / peak * 0.8


# ---------------------------------------------------------------- sfx
def make_sfx():
    sfx = np.zeros((N, 2))

    def impact(dur=1.6):
        n = int(dur * SR)
        t = t_arr(n)
        f = 38 + 120 * np.exp(-t * 18)
        boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2)
        crack = hp_fast(rng.standard_normal(n), 2500) * np.exp(-t * 28) * 0.5
        return boom + crack

    def whoosh(dur=0.7, up=True):
        n = int(dur * SR)
        t = t_arr(n)
        noise = rng.standard_normal(n)
        # sweep a band through the noise by mixing low/high passes over time
        lo = lp_fast(noise, 900)
        hi = hp_fast(noise, 2500)
        x = t / dur
        mix = x if up else 1 - x
        s = lo * (1 - mix) + hi * mix
        e = np.sin(np.pi * x) ** 2
        return s * e

    def shimmer(dur=1.4):
        n = int(dur * SR)
        t = t_arr(n)
        s = np.zeros(n)
        for f in (2093, 2637, 3136, 4186):
            s += np.sin(2 * np.pi * f * t + rng.random() * 6)
        return s * np.exp(-t * 3) * np.minimum(1, t / 0.005) * 0.25

    # Hook: impact synced to the text slam (frame 6 → 0.2 s)
    place(sfx, whoosh(0.35, True), 0.0, 0.25)
    place(sfx, impact(), 6 / FPS, 0.9)
    place(sfx, shimmer(), 7 / FPS, 0.25)
    # transitions (scene cut minus a few frames)
    for cut in (3.0, 7.0, 11.0):
        place(sfx, whoosh(0.6, True), cut - 0.38, 0.22, pan=-0.3)
    # tick for each training keyword (local 44/60/76 + 102 start offset)
    for fr in (90 + 44, 90 + 60, 90 + 76):  # Training starts at global frame 90
        n = int(0.12 * SR)
        t = t_arr(n)
        tick = np.sin(2 * np.pi * 1760 * t) * np.exp(-t * 45)
        place(sfx, tick, fr / FPS, 0.12)
    # AI cards snap (local 38.. + 222)
    for i in range(6):
        n = int(0.08 * SR)
        t = t_arr(n)
        snap = hp_fast(rng.standard_normal(n), 3000) * np.exp(-t * 80)
        place(sfx, snap, (210 + 38 + i * 4 + 22) / FPS, 0.12, pan=(-0.4 if i % 2 else 0.4))
    # riser into the end card, then soft impact
    n = int(1.6 * SR)
    t = t_arr(n)
    riser = hp_fast(rng.standard_normal(n), 1500) * (t / 1.6) ** 2.5
    place(sfx, riser, 15.0 - 1.6, 0.16)
    place(sfx, impact(2.4) * 0.7, 15.0, 0.6)
    place(sfx, shimmer(2.0), 15.25, 0.2)

    sfx = reverb(sfx, 1.8, 0.2)
    peak = np.max(np.abs(sfx))
    return sfx / peak * 0.85


# ---------------------------------------------------------------- voice-over
def make_vo():
    src = os.path.join(OUT, 'vo', 'src')
    if not os.path.isdir(src):
        print('no VO sources found, skipping VO')
        return
    durs = []
    files = sorted(f for f in os.listdir(src) if not f.startswith('.'))
    for i, f in enumerate(files):
        dst = os.path.join(OUT, 'vo', f'vo_{i}.wav')
        # Level every clip to the same speech loudness: measure the 95th
        # percentile of 10 ms RMS windows and apply a plain linear gain.
        raw = subprocess.check_output(
            ['ffmpeg', '-v', 'error', '-i', os.path.join(src, f), '-ac', '1', '-ar', str(SR), '-f', 's16le', '-']
        )
        a = np.frombuffer(raw, dtype='<i2').astype(float) / 32768
        win = SR // 100
        rms = np.sqrt(np.mean(a[: len(a) // win * win].reshape(-1, win) ** 2, axis=1))
        p95 = 20 * np.log10(np.percentile(rms, 95) + 1e-9)
        gain_db = -11.0 - p95
        subprocess.run(
            [
                'ffmpeg', '-v', 'error', '-y', '-i', os.path.join(src, f),
                '-af', f'volume={gain_db:.2f}dB,highpass=f=70,alimiter=limit=0.89:level=disabled',
                '-ar', str(SR), '-ac', '1', dst,
            ],
            check=True,
        )
        print(f'vo_{i}: gain {gain_db:+.1f} dB')
        d = float(
            subprocess.check_output(
                ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', dst]
            )
        )
        durs.append(int(round(d * FPS)))
        print(f'vo_{i}: {d:.2f}s ({durs[-1]} frames)')
    with open(os.path.join(ROOT, 'src', 'vo-durations.json'), 'w') as fh:
        json.dump(durs, fh)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    write_wav(os.path.join(OUT, 'music.wav'), make_music())
    print('music.wav written')
    write_wav(os.path.join(OUT, 'sfx.wav'), make_sfx())
    print('sfx.wav written')
    make_vo()
