#!/usr/bin/env bash
# ينزّل ملفات التعليق الصوتي المولّدة (Higgsfield / ElevenLabs) إلى public/assets/audio/narration
# يتطلب السماح بالنطاق d8j0ntlcm91z4.cloudfront.net في إعدادات شبكة البيئة.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - <<'PY'
import json, subprocess
for l in json.load(open("narration/narration.json", encoding="utf-8"))["lines"]:
    out = f"public/assets/audio/narration/{l['id']}.mp3"
    subprocess.run(["curl", "-sSf", "-o", out, l["url"]], check=True)
    print("ok", out)
PY
