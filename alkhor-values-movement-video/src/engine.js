// Deterministic timeline engine: every frame is a pure function of time t (seconds).
// render(t) is called by the renderer (Playwright) or by the preview scrubber.

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = {
  out: p => 1 - Math.pow(1 - p, 3),
  inOut: p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  back: p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
};
const lerp = (a, b, p) => a + (b - a) * p;

// Stroke icons (24x24 viewBox), drawn in the poster's line-icon style.
const ICONS = {
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  school: '<path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  walk: '<circle cx="14" cy="4" r="2"/><path d="M10 21l2.2-5.2L15 18v3"/><path d="M12.2 15.8 13 9l-3 1.5L8 13"/><path d="M13 9l2.5 3H19"/>',
  drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  apple: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>',
  bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
};
function icon(name, color = 'currentColor', sw = 2) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

// DOM helper: h('div', 'cls', {left:..}, 'html')
function h(tag, cls, style, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (style) for (const k in style) e.style[k] = typeof style[k] === 'number' ? style[k] + 'px' : style[k];
  if (html != null) e.innerHTML = html;
  return e;
}

// A rectangular window onto the poster, scaled to width w while keeping the region's aspect ratio.
function crop(region, x, y, w, extra = {}) {
  const [rx, ry, rw, rh] = CFG.poster.regions[region] || region;
  const s = w / rw;
  const e = h('div', 'crop ' + (extra.cls || ''), {
    left: x, top: y, width: w, height: Math.round(rh * s),
    backgroundImage: `url(../${CFG.poster.src})`,
    backgroundSize: `${CFG.poster.width * s}px ${CFG.poster.height * s}px`,
    backgroundPosition: `${-rx * s}px ${-ry * s}px`,
    ...(extra.style || {}),
  });
  e.dataset.h = Math.round(rh * s);
  return e;
}

// Whole poster at height ph; returns {el, map(region)->{x,y,w,h} in stage coords}.
function poster(x, y, ph) {
  const s = ph / CFG.poster.height;
  const w = CFG.poster.width * s;
  const el = h('div', 'crop', { left: x, top: y, width: w, height: ph, backgroundImage: `url(../${CFG.poster.src})`,
    backgroundSize: `${w}px ${ph}px`, borderRadius: 18 });
  const map = r => { const [rx, ry, rw, rh] = CFG.poster.regions[r] || r; return { x: x + rx * s, y: y + ry * s, w: rw * s, h: rh * s }; };
  return { el, map, w };
}

// Animation tracks. Each scene registers {el, at, d, type, out?} and the engine applies them by local time.
function applyTrack(tr, lt) {
  const p = clamp((lt - tr.at) / (tr.d || 0.6));
  const e = ease.out(p);
  let op = 1, tf = '';
  switch (tr.type) {
    case 'fadeUp': op = e; tf = `translateY(${(1 - e) * 46}px)`; break;
    case 'fadeDown': op = e; tf = `translateY(${-(1 - e) * 46}px)`; break;
    case 'fade': op = e; break;
    case 'slideR': op = e; tf = `translateX(${(1 - e) * 90}px)`; break;
    case 'slideL': op = e; tf = `translateX(${-(1 - e) * 90}px)`; break;
    case 'pop': op = clamp(p * 2.5); tf = `scale(${p >= 1 ? 1 : lerp(.55, 1, ease.back(p))})`; break;
    case 'zoom': op = e; tf = `scale(${lerp(1.18, 1, e)})`; break;
    case 'wipe': tr.el.style.clipPath = `inset(0 0 0 ${(1 - e) * 100}%)`; break;          // reveals right → left (RTL)
    case 'wipeL': tr.el.style.clipPath = `inset(0 ${(1 - e) * 100}% 0 0)`; break;
    case 'draw': tr.el.style.strokeDashoffset = 1 - e; break;
    case 'growX': tf = `scaleX(${e})`; break;
  }
  if (tr.out != null) op *= 1 - ease.inOut(clamp((lt - tr.out) / (tr.outD || .5)));
  if (tr.type !== 'draw' && tr.type !== 'wipe' && tr.type !== 'wipeL') {
    tr.el.style.opacity = op;
    tr.el.style.transform = tf + (tr.base ? ' ' + tr.base : '');
  } else if (tr.out != null) tr.el.style.opacity = op;
}

const Engine = {
  scenes: [], subs: [], total: 0,
  init() {
    const c = CFG.colors, r = document.documentElement.style;
    for (const k in c) r.setProperty('--' + k, c[k]);
    r.setProperty('--fHead', CFG.fonts.heading);
    r.setProperty('--fBody', CFG.fonts.body);
    const stage = document.getElementById('stage');
    this.stage = stage;
    buildBackground(stage);
    let t = 0;
    CFG.scenes.forEach((sc, i) => {
      const el = h('div', 'scene');
      stage.appendChild(el);
      const s = { cfg: sc, index: i, start: t, dur: sc.duration, el, tracks: [], update: null };
      s.add = (node, at, type = 'fadeUp', d = .6, more = {}) => { el.appendChild(node); s.tracks.push({ el: node, at, type, d, ...more }); return node; };
      SCENES[sc.id](s);
      sc.narration.forEach(([a, b, text]) => this.subs.push({ a: t + a, b: t + b, text }));
      this.scenes.push(s);
      t += sc.duration;
    });
    this.total = t;
    buildChrome(stage);
  },
  render(t) {
    const F = CFG.video.sceneFade;
    for (const s of this.scenes) {
      const lt = t - s.start;
      if (lt < 0 || lt >= s.dur) { s.el.style.display = 'none'; continue; }
      s.el.style.display = 'block';
      const fin = ease.out(clamp(lt / F)), fout = ease.inOut(clamp((s.dur - lt) / F));
      const first = s.index === 0, last = s.index === this.scenes.length - 1;
      s.el.style.opacity = (first ? 1 : fin) * (last ? 1 : fout);
      s.el.style.transform = `scale(${(first ? 1 : lerp(1.025, 1, fin)) * (last ? 1 : lerp(.985, 1, fout))})`;
      s.tracks.forEach(tr => applyTrack(tr, lt));
      if (s.update) s.update(lt);
      this.current = s;
    }
    updateChrome(t, this);
  },
};
