import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate,
  random, staticFile, useCurrentFrame, useVideoConfig,
} from 'remotion';
import {COPY, SCENES, Scene, XFADE, useClips} from './timeline';
import {AR, LATIN, loadFonts} from './fonts';

export type Layout = 'vertical' | 'horizontal';

loadFonts();

export const COLORS = {
  espresso: '#120C08',
  copper: '#C98A5E',
  copperLight: '#F0C9A0',
  cream: '#F4ECE2',
};

const ease = Easing.bezier(0.33, 0, 0.2, 1);

// ---------- media ----------
const Media: React.FC<{scene: Scene; fit: 'cover' | 'contain'; style?: React.CSSProperties; still?: boolean}> = ({scene, fit, style, still}) => {
  const frame = useCurrentFrame();
  const common: React.CSSProperties = {
    width: '100%', height: '100%', objectFit: fit,
    objectPosition: `${scene.focusX * 100}% ${scene.focusY * 100}%`,
    // warm, slightly crushed "coffee" grade applied to every shot
    filter: 'contrast(1.07) saturate(1.06) sepia(0.06) brightness(0.98)',
    ...style,
  };
  if (useClips && !still) {
    return <OffthreadVideo src={staticFile(scene.clip)} muted style={common} />;
  }
  // Photo mode: eased digital camera move (push / drift / arc / rack focus)
  const m = scene.move;
  const k = (r?: [number, number]) => (r ? interpolate(frame, [0, scene.duration], r, {easing: ease}) : 0);
  const blur = m.focusPull ? interpolate(frame, [0, m.focusPull], [7, 0], {extrapolateRight: 'clamp', easing: ease}) : 0;
  return (
    <AbsoluteFill style={{perspective: 1600, overflow: 'hidden'}}>
      <Img src={staticFile(scene.still)} style={{
        ...common,
        filter: `${common.filter} blur(${blur}px)`,
        transformOrigin: `${m.origin[0]}% ${m.origin[1]}%`,
        transform: `translate(${k(m.x)}%, ${k(m.y)}%) rotateY(${k(m.rotateY)}deg) rotate(${k(m.rotate)}deg) scale(${k(m.scale)})`,
      }} />
    </AbsoluteFill>
  );
};

// Portrait shot inside the 16:9 frame: blurred, darkened copy fills the frame,
// the real shot sits sharp on the right third so copy can live on the left.
const PortraitIn169: React.FC<{scene: Scene; align?: 'center' | 'right'}> = ({scene, align = 'right'}) => (
  <AbsoluteFill style={{backgroundColor: COLORS.espresso}}>
    <AbsoluteFill style={{filter: 'blur(40px) brightness(0.35)', transform: 'scale(1.2)'}}>
      <Media scene={scene} fit="cover" />
    </AbsoluteFill>
    <AbsoluteFill style={{
      left: align === 'right' ? 1150 : (1920 - 608) / 2, width: 608, overflow: 'hidden',
      boxShadow: '0 0 140px 50px rgba(0,0,0,0.7)',
    }}>
      <Media scene={scene} fit="cover" />
    </AbsoluteFill>
  </AbsoluteFill>
);

// ---------- finishing layers ----------
const Grain: React.FC<{opacity?: number}> = ({opacity = 0.09}) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame % 24);
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width="100%" height="100%">
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

