#!/usr/bin/env bash
# Splits the raw voiceover at its natural pauses, places each phrase on its scene,
# ducks the music under the voice, normalizes to -14 LUFS, and trims to exactly 20.000 s.
# Usage: ./mix.sh vo_raw.mp3 music.wav mix.m4a
set -euo pipefail
VO=$1; MUSIC=$2; OUT=$3
# phrase:  source in/out (s)  → timeline start (s)   tempo
#  A «يومك الصحي بيبدأ بخطوة!»                0.00–2.15  → 0.25   1.00
#  B «امشي… واتحرّك على قدّ قدرتك»            2.30–4.80  → 3.10   1.00
#  C «فطار: شوفان وزبادي وفاكهة»              5.05–7.85  → 6.70   1.08
#  D «غدا: فراخ ورز وسلطة»                    8.15–10.70 → 9.22   1.08
#  E «وعشا: حمص وعيش حبوب كاملة وخضار»        10.95–14.30 → 11.50  1.08
#  F «اشرب ميّه، وجهّز أكلك»                  14.50–16.55 → 14.55  1.00
#  G «ابدأ بخطوة… وكرّرها بكرة!»               16.75–19.07 → 16.90  1.00
seg(){ echo "[0:a]atrim=$1:$2,asetpts=PTS-STARTPTS,atempo=$4,afade=t=in:d=0.03,areverse,afade=t=in:d=0.06,areverse,adelay=$(python3 -c "print(int($3*1000))")|$(python3 -c "print(int($3*1000))")[$5]"; }
F="$(seg 0.00 2.15 0.25 1.00 a);$(seg 2.30 4.80 3.10 1.00 b);$(seg 5.05 7.85 6.70 1.08 c);$(seg 8.15 10.70 9.22 1.08 d);$(seg 10.95 14.30 11.50 1.08 e);$(seg 14.50 16.55 14.55 1.00 f);$(seg 16.75 19.07 16.90 1.00 g)"
F="$F;[a][b][c][d][e][f][g]amix=inputs=7:normalize=0,aformat=channel_layouts=stereo,highpass=f=80,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,volume=1.6,asplit=2[vo][sc]"
F="$F;[1:a]volume=0.42[mu];[mu][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=300[duck]"
F="$F;[duck][vo]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000,apad,atrim=0:20,afade=t=out:st=19.75:d=0.25[out]"
ffmpeg -y -loglevel error -i "$VO" -i "$MUSIC" -filter_complex "$F" -map "[out]" -c:a aac -b:a 192k -ar 48000 "$OUT"
