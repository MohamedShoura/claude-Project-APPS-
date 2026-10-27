import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {COPY} from './timeline';
import {AR, LATIN, loadFonts} from './fonts';
import {COLORS, Layout} from './WingsAd';

loadFonts();

// Built from the untouched original product photo so the packaging and logo are 100% faithful.
export const Thumbnail: React.FC<{layout: Layout}> = ({layout}) => {
  const v = layout === 'vertical';
  const brand: React.CSSProperties = {
    fontFamily: LATIN, fontWeight: 300, fontSize: v ? 76 : 70, letterSpacing: '0.5em', marginRight: '-0.5em',
    background: `linear-gradient(100deg, ${COLORS.copper} 0%, ${COLORS.copperLight} 45%, ${COLORS.copper} 70%, #9C6440 100%)`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', whiteSpace: 'nowrap',
  };
  const ar: React.CSSProperties = {fontFamily: AR, fontWeight: 500, fontSize: v ? 66 : 58, color: COLORS.cream, textShadow: '0 2px 20px rgba(0,0,0,.7)'};
  const rule = <div style={{height: 2, width: 360, background: `linear-gradient(90deg, transparent, ${COLORS.copper}, transparent)`}} />;
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.espresso}}>
      {v ? (
        <Img src={staticFile('bags.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06) translateY(3%)', filter: 'contrast(1.07) saturate(1.06) sepia(0.06)'}} />
      ) : (
        <>
          <Img src={staticFile('bags.jpg')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(40px) brightness(0.3)'}} />
          <Img src={staticFile('bags.jpg')} style={{position: 'absolute', right: 140, top: 0, height: '100%', boxShadow: '0 0 120px 40px rgba(0,0,0,.65)', filter: 'contrast(1.07) saturate(1.06) sepia(0.06)'}} />
        </>
      )}
      <AbsoluteFill style={{background: v
        ? 'linear-gradient(180deg, rgba(10,6,4,.85) 0%, rgba(10,6,4,0) 30%), radial-gradient(ellipse at 50% 58%, transparent 35%, rgba(0,0,0,.55) 100%)'
        : 'linear-gradient(90deg, rgba(10,6,4,.6) 0%, rgba(10,6,4,0) 55%)'}} />
      <AbsoluteFill style={{
        justifyContent: v ? 'flex-start' : 'center', alignItems: v ? 'center' : 'flex-start',
        paddingTop: v ? 230 : 0, paddingLeft: v ? 0 : 150,
      }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
          <div style={brand}>{COPY.brand}</div>
          {rule}
          <div dir="rtl" lang="ar" style={ar}>{COPY.heroTagline}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
