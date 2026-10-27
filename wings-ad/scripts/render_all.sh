#!/usr/bin/env bash
# Renders every deliverable into out/: 1080p + 4K UHD in 9:16 and 16:9, plus thumbnails.
# Remotion renders the master, FFmpeg finishes it (broadcast-range yuv420p, BT.709 tags, faststart).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/tmp
finish () { # in out
  ffmpeg -v error -y -i "$1" -c:v libx264 -preset slow -crf 16 -profile:v high \
    -vf "scale=in_range=full:out_range=tv,format=yuv420p" -color_range tv \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
    -c:a aac -b:a 320k -ar 48000 -movflags +faststart "$2"
}
render () { # comp scale outname
  npx remotion render src/index.ts "$1" "out/tmp/$3" --scale="$2" --log=error
  finish "out/tmp/$3" "out/$3"
}
render Wings-Vertical   1 WINGS_30s_9x16_1080x1920.mp4
render Wings-Horizontal 1 WINGS_30s_16x9_1920x1080.mp4
npx remotion still src/index.ts Thumbnail-Vertical   out/WINGS_thumbnail_9x16.jpg --log=error
npx remotion still src/index.ts Thumbnail-Horizontal out/WINGS_thumbnail_16x9.jpg --log=error
if [ "${SKIP_4K:-0}" != "1" ]; then
  render Wings-Vertical   2 WINGS_30s_9x16_2160x3840_4K.mp4
  render Wings-Horizontal 2 WINGS_30s_16x9_3840x2160_4K.mp4
fi
rm -rf out/tmp
ls -la out
