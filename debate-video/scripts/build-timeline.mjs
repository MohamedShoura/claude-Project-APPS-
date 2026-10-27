// يبني الخط الزمني للفيديو من مدد التعليق الصوتي ومقاطع المناظرة الفعلية،
// ويُخرج: src/config/timeline.json + out/subtitles.ar.srt + narration/timings.md
// الاستخدام: node scripts/build-timeline.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FPS = 30;
const nar = JSON.parse(readFileSync(join(ROOT, "narration/narration.json"), "utf8"));
const seg = JSON.parse(readFileSync(join(ROOT, "scripts/segments.json"), "utf8"));
const quotesSrc = readFileSync(join(ROOT, "src/config/content.ts"), "utf8");

// أطوال الإيقاع (بالثواني) — عدّلها لتغيير الإيقاع العام
const PACE = {
  pre: 0.5, post: 1.0, openingPre: 0.9, openingPost: 0.9,
  creativeMin: 14.5, honorMin: 13.5, chapterPre: 0.35, chapterPost: 0.9,
  debateLead: 0.15, debateTail: 0.25, credit: 4.5,
};

const N = Object.fromEntries(nar.lines.map((l) => [l.id, l]));
const probe = (f) =>
  parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
const fr = (s) => Math.round(s * FPS);

const scenes = [];
const audio = [];
let t = 0;
const push = (scene, narId, pre, minDur, post) => {
  const nd = narId ? N[narId].duration : 0;
  const dur = Math.max(pre + nd + post, minDur || 0);
  const s = { ...scene, from: fr(t), durationInFrames: fr(dur) };
  if (narId) {
    s.narration = { id: narId, offsetFrames: fr(pre) };
    audio.push({ kind: "narration", id: narId, file: `assets/audio/narration/${narId}.mp3`, start: t + pre, duration: nd, text: N[narId].text });
  }
  scenes.push(s);
  t += s.durationInFrames / FPS;
};

push({ id: "opening", type: "opening" }, "n01", PACE.openingPre, 0, PACE.openingPost);
push({ id: "event", type: "event" }, "n02", PACE.pre, 0, PACE.post + 0.4);
push({ id: "creative", type: "creative" }, "n03", PACE.pre, PACE.creativeMin, PACE.post);
push({ id: "inspiring", type: "inspiring" }, "n04", PACE.pre, 0, PACE.post + 0.3);

const chapterNar = { 1: "n05", 2: "n06", 3: "n07", 4: "n08" };
let lastChapter = 0;
for (const d of seg.debate) {
  if (d.chapter !== lastChapter) {
    push({ id: `chapter${d.chapter}`, type: "chapter", chapter: d.chapter }, chapterNar[d.chapter], PACE.chapterPre, 0, PACE.chapterPost);
    lastChapter = d.chapter;
  }
  const file = join(ROOT, "public/assets/audio/debate", `${d.id}.wav`);
  const dd = probe(file);
  const s = { id: d.id, type: "debate", side: d.side, chapter: d.chapter, from: fr(t), durationInFrames: fr(PACE.debateLead + dd + PACE.debateTail) };
  audio.push({ kind: "debate", id: d.id, file: `assets/audio/debate/${d.id}.wav`, start: t + PACE.debateLead, duration: dd, side: d.side });
  scenes.push(s);
  t += s.durationInFrames / FPS;
}
push({ id: "honoring", type: "honoring" }, "n09", PACE.pre, PACE.honorMin, PACE.post);
push({ id: "closing", type: "closing" }, "n10", PACE.pre, 0, PACE.post + 0.5);
push({ id: "credit", type: "credit" }, null, 0, PACE.credit, 0);

const totalFrames = scenes.reduce((a, s) => a + s.durationInFrames, 0);
writeFileSync(join(ROOT, "src/config/timeline.json"), JSON.stringify({ fps: FPS, totalFrames, scenes, audio }, null, 1));

// ---------- ترجمة SRT ----------
const ts = (s) => {
  const ms = Math.max(0, Math.round(s * 1000));
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  return `${h}:${m}:${sec},${String(ms % 1000).padStart(3, "0")}`;
};
// يقسم جملة التعليق إلى أجزاء قصيرة عند علامات الترقيم، ويوزع الزمن بنسبة عدد الحروف
const chunk = (text) => {
  const parts = text.split(/(?<=[،:.؟…])\s+/).flatMap((p) => {
    if (p.length <= 46) return [p];
    const w = p.split(" "); const half = Math.ceil(w.length / 2);
    return [w.slice(0, half).join(" "), w.slice(half).join(" ")];
  });
  const merged = [];
  for (const p of parts) {
    if (merged.length && (merged[merged.length - 1] + " " + p).length <= 40) merged[merged.length - 1] += " " + p;
    else merged.push(p);
  }
  return merged;
};
const quoteOf = (id) => {
  const m = quotesSrc.match(new RegExp(`${id}: \\{ lines: \\[([^\\]]+)\\]`));
  return m ? JSON.parse(`[${m[1]}]`).join(" ") : "";
};
const sideLabel = { creative: "الجيل المُبدع", inspiring: "الجيل المُبهر", both: "الجيلان" };
const cues = [];
for (const a of audio) {
  if (a.kind === "narration") {
    const parts = chunk(a.text);
    const total = parts.reduce((x, p) => x + p.length, 0);
    let c = a.start;
    for (const p of parts) {
      const d = (a.duration - 0.15) * (p.length / total);
      cues.push([c, c + d, p]); c += d;
    }
  } else {
    // لا يوجد تفريغ حرفي موثّق لكلام المناظرة الأصلي؛ نعرض العبارة المحورية كما وردت في المصدر
    cues.push([a.start, a.start + a.duration, `[صوت أصلي – ${sideLabel[a.side]}]\n«${quoteOf(a.id)}»`]);
  }
}
mkdirSync(join(ROOT, "out"), { recursive: true });
const srt = cues.map(([s, e, x], i) => `${i + 1}\n${ts(s)} --> ${ts(e)}\n‫${x.replace(/\n/g, "\n‫")}\n`).join("\n");
writeFileSync(join(ROOT, "out/subtitles.ar.srt"), srt);

// ---------- جدول توقيتات التعليق ----------
const mmss = (s) => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;
let md = "# التعليق الصوتي وتوقيتاته\n\n| # | البداية | المدة | المشهد | النص |\n|---|---|---|---|---|\n";
for (const a of audio.filter((x) => x.kind === "narration")) {
  const sc = scenes.find((s) => s.narration?.id === a.id);
  md += `| ${a.id} | ${mmss(a.start)} | ${a.duration.toFixed(1)} ث | ${sc.id} | ${a.text} |\n`;
}
md += "\n## مقاطع الصوت الأصلي من المناظرة\n\n| المقطع | البداية في الفيديو الجديد | المدة | المصدر (ث) | الجيل |\n|---|---|---|---|---|\n";
for (const a of audio.filter((x) => x.kind === "debate")) {
  const d = seg.debate.find((x) => x.id === a.id);
  md += `| ${a.id} | ${mmss(a.start)} | ${a.duration.toFixed(1)} ث | ${d.start}–${d.end} | ${sideLabel[a.side]} |\n`;
}
md += `\n**المدة الكلية:** ${mmss(totalFrames / FPS)} (${totalFrames} إطارًا عند ${FPS} إطار/ث)\n`;
writeFileSync(join(ROOT, "narration/timings.md"), md);
console.log("timeline ok:", (totalFrames / FPS).toFixed(2), "s,", scenes.length, "scenes,", cues.length, "cues");
