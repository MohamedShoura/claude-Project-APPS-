# Builds vo.wav (placed voice lines), music.wav (royalty-free synthesized bed + soft whooshes)
# and mix.wav (ducked final mix), all exactly 20.0 s at 48 kHz stereo.
import subprocess, json, numpy as np

SR = 48000
DUR = 20.0
N = int(SR * DUR)

def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)

def speech_span(a):
    w = SR // 100
    e = np.array([np.sqrt(np.mean(a[i:i + w] ** 2)) for i in range(0, len(a) - w, w)])
    idx = np.where(e > e.max() * 0.05)[0]
    return idx[0] * w, min(len(a), (idx[-1] + 1) * w)

def tempo(a, f):
    if abs(f - 1) < 1e-3:
        return a
    p = subprocess.run(['ffmpeg', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-',
                        '-af', f'atempo={f:.4f}', '-f', 'f32le', '-'], input=a.astype(np.float32).tobytes(),
                       capture_output=True, check=True).stdout
    return np.frombuffer(p, np.float32).astype(np.float64)

def squeeze_pauses(a, max_pause=0.22, keep=0.16):
    """Shorten internal silences longer than max_pause to `keep` seconds (crossfaded).
    Returns the new signal and a function mapping old time (s, from seg start) -> new time."""
    w = SR // 100
    e = np.array([np.sqrt(np.mean(a[i:i + w] ** 2)) for i in range(0, len(a) - w, w)])
    quiet = e < e.max() * 0.04
    runs, i = [], 0
    while i < len(quiet):
        if quiet[i]:
            j = i
            while j < len(quiet) and quiet[j]:
                j += 1
            if i > 0 and j < len(quiet) and (j - i) * 0.01 > max_pause:
                runs.append((i * w, j * w))
            i = j
        else:
            i += 1
    out, cuts, pos = [], [], 0
    k = int(keep * SR); h = k // 2
    for s, e2 in runs:
        out.append(a[pos:s + h])
        cuts.append((s + h, e2 - h))          # removed region [s+h, e2-h)
        pos = e2 - h
    out.append(a[pos:])
    def tmap(x):
        xs = x * SR; removed = 0
        for c0, c1 in cuts:
            if xs >= c1: removed += c1 - c0
            elif xs > c0: removed += xs - c0
        return (xs - removed) / SR
    return np.concatenate(out), tmap

# ---- voice-over -------------------------------------------------------------
# (file, target speech start, latest allowed speech end, word times of interest)
STEP_WORDS = [1.78, 3.66, 5.46, 6.76]   # افهم / اكتب / طبّق / وراجع in m3.wav (whisper word starts)
lines = [('m1.wav', 0.30, 2.85), ('m2x.wav', 2.65, 7.0), ('m3.wav', 7.05, 14.2),
         ('m4.wav', 14.35, 17.6), ('m5.wav', 17.95, 19.35)]
clips, maps = [], []
need = 1.0
for f, t0, t1 in lines:
    a = load(f)
    s, e = speech_span(a)
    lead = max(0, s - int(.04 * SR))
    seg, tm = squeeze_pauses(a[lead:min(len(a), e + int(.12 * SR))])
    clips.append(seg); maps.append((lead / SR, tm))
    need = max(need, (len(seg) / SR) / (t1 - t0))
factor = min(need, 1.08)          # never speed up more than 8 %
vo = np.zeros(N)
report = []
prev_end = 0.0
for n, ((f, t0, t1), seg) in enumerate(zip(lines, clips)):
    seg = tempo(seg, factor)
    seg = seg / (np.max(np.abs(seg)) + 1e-9) * 0.89
    start = max(t0, prev_end + 0.12)   # never overlap the previous line
    i0 = int(start * SR)
    seg = seg[:N - i0]
    vo[i0:i0 + len(seg)] += seg
    prev_end = start + len(seg) / SR
    report.append((f, round(start, 2), round(prev_end, 2)))
    if f == 'm3.wav':
        lead, tm = maps[n]
        steps = [round(start + tm(w - lead) / factor, 2) for w in STEP_WORDS]
        print('STEPS', json.dumps(steps)); json.dump(steps, open('steps.json', 'w'))
print('tempo factor', round(factor, 3))
print('placements', report)

