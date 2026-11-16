#!/usr/bin/env python3
"""Build the final audio mix for the reel.

Inputs  (assets/audio):  vo_take1.mp3, music.mp3, sfx_spill_b.mp3
Outputs (public/audio):  mix.wav  (+ stems: vo.wav, music_ducked.wav, sfx.wav)

- Voice-over starts at VO_OFFSET, is gently levelled and never time-stretched.
- Music is extended by one seamless loop so it stays full under the whole
  voice-over, side-chain ducked while the voice speaks, and faded at the end.
- Water-spill SFX is softened (slow attack, low-passed, low level).
- A soft-knee limiter keeps the true peak under -1.5 dBFS (no clipping).

Run:  python3 scripts/build_audio.py      (needs ffmpeg + numpy)
"""
import json
import subprocess
import wave
from pathlib import Path

import numpy as np

SR = 48000
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "audio"
OUT = ROOT / "public" / "audio"

TOTAL = 19.0        # video duration in seconds (keep in sync with src/timing.ts)
VO_OFFSET = 0.70    # when the voice-over starts
SFX_AT = 0.42       # when the cup tips over

VO_GAIN_DB = 0.0    # after normalisation to VO_TARGET_RMS
VO_TARGET_RMS_DB = -15.5
MUSIC_RMS_DB = -22.5  # un-ducked music bed level (dBFS RMS)
DUCK_DB = -9.5      # extra attenuation while the voice is speaking
SFX_PEAK_DB = -12.0


def load(path, channels=2):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-ac", str(channels),
         "-ar", str(SR), "-f", "f32le", "-"],
        capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, channels).astype(np.float64)


def db(x):
    return 10 ** (x / 20)


def rms_db(x):
    return 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)