const Vignette: React.FC<{strength?: number}> = ({strength = 0.6}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 45%, rgba(0,0,0,${strength}) 100%)`}} />
);

// Golden dust motes drifting through the light
const Dust: React.FC<{count?: number; seed?: string; opacity?: number}> = ({count = 34, seed = 'd', opacity = 0.55}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen'}}>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = 2 + r('s') * 7;
        const x = (r('x') * width + frame * (r('vx') - 0.5) * 0.8) % width;
        const y = (r('y') * height - frame * (0.25 + r('vy') * 0.7) + height * 2) % height;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(frame / (18 + r('t') * 30) + i));
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%',
            background: COLORS.copperLight, filter: `blur(${size > 6 ? 3 : 1}px)`,
            opacity: opacity * tw * (size > 6 ? 0.5 : 1),
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

// Raking golden side-light sweep (screen-blended)
const LightSweep: React.FC<{dur: number; from?: number; to?: number; intensity?: number; angle?: number}> = ({dur, from = -40, to = 140, intensity = 0.35, angle = 105}) => {
  const frame = useCurrentFrame();
  const pos = interpolate(frame, [0, dur], [from, to], {easing: ease});
  return (
    <AbsoluteFill style={{
      mixBlendMode: 'screen', opacity: intensity,
      background: `linear-gradient(${angle}deg, rgba(0,0,0,0) ${pos - 25}%, rgba(255,190,120,0.85) ${pos}%, rgba(0,0,0,0) ${pos + 25}%)`,
    }} />
  );
};

const LightLeak: React.FC<{at: number; len?: number}> = ({at, len = 26}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at - len / 2, at, at + len / 2], [0, 0.55, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const x = interpolate(frame, [at - len / 2, at + len / 2], [20, 80], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{
      mixBlendMode: 'screen', opacity: o,
      background: `radial-gradient(circle at ${x}% 40%, rgba(255,170,90,0.95) 0%, rgba(220,110,40,0.5) 25%, rgba(0,0,0,0) 60%)`,
    }} />
  );
};

// ---------- typography ----------
const BrandLine: React.FC<{start: number; size: number; color?: string}> = ({start, size, color}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [start, start + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sp = interpolate(frame, [start, start + 60], [0.75, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const blur = interpolate(frame, [start, start + 20], [8, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{
      fontFamily: LATIN, fontWeight: 300, fontSize: size, letterSpacing: `${sp}em`,
      // trailing letter-spacing would push the word off-centre
      marginRight: `-${sp}em`, opacity: o, filter: `blur(${blur}px)`,
      color: color ?? undefined,
      background: color ? undefined : `linear-gradient(100deg, ${COLORS.copper} 0%, ${COLORS.copperLight} 45%, ${COLORS.copper} 70%, #9C6440 100%)`,
      WebkitBackgroundClip: color ? undefined : 'text',
      WebkitTextFillColor: color ? undefined : 'transparent',
      textShadow: color ? '0 2px 24px rgba(0,0,0,0.6)' : undefined,
      whiteSpace: 'nowrap',
    }}>{COPY.brand}</div>
  );
};

const Rule: React.FC<{start: number; width: number}> = ({start, width}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [start, start + 30], [0, width], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return <div style={{height: 1.5, width: w, margin: '0 auto', background: `linear-gradient(90deg, transparent, ${COLORS.copper}, transparent)`}} />;
};

const ArabicLine: React.FC<{text: string; start: number; size: number; weight?: number}> = ({text, start, size, weight = 300}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [start, start + 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(frame, [start, start + 30], [18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return (
    <div dir="rtl" lang="ar" style={{
      fontFamily: AR, fontWeight: weight, fontSize: size, color: COLORS.cream, opacity: o,
      transform: `translateY(${y}px)`, textShadow: '0 2px 20px rgba(0,0,0,0.7)', whiteSpace: 'nowrap',
    }}>{text}</div>
  );
};

const TitleBlock: React.FC<{start: number; arabic: string; scale: number; align?: 'center' | 'left'}> = ({start, arabic, scale, align = 'center'}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: 22 * scale, textAlign: 'center'}}>
    <BrandLine start={start} size={46 * scale} />
    <div style={{width: '100%'}}><Rule start={start + 14} width={300 * scale} /></div>
    <ArabicLine text={arabic} start={start + 26} size={48 * scale} />
  </div>
);

// ---------- scene wrapper with crossfades ----------
const SceneShell: React.FC<{scene: Scene; children: React.ReactNode; fadeIn?: number; fadeOut?: number}> = ({scene, children, fadeIn = XFADE, fadeOut = XFADE}) => {
  const frame = useCurrentFrame();
  const inO = fadeIn ? interpolate(frame, [0, fadeIn], [0, 1], {extrapolateRight: 'clamp'}) : 1;
  const outO = fadeOut ? interpolate(frame, [scene.duration - fadeOut, scene.duration], [1, 0], {extrapolateLeft: 'clamp'}) : 1;
  return <AbsoluteFill style={{opacity: Math.min(inO, outO)}}>{children}</AbsoluteFill>;
};

const byId = (id: string) => SCENES.find((s) => s.id === id)!;

// ---------- scenes ----------
const S1: React.FC<{layout: Layout}> = () => {
  const sc = byId('s1');
  const frame = useCurrentFrame();
  // extra slow macro push on top of the generated camera move
  const s = useClips ? interpolate(frame, [0, sc.duration], [1.06, 1.14], {easing: ease}) : 1;
  return (
    <SceneShell scene={sc} fadeIn={24} fadeOut={0}>
      <AbsoluteFill style={{transform: `scale(${s})`}}><Media scene={sc} fit="cover" /></AbsoluteFill>
      <LightSweep dur={sc.duration} intensity={0.28} />
      <Dust count={22} seed="s1" opacity={0.35} />
      <Vignette strength={0.75} />
    </SceneShell>
  );
};

const S2: React.FC<{layout: Layout}> = () => {
  const sc = byId('s2');
  const frame = useCurrentFrame();
  const s = useClips ? interpolate(frame, [0, sc.duration], [1.04, 1.1], {easing: ease}) : 1;
  const flicker = 0.18 + 0.06 * Math.sin(frame / 5) + 0.04 * Math.sin(frame / 2.3);
  return (
    <SceneShell scene={sc} fadeIn={XFADE} fadeOut={XFADE}>
      <AbsoluteFill style={{transform: `scale(${s})`}}><Media scene={sc} fit="cover" /></AbsoluteFill>
      <AbsoluteFill style={{mixBlendMode: 'soft-light', opacity: flicker, background: 'radial-gradient(circle at 70% 30%, #ffb46a, transparent 65%)'}} />
      <Dust count={26} seed="s2" opacity={0.4} />
      <Vignette strength={0.7} />
    </SceneShell>
  );
};

const S3: React.FC<{layout: Layout}> = ({layout}) => {
  const sc = byId('s3');
  const v = layout === 'vertical';
  return (
    <SceneShell scene={sc} fadeIn={XFADE + 6} fadeOut={XFADE}>
      {v ? <Media scene={sc} fit="cover" /> : <PortraitIn169 scene={sc} />}
      <LightSweep dur={sc.duration} from={-30} to={130} intensity={0.16} angle={75} />
      <Dust count={40} seed="s3" opacity={0.6} />
      <Vignette strength={0.55} />
      {v ? (
        <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 250}}>
          <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10,6,4,0.75) 0%, rgba(10,6,4,0) 32%)'}} />
          <TitleBlock start={40} arabic={COPY.heroTagline} scale={1.05} />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 170}}>
          <TitleBlock start={40} arabic={COPY.heroTagline} scale={1.05} />
        </AbsoluteFill>
      )}
    </SceneShell>
  );
};