# ---- music: warm pad + soft arpeggio + gentle pulse (synthesized, royalty-free) ----
t = np.arange(N) / SR
def note(m): return 440.0 * 2 ** ((m - 69) / 12)
# progression (4 bars x 5 s): Am  F  C  G  (voiced low/mid)
prog = [[57, 60, 64], [53, 57, 60], [48, 55, 60, 64], [55, 59, 62]]
pad = np.zeros(N)
bar = 5.0
for b, chord in enumerate(prog):
    a0, a1 = int(b * bar * SR), int((b + 1) * bar * SR)
    tt = t[a0:a1] - b * bar
    env = np.minimum(1, tt / 0.8) * np.minimum(1, (bar - tt) / 0.8)
    for m in chord:
        fr = note(m)
        for det in (-0.12, 0.0, 0.12):
            pad[a0:a1] += env * np.sin(2 * np.pi * fr * (1 + det / 100) * tt) * 0.05
        pad[a0:a1] += env * np.sin(2 * np.pi * fr * 2 * tt) * 0.012
# soft plucked arpeggio from 3 s, eighth notes at 96 bpm
arp = np.zeros(N)
step = 60 / 96 / 2
k = 0
tt0 = 3.0
while tt0 < DUR - 1.2:
    b = min(3, int(tt0 // bar))
    chord = prog[b]
    m = chord[k % len(chord)] + 12
    i0 = int(tt0 * SR); L = int(0.9 * SR)
    seg_t = np.arange(min(L, N - i0)) / SR
    env = np.exp(-seg_t * 5.5) * np.minimum(1, seg_t / 0.005)
    arp[i0:i0 + len(seg_t)] += env * (np.sin(2 * np.pi * note(m) * seg_t) + 0.3 * np.sin(4 * np.pi * note(m) * seg_t)) * 0.045
    tt0 += step; k += 1
# gentle low pulse (quarter notes) from 7 s to 17 s
pulse = np.zeros(N)
q = 60 / 96
tt0 = 7.0
while tt0 < 17.0:
    i0 = int(tt0 * SR); L = int(0.35 * SR)
    seg_t = np.arange(L) / SR
    pulse[i0:i0 + L] += np.sin(2 * np.pi * (55 + 40 * np.exp(-seg_t * 30)) * seg_t) * np.exp(-seg_t * 9) * 0.10
    tt0 += q
music = pad + arp + pulse
# soft whooshes at the cuts (band-passed noise swell), very low
rng = np.random.default_rng(7)
for c in (3.0, 7.0, 14.0, 17.0):
    L = int(0.6 * SR); i0 = int((c - 0.42) * SR)
    nz = rng.standard_normal(L)
    nz = np.convolve(nz, np.ones(24) / 24, mode='same')           # crude low-pass
    nz = nz - np.convolve(nz, np.ones(400) / 400, mode='same')    # remove rumble
    env = np.sin(np.pi * np.arange(L) / L) ** 2
    music[i0:i0 + L] += nz * env * 0.09
# fades
fade_in = np.minimum(1, t / 0.6)
fade_out = np.clip((DUR - t) / 1.6, 0, 1)
music *= fade_in * fade_out
music = music / np.max(np.abs(music)) * 0.5

# ---- ducking + mix ----------------------------------------------------------
w = int(0.02 * SR)
ve = np.convolve(np.abs(vo), np.ones(w) / w, mode='same')
active = (ve > 0.01).astype(float)
sm = int(0.25 * SR)
duck_ctl = np.convolve(active, np.ones(sm) / sm, mode='same').clip(0, 1)
music_gain = 10 ** (-12 / 20) * (1 - duck_ctl) + 10 ** (-21 / 20) * duck_ctl   # ~ -12 dB bed, -21 dB under voice
mix = vo * 1.0 + music * music_gain
mix = mix / max(1.0, np.max(np.abs(mix)) / 0.97)

def save(name, x):
    st = np.stack([x, x], 1).astype(np.float32)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-',
                    '-c:a', 'pcm_s16le', name], input=st.tobytes(), check=True)
save('vo.wav', vo); save('music.wav', music * 10 ** (-12 / 20)); save('mix_raw.wav', mix)
print('ok')
