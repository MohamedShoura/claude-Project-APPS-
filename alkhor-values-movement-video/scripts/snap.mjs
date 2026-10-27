// Quick stills for QA: node scripts/snap.mjs out_dir t1 t2 ...   (or "cover")
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // works with a global or local install
import { startServer } from './server.mjs';
const [out, ...times] = process.argv.slice(2);
const { srv, url } = await startServer();
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
pg.on('pageerror', e => console.error('PAGE ERROR', e.message));
for (const t of times) {
  await pg.goto(`${url}/src/index.html${t === 'cover' ? '?cover' : ''}`);
  await pg.evaluate(() => window.ready);
  if (t !== 'cover') await pg.evaluate(t => window.renderFrame(t), parseFloat(t));
  await pg.screenshot({ path: `${out}/${t}.png` });
}
await b.close(); srv.close();
