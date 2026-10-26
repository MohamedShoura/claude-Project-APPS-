#!/usr/bin/env bash
# Assemble the 30 s 9:16 commercial from the generated shots.
#
# Usage: build.sh <clips_dir> <gfx_dir> <mix.wav> <out_dir>
#   clips_dir: S1.mp4 S2a.mp4 S2b.mp4 S3.mp4 S4.mp4 S5.mp4 S6.mp4
#   gfx_dir:   endcard_titles.png endcard_sign.png (from make_graphics.py)
# Outputs: dr_sereen_final.mp4 (titles + logo) and dr_sereen_clean.mp4 (no titles),
# both H.264 High, 1080x1920, 24 fps, AAC 48 kHz.
set -euo pipefail
CLIPS=$1 GFX=$2 MIX=$3 OUT=$4
HERE=$(cd "$(dirname "$0")" && pwd)
EDL="$HERE/../edit/edl.csv"
mkdir -p "$OUT/segments"

# One look for every shot: gentle warm golden-hour grade, no glow.
GRADE="eq=contrast=1.04:saturation=1.05:gamma=0.98,colorbalance=rs=0.02:gs=0.0:bs=-0.03:rh=0.03:bh=-0.03"

list="$OUT/segments/list.txt"
: > "$list"
tail -n +2 "$EDL" | while IFS=, read -r shot src_in dur speed note; do
  seg="$OUT/segments/$shot.mp4"
  # speed < 1 slows the shot down (e.g. 0.9 for a more weighty lift-off)
  ffmpeg -nostdin -v error -y -ss "$src_in" -i "$CLIPS/$shot.mp4" -an \
    -vf "setpts=PTS/$speed,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=24,$GRADE,format=yuv420p" \
    -t "$dur" -c:v libx264 -preset slow -crf 14 "$seg"
  echo "file '$shot.mp4'" >> "$list"
done

ffmpeg -nostdin -v error -y -f concat -safe 0 -i "$list" -c copy "$OUT/segments/picture.mp4"

# Clean version: picture + mix, no graphics.
ffmpeg -nostdin -v error -y -i "$OUT/segments/picture.mp4" -i "$MIX" \
  -map 0:v -map 1:a -c:v libx264 -preset slow -crf 17 -profile:v high -pix_fmt yuv420p -r 24 \
  -c:a aac -b:a 256k -ar 48000 -movflags +faststart -shortest "$OUT/dr_sereen_clean.mp4"

# Final version: end card fades in at 27.0 s (titles) and 27.6 s (clinic sign plate).
ffmpeg -nostdin -v error -y -i "$OUT/segments/picture.mp4" -i "$MIX" \
  -loop 1 -t 30 -i "$GFX/endcard_titles.png" -loop 1 -t 30 -i "$GFX/endcard_sign.png" \
  -filter_complex "[2:v]format=rgba,fade=t=in:st=27.0:d=0.7:alpha=1[t];[3:v]format=rgba,fade=t=in:st=27.6:d=0.7:alpha=1[s];[0:v][t]overlay=0:0[v1];[v1][s]overlay=0:0,format=yuv420p[v]" \
  -map "[v]" -map 1:a -c:v libx264 -preset slow -crf 17 -profile:v high -r 24 \
  -c:a aac -b:a 256k -ar 48000 -movflags +faststart -t 30 "$OUT/dr_sereen_final.mp4"

ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate:format=duration -of compact "$OUT/dr_sereen_final.mp4"
