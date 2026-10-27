// Scene builders. Texts and timings come from config/config.json (CFG); layout lives here.
// Stage is 1920×1080; content stays inside y≈110–890 so the subtitle bar never covers it.

/* ---------------- persistent background ---------------- */
function buildBackground(stage) {
  const bg = h('div', 'layer', null); bg.id = 'bg'; stage.appendChild(bg);
  const blobs = [
    [180, 160, 380, 'rgba(246,214,222,.55)'], [1620, 820, 460, 'rgba(246,214,222,.45)'],
    [1500, 120, 220, 'rgba(201,150,59,.10)'], [260, 860, 300, 'rgba(138,21,56,.06)'], [960, 560, 600, 'rgba(255,255,255,.45)'],
  ].map(([x, y, r, c], i) => { const b = h('div', 'blob', { left: x - r / 2, top: y - r / 2, width: r, height: r, background: c }); bg.appendChild(b); return b; });
  // Qatar-flag-inspired serrated corner (9 points), echoing the poster's top corner.
  let pts = '360,0 360,240 ';
  for (let i = 0; i <= 18; i++) pts += `${i % 2 ? 70 : 105},${240 - (240 / 18) * i} `;
  bg.insertAdjacentHTML('beforeend', `<svg id="flag" viewBox="0 0 360 240"><polygon points="${pts}" fill="${CFG.colors.maroon}"/></svg>`);
  bg.insertAdjacentHTML('beforeend', `<svg id="wave" class="abs" style="left:0;bottom:0;width:1920px;height:170px" viewBox="0 0 1920 170"><path id="wave1" fill="${CFG.colors.maroon}" opacity=".10"/><path id="wave2" fill="${CFG.colors.maroon}" opacity=".16"/></svg>`);
  Engine.bgBlobs = blobs;
}
function wavePath(t, amp, phase, base) {
  let d = `M0 170 L0 ${base}`;
  for (let x = 0; x <= 1920; x += 40) d += ` L${x} ${(base + Math.sin(x / 260 + t * .6 + phase) * amp).toFixed(1)}`;
  return d + ' L1920 170 Z';
}

/* ---------------- header, progress, subtitles ---------------- */
function buildChrome(stage) {
  const hd = h('div', null, null); hd.id = 'header'; stage.appendChild(hd);
  hd.appendChild(h('div', null, { width: 0 }, '')).id = 'progress';
  const brand = h('div', null, null, `<span class="dot"></span>${CFG.facts.school}`); brand.id = 'brand'; hd.appendChild(brand);
  const ch = h('div', null, null, ''); ch.id = 'chapter'; hd.appendChild(ch);
  const dots = h('div', null, null, CFG.scenes.map(() => '<i></i>').join('')); dots.id = 'dots'; hd.appendChild(dots);
  const subs = h('div', null, null, ''); subs.id = 'subs'; stage.appendChild(subs);
}
function updateChrome(t, E) {
  document.getElementById('progress').style.width = (1920 * t / E.total) + 'px';
  const s = E.current;
  const ch = document.getElementById('chapter');
  if (s && ch.textContent !== s.cfg.chapter) ch.textContent = s.cfg.chapter;
  document.querySelectorAll('#dots i').forEach((d, i) => d.classList.toggle('on', s && i <= s.index));
  const sub = E.subs.find(x => t >= x.a && t < x.b);
  const el = document.getElementById('subs');
  if (sub) {
    if (el.textContent !== sub.text) el.textContent = sub.text;
    el.style.opacity = Math.min(clamp((t - sub.a) / .18), clamp((sub.b - t) / .18));
    el.style.display = 'block';
  } else el.style.display = 'none';
  E.bgBlobs.forEach((b, i) => { b.style.transform = `translate(${Math.sin(t * .25 + i) * 30}px, ${Math.cos(t * .2 + i * 2) * 24}px)`; });
  document.getElementById('wave1').setAttribute('d', wavePath(t, 14, 0, 110));
  document.getElementById('wave2').setAttribute('d', wavePath(t, 10, 2.1, 135));
}

