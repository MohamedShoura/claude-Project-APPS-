// Full pipeline: subtitles (SRT) → cover PNG → frames (parallel Playwright) → H.264 → music/narration mix → MP4.
// Usage: node scripts/render.mjs [--workers 4] [--crf 18] [--skip-video]
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { startServer } from './server.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'output');
const TMP = path.join(OUT, '.tmp');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/config.json'), 'utf8'));
const { width: W, height: H, fps: FPS } = CFG.video;
const TOTAL = CFG.scenes.reduce((a, s) => a + s.duration, 0);
const FRAMES = Math.round(TOTAL * FPS);
const NAME = 'values-movement-explainer';
fs.mkdirSync(TMP, { recursive: true });

const run = (cmd, args) => new Promise((res, rej) => {
  const p = spawn(cmd, args, { stdio: ['ignore', 'inherit', 'inherit'] });
  p.on('close', c => (c === 0 ? res() : rej(new Error(`${cmd} exited ${c}`))));
});

// 1) SRT — generated from the same narration timings the video uses.
function srtTime(s) {
  const ms = Math.round(s * 1000), hh = Math.floor(ms / 3600000), mm = Math.floor(ms / 60000) % 60, ss = Math.floor(ms / 1000) % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`;
}
let t0 = 0, idx = 1, srt = '';
for (const sc of CFG.scenes) {
  for (const [a, b, text] of sc.narration) srt += `${idx++}\n${srtTime(t0 + a)} --> ${srtTime(t0 + b)}\n${text}\n\n`;
  t0 += sc.duration;
}
fs.writeFileSync(path.join(OUT, `${NAME}.ar.srt`), '﻿' + srt);
console.log(`SRT: ${idx - 1} cues, total ${TOTAL.toFixed(1)}s, ${FRAMES} frames`);

const { srv, url } = await startServer();

// 2) Cover image.
{
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: W, height: H } });
  await pg.goto(`${url}/src/index.html?cover`); await pg.evaluate(() => window.ready);
  await pg.screenshot({ path: path.join(OUT, 'cover.png') });
  await b.close();
  console.log('Cover: output/cover.png');
}

if (process.argv.includes('--skip-video')) { srv.close(); process.exit(0); }

// 3) Frames → chunked H.264 encodes in parallel workers.
const WORKERS = Number(arg('workers', Math.max(1, Math.min(4, os.cpus().length))));
const CRF = arg('crf', '18');
const per = Math.ceil(FRAMES / WORKERS);
const started = Date.now();
let done = 0;
async function worker(w) {
  const from = w * per, to = Math.min(FRAMES, from + per);
  const file = path.join(TMP, `chunk_${w}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', CRF, '-pix_fmt', 'yuv420p', '-r', String(FPS), '-threads', '2', file], { stdio: ['pipe', 'inherit', 'inherit'] });
  const closed = new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error('ffmpeg chunk ' + w)))));
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: W, height: H } });
  pg.on('pageerror', e => console.error('PAGE ERROR', e.message));
  await pg.goto(`${url}/src/index.html`); await pg.evaluate(() => window.ready);
  for (let f = from; f < to; f++) {
    await pg.evaluate(t => window.renderFrame(t), f / FPS);
    const buf = await pg.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (++done % 150 === 0) console.log(`  ${done}/${FRAMES} frames (${((Date.now() - started) / 1000).toFixed(0)}s)`);
  }
  ff.stdin.end(); await b.close(); await closed;
  return file;
}
const chunks = await Promise.all(Array.from({ length: WORKERS }, (_, w) => worker(w)));
srv.close();
const list = path.join(TMP, 'list.txt');
fs.writeFileSync(list, chunks.map(c => `file '${c}'`).join('\n'));
const silent = path.join(TMP, 'video.mp4');
await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', silent]);

// 4) Audio: synthesized music bed, plus narration if a recorded file exists (music is ducked under it).
const A = CFG.audio, inputs = [], filters = [];
if (A.music) {
  const wav = path.join(ROOT, 'assets/audio/music.wav');
  execFileSync('python3', [path.join(ROOT, 'scripts/make_music.py'), String(TOTAL + 0.5), wav], { stdio: 'inherit' });
  inputs.push(wav);
}
const narr = A.narrationFile && path.join(ROOT, A.narrationFile);
const hasNarr = narr && fs.existsSync(narr);
if (hasNarr) inputs.push(narr);
const final = path.join(OUT, `${NAME}.mp4`);
const args = ['-y', '-loglevel', 'error', '-i', silent, ...inputs.flatMap(i => ['-i', i])];
if (A.music && hasNarr) {
  filters.push(`[1:a]volume=${A.musicVolume}[m]`, `[2:a]volume=${A.narrationVolume},asplit=2[n][sc]`,
    `[m][sc]sidechaincompress=threshold=0.02:ratio=${(1 / A.duckMusicUnderNarration).toFixed(1)}:attack=50:release=400[md]`, `[md][n]amix=inputs=2:normalize=0[a]`);
} else if (A.music) filters.push(`[1:a]volume=${A.musicVolume}[a]`);
else if (hasNarr) filters.push(`[1:a]volume=${A.narrationVolume}[a]`);
if (filters.length) args.push('-filter_complex', filters.join(';'), '-map', '0:v', '-map', '[a]', '-c:a', 'aac', '-b:a', '192k');
else args.push('-map', '0:v');
args.push('-c:v', 'copy', '-t', String(TOTAL), '-movflags', '+faststart', final);
await run('ffmpeg', args);
console.log(`Video: output/${NAME}.mp4  (${((Date.now() - started) / 1000).toFixed(0)}s, narration: ${hasNarr ? 'yes' : 'no — silent version with subtitles'})`);
fs.rmSync(TMP, { recursive: true, force: true });
