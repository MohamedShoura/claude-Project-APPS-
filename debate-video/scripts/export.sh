#!/usr/bin/env bash
# التصدير النهائي: يدمج الفيديو (المُرندر بلا صوت) مع المزج الصوتي، وينتج:
#   out/final/debate-master.mp4        نسخة رئيسية 1080×1920، H.264 (CRF 17) + AAC 256k، faststart
#   out/final/debate-share.mp4         نسخة مشاركة ≈ 24 ميجابايت (720×1280، ترميز بمرحلتين)
#   out/final/debate-master-subtitled.mp4  نسخة بترجمة عربية محروقة داخل الفيديو (اختيارية: SUBS=1)
#   out/final/subtitles.ar.srt
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/final
V=out/video-silent.mp4; A=out/mix-final.wav
[ -f "$V" ] || { echo "لم يُرندر الفيديو بعد: npm run render"; exit 1; }
[ -f "$A" ] || { echo "لا يوجد مزج صوتي: python3 scripts/mix-audio.py"; exit 1; }

ffmpeg -v error -y -i "$V" -i "$A" -map 0:v -map 1:a -c:v libx264 -preset slow -crf 17 -profile:v high -level 4.2 -pix_fmt yuv420p \
  -r 30 -c:a aac -b:a 256k -ar 48000 -movflags +faststart -shortest out/final/debate-master.mp4

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/final/debate-master.mp4)
TARGET_MB=${TARGET_MB:-24}
VBR=$(python3 -c "print(int(${TARGET_MB}*8*1024*1024/${DUR}/1000 - 96 - 8))")
echo "share video bitrate: ${VBR}k"
P=out/final/x264pass
ffmpeg -v error -y -i out/final/debate-master.mp4 -vf "scale=720:1280:flags=lanczos" -c:v libx264 -preset slow -b:v ${VBR}k -pass 1 -passlogfile $P -an -f mp4 /dev/null
ffmpeg -v error -y -i out/final/debate-master.mp4 -vf "scale=720:1280:flags=lanczos" -c:v libx264 -preset slow -b:v ${VBR}k -maxrate $((VBR*2))k -bufsize $((VBR*4))k \
  -pass 2 -passlogfile $P -c:a aac -b:a 96k -ar 48000 -movflags +faststart out/final/debate-share.mp4
rm -f ${P}*

cp out/subtitles.ar.srt out/final/subtitles.ar.srt
if [ "${SUBS:-0}" = "1" ]; then
  python3 scripts/make-ass.py
  ffmpeg -v error -y -i out/final/debate-master.mp4 -vf "ass=out/subtitles.ar.ass:fontsdir=public/fonts/ttf" -c:v libx264 -preset slow -crf 18 \
    -pix_fmt yuv420p -c:a copy -movflags +faststart out/final/debate-master-subtitled.mp4
fi
ls -la out/final