/* ---------------- small builders ---------------- */
const C = () => CFG.colors;
function row(y, html, cls = '', style = {}) { // full-width centered row
  return h('div', 'abs center ' + cls, { left: 0, top: y, width: 1920, ...style }, `<div>${html}</div>`);
}
function circleIcon(name, size, bg, fg, x, y, sw = 2) {
  return h('div', 'abs circleIcon icon', { left: x, top: y, width: size, height: size, background: bg, padding: size * .22,
    boxShadow: '0 10px 26px rgba(94,15,42,.16)' }, icon(name, fg, sw));
}
function svgLayer() {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 1920 1080'); s.setAttribute('class', 'abs');
  Object.assign(s.style, { left: 0, top: 0, width: '1920px', height: '1080px', overflow: 'visible' });
  s.innerHTML = `<defs><marker id="ah${Math.random().toString(36).slice(2, 7)}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C().maroon}"/></marker></defs>`;
  return s;
}
function svgPath(svg, d, color, width = 5, arrow = false) {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', color);
  p.setAttribute('stroke-width', width); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round');
  p.setAttribute('pathLength', '1'); p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1';
  if (arrow) p.setAttribute('marker-end', `url(#${svg.querySelector('marker').id})`);
  svg.appendChild(p); return p;
}

/* ---------------- scenes ---------------- */
const SCENES = {

  hook(s) {
    const F = CFG.facts;
    const icons = [['walk', 230, 230], ['heart', 1570, 240], ['star', 300, 640], ['leaf', 1520, 640], ['drop', 1180, 140], ['trophy', 640, 150]];
    const bobs = icons.map(([n, x, y], i) => {
      const wrap = s.add(h('div', 'abs', { left: x, top: y, width: 130, height: 130 }), .25 + i * .22, 'pop', .7);
      const ic = circleIcon(n, 130, '#fff', C().maroon, 0, 0); wrap.appendChild(ic); return ic;
    });
    s.add(row(330, 'هل يمكن لدقائق من الحركة كل يوم', 'h1', { fontSize: 84 }), .3, 'fadeUp', .8);
    s.add(row(445, 'أن تصنع <span style="color:var(--navy)">فرقًا</span>؟', 'h1', { fontSize: 96 }), .9, 'fadeUp', .8);
    s.add(row(620, `<span class="pill" style="background:var(--maroon);color:#fff;font-size:52px;padding:12px 44px">وهل تجعلنا القيمُ أفضل؟</span>`), 3.8, 'pop', .7);
    s.update = lt => bobs.forEach((b, i) => { b.style.transform = `translateY(${Math.sin(lt * 1.6 + i) * 10}px) rotate(${Math.sin(lt + i) * 4}deg)`; });
  },

  overview(s) {
    const P = poster(170, 122, 756);
    s.add(P.el, 0, 'zoom', 1);
    const r = P.map('title');
    s.add(h('div', 'hl', { left: r.x - 6, top: r.y - 6, width: r.w + 12, height: r.h + 12 }), 1.2, 'fade', .5);
    const R = 150;
    s.add(h('div', 'abs', { right: R, top: 160 }, `<span class="pill" style="background:var(--maroon);color:#fff;font-size:30px"><span class="icon" style="width:36px;height:36px">${icon('megaphone', '#fff')}</span>${CFG.facts.launch}</span>`), .3, 'slideR');
    s.add(h('div', 'abs h1', { right: R, top: 236, fontSize: 70 }, 'ماذا سنتعلم؟'), .6, 'slideR');
    s.add(h('div', 'abs p', { right: R, top: 340, fontSize: 36, color: 'var(--muted)' }, `برنامج «${CFG.facts.sloganA}.. ${CFG.facts.sloganB}»`), 1.2, 'slideR');
    const items = [['star', 'معنى شعار البرنامج'], ['leaf', 'المحاور الأربعة للبرنامج'], ['users', 'دور الأسرة وموعد البدء']];
    const times = [5.0, 5.9, 7.0];
    items.forEach(([ic, txt], i) => {
      const c = h('div', 'card', { right: R, top: 450 + i * 128, width: 880, height: 104, display: 'flex', alignItems: 'center', gap: '24px', padding: '0 26px' },
        `<div class="num">${i + 1}</div><div class="h2" style="font-size:42px;flex:1">${txt}</div><div class="icon" style="width:52px;height:52px">${icon(ic, C().maroon)}</div>`);
      s.add(c, times[i], 'slideR', .6);
    });
  },

  who(s) {
    const P = poster(150, 122, 756);
    s.add(P.el, 0, 'fade', .6);
    const svg = svgLayer(); s.el.appendChild(svg);
    const F = CFG.facts;
    const cards = [
      { reg: 'header', at: .6, label: 'الجهة المشرفة', title: 'وزارة التربية والتعليم والتعليم العالي', sub: 'دولة قطر' },
      { reg: 'school', at: 2.2, label: 'المدرسة', title: F.school, sub: 'Al Khor Primary School for Girls' },
      { reg: 'footer', at: 4.9, label: 'القسم المنفّذ', title: F.department, sub: '' },
    ];
    cards.forEach((c, i) => {
      const r = P.map(c.reg), top = 140 + i * 225, cx = 830;
      s.add(h('div', 'hl', { left: r.x - 6, top: r.y - 6, width: r.w + 12, height: r.h + 12 }), c.at, 'fade', .4);
      const card = h('div', 'card', { left: cx, top, width: 950, height: 195 });
      card.appendChild(h('div', 'abs', { right: 34, top: 22 }, `<span class="pill" style="background:var(--pinkSoft);color:var(--maroon);font-size:26px;padding:4px 20px">${c.label}</span>`));
      card.appendChild(h('div', 'abs', { right: 34, top: 76, width: 560 },
        `<div class="h2" style="font-size:34px">${c.title}</div>` + (c.sub ? `<div class="p" style="font-size:26px;color:var(--muted)">${c.sub}</div>` : '')));
      const cr = crop(c.reg, 0, 0, 310); cr.style.left = '30px'; cr.style.top = (195 - cr.dataset.h) / 2 + 'px'; cr.style.borderWidth = '3px';
      card.appendChild(cr);
      s.add(card, c.at + .15, 'slideR', .6);
      s.tracks.push({ el: svgPath(svg, `M${r.x + r.w + 8} ${r.y + r.h / 2} C ${(r.x + r.w + cx) / 2} ${r.y + r.h / 2}, ${(r.x + r.w + cx) / 2} ${top + 97}, ${cx - 6} ${top + 97}`, C().gold, 5, false), at: c.at + .1, type: 'draw', d: .7 });
    });
  },

  slogan(s) {
    const x = 530, y = 118, w = 860, cr = crop('title', x, y, w);
    s.add(cr, .1, 'zoom', .9);
    const k = w / CFG.poster.regions.title[2];
    s.add(h('div', 'hl', { left: x + 10 * k, top: y + 8 * k, width: 630 * k, height: 92 * k }), 3.6, 'fade', .4, { out: 6.6, outD: .3 });
    s.add(h('div', 'hl', { left: x + 45 * k, top: y + 102 * k, width: 570 * k, height: 86 * k }), 6.8, 'fade', .4);
    const card = (left, bg, ic, head, meaning, at, type) => {
      const c = h('div', 'card', { left, top: 440, width: 760, height: 400, background: bg, color: '#fff' });
      c.appendChild(circleIcon(ic, 120, '#fff', bg, 760 - 34 - 120, 34));
      c.appendChild(h('div', 'abs h1', { right: 180, top: 52, fontSize: 64, color: '#fff' }, head));
      c.appendChild(h('div', 'abs', { right: 40, top: 200 }, `<span class="pill" style="background:rgba(255,255,255,.18);color:#fff;font-size:26px;padding:4px 20px">المعنى</span>`));
      c.appendChild(h('div', 'abs p', { right: 40, top: 255, width: 680, fontSize: 40, color: '#fff', fontWeight: 700 }, meaning));
      s.add(c, at, type, .7);
    };
    card(990, C().maroon, 'star', CFG.facts.sloganA, 'القيم الإيجابية ترفعنا وتجعلنا أفضل', 3.6, 'slideR');
    card(170, C().navy, 'walk', CFG.facts.sloganB, 'الحركة المنتظمة تجعلنا أكثر صحةً ونشاطًا', 6.8, 'slideL');
  },

  goal(s) {
    s.add(crop('desc', 440, 116, 1040), .1, 'fadeDown', .7);
    const svg = svgLayer(); s.el.appendChild(svg);
    const M = C().maroon;
    s.add(row(330, `<span class="pill" style="background:var(--navy);color:#fff;font-size:34px">برنامج مدرسي مجتمعي متكامل</span>`), .6, 'pop', .6);
    s.tracks.push({ el: svgPath(svg, 'M960 405 L960 462', M, 5, true), at: 1.0, type: 'draw', d: .4 });
    const goal = h('div', 'card center', { left: 740, top: 470, width: 440, height: 150, background: M, flexDirection: 'column', gap: '2px' },
      `<div class="tag" style="color:#ffd9e3;font-size:24px">الهدف: تعزيز</div><div class="h1" style="color:#fff;font-size:46px">نمط الحياة الصحية</div>`);
    s.add(goal, 1.2, 'pop', .7);
    const tool = (left, ic, txt, at, type) => s.add(h('div', 'card', { left, top: 485, width: 420, height: 120, display: 'flex', alignItems: 'center', gap: '20px', padding: '0 28px', border: `4px solid ${M}` },
      `<div class="circleIcon icon" style="width:76px;height:76px;padding:16px;background:var(--pinkSoft)">${icon(ic, M)}</div><div class="h2" style="font-size:36px;white-space:nowrap">${txt}</div>`), at, type, .6);
    tool(1310, 'walk', 'الحركة المنتظمة', 5.0, 'slideR');
    tool(190, 'star', 'القيم الإيجابية', 6.2, 'slideL');
    s.tracks.push({ el: svgPath(svg, 'M1302 545 L1190 545', M, 6, true), at: 5.4, type: 'draw', d: .4 });
    s.tracks.push({ el: svgPath(svg, 'M618 545 L730 545', M, 6, true), at: 6.6, type: 'draw', d: .4 });
    s.tracks.push({ el: svgPath(svg, 'M960 628 L960 668 L1200 668 L1200 700', C().gold, 5), at: 8.2, type: 'draw', d: .5 });
    s.tracks.push({ el: svgPath(svg, 'M960 668 L720 668 L720 700', C().gold, 5), at: 8.6, type: 'draw', d: .4 });
    const place = (cx, ic, txt, at) => s.add(h('div', 'abs', { left: cx - 170, top: 704, width: 340 , display: 'flex', justifyContent: 'center' },
      `<span class="pill" style="background:#fff;border:3px solid var(--gold);color:var(--navy);font-size:34px"><span class="icon" style="width:40px;height:40px">${icon(ic, C().gold)}</span>${txt}</span>`), at, 'pop', .6);
    place(1200, 'school', 'داخل المدرسة', 8.4);
    place(720, 'home', 'وخارجها', 8.9);
  },

  pillars(s) {
    const T = s.cfg.pillarTimes, M = C().maroon;
    s.add(row(112, 'المحاور الأربعة للبرنامج', 'h1', { fontSize: 54 }), .1, 'fadeDown');
    s.add(crop('pillars', 260, 240, 1400), .1, 'fadeUp', .6, { out: 2.0, outD: .5 });
    const chipIcons = { 'الحركة': 'walk', 'التغذية': 'apple', 'النوم': 'bed', 'الماء': 'drop' };
    const chipTimes = [[4.6, 5.3, 6.0, 6.6], [], [15.0, 15.8, 16.6, 17.4], []];
    const extras = [[], [], [], [['نشط', 'walk', 20.4], ['صحي', 'heart', 20.9]]];
    const inners = CFG.pillars.map((p, i) => {
      const x = 1385 - i * 410;
      const wrap = s.add(h('div', 'abs', { left: x, top: 220, width: 380, height: 580 }), T[i], 'fadeUp', .6);
      const card = h('div', 'card', { left: 0, top: 0, width: 380, height: 580, transition: 'none', border: '4px solid transparent' });
      wrap.appendChild(card);
      card.appendChild(h('div', 'num abs', { top: 22, right: 22 }, p.num));
      const ic = crop(p.crop, 105, 40, 170, { style: { borderRadius: '50%', borderWidth: '4px' } }); card.appendChild(ic);
      card.appendChild(h('div', 'abs h2 center', { left: 20, top: 230, width: 340, height: 110, fontSize: 36 }, p.title));
      const chips = h('div', 'abs', { left: 20, top: 360, width: 340, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' });
      card.appendChild(chips);
      p.chips.forEach((c, j) => {
        const el = h('span', 'chip', null, chipIcons[c] ? `<span class="icon" style="width:30px;height:30px;margin-left:8px">${icon(chipIcons[c], M)}</span>${c}` : c);
        chips.appendChild(el); s.tracks.push({ el, at: chipTimes[i][j], type: 'pop', d: .5 });
      });
      extras[i].forEach(([c, ic, at]) => {
        const el = h('span', 'chip', null, `<span class="icon" style="width:30px;height:30px;margin-left:8px">${icon(ic, M)}</span>${c}`);
        chips.appendChild(el); s.tracks.push({ el, at, type: 'pop', d: .5 });
      });
      if (p.detail) {
        const d = h('div', 'p center', { width: 340, fontSize: 30, fontWeight: 700, color: 'var(--maroonDark)', background: 'var(--pinkSoft)', borderRadius: '20px', padding: '14px 12px' },
          p.detail);
        chips.appendChild(d); s.tracks.push({ el: d, at: 9.6, type: 'fadeUp', d: .6 });
      }
      return card;
    });
    s.update = lt => {
      let active = -1; T.forEach((t, i) => { if (lt >= t) active = i; });
      if (lt >= 21.4) active = -1;
      inners.forEach((c, i) => {
        const on = i === active;
        c.style.borderColor = on ? M : 'transparent';
        c.style.transform = on ? 'scale(1.04)' : 'scale(1)';
        c.style.opacity = active === -1 || on ? 1 : .55;
      });
    };
  },

  partner(s) {
    const M = C().maroon;
    s.add(crop('building', 330, 400, 640), .2, 'fade', .8);
    const gw = s.add(h('div', 'abs', { left: 140, top: 230, width: 300, height: 600 }), .4, 'pop', .8);
    const girl = crop('girl', 0, 0, 300); gw.appendChild(girl);
    s.add(crop('partner', 1040, 140, 740), .5, 'fadeDown', .6);
    s.add(h('div', 'card', { left: 1040, top: 296, width: 740, height: 170 },
      `<div class="abs circleIcon icon" style="right:30px;top:25px;width:120px;height:120px;padding:26px;background:var(--pinkSoft)">${icon('users', M)}</div>
       <div class="abs h2" style="right:175px;top:30px;font-size:40px">الأسرة شريكٌ أساسي</div>
       <div class="abs p" style="right:175px;top:92px;font-size:28px;color:var(--muted)">عبر مبادرات منزلية بسيطة وقابلة للتطبيق</div>`), 1.5, 'slideR', .6);
    const cal = h('div', 'card', { left: 1040, top: 510, width: 740, height: 300, background: M });
    cal.innerHTML = `<div class="abs" style="right:40px;top:50px;width:200px;height:200px;background:#fff;border-radius:28px;overflow:hidden;box-shadow:0 10px 24px rgba(0,0,0,.18)">
        <div style="height:62px;background:var(--gold)"></div>
        <div class="center icon" style="height:138px;padding:22px">${icon('calendar', M)}</div></div>
      <div class="abs h2" style="right:280px;top:66px;font-size:40px;color:#ffe3ea">يبدأ البرنامج</div>
      <div class="abs h1" style="right:280px;top:130px;font-size:62px;color:#fff;white-space:nowrap">في شهر ${CFG.facts.startMonth}</div>`;
    s.add(cal, 4.4, 'pop', .8);
    s.update = lt => { girl.style.transform = `translateY(${Math.sin(lt * 3) * 8}px)`; };
  },

  example(s) {
    const E = CFG.example, M = C().maroon;
    s.add(row(108, 'مثال تطبيقي: يوم طالبة', 'h1', { fontSize: 56 }), .1, 'fadeDown');
    s.add(row(192, `<span class="pill" style="background:#fff;border:2px dashed var(--gold);color:var(--muted);font-size:26px">${E.tag}</span>`), .5, 'fade');
    const xs = [1500, 960, 420], Y = 420, X0 = 1760, X1 = 160;
    s.el.appendChild(h('div', 'abs', { left: X1, top: Y - 5, width: X0 - X1, height: 10, borderRadius: '6px', background: 'var(--pink)' }));
    const bar = h('div', 'abs', { top: Y - 5, height: 10, borderRadius: '6px', background: M }); s.el.appendChild(bar);
    E.steps.forEach((st, i) => {
      s.add(row(Y - 150, `<span class="pill" style="background:var(--navy);color:#fff;font-size:30px">${st.time}</span>`, '', { left: xs[i] - 960 }), st.at, 'fadeDown', .5);
      const ci = circleIcon(st.icon, 120, '#fff', M, xs[i] - 60, Y - 60, 2); ci.style.border = `5px solid ${M}`;
      s.add(ci, st.at, 'pop', .6);
      s.add(h('div', 'card', { left: xs[i] - 230, top: Y + 100, width: 460, height: 250, padding: '28px 26px', textAlign: 'center' },
        `<div class="h2" style="font-size:36px;margin-bottom:22px">${st.text}</div>
         <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">${st.links.map(l => `<span class="chip" style="font-size:26px;background:#fff7e8;border-color:#ecd3a6">${l}</span>`).join('')}</div>`), st.at + .2, 'fadeUp', .6);
    });
    const runner = circleIcon('walk', 64, M, '#fff', 0, Y - 32, 2.4); s.el.insertBefore(runner, bar.nextSibling);
    const keys = [[2.8, X0], [3.4, xs[0]], [6.3, xs[1]], [8.8, xs[2]], [11.4, X1 + 40]];
    s.update = lt => {
      let x = X0;
      for (let i = 0; i < keys.length - 1; i++) {
        const [ta, xa] = keys[i], [tb, xb] = keys[i + 1];
        if (lt >= ta) x = lerp(xa, xb, ease.inOut(clamp((lt - ta) / (tb - ta) * (i ? 3 : 1))));
      }
      bar.style.left = x + 'px'; bar.style.width = (X0 - x) + 'px';
      runner.style.left = (x - 32) + 'px';
      runner.style.opacity = clamp((lt - 2.6) / .3);
      runner.style.transform = `translateY(${-Math.abs(Math.sin(lt * 7)) * 10}px)`;
    };
  },

  quiz(s) {
    const Q = CFG.quiz, M = C().maroon, G = C().green;
    s.add(row(108, `<span class="pill" style="background:var(--gold);color:#fff;font-size:32px"><span class="icon" style="width:38px;height:38px">${icon('star', '#fff')}</span>سؤال تفاعلي</span>`), .1, 'pop');
    s.add(row(190, Q.question, 'h2', { fontSize: 54 }), .4, 'fadeUp');
    const cards = Q.options.map((o, i) => {
      const x = i % 2 === 0 ? 1110 : 460, y = 320 + Math.floor(i / 2) * 150;
      const wrap = s.add(h('div', 'abs', { left: x, top: y, width: 620, height: 124 }), 1.0 + i * .3, 'pop', .5);
      const c = h('div', 'card', { left: 0, top: 0, width: 620, height: 124, display: 'flex', alignItems: 'center', gap: '24px', padding: '0 26px', border: '4px solid var(--pink)', overflow: 'visible' },
        `<div class="num">${Q.letters[i]}</div><div class="h2" style="font-size:44px;flex:1">${o}</div>`);
      wrap.appendChild(c);
      const badge = h('span', 'chip abs', { left: 24, top: -24, opacity: 0, background: i === Q.correct ? '#fff' : '#eaf6ee', borderColor: i === Q.correct ? '#fff' : '#bfe0ca', color: i === Q.correct ? G : G, fontSize: '24px' },
        i === Q.correct ? 'ليست من العادات ✔' : 'من العادات');
      c.appendChild(badge);
      return { c, badge };
    });
    // countdown ring
    const ring = h('div', 'abs', { left: 150, top: 320, width: 260, height: 260 },
      `<svg viewBox="0 0 100 100" style="width:100%;height:100%;transform:rotate(-90deg)"><circle cx="50" cy="50" r="44" fill="#fff" stroke="var(--pink)" stroke-width="8"/>
       <circle id="qarc" cx="50" cy="50" r="44" fill="none" stroke="${M}" stroke-width="8" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="0"/></svg>
       <div class="abs center h1" style="inset:0;font-size:110px" id="qnum"></div>`);
    s.el.appendChild(ring);
    const think = h('div', 'abs center h2', { left: 130, top: 600, width: 300, fontSize: 36, color: 'var(--muted)' }, 'فكّروا…'); s.el.appendChild(think);
    const explain = s.add(h('div', 'card center', { left: 460, top: 640, width: 1270, height: 110, background: 'var(--pinkSoft)', border: '3px solid var(--pink)', gap: '18px' },
      `${['walk', 'apple', 'bed', 'drop'].map(n => `<span class="icon" style="width:46px;height:46px">${icon(n, M)}</span>`).join('')}<span class="h2" style="font-size:36px">${Q.explain}</span>`), 11.3, 'fadeUp', .6);
    const T0 = Q.thinkStart, T1 = T0 + Q.thinkSeconds, REV = 8.8;
    s.update = lt => {
      const vis = lt >= T0 - .3 && lt < T1 + .3 ? Math.min(clamp((lt - T0 + .3) / .3), clamp((T1 + .3 - lt) / .3)) : 0;
      ring.style.opacity = vis; think.style.opacity = vis;
      ring.style.transform = `scale(${1 + .04 * Math.sin(lt * 2 * Math.PI)})`;
      const left = clamp(T1 - lt, 0, Q.thinkSeconds);
      ring.querySelector('#qarc').style.strokeDashoffset = 1 - left / Q.thinkSeconds;
      ring.querySelector('#qnum').textContent = Math.max(1, Math.ceil(left));
      const rv = ease.out(clamp((lt - REV) / .5));
      cards.forEach(({ c, badge }, i) => {
        const ok = i === Q.correct;
        if (ok) {
          c.style.background = rv > .5 ? G : '#fff'; c.style.borderColor = rv > .5 ? G : 'var(--pink)';
          c.querySelector('.h2').style.color = rv > .5 ? '#fff' : ''; c.style.transform = `scale(${1 + .06 * rv})`;
          badge.style.opacity = rv;
        } else {
          c.style.opacity = 1 - .45 * rv;
          badge.style.opacity = ease.out(clamp((lt - 11.3) / .5));
        }
      });
    };
  },

  summary(s) {
    const M = C().maroon;
    s.add(row(108, 'الخلاصة', 'h1', { fontSize: 56 }), .1, 'fadeDown');
    s.add(row(196, `${CFG.facts.sloganA}.. <span style="color:var(--navy)">${CFG.facts.sloganB}</span>`, 'h1', { fontSize: 84 }), .4, 'zoom', .8);
    CFG.pillars.forEach((p, i) => {
      const t = h('div', 'card', { left: 1395 - i * 405, top: 360, width: 370, height: 230, textAlign: 'center' });
      t.appendChild(circleIcon(p.icon, 100, 'var(--pinkSoft)', M, 135, 22));
      t.appendChild(h('div', 'abs h2 center', { left: 15, top: 132, width: 340, height: 90, fontSize: 30 }, p.title));
      s.add(t, 3.9 + i * .3, 'pop', .6);
    });
    const pills = [['calendar', `يبدأ في شهر ${CFG.facts.startMonth}`, M, '#fff', 5.6], ['users', CFG.facts.partnership, '#fff', M, 6.1]];
    pills.forEach(([ic, txt, bg, fg, at], i) => s.add(h('div', 'abs', { left: i ? 230 : 990, top: 636, width: 700, display: 'flex', justifyContent: 'center' },
      `<span class="pill" style="background:${bg};color:${fg};font-size:36px;border:3px solid ${M}"><span class="icon" style="width:42px;height:42px">${icon(ic, fg)}</span>${txt}</span>`), at, 'pop', .6));
    s.add(row(752, `<span class="icon" style="display:inline-block;vertical-align:middle;width:62px;height:62px;margin-left:16px">${icon('walk', M, 2.4)}</span>فلنبدأ الحركة معًا!`, 'h1', { fontSize: 58 }), 7.6, 'pop', .7);
  },
};

/* ---------------- cover image ---------------- */
function buildCover(stage) {
  stage.innerHTML = '';
  buildBackground(stage);
  document.getElementById('wave1').setAttribute('d', wavePath(0, 14, 0, 110));
  document.getElementById('wave2').setAttribute('d', wavePath(0, 10, 2.1, 135));
  const P = poster(150, 90, 900); stage.appendChild(P.el); P.el.style.transform = 'rotate(-3deg)';
  const g = crop('girl', 640, 330, 300); stage.appendChild(g); g.style.transform = 'rotate(4deg)';
  const R = 140;
  stage.appendChild(h('div', 'abs', { right: R, top: 190 }, `<span class="pill" style="background:var(--gold);color:#fff;font-size:34px"><span class="icon" style="width:40px;height:40px">${icon('star', '#fff')}</span>${CFG.cover.kicker}</span>`));
  stage.appendChild(h('div', 'abs h1', { right: R, top: 290, width: 900, fontSize: 104, lineHeight: '1.3' }, `${CFG.facts.sloganA}..<br><span style="color:var(--navy)">${CFG.facts.sloganB}</span>`));
  stage.appendChild(h('div', 'abs p', { right: R, top: 600, width: 960, fontSize: 36, color: 'var(--muted)', fontWeight: 700 }, CFG.cover.subtitle));
  stage.appendChild(h('div', 'abs', { right: R, top: 720, display: 'flex', gap: '16px' },
    CFG.pillars.map(p => `<span class="circleIcon icon" style="width:96px;height:96px;padding:22px;background:#fff;box-shadow:0 10px 24px rgba(94,15,42,.14)">${icon(p.icon, CFG.colors.maroon)}</span>`).join('')));
  stage.appendChild(h('div', 'abs h2', { right: R, top: 870, fontSize: 34, color: 'var(--maroonDark)' }, `${CFG.facts.school} • ${CFG.facts.department}`));
}
