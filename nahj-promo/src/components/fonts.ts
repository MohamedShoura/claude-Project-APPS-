import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
import {ASSETS, FONT} from '../config';

// Arabic glyphs come from the Arabic subset, punctuation / digits from Latin.
const ARABIC_RANGE =
  'U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC';
const LATIN_RANGE =
  'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-200B, U+2010-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';

let loaded: Promise<unknown> | null = null;

// loadFont() wraps each file in delayRender(), so no frame is captured
// before every weight has finished loading.
export const ensureFonts = () => {
  if (loaded) return loaded;
  const jobs: Promise<unknown>[] = [];
  for (const w of FONT.weights) {
    jobs.push(
      loadFont({
        family: FONT.family,
        url: staticFile(`${ASSETS.fonts}/cairo-arabic-${w}-normal.woff2`),
        weight: String(w),
        unicodeRange: ARABIC_RANGE,
      }),
    );
  }
  for (const w of [400, 700, 800, 900]) {
    jobs.push(
      loadFont({
        family: FONT.family,
        url: staticFile(`${ASSETS.fonts}/cairo-latin-${w}-normal.woff2`),
        weight: String(w),
        unicodeRange: LATIN_RANGE,
      }),
    );
  }
  loaded = Promise.all(jobs);
  return loaded;
};
