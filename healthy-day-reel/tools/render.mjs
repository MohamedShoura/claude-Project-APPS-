// Frame-accurate renderer: drives index.html's render(t) and pipes 600 JPEG frames (30 fps × 20 s) into ffmpeg.
// Usage: node render.mjs <path/to/index.html?render=1&assets=dir/> out_video.mp4
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
const [url, out] = process.argv.slice(2);
const FPS = 30, DUR = 20, FRAMES = FPS * DUR;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => window.__ready);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-movflags', '+faststart', out],
  { stdio: ['pipe', 'inherit', 'inherit'] });
for (let f = 0; f < FRAMES; f++) {
  await page.evaluate(t => window.__seek(t), f / FPS);
  const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 60 === 0) console.log('frame', f);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await browser.close();
console.log('done', out);
