#!/usr/bin/env bash
# Loudness-master the rendered MP4 for social platforms (-14 LUFS, -1.5 dBTP).
# Two-pass linear loudnorm on the audio only; the H.264 video stream is copied.
set -euo pipefail
IN="${1:-out/nahj-promo-20s.mp4}"
TMP="${IN%.mp4}.premaster.mp4"
mv "$IN" "$TMP"
STATS=$(ffmpeg -hide_banner -nostats -i "$TMP" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
get() { echo "$STATS" | python3 -c "import sys,json; print(json.load(sys.stdin)['$1'])"; }
ffmpeg -v error -y -i "$TMP" -c:v copy \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(get input_i):measured_TP=$(get input_tp):measured_LRA=$(get input_lra):measured_thresh=$(get input_thresh):offset=$(get target_offset):linear=true,aresample=48000" \
  -c:a aac -b:a 192k -t 20 -movflags +faststart "$IN"
rm -f "$TMP"
echo "mastered -> $IN"
