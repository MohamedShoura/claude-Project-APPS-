"""Procedural score + SFX for the WINGS 30s spot (numpy only, deterministic).

Writes public/audio/music.wav and public/audio/sfx.wav (48 kHz stereo).
Structure follows the edit:
  0-5s   S1 macro beans   : low drone, sparse piano, bean rattle
  5-11s  S2 roasting      : soft pulse enters, drum rumble, beans tumbling
  11-18s S3 hero product  : full pad + string lift, riser into 11s
  18-25s S4 human touch   : warm piano motif over pad
  25-30s S5 end card      : swell + low impact at 25s, decay to silence
"""
import numpy as np
import wave
import os

SR = 48000
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
t = np.arange(N) / SR
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT, exist_ok=True)


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env_adsr(n, a, d, s, r):
    a, d, r = int(a * SR), int(d * SR), int(r * SR)
    sus = max(n - a - d - r, 0)
    e = np.concatenate([
        np.linspace(0, 1, a, endpoint=False),
        np.linspace(1, s, d, endpoint=False),
        np.full(sus, s),
        np.linspace(s, 0, r),
    ])
    return e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))


def fft_filter(x, lo=None, hi=None):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.ones_like(f)
    if hi:
        m *= 1 / np.sqrt(1 + (f / hi) ** 4)
    if lo:
        m *= 1 / np.sqrt(1 + (lo / np.maximum(f, 1e-3)) ** 4)
    return np.fft.irfft(X * m, len(x))


def reverb(x, secs=3.2, mix=0.35, seed=1):
    r = np.random.default_rng(seed)
    n = int(secs * SR)
    ir = r.standard_normal(n) * np.exp(-np.arange(n) / SR * (6.9 / secs))
    ir = fft_filter(ir, lo=120, hi=7000)
    ir /= np.sqrt((ir ** 2).sum())
    L = len(x) + n
    nfft = 1 << (L - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, nfft) * np.fft.rfft(ir, nfft), nfft)[: len(x)]
    return (1 - mix) * x + mix * y * 0.9


def place(buf, sig, start):
    i = int(start * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i]


# ---------- instruments ----------
def piano(freq, dur=3.5, vel=0.5):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    s = np.zeros(n)
    for k, amp in enumerate([1, 0.45, 0.22, 0.12, 0.06, 0.03], start=1):
        fk = freq * k * (1 + 0.0004 * k * k)
        s += amp * np.sin(2 * np.pi * fk * tt) * np.exp(-tt * (1.1 + 0.9 * k))
    s *= np.minimum(1, tt / 0.004)
    return s * vel


def pad(freqs, dur, vel=0.12):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    s = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0.0, 0.11):
            ff = f * 2 ** (det / 12)
            ph = rng.uniform(0, 2 * np.pi)
            # band-limited saw approximation (first 10 harmonics)
            for k in range(1, 11):
                s += np.sin(2 * np.pi * ff * k * tt + ph * k) / k * 0.33
    s = fft_filter(s, lo=60, hi=1600)
    s *= env_adsr(n, 1.8, 0.5, 0.9, 1.8)
    return s / max(1e-9, np.abs(s).max()) * vel


def strings(freqs, dur, vel=0.10):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    s = np.zeros(n)
    vib = 1 + 0.003 * np.sin(2 * np.pi * 5.2 * tt)
    for f in freqs:
        for det in (-0.06, 0.07):
            ph = np.cumsum(2 * np.pi * f * 2 ** (det / 12) * vib / SR)
            for k in range(1, 8):
                s += np.sin(ph * k) / (k ** 1.3)
    s = fft_filter(s, lo=150, hi=3500)
    s *= env_adsr(n, 2.5, 0.5, 1.0, 2.0)
    return s / max(1e-9, np.abs(s).max()) * vel


def kick(vel=0.5):
    n = int(0.6 * SR)
    tt = np.arange(n) / SR
    f = 42 + 50 * np.exp(-tt * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 7) * vel


def impact(vel=0.9):
    n = int(4.0 * SR)
    tt = np.arange(n) / SR
    f = 34 + 70 * np.exp(-tt * 9)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 1.4)
    noise = fft_filter(rng.standard_normal(n), lo=200, hi=3000) * np.exp(-tt * 9) * 0.25
    return (boom + noise) * vel


def riser(dur, vel=0.25):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = rng.standard_normal(n)
    # sweep by blending progressively brighter filtered copies
    lo_b, hi_b = fft_filter(x, lo=200, hi=900), fft_filter(x, lo=1500, hi=9000)
    k = (tt / dur) ** 2
    return ((1 - k) * lo_b + k * hi_b) * k * vel


def whoosh(dur=1.2, vel=0.22):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = fft_filter(rng.standard_normal(n), lo=300, hi=4000)
    e = np.sin(np.pi * np.clip(tt / dur, 0, 1)) ** 2
    return x * e * vel


