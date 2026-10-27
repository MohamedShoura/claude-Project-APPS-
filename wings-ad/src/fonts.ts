import {continueRender, delayRender, staticFile} from 'remotion';

// Local font files (copied from @fontsource) so renders never depend on the network.
const FACES: Array<[string, string, string]> = [
  ['Tajawal', 'fonts/tajawal-arabic-300-normal.woff2', '300'],
  ['Tajawal', 'fonts/tajawal-arabic-500-normal.woff2', '500'],
  ['Josefin Sans', 'fonts/josefin-sans-latin-200-normal.woff2', '200'],
  ['Josefin Sans', 'fonts/josefin-sans-latin-300-normal.woff2', '300'],
  ['Josefin Sans', 'fonts/josefin-sans-latin-400-normal.woff2', '400'],
];

let loaded = false;
export const loadFonts = () => {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const handle = delayRender('fonts');
  Promise.all(
    FACES.map(([family, file, weight]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, {weight});
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
};

export const AR = "'Tajawal', sans-serif";
export const LATIN = "'Josefin Sans', sans-serif";
