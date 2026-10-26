"""Synthesize the synced SFX bed, a fallback music bed, and the final ducked mix.

Usage:
  python3 make_audio.py sfx   <out_dir>                 -> sfx.wav, music_fallback.wav
  python3 make_audio.py mix   <sfx.wav> <music.wav> <out.wav>

All timings follow the 30 s timeline in prompts/shots.json. Everything here is
generated procedurally (no third-party samples), so it is free to use.
"""
import sys
import wave
from pathlib import Path

import numpy as np

SR = 48000
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(7)


def t_axis(n):
    return np.arange(n) / SR


def env(points):
    """Piecewise-linear envelope over the full timeline from [(t, gain), ...]."""
    ts, gs = zip(*points)
    return np.interp(t_axis(N), ts, gs)


def fast_lp(x, cutoff):
    # FFT brick-ish lowpass with soft rolloff, much faster than the IIR loop
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / (1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))


def bandpass(x, lo, hi):
    return fast_lp(x, hi) - fast_lp(x, lo)


def place(buf, clip, at):
    i = int(at * SR)
    j = min(len(buf), i + len(clip))
    buf[i:j] += clip[: j - i]


def tone_burst(freq_fn, dur, attack=0.005, release=0.1):
    n = int(dur * SR)
    t = t_axis(n)
    f = freq_fn(t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    a = np.minimum(1, t / attack) * np.minimum(1, (dur - t) / release)
    return np.sin(ph) * np.clip(a, 0, 1)


def noise(n):
    return rng.standard_normal(n)


def horn(dur, f0):
    n = int(dur * SR)
    t = t_axis(n)
    x = sum(np.sign(np.sin(2 * np.pi * f0 * k * t)) / k for k in (1, 1.26))
    x = fast_lp(x, 1800)
    a = np.minimum(1, t / 0.02) * np.minimum(1, (dur - t) / 0.05)
    return x * a


def thud(dur=0.6, f0=55):
    n = int(dur * SR)
    t = t_axis(n)
    return np.sin(2 * np.pi * f0 * t * (1 - 0.3 * t)) * np.exp(-t * 9) + fast_lp(noise(n), 300) * np.exp(-t * 20) * 0.4


def click(dur=0.05):
    n = int(dur * SR)
    t = t_axis(n)
    return bandpass(noise(n), 1500, 6000) * np.exp(-t * 120)


def step(dur=0.18):
    n = int(dur * SR)
    t = t_axis(n)
    heel = bandpass(noise(n), 400, 4000) * np.exp(-t * 60)
    return heel + 0.5 * np.sin(2 * np.pi * 110 * t) * np.exp(-t * 40)


def build_sfx():
    L = np.zeros(N)
    t = t_axis(N)

    # Traffic ambience: rumble + idling engines, muffled inside the cabin (4-8 s)
    amb = fast_lp(noise(N), 500) * 0.5 + bandpass(noise(N), 800, 3000) * 0.08
    amb += 0.15 * np.sin(2 * np.pi * 38 * t) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.7 * t))
    L += amb * env([(0, 0), (0.4, 0.55), (3.9, 0.6), (4.05, 0.18), (7.9, 0.18), (8.1, 0.45), (13.5, 0.3), (14.5, 0.0), (30, 0)])
    for at, d, f in [(1.1, 0.35, 410), (2.6, 0.22, 360), (3.2, 0.5, 440)]:
        place(L, horn(d, f) * 0.22, at)
    for at, d, f in [(5.2, 0.3, 400)]:  # one distant horn heard through the glass
        place(L, fast_lp(horn(d, f), 700) * 0.12, at)

    # Button press + tech activation chirp + power-up whine
    place(L, click() * 0.8, 6.62)
    place(L, tone_burst(lambda x: 1200 + 1800 * x / 0.25, 0.25) * 0.25, 6.65)
    place(L, tone_burst(lambda x: 2400 + 0 * x, 0.12, release=0.08) * 0.15, 6.95)
    place(L, tone_burst(lambda x: 180 + 900 * (x / 1.4) ** 2, 1.4, attack=0.6, release=0.05) * 0.18, 6.75)

    # Thruster ignition, roar and lift (8-14 s), cruise (14-20), descent + spool-down (20-24.6)
    ign_n = int(1.2 * SR)
    ign_t = t_axis(ign_n)
    place(L, (fast_lp(noise(ign_n), 2500) * np.exp(-ign_t * 3.5) * 0.9 + thud(1.2, 45)[:ign_n] * 0.9), 8.0)
    roar = bandpass(noise(N), 60, 1600) * 0.7 + bandpass(noise(N), 2000, 7000) * 0.07
    roar += 0.25 * np.sin(2 * np.pi * (48 + 10 * np.clip((t - 8) / 6, 0, 1)) * t)
    L += roar * env([(0, 0), (7.95, 0), (8.15, 1.0), (13.5, 0.85), (14.2, 0.45), (19.8, 0.4), (20.2, 0.6),
                     (23.4, 0.55), (24.4, 0.0), (30, 0)])
    # air rush / wind while flying
    wind = bandpass(noise(N), 200, 2500) * (0.7 + 0.3 * np.sin(2 * np.pi * 0.35 * t))
    L += wind * env([(0, 0), (12.5, 0), (14.0, 0.5), (19.5, 0.45), (21.0, 0.1), (22, 0), (30, 0)])
    # pass-by whooshes
    for at, d in [(13.6, 1.2), (16.9, 1.0)]:
        n = int(d * SR)
        tt = t_axis(n)
        w = bandpass(noise(n), 300, 4000) * np.sin(np.pi * tt / d) ** 2
        place(L, w * 0.7, at)
    # spool-down whine and touchdown
    place(L, tone_burst(lambda x: 900 - 700 * x / 1.3, 1.3, attack=0.05, release=0.4) * 0.12, 23.2)
    place(L, thud(0.7, 60) * 0.8, 24.25)
    n = int(0.6 * SR)
    place(L, bandpass(noise(n), 2000, 8000) * np.exp(-t_axis(n) * 6) * 0.12, 24.3)  # air release hiss

    # Door, footsteps, final shimmer
    place(L, click(0.06) * 0.7, 25.35)
    n = int(0.7 * SR)
    place(L, bandpass(noise(n), 300, 2500) * np.sin(np.pi * t_axis(n) / 0.7) * 0.18, 25.4)
    for k, at in enumerate([26.15, 26.65, 27.15, 27.65, 28.1]):
        place(L, step() * (0.55 - 0.06 * k), at)
    place(L, tone_burst(lambda x: 1760 + 0 * x, 2.0, attack=0.3, release=1.5) * 0.05, 28.0)
    place(L, tone_burst(lambda x: 2637 + 0 * x, 2.0, attack=0.4, release=1.5) * 0.035, 28.1)

    # simple stereo: decorrelated copy with tiny delay
    R = np.roll(L, int(0.011 * SR)) * 0.9 + L * 0.1
    return np.stack([L, R], 1)


