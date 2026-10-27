"""Generate a calm, royalty-free background bed (procedurally synthesized, so no licensing issues).

Usage: python3 scripts/make_music.py <duration_seconds> <out.wav>
"""
import sys, wave
import numpy as np

SR = 44100
dur = float(sys.argv[1]); out = sys.argv[2]
n = int(SR * dur)
t = np.arange(n) / SR
mix = np.zeros(n)

def hz(m):  # MIDI note -> Hz
    return 440.0 * 2 ** ((m - 69) / 12)

# I – vi – IV – V in C major, 4 s per chord (≈60 BPM), voiced softly in the mid register.
chords = [[60, 64, 67, 72], [57, 60, 64, 69], [53, 57, 60, 65], [55, 59, 62, 67]]
bar = 4.0
rng = np.random.default_rng(7)
k = 0
while k * bar < dur:
    c = chords[k % 4]
    a, b = int(k * bar * SR), min(n, int((k * bar + bar + 1.5) * SR))   # overlap for smooth crossfade
    tt = np.arange(b - a) / SR
    env = np.minimum(1, tt / 1.2) * np.minimum(1, np.maximum(0, (bar + 1.5 - tt) / 1.5))
    for m in c:                                   # warm pad: two slightly detuned sines + soft octave
        f = hz(m)
        mix[a:b] += env * 0.05 * (np.sin(2 * np.pi * f * tt) + np.sin(2 * np.pi * f * 1.003 * tt) + 0.3 * np.sin(2 * np.pi * 2 * f * tt))
    fb = hz(c[0] - 12)                            # gentle bass
    mix[a:b] += env * 0.06 * np.sin(2 * np.pi * fb * tt)
    for j in range(8):                            # light plucked arpeggio, 8th notes
        s = int((k * bar + j * 0.5) * SR)
        if s >= n: break
        L = min(n - s, int(1.4 * SR)); pt = np.arange(L) / SR
        f = hz(c[[0, 1, 2, 3, 2, 1, 2, 3][j]] + 12)
        mix[s:s + L] += 0.035 * np.exp(-pt * 3.2) * np.sin(2 * np.pi * f * pt) * (0.8 + 0.2 * rng.random())
    k += 1

mix *= np.minimum(1, t / 2.5) * np.minimum(1, (dur - t) / 3.0)   # fade in / out
mix /= np.max(np.abs(mix)) + 1e-9
mix *= 0.5
stereo = np.stack([mix, np.roll(mix, int(0.012 * SR))], axis=1)   # tiny Haas delay for width
pcm = (stereo * 32767).astype('<i2')
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('music ->', out)
