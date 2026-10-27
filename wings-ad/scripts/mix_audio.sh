#!/usr/bin/env bash
# Final audio mix: VO (placed on the edit timeline) + music ducked under VO + SFX,
# loudness-normalised to -14 LUFS / -1 dBTP for social platforms.
# Per-line gains even out the four VO takes (measured RMS spread was ~6 dB).
# Edit VO timings here and in src/timeline.ts together.
set -euo pipefail
cd "$(dirname "$0")/../public"

VO1=vo/l1b.mp3; T1=500     # "كل فنجان عظيم... يبدأ من حبة قهوة."
VO2=vo/l2b.mp3; T2=6000    # "وفي وينجز... التفاصيل تصنع الفرق."
VO3=vo/l3b.mp3; T3=19000   # "من التفاصيل الصغيرة... تبدأ لحظات ما تنتسى."
VO4=vo/l4b.mp3; T4=26000   # "وينجز... خلّ قهوتك تحكي."

ffmpeg -v error -y \
  -i "$VO1" -i "$VO2" -i "$VO3" -i "$VO4" -i audio/music.wav -i audio/sfx.wav \
  -filter_complex "
    [0]aresample=48000,volume=4dB,adelay=${T1}|${T1}[v1];
    [1]aresample=48000,volume=0.5dB,adelay=${T2}|${T2}[v2];
    [2]aresample=48000,volume=2dB,adelay=${T3}|${T3}[v3];
    [3]aresample=48000,volume=-1.5dB,adelay=${T4}|${T4}[v4];
    [v1][v2][v3][v4]amix=inputs=4:normalize=0,apad=whole_dur=30,atrim=0:30,
      highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2.5,equalizer=f=250:t=q:w=1:g=-1.5,
      acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=4,
      pan=stereo|c0=c0|c1=c0,volume=1.0,asplit=2[vo][vokey];
    [4]volume=0.38[mus];
    [mus][vokey]sidechaincompress=threshold=0.03:ratio=8:attack=30:release=500:makeup=1[musd];
    [5]volume=0.35[sfx];
    [vo][musd][sfx]amix=inputs=3:normalize=0,atrim=0:30,
      alimiter=limit=0.5:attack=3:release=60:level=false,loudnorm=I=-14:TP=-1.0:LRA=9[out]" \
  -map "[out]" -ar 48000 -c:a pcm_s16le audio/mix.wav
echo "mix -> public/audio/mix.wav"
