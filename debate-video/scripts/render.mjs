// يرندر الفيديو (بلا صوت) أو لقطات ثابتة للمراجعة.
// الاستخدام: node scripts/render.mjs            → out/video-silent.mp4
//           node scripts/render.mjs stills 0 300 → out/stills/f0.png f300.png ...
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// متصفح Chromium محلي (يمكن تغييره بمتغير البيئة REMOTION_BROWSER)
const candidates = [process.env.REMOTION_BROWSER, "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell"].filter(Boolean);
const browserExecutable = candidates.find((p) => existsSync(p)) ?? null;

const serveUrl = await bundle({ entryPoint: join(ROOT, "src/index.ts"), publicDir: join(ROOT, "public") });
const inputProps = { withAudio: false, burnSubtitles: false };
const composition = await selectComposition({ serveUrl, id: "Debate", inputProps, browserExecutable });
mkdirSync(join(ROOT, "out/stills"), { recursive: true });

if (process.argv[2] === "stills") {
  for (const f of process.argv.slice(3).map(Number)) {
    await renderStill({ composition, serveUrl, frame: f, output: join(ROOT, `out/stills/f${f}.png`), inputProps, browserExecutable });
    console.log("still", f);
  }
} else {
  const range = process.argv[2] === "range" ? [Number(process.argv[3]), Number(process.argv[4])] : undefined;
  await renderMedia({
    composition, serveUrl, codec: "h264", crf: 14, pixelFormat: "yuv420p", muted: true, inputProps, browserExecutable,
    frameRange: range, concurrency: Math.max(1, os.cpus().length), x264Preset: "medium",
    outputLocation: join(ROOT, range ? "out/preview-range.mp4" : "out/video-silent.mp4"),
    onProgress: ({ progress }) => { if (Math.round(progress * 1000) % 25 === 0) process.stdout.write(`\r${(progress * 100).toFixed(1)}%`); },
  });
  console.log("\nrender ok");
}