def bean_rattle(dur, density=180, vel=0.12, seed=3):
    r = np.random.default_rng(seed)
    n = int(dur * SR)
    out = np.zeros(n)
    count = int(density * dur)
    for _ in range(count):
        i = r.integers(0, n - 800)
        L = r.integers(120, 600)
        g = r.standard_normal(L) * np.exp(-np.arange(L) / (L / 5)) * r.uniform(0.2, 1)
        out[i:i + L] += g
    out = fft_filter(out, lo=1800, hi=9000)
    return out / max(1e-9, np.abs(out).max()) * vel


def rumble(dur, vel=0.10):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    x = fft_filter(rng.standard_normal(n), lo=30, hi=180)
    x *= 1 + 0.25 * np.sin(2 * np.pi * 0.8 * tt)
    return x / np.abs(x).max() * vel


# ---------- score (D minor, 70 bpm) ----------
mus = np.zeros(N)
D2, A2, D3, F3, A3, C4, D4, E4, F4, G4, A4, Bb3, G3 = (
    midi(m) for m in (38, 45, 50, 53, 57, 60, 62, 64, 65, 67, 69, 58, 55))

# drone under everything
dr = np.sin(2 * np.pi * D2 * t) * 0.05 + np.sin(2 * np.pi * A2 * t) * 0.03
mus += dr * np.clip(t / 2.5, 0, 1) * np.clip((DUR - t) / 2.5, 0, 1)

# S1: sparse piano
for tm, f in [(0.4, A4), (1.9, F4), (3.2, E4), (4.3, D4)]:
    place(mus, piano(f, 4, 0.22), tm)

# S2: pulse + pad Dm
beat = 60 / 70
for i in range(int((11 - 5) / beat)):
    place(mus, kick(0.28 if i % 2 == 0 else 0.16), 5 + i * beat)
place(mus, pad([D3, F3, A3, C4], 6.5, 0.10), 4.8)
for tm, f in [(5.6, D4), (6.9, F4), (8.2, A4), (9.5, G4)]:
    place(mus, piano(f, 4, 0.18), tm)

# S3: hero - Bbmaj7 -> Gm9, strings lift
place(mus, pad([Bb3 / 2, D3, F3, A3], 3.8, 0.13), 10.8)
place(mus, pad([G3 / 2, Bb3, D4, F4], 4.0, 0.13), 14.4)
place(mus, strings([D4, F4, A4], 7.5, 0.09), 11.0)
for i in range(int((18 - 11) / beat)):
    place(mus, kick(0.30 if i % 2 == 0 else 0.14), 11 + i * beat)

# S4: warm piano motif over Dm9
place(mus, pad([D3, F3, A3, E4], 7.2, 0.11), 18.0)
for tm, f in [(18.3, A3), (18.9, D4), (19.5, F4), (20.6, E4), (21.7, D4),
              (22.3, F4), (22.9, A4), (24.0, G4)]:
    place(mus, piano(f, 3.5, 0.17), tm)

# S5: resolve on D with swell, then decay
place(mus, pad([D3, A3, D4, F4], 5.0, 0.15), 24.8)
place(mus, strings([D4, A4, D4 * 2], 5.0, 0.08), 24.9)
for tm, f in [(25.0, D4), (25.0, A3), (27.2, F4), (27.6, A4)]:
    place(mus, piano(f, 4.5, 0.2), tm)

mus = reverb(mus, 3.4, 0.38)
mus *= np.clip((DUR - t) / 1.6, 0, 1)  # fade out last 1.6s

# ---------- SFX ----------
sfx = np.zeros(N)
place(sfx, bean_rattle(5.2, 120, 0.10, 3) * env_adsr(int(5.2 * SR), 0.8, 0, 1, 1.0), 0.0)
place(sfx, bean_rattle(6.4, 260, 0.13, 4) * env_adsr(int(6.4 * SR), 0.6, 0, 1, 1.0), 4.8)
place(sfx, rumble(6.6, 0.08) * env_adsr(int(6.6 * SR), 0.8, 0, 1, 1.2), 4.8)
place(sfx, riser(1.6, 0.16), 9.4)
place(sfx, whoosh(1.0, 0.18), 10.6)
place(sfx, whoosh(1.2, 0.14), 17.5)
place(sfx, riser(1.4, 0.14), 23.6)
place(sfx, impact(0.55), 25.0)
sfx = reverb(sfx, 1.8, 0.2, seed=5)


def write(name, mono, width=0.004):
    # cheap stereo: Haas delay on right channel
    d = int(width * SR)
    L = mono
    R = np.concatenate([np.zeros(d), mono[:-d]]) * 0.97 + mono * 0.03
    st = np.stack([L, R], 1)
    st /= max(1e-9, np.abs(st).max()) / 0.89
    pcm = (st * 32767).astype(np.int16)
    with wave.open(os.path.join(OUT, name), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


write("music.wav", mus)
write("sfx.wav", sfx, 0.002)
print("ok")
