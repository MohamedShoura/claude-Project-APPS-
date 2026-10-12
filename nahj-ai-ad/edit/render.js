const { chromium } = require('playwright');
(async () => {
  const [,, from, to, outDir] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await p.goto('file://' + __dirname + '/overlay.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  for (let f = +from; f < +to; f++) {
    await p.evaluate(t => window.render(t), f / 30);
    await p.screenshot({ path: `${outDir}/o_${String(f).padStart(4, '0')}.png`, omitBackground: true });
  }
  await b.close();
})();
