import React from "react";

export const TABLE = { left: 90, right: 520, top: 1178, surface: 1205 };

/** Warm living room: beige walls, soft-blue accents, window light. t in seconds. */
export const Room: React.FC<{ t: number }> = ({ t }) => {
  const sway = Math.sin(t * 1.3) * 2.2;
  const curtain = Math.sin(t * 0.9) * 5;
  return (
    <g>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6ECDB" />
          <stop offset="1" stopColor="#EBDCC3" />
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D8BE98" />
          <stop offset="1" stopColor="#C9AB82" />
        </linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BFD9EA" />
          <stop offset="1" stopColor="#E6F1F6" />
        </linearGradient>
        <linearGradient id="ray" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF6DC" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFF6DC" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D2A877" />
          <stop offset="1" stopColor="#BD9160" />
        </linearGradient>
      </defs>

      {/* wall + floor (drawn with bleed for camera moves) */}
      <rect x={-400} y={-400} width={1880} height={1740} fill="url(#wall)" />
      <rect x={-400} y={1330} width={1880} height={1000} fill="url(#floor)" />
      <rect x={-400} y={1318} width={1880} height={16} fill="#F9F2E6" />
      {[1392, 1470, 1570, 1700].map((y) => (
        <line key={y} x1={-400} x2={1480} y1={y} y2={y} stroke="#B99A70" strokeWidth={2} opacity={0.28} />
      ))}

      {/* window */}
      <g>
        <rect x={96} y={560} width={330} height={400} rx={18} fill="#FBF6EC" />
        <rect x={114} y={578} width={294} height={364} rx={10} fill="url(#sky)" />
        <circle cx={330} cy={660} r={34} fill="#FFF3C9" opacity={0.9} />
        <ellipse cx={200 + Math.sin(t * 0.25) * 10} cy={720} rx={52} ry={17} fill="#fff" opacity={0.85} />
        <ellipse cx={240 + Math.sin(t * 0.25) * 10} cy={706} rx={36} ry={15} fill="#fff" opacity={0.85} />
        <rect x={255} y={578} width={12} height={364} fill="#FBF6EC" />
        <rect x={114} y={752} width={294} height={12} fill="#FBF6EC" />
        <rect x={80} y={952} width={362} height={22} rx={8} fill="#F4EBDB" />
        {/* curtains */}
        <path
          d={`M 80 540 L 190 540 Q ${170 + curtain} 760 ${128 + curtain} 968 L 80 968 Z`}
          fill="#9DBBD1"
        />
        <path
          d={`M 442 540 L 336 540 Q ${358 - curtain} 760 ${398 - curtain} 968 L 442 968 Z`}
          fill="#9DBBD1"
        />
        <rect x={64} y={528} width={394} height={18} rx={9} fill="#B58E63" />
      </g>
      {/* light rays */}
      <polygon points="130,600 400,600 900,1500 380,1500" fill="url(#ray)" opacity={0.5 + 0.08 * Math.sin(t * 0.8)} />

      {/* framed picture */}
      <g>
        <rect x={720} y={590} width={220} height={170} rx={12} fill="#FBF6EC" />
        <rect x={736} y={606} width={188} height={138} rx={6} fill="#DCE9F1" />
        <path d="M 736 744 L 796 668 L 846 716 L 880 684 L 924 744 Z" fill="#9DBBD1" />
        <circle cx={890} cy={640} r={14} fill="#F3D9A2" />
      </g>

      {/* shelf */}
      <rect x={560} y={792} width={170} height={14} rx={7} fill="#C9A273" />
      <rect x={582} y={742} width={22} height={50} rx={4} fill="#7FA3C0" />
      <rect x={608} y={752} width={18} height={40} rx={4} fill="#E7C9A0" />
      <rect x={630} y={736} width={24} height={56} rx={4} fill="#4F7A9C" />

      {/* plant */}
      <g>
        <g transform={`rotate(${sway} 990 1250)`}>
          <path d="M 990 1260 Q 930 1130 960 1040 Q 1000 1130 990 1260 Z" fill="#8CAE8B" />
          <path d="M 990 1260 Q 1060 1150 1040 1060 Q 990 1150 990 1260 Z" fill="#7B9F7C" />
          <path d="M 990 1260 Q 900 1200 890 1130 Q 960 1170 990 1260 Z" fill="#9BBB98" />
        </g>
        <path d="M 944 1250 L 1036 1250 L 1024 1340 Q 990 1352 956 1340 Z" fill="#E9D3B4" />
        <rect x={938} y={1240} width={104} height={20} rx={10} fill="#DFC5A1" />
      </g>

      {/* rug */}
      <ellipse cx={640} cy={1440} rx={420} ry={74} fill="#B9D0DF" />
      <ellipse cx={640} cy={1440} rx={376} ry={58} fill="none" stroke="#F6EEDF" strokeWidth={6} strokeDasharray="4 22" strokeLinecap="round" />
    </g>
  );
};

export const Table: React.FC = () => (
  <g>
    <ellipse cx={305} cy={1404} rx={240} ry={14} fill="#7A5B3A" opacity={0.15} />
    <rect x={126} y={1240} width={26} height={160} rx={10} fill="#B08556" />
    <rect x={458} y={1240} width={26} height={160} rx={10} fill="#B08556" />
    <rect x={168} y={1236} width={18} height={120} rx={8} fill="#A47A4E" />
    <rect x={424} y={1236} width={18} height={120} rx={8} fill="#A47A4E" />
    <rect x={104} y={1224} width={402} height={30} rx={8} fill="#B98C5C" />
    <path d="M 112 1178 L 498 1178 Q 512 1178 516 1190 L 524 1218 Q 526 1232 510 1232 L 100 1232 Q 84 1232 86 1218 L 94 1190 Q 98 1178 112 1178 Z" fill="url(#wood)" />
    <path d="M 124 1188 L 300 1188" stroke="#E3C297" strokeWidth={4} strokeLinecap="round" opacity={0.7} />
  </g>
);

/** Drinking glass. Drawn with its base centre at (0,0); fill = water level 0..1. */
export const Cup: React.FC<{ x: number; y: number; rot: number; fill: number }> = ({ x, y, rot, fill }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot} 19 0)`}>
    <path d="M -19 0 L -24 -62 L 24 -62 L 19 0 Z" fill="#EAF4FA" opacity={0.75} />
    {fill > 0.02 && (
      <path
        d={`M -18 -2 L ${-18 - 4.4 * fill} ${-2 - 50 * fill} L ${18 + 4.4 * fill} ${-2 - 50 * fill} L 18 -2 Z`}
        fill="#8FC3E6"
        opacity={0.9}
      />
    )}
    <path d="M -19 0 L -24 -62 L 24 -62 L 19 0 Z" fill="none" stroke="#9FBFD4" strokeWidth={4} strokeLinejoin="round" />
    <line x1={-12} y1={-52} x2={-9} y2={-14} stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
  </g>
);

export const Cloth: React.FC<{ x: number; y: number; rot: number; scale: number }> = ({ x, y, rot, scale }) =>
  scale <= 0.01 ? null : (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <path d="M -34 -18 Q 0 -26 34 -16 Q 40 2 32 20 Q 0 26 -32 18 Q -40 0 -34 -18 Z" fill="#FBF3DF" stroke="#E9C46A" strokeWidth={4} />
      <path d="M -20 -4 Q 0 -10 20 -2" stroke="#E9C46A" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