const S4: React.FC<{layout: Layout}> = ({layout}) => {
  const sc = byId('s4');
  return (
    <SceneShell scene={sc}>
      {layout === 'vertical' ? <Media scene={sc} fit="cover" /> : <PortraitIn169 scene={sc} align="center" />}
      <AbsoluteFill style={{mixBlendMode: 'soft-light', opacity: 0.22, background: 'radial-gradient(circle at 30% 20%, #ffbf80, transparent 60%)'}} />
      <Dust count={20} seed="s4" opacity={0.35} />
      <Vignette strength={0.6} />
    </SceneShell>
  );
};

const S5: React.FC<{layout: Layout}> = ({layout}) => {
  const sc = byId('s5');
  const frame = useCurrentFrame();
  const v = layout === 'vertical';
  // spotlight tightens on the logo, world falls darker
  const spot = interpolate(frame, [0, 90], [70, 38], {extrapolateRight: 'clamp', easing: ease});
  const dark = interpolate(frame, [0, 90], [0.25, 0.7], {extrapolateRight: 'clamp'});
  return (
    <SceneShell scene={sc} fadeOut={0}>
      {v ? <Media scene={sc} fit="cover" /> : <PortraitIn169 scene={sc} />}
      <AbsoluteFill style={{background: `radial-gradient(ellipse at ${v ? '50% 60%' : '62% 58%'}, rgba(0,0,0,0) ${spot * 0.45}%, rgba(8,5,3,${dark}) ${spot}%)`}} />
      <Dust count={30} seed="s5" opacity={0.5} />
      <Grain opacity={0.05} />
      {v ? (
        <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 250}}>
          <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10,6,4,0.8) 0%, rgba(10,6,4,0) 30%)'}} />
          <TitleBlock start={68} arabic={COPY.endLine} scale={1.1} />
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 170}}>
          <TitleBlock start={68} arabic={COPY.endLine} scale={1.1} />
        </AbsoluteFill>
      )}
    </SceneShell>
  );
};

const SCENE_COMPONENTS: Record<string, React.FC<{layout: Layout}>> = {s1: S1, s2: S2, s3: S3, s4: S4, s5: S5};

export const WingsAd: React.FC<{layout: Layout}> = ({layout}) => {
  const frame = useCurrentFrame();
  // global fade from/to black
  const fadeEnd = interpolate(frame, [870, 899], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.espresso}}>
      <AbsoluteFill style={{opacity: fadeEnd}}>
        {SCENES.map((sc) => {
          const C = SCENE_COMPONENTS[sc.id];
          return (
            <Sequence key={sc.id} from={sc.from} durationInFrames={sc.duration} name={sc.id}>
              <C layout={layout} />
            </Sequence>
          );
        })}
        <LightLeak at={157} />
        <LightLeak at={758} len={30} />
        <Grain />
      </AbsoluteFill>
      <Audio src={staticFile('audio/mix.wav')} />
    </AbsoluteFill>
  );
};
