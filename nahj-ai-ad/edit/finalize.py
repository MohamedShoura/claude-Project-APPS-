# Uses measured VO step times to set step-card times (overlay) and shot cuts (assemble.sh).
import json, re
st = json.load(open('steps.json'))
# card i appears slightly before its word; first card never before 7.05, last must end at 14.0
c = [max(7.05, st[0] - 0.25)] + [round(x - 0.2, 2) for x in st[1:]]
c = [round(min(x, 13.2), 2) for x in c]
html = open('overlay.html').read()
html = re.sub(r"const starts = \[[^\]]*\];", "const starts = [%s];" % ", ".join("%.2f" % x for x in c), html)
open('overlay.html', 'w').write(html)
# shot boundaries: 0,3,7, c1(if >7.6 else 8.75),c2,c3,14,17,20 -> use card times for steps 2..4
b = [0, 3, 7, min(c[1], 9.7), c[2], c[3], 14, 17, 20]
X = 0.25
src = [('v1.mp4', 0.0), ('v2.mp4', 0.30), ('v3.mp4', 0.0), ('v4.mp4', 0.2), ('v5.mp4', 0.2), ('v6.mp4', 0.2), ('v7.mp4', 0.5)]
V = "scale=1080:1920:flags=lanczos,fps=30,format=yuv420p,setsar=1,settb=AVTB"
parts, inputs = [], []
for i, (f, s0) in enumerate(src):
    d = b[i + 1] - b[i] + X
    assert d <= {'v1.mp4':4.0,'v2.mp4':4.7,'v7.mp4':3.5}.get(f, 3.0 - s0), (f, d)
    inputs.append('-i ' + f)
    parts.append(f"[{i}:v]trim={s0:.2f}:{s0 + d:.2f},setpts=PTS-STARTPTS,{V}[a{i}]")
parts.append(f"[7:v]{V}[a7]")
prev = 'a0'
for k in range(1, 8):
    out = 'base' if k == 7 else f'x{k}'
    parts.append(f"[{prev}][a{k}]xfade=transition=fade:duration={X}:offset={b[k]:.2f}[{out}]")
    prev = out
parts.append("[8:v]format=rgba[ovl]")
parts.append("[base][ovl]overlay=0:0:format=auto,format=yuv420p,trim=0:20,setpts=PTS-STARTPTS[v]")
fc = ";".join(parts)
sh = f"""set -e
cd ~/nahj
ffmpeg -v error -y {' '.join(inputs)} -f lavfi -i "color=c=0x4a0918:s=1080x1920:r=30:d=3" -framerate 30 -i ov/o_%04d.png -i mix.wav \\
 -filter_complex "{fc}" -map "[v]" -map 9:a -t 20 -r 30 -c:v libx264 -profile:v high -preset slow -crf 17 -pix_fmt yuv420p \\
 -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart nahj_ai_ad_1080x1920.mp4
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate,nb_frames -of compact nahj_ai_ad_1080x1920.mp4
"""
open('assemble.sh', 'w').write(sh)
print('cards', c, 'cuts', b)
