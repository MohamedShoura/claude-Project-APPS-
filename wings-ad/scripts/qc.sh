#!/usr/bin/env bash
# Technical QC for a rendered deliverable: container/stream specs, loudness, A/V length match,
# unintended black frames, frozen frames, and VO-vs-bed level during each VO line.
set -uo pipefail
f=$1
echo "=== $f"
ffprobe -v error -show_entries format=duration,size,bit_rate -of default=nw=1 "$f"
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,profile,width,height,r_frame_rate,pix_fmt,nb_frames,duration -of default=nw=1 "$f"
ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate,channels,duration -of default=nw=1 "$f"
echo "--- loudness (EBU R128)"
ffmpeg -hide_banner -nostats -i "$f" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|LRA:|Peak:)"
echo "--- black segments >0.3s (expected: only the fade-in at 0s and fade-out at the end)"
ffmpeg -hide_banner -nostats -i "$f" -vf "blackdetect=d=0.3:pix_th=0.06" -an -f null - 2>&1 | grep -o "black_start.*" || echo "none"
echo "--- frozen segments >0.6s (should be none: every shot is in motion)"
ffmpeg -hide_banner -nostats -i "$f" -vf "freezedetect=n=0.0008:d=0.6" -an -f null - 2>&1 | grep -oE "freeze_(start|duration): [0-9.]+" | paste - - || echo "none"
echo "--- audio RMS per window (VO windows should sit clearly above the bed-only windows)"
for w in "0.0 0.5 bed" "1.0 3.5 VO1" "4.4 5.8 bed" "6.3 9.0 VO2" "12.0 17.0 bed" "19.3 23.0 VO3" "26.2 28.4 VO4"; do
  set -- $w
  r=$(ffmpeg -hide_banner -nostats -ss $1 -to $2 -i "$f" -af astats=metadata=0:reset=0 -vn -f null - 2>&1 | grep "RMS level dB" | tail -1 | awk '{print $NF}')
  printf "  %-4s %5s-%5ss  RMS %s dB\n" "$3" "$1" "$2" "$r"
done