def build_music():
    """Fallback cinematic-electronic bed: pulse bass + pad, builds into the lift-off."""
    t = t_axis(N)
    bpm = 100
    beat = 60 / bpm
    chords = [(55.0, 65.41, 82.41), (43.65, 65.41, 87.31), (49.0, 61.74, 73.42), (41.2, 61.74, 82.41)]
    out = np.zeros(N)
    bar = 4 * beat
    for i, (r, a, b) in enumerate(chords * 4):
        s, e = i * bar, (i + 1) * bar
        if s >= DUR:
            break
        m = (t >= s) & (t < e)
        tt = t[m] - s
        pad = sum(np.sin(2 * np.pi * f * 2 * tt) + 0.5 * np.sin(2 * np.pi * f * 4.01 * tt) for f in (r, a, b))
        pulse = np.sin(2 * np.pi * r * tt) * np.exp(-((tt % (beat / 2)) * 9))
        out[m] += pad * 0.05 * np.minimum(1, tt / 0.8) + pulse * 0.35
    kick_t = np.arange(0, DUR, beat)
    for k in kick_t:
        if 8.0 <= k < 25.0:
            place(out, thud(0.35, 50) * 0.5, k)
    hat = bandpass(noise(N), 6000, 12000) * np.exp(-((t % (beat / 2)) * 40))
    out += hat * 0.08 * ((t > 8) & (t < 24.5))
    out *= env([(0, 0), (1.5, 0.6), (7.5, 0.8), (8.2, 1.0), (19.5, 1.0), (24.5, 0.75), (28, 0.8), (30, 0)])
    return np.stack([out, np.roll(out, 240)], 1)


def norm(x, peak=0.9):
    return x / (np.abs(x).max() + 1e-9) * peak


def write_wav(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


def read_wav(path):
    with wave.open(str(path), "rb") as w:
        assert w.getframerate() == SR and w.getnchannels() == 2, path
        x = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(np.float64) / 32767
    x = x.reshape(-1, 2)
    if len(x) < N:
        x = np.vstack([x, np.zeros((N - len(x), 2))])
    return x[:N]


def mix(sfx_path, music_path, out_path):
    sfx = read_wav(sfx_path)
    music = norm(read_wav(music_path), 0.8)
    # duck the music under the key sound details: button, ignition, touchdown + door
    duck = env([(0, 1), (6.3, 1), (6.5, 0.45), (7.6, 0.45), (8.0, 0.7), (8.6, 1), (23.8, 1), (24.1, 0.5),
                (26.0, 0.55), (27.0, 1), (30, 1)])
    fade = env([(0, 0), (0.3, 1), (29.0, 1), (30, 0)])
    m = (sfx * 0.85 + music * 0.55 * duck[:, None]) * fade[:, None]
    write_wav(out_path, norm(m, 0.89))


if __name__ == "__main__":
    if sys.argv[1] == "sfx":
        out = Path(sys.argv[2])
        out.mkdir(parents=True, exist_ok=True)
        write_wav(out / "sfx.wav", norm(build_sfx(), 0.9))
        write_wav(out / "music_fallback.wav", norm(build_music(), 0.9))
    elif sys.argv[1] == "mix":
        mix(*sys.argv[2:5])
