#!/usr/bin/env bash
# Conform the Higgsfield (Kling 3.0 Pro) clips to the edit and switch the spot to AI-motion mode.
#
# 1) Download the 5 generated clips from your Higgsfield library into wings-ad/raw_clips/ with these names:
#      k1_beans.mp4  k2_roast.mp4  k3_hero.mp4  k4_end.mp4  k5_worker.mp4
#    (job ids are listed in docs/PRODUCTION_PLAN.md)
# 2) Run:  scripts/prepare_clips.sh
# 3) In src/timeline.ts set  useClips = true  and re-render.
#
# Each 5 s clip is retimed to its slot with motion-compensated interpolation (smooth slow motion, 30 fps).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/clips

conform () { # in out target_seconds
  local in=$1 out=$2 target=$3
  local src
  src=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
  local f
  f=$(python3 -c "print($target/$src)")
  ffmpeg -v error -y -i "$in" -an \
    -vf "setpts=${f}*PTS,minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:vsbmc=1,trim=duration=${target},scale=-2:1920:flags=lanczos,format=yuv420p" \
    -c:v libx264 -crf 14 -preset slow "$out"
  echo "$out  (${src}s -> ${target}s, x$f)"
}

conform raw_clips/k1_beans.mp4  public/clips/s1_beans.mp4  5.5
conform raw_clips/k2_roast.mp4  public/clips/s2_roast.mp4  6.5
conform raw_clips/k3_hero.mp4   public/clips/s3_hero.mp4   7.5
conform raw_clips/k5_worker.mp4 public/clips/s4_worker.mp4 7.5
conform raw_clips/k4_end.mp4    public/clips/s5_end.mp4    5.0
echo "Now set useClips = true in src/timeline.ts and re-render. QC every clip for logo/hand distortion first."
