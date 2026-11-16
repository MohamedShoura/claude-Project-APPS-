import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/fonts";
import { clamp, easeOut, easeOutBack, ramp, win } from "./anim";
import { C, Kid, Mum, kidGeo, mumGeo } from "./Characters";
import { Caption, EndCard, FONT, Hearts } from "./Overlays";
import { Cloth, Cup, Room, Table } from "./Room";
import { PUDDLE, SAFE_SPOT, camera, clothState, cupState, kidPose, mumPose, waterState } from "./pose";
import { FPS, HEIGHT, T, WIDTH } from "./timing";

// Tajawal (SIL OFL) is bundled locally in public/fonts — no network needed.
[500, 700, 800].forEach((weight) =>
  loadFont({
    family: FONT,
    url: staticFile(`fonts/tajawal-arabic-${weight}-normal.woff2`),
    weight: String(weight),
  }),
);

const WATER = "#8FC3E6";

const Water: React.FC<{ t: number }> = ({ t }) => {
  const w = waterState(t);
  const len = 262;
  const head = w.streamHead * len;
  const tail = w.streamTail * len;
  return (
    <g>
      {w.puddle > 0.01 && (
        <g transform={`translate(${PUDDLE.x} ${PUDDLE.y}) scale(${w.puddle})`}>
          <ellipse rx={116} ry={25} fill={WATER} opacity={0.85} />
          <ellipse cx={86} cy={12} rx={44} ry={13} fill={WATER} opacity={0.85} />
          <ellipse cx={-92} cy={-8} rx={36} ry={11} fill={WATER} opacity={0.85} />
          <path d="M -70 -6 Q -20 -16 40 -8" stroke="#fff" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.7} />
        </g>
      )}
      {head > tail + 1 && (
        <path
          d="M 518 1206 Q 540 1206 541 1250 L 541 1432"
          stroke={WATER}
          strokeWidth={13 - 6 * w.streamTail}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${head - tail} 1000`}
          strokeDashoffset={-tail}
        />
      )}
      {/* a few late drips */}
      {[1.95, 2.55, 3.4].map((s) => {
        const p = clamp((t - s) / 0.42);
        return p > 0 && p < 1 ? (
          <ellipse key={s} cx={541} cy={1236 + p * p * 190} rx={5} ry={8} fill={WATER} />
        ) : null;
      })}
      {/* splash */}
      {[-1, 1, -2, 2].map((d) => {
        const p = clamp((t - T.cupTip - 0.5) / 0.45);
        return p > 0 && p < 1 ? (
          <circle
            key={d}
            cx={541 + d * 26 * p}
            cy={1428 - Math.sin(p * Math.PI) * (26 + Math.abs(d) * 8)}
            r={5 * (1 - p) + 2}
            fill={WATER}
          />
        ) : null;
      })}
    </g>
  );
};

const HarshBubble: React.FC<{ t: number }> = ({ t }) => {
  const a = ramp(t, T.harshIn, T.harshIn + 0.28, easeOutBack);
  const out = ramp(t, T.harshOut, T.harshOut + 0.5);
  if (a <= 0 || out >= 1) return null;
  const strike = ramp(t, T.harshOut - 0.35, T.harshOut, easeOut);
  const shake = Math.sin(t * 46) * 3 * (1 - ramp(t, T.harshIn + 0.2, T.harshIn + 0.7));
  return (
    <g
      transform={`translate(${735 + shake} ${812 - out * 46}) scale(${a * (1 - out * 0.18)})`}
      opacity={1 - out}
      style={{ filter: `blur(${out * 7}px) grayscale(${strike * 0.7})` }}
    >
      <path d="M 78 74 L 118 138 L 30 82 Z" fill="#F2D0C9" />
      <rect x={-190} y={-86} width={380} height={172} rx={56} fill="#F2D0C9" stroke="#D98A7F" strokeWidth={5} />
      <text
        x={0}
        y={24}
        textAnchor="middle"
        direction="rtl"
        fontFamily={FONT}
        fontWeight={800}
        fontSize={74}
        fill="#A8463F"
      >
        إنت مهمل!
      </text>
      <line
        x1={150}
        y1={2}
        x2={150 - 300 * strike}
        y2={2}
        stroke="#7D3A35"
        strokeWidth={9}
        strokeLinecap="round"
        opacity={strike > 0 ? 0.9 : 0}
      />
    </g>
  );
};

const TalkBubble: React.FC<{ t: number; x: number }> = ({ t, x }) => {
  const a = win(t, T.listenStart, T.pointSafe + 0.05, 0.2);
  if (a <= 0) return null;
  return (
    <g transform={`translate(${x - 70} 872) scale(${0.6 + 0.4 * a})`} opacity={a}>
      <path d="M 10 40 L 34 78 L 44 40 Z" fill="#fff" />
      <rect x={-70} y={-44} width={150} height={90} rx={42} fill="#fff" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={-32 + i * 37}
          cy={1 - Math.max(0, Math.sin(t * 9 - i * 0.9)) * 10}
          r={10}
          fill="#7FA3C0"
        />
      ))}
    </g>
  );
};

const SafeSpot: React.FC<{ t: number }> = ({ t }) => {
  const a = ramp(t, T.pointSafe + 0.05, T.pointSafe + 0.4) * (1 - ramp(t, T.cupPlaced + 0.5, T.cupPlaced + 0.9));
  const arrow = ramp(t, T.pointSafe + 0.15, T.pointSafe + 0.6, easeOut) * (1 - ramp(t, T.cupPlaced - 0.3, T.cupPlaced));
  const done = ramp(t, T.cupPlaced, T.cupPlaced + 0.35, easeOutBack) * (1 - ramp(t, T.hugStart + 0.5, T.hugStart + 0.9));
  const pulse = 1 + 0.07 * Math.sin(t * 7);
  return (
    <g>
      {a > 0 && (
        <g opacity={a}>
          <ellipse cx={SAFE_SPOT.x} cy={SAFE_SPOT.y} rx={58 * pulse} ry={15 * pulse} fill="#CFE3F0" opacity={0.55} />
          <ellipse
            cx={SAFE_SPOT.x}
            cy={SAFE_SPOT.y}
            rx={58 * pulse}
            ry={15 * pulse}
            fill="none"
            stroke="#4F7A9C"
            strokeWidth={5}
            strokeDasharray="14 10"
            strokeDashoffset={-t * 40}
            strokeLinecap="round"
          />
        </g>
      )}
      {arrow > 0 && (
        <g opacity={arrow}>
          <path
            d="M 752 938 Q 540 840 362 1128"
            fill="none"
            stroke="#4F7A9C"
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={`${520 * arrow} 1000`}
          />
          {arrow > 0.95 && <path d="M 386 1096 L 356 1136 L 344 1090" fill="none" stroke="#4F7A9C" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      )}
      {done > 0 && (
        <g transform={`translate(${SAFE_SPOT.x} 1084) scale(${done})`}>
          <circle r={36} fill="#4F7A9C" />
          <path d="M -15 1 L -4 13 L 17 -11" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
          {[0, 1, 2, 3, 4].map((i) => {
            const ang = (i / 5) * Math.PI * 2 + 0.4;
            return <circle key={i} cx={Math.cos(ang) * 58} cy={Math.sin(ang) * 58} r={5} fill="#E9C46A" />;
          })}
        </g>
      )}
    </g>
  );
};

const Startle: React.FC<{ t: number; x: number; y: number }> = ({ t, x, y }) => {
  const a = win(t, T.cupTip + 0.08, T.cupTip + 0.8, 0.12);
  if (a <= 0) return null;
  return (
    <g opacity={a} stroke="#E9A23B" strokeWidth={7} strokeLinecap="round">
      <line x1={x - 104} y1={y - 78} x2={x - 128} y2={y - 104} />
      <line x1={x - 60} y1={y - 110} x2={x - 68} y2={y - 144} />
      <line x1={x - 124} y1={y - 34} x2={x - 156} y2={y - 42} />
    </g>
  );
};

const Dust: React.FC<{ t: number }> = ({ t }) => (
  <g>
    {Array.from({ length: 9 }).map((_, i) => {
      const x = 260 + ((i * 97) % 520) + Math.sin(t * 0.5 + i) * 26;
      const y = 720 + ((i * 173) % 620) - ((t * (10 + i * 2)) % 120);
      return <circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill="#FFF8E3" opacity={0.35 + 0.25 * Math.sin(t * 1.3 + i * 2)} />;
    })}
  </g>
);

export const ParentingAwareness: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const mum = mumPose(t);
  const kid = kidPose(t);
  const cup = cupState(t, kid);
  const cloth = clothState(t, mum, kid);
  const cam = camera(t);
  const mg = mumGeo(mum);
  const kg = kidGeo(kid);
  const mumVisible = t >= T.mumEnter - 0.1;

  // index finger while pointing (at the water, then at the safe spot)
  const pointing = Math.max(
    win(t, T.pointWater, T.offerCloth - 0.1, 0.15),
    win(t, T.pointSafe + 0.1, T.cupPlaced, 0.15),
  );
  const fdx = mg.armL.hand.x - mg.armL.elbow.x;
  const fdy = mg.armL.hand.y - mg.armL.elbow.y;
  const fl = Math.hypot(fdx, fdy) || 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F1E3CC", overflow: "hidden" }}>
      <Audio src={staticFile("audio/mix.wav")} />

      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <g transform={`translate(${cam.tx} ${cam.ty}) scale(${cam.s})`}>
          <Room t={t} />
          <Dust t={t} />
          <Water t={t} />
          <Table />
          {waterState(t).tablePuddle > 0.01 && (
            <ellipse cx={497} cy={1213} rx={24 * waterState(t).tablePuddle} ry={7 * waterState(t).tablePuddle} fill={WATER} opacity={0.85} />
          )}
          <SafeSpot t={t} />

          <Kid pose={kid} part="body" />
          <Cup x={cup.x} y={cup.y} rot={cup.rot} fill={cup.fill} />
          {mumVisible && <Mum pose={mum} part="body" />}
          <Kid pose={kid} part="frontArm" />
          {mumVisible && (
            <>
              <Mum pose={mum} part="frontArm" />
              {pointing > 0.05 && (
                <line
                  x1={mg.armL.hand.x}
                  y1={mg.armL.hand.y}
                  x2={mg.armL.hand.x + (fdx / fl) * 34 * pointing}
                  y2={mg.armL.hand.y + (fdy / fl) * 34 * pointing}
                  stroke={C.skin}
                  strokeWidth={13}
                  strokeLinecap="round"
                />
              )}
            </>
          )}
          <Cloth {...cloth.a} />
          <Cloth {...cloth.b} />

          <Startle t={t} x={kg.head.x} y={kg.head.y} />
          <HarshBubble t={t} />
          <TalkBubble t={t} x={kg.head.x} />
          <Hearts t={t} />
        </g>
      </svg>

      {/* warm soft-light vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(90% 70% at 50% 52%, rgba(255,244,220,0) 55%, rgba(120,84,44,0.22) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* gentle fade-in from warm white */}
      <AbsoluteFill style={{ backgroundColor: "#FBF4E7", opacity: 1 - ramp(t, 0, 0.35) }} />

      <Caption t={t} text="التوجيه يبدأ بالهدوء" from={T.caption1In} to={T.caption1Out} />
      <Caption t={t} text="يلا ننضّفها سوا" from={T.caption2In - 0.2} to={T.caption2Out} variant="blue" />
      <Caption t={t} text="اسمعه… ووضّح له الصح" from={T.caption3In} to={T.caption3Out} />

      <EndCard t={t} />
    </AbsoluteFill>
  );
};