def onepole_lp(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = np.zeros(x.shape[1])
    for i in range(len(x)):
        acc = a * acc + (1 - a) * x[i]
        y[i] = acc
    return y


def smooth(env, attack, release):
    """Asymmetric envelope smoothing (seconds)."""
    aa, ar = np.exp(-1 / (attack * SR)), np.exp(-1 / (release * SR))
    out = np.empty_like(env)
    acc = 0.0
    for i, v in enumerate(env):
        c = aa if v > acc else ar
        acc = c * acc + (1 - c) * v
        out[i] = acc
    return out


def place(buf, clip, at):
    s = int(round(at * SR))
    e = min(len(buf), s + len(clip))
    buf[s:e] += clip[: e - s]


def fade(n, kind="in"):
    t = np.linspace(0, 1, n)
    c = np.sin(t * np.pi / 2) ** 2
    return (c if kind == "in" else c[::-1])[:, None]


def find_loop(music, x_at, lo=2.5, hi=7.5, win=1.2):
    """Find loop length L so that music[x_at-L] sounds like music[x_at]."""
    mono = music.mean(axis=1)
    hop, n = 1024, 4096
    frames = np.array([
        np.abs(np.fft.rfft(mono[i:i + n] * np.hanning(n)))[:400]
        for i in range(0, len(mono) - n, hop)])
    frames = np.log1p(frames * 50)
    fps = SR / hop
    w = int(win * fps)
    c = int(x_at * fps)
    ref = frames[c - w:c + w].ravel()
    best, best_l = -1, lo
    for lag in range(int(lo * fps), int(hi * fps)):
        seg = frames[c - lag - w:c - lag + w].ravel()
        if len(seg) != len(ref):
            continue
        score = float(np.dot(ref, seg) / (np.linalg.norm(ref) * np.linalg.norm(seg) + 1e-9))
        if score > best:
            best, best_l = score, lag / fps
    return best_l, best


def write_wav(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(x.shape[1])
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    n_total = int(TOTAL * SR)

    # ---------- voice-over ----------
    vo = load(SRC / "vo_take1.mp3", 1)
    vo_dur = len(vo) / SR
    assert VO_OFFSET + vo_dur <= TOTAL - 0.5, "voice-over would be cut off"
    # gentle high-pass (remove rumble) = x - lowpass(x)
    vo = vo - onepole_lp(vo, 70)
    active = np.abs(vo[:, 0]) > db(-45)
    vo *= db(VO_TARGET_RMS_DB - rms_db(vo[active])) * db(VO_GAIN_DB)
    # soft compression of the loudest peaks (2.5:1 above -10 dBFS)
    env = smooth(np.abs(vo[:, 0]), 0.003, 0.08)
    over = np.maximum(20 * np.log10(env + 1e-9) + 10.0, 0)
    vo *= db(-over * (1 - 1 / 2.5))[:, None]
    vo[: int(0.01 * SR)] *= fade(int(0.01 * SR))
    vo[-int(0.05 * SR):] *= fade(int(0.05 * SR), "out")
    vo_bus = np.zeros((n_total, 2))
    place(vo_bus, np.repeat(vo, 2, axis=1), VO_OFFSET)

    # ---------- music ----------
    music = load(SRC / "music.mp3", 2)
    music *= db(MUSIC_RMS_DB - rms_db(music[: int(13 * SR)]))  # level the body
    x_at = 9.0
    loop_len, score = find_loop(music, x_at)
    xf = int(0.5 * SR)
    a_end = int(x_at * SR)
    b_start = int((x_at - loop_len) * SR)
    part_a = music[: a_end + xf].copy()
    part_b = music[b_start:].copy()
    part_a[-xf:] *= fade(xf, "out")
    part_b[:xf] *= fade(xf, "in")
    ext = np.zeros((a_end + len(part_b), 2))
    ext[: len(part_a)] += part_a
    ext[a_end: a_end + len(part_b)] += part_b
    music_bus = np.zeros((n_total, 2))
    place(music_bus, ext, 0.0)
    music_bus = onepole_lp(music_bus, 9000)
    # side-chain ducking driven by the voice
    key = smooth(np.abs(vo_bus[:, 0]), 0.004, 0.25)
    speaking = np.clip((20 * np.log10(key + 1e-9) + 42) / 12, 0, 1)
    speaking = smooth(speaking, 0.12, 0.45)
    music_bus *= db(DUCK_DB * speaking)[:, None]
    music_bus[: int(0.6 * SR)] *= fade(int(0.6 * SR))
    tail = int(2.0 * SR)
    music_bus[-tail:] *= fade(tail, "out")

    # ---------- water spill ----------
    sfx = load(SRC / "sfx_spill_b.mp3", 2)
    sfx = onepole_lp(sfx, 5500)
    att = int(0.09 * SR)
    sfx[:att] *= fade(att)                       # no sudden transient
    sfx[-int(0.5 * SR):] *= fade(int(0.5 * SR), "out")
    sfx *= db(SFX_PEAK_DB) / (np.max(np.abs(sfx)) + 1e-9)
    sfx_bus = np.zeros((n_total, 2))
    place(sfx_bus, sfx, SFX_AT)

    # ---------- mix + limiter ----------
    mix = vo_bus + music_bus + sfx_bus
    ceiling = db(-1.5)
    peak = smooth(np.max(np.abs(mix), axis=1), 0.0005, 0.12)
    gain = np.minimum(1.0, ceiling / (peak + 1e-9))
    look = int(0.003 * SR)                       # 3 ms look-ahead
    gain = np.minimum(gain, np.concatenate([gain[look:], np.ones(look)]))
    mix *= gain[:, None]
    mix = np.clip(mix, -ceiling, ceiling)

    write_wav(OUT / "mix.wav", mix)
    write_wav(OUT / "vo.wav", vo_bus)
    write_wav(OUT / "music_ducked.wav", music_bus)
    write_wav(OUT / "sfx.wav", sfx_bus)

    report = {
        "total_sec": TOTAL,
        "vo_offset_sec": VO_OFFSET,
        "vo_duration_sec": round(vo_dur, 3),
        "vo_end_sec": round(VO_OFFSET + vo_dur, 3),
        "music_loop_len_sec": round(loop_len, 3),
        "music_loop_similarity": round(score, 3),
        "mix_peak_dbfs": round(20 * np.log10(np.max(np.abs(mix))), 2),
        "mix_rms_dbfs": round(rms_db(mix), 2),
        "limiter_max_reduction_db": round(-20 * np.log10(gain.min()), 2),
        "clipped_samples": int(np.sum(np.abs(mix) >= 0.999)),
    }
    (OUT / "mix_report.json").write_text(json.dumps(report, indent=2))
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
