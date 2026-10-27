import { continueRender, delayRender, staticFile } from "remotion";

// خطا Cairo وTajawal (رخصة SIL OFL 1.1) محمّلان محليًا من public/fonts — لا اعتماد على روابط خارجية.
const faces: [string, string, number][] = [];
for (const w of [500, 700, 800]) for (const s of ["arabic", "latin"]) faces.push(["Cairo", `fonts/cairo-${s}-${w}-normal.woff2`, w]);
for (const w of [400, 500, 700]) for (const s of ["arabic", "latin"]) faces.push(["Tajawal", `fonts/tajawal-${s}-${w}-normal.woff2`, w]);

let loaded = false;
export const loadFonts = () => {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("fonts");
  Promise.all(
    faces.map(([family, file, weight]) => {
      const f = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, { weight: String(weight) });
      (document.fonts as unknown as { add: (f: FontFace) => void }).add(f);
      return f.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => { console.error(e); continueRender(handle); });
};
