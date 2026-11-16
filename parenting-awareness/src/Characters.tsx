import React from "react";
import { ik, P } from "./anim";

export const C = {
  skin: "#EDBE98",
  skinShade: "#DFA882",
  blush: "#E98F7C",
  ink: "#3A2B26",
  mumDress: "#4F7A9C",
  mumDressShade: "#436B8B",
  mumHijab: "#A9C6DB",
  mumHijabShade: "#94B5CD",
  kidTee: "#8FB6D2",
  kidTeeShade: "#7AA5C4",
  kidShorts: "#3F5F7D",
  kidHair: "#3B2A22",
  kidShoe: "#F6EFE3",
};

export const FLOOR_Y = 1400;

type FaceProps = {
  cx: number;
  cy: number;
  eyeGap: number;
  eyeY: number;
  mouthY: number;
  lookX: number; // -1 (screen-left) .. 1
  lookY: number; // -1 up .. 1 down
  mood: number; // -1 worried .. 1 happy
  blink: number; // 0 open .. 1 closed
  mouthOpen?: number; // 0..1
  joy?: number; // 0..1 → closed smiling eyes
  size?: number;
};

const Face: React.FC<FaceProps> = ({
  cx,
  cy,
  eyeGap,
  eyeY,
  mouthY,
  lookX,
  lookY,
  mood,
  blink,
  mouthOpen = 0,
  joy = 0,
  size = 1,
}) => {
  const ox = lookX * 9 * size;
  const oy = lookY * 5 * size;
  const ey = cy + eyeY + oy;
  const worry = Math.max(0, -mood);
  const open = Math.max(0.08, 1 - blink) * (1 - joy);
  const mw = 15 * size;
  const my = cy + mouthY + oy * 0.6;
  const curve = (mood >= 0 ? 6 + mood * 10 : mood * 9) * size;
  return (
    <g>
      {[-1, 1].map((s) => {
        const ex = cx + s * eyeGap + ox;
        return (
          <g key={s}>
            {/* cheek */}
            <circle
              cx={ex + s * 9 * size}
              cy={ey + 24 * size}
              r={11 * size}
              fill={C.blush}
              opacity={0.28 + 0.12 * Math.max(0, mood)}
            />
            {joy > 0.5 ? (
              <path
                d={`M ${ex - 9 * size} ${ey + 2} Q ${ex} ${ey - 9 * size} ${ex + 9 * size} ${ey + 2}`}
                stroke={C.ink}
                strokeWidth={4.5 * size}
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <>
                <ellipse cx={ex} cy={ey} rx={6.5 * size} ry={9 * size * open} fill={C.ink} />
                {open > 0.5 && (
                  <circle cx={ex + 2.2 * size} cy={ey - 3.2 * size} r={2.2 * size} fill="#fff" />
                )}
              </>
            )}
            {/* brow */}
            <line
              x1={ex - 10 * size}
              y1={ey - 19 * size + (s === -1 ? 1 : -1) * worry * 5 * size}
              x2={ex + 10 * size}
              y2={ey - 19 * size + (s === -1 ? -1 : 1) * worry * 5 * size}
              stroke={C.ink}
              strokeWidth={3.6 * size}
              strokeLinecap="round"
              opacity={0.85}
            />
          </g>
        );
      })}
      {mouthOpen > 0.15 ? (
        <ellipse
          cx={cx + ox}
          cy={my + 3 * size}
          rx={(7 + 3 * mouthOpen) * size}
          ry={(3 + 7 * mouthOpen) * size}
          fill="#7A3B36"
        />
      ) : (
        <path
          d={`M ${cx + ox - mw} ${my} Q ${cx + ox} ${my + curve} ${cx + ox + mw} ${my}`}
          stroke={C.ink}
          strokeWidth={4 * size}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </g>
  );
};

const Limb: React.FC<{ a: P; b: P; c: P; w: number; color: string }> = ({ a, b, c, w, color }) => (
  <path
    d={`M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`}
    stroke={color}
    strokeWidth={w}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />
);

/* ------------------------------------------------------------------ */
/* Mother                                                              */
/* ------------------------------------------------------------------ */

export type MumPose = {
  x: number;
  drop: number; // crouch amount in px (0 standing, ~285 at child's eye level)
  lean: number; // forward lean towards the child (px)
  bob: number;
  handL: P; // hand on the child's side (screen-left)
  handR: P;
  headTilt: number; // degrees
  lookX: number;
  lookY: number;
  mood: number;
  blink: number;
  joy: number;
};

export const MUM_ARM = { upper: 132, lower: 126 };

export const mumGeo = (p: MumPose) => {
  const shY = 830 + p.drop + p.lean * 0.6 + p.bob;
  const sx = p.x - p.lean;
  const sL = { x: sx - 56, y: shY + 14 };
  const sR = { x: sx + 56, y: shY + 14 };
  const head = { x: sx - p.lean * 0.3, y: shY - 104 };
  const armL = ik(sL, p.handL, MUM_ARM.upper, MUM_ARM.lower, -1);
  const armR = ik(sR, p.handR, MUM_ARM.upper, MUM_ARM.lower, 1);
  return { shY, sx, sL, sR, head, armL, armR };
};

export const Mum: React.FC<{ pose: MumPose; part?: "all" | "body" | "frontArm" }> = ({
  pose,
  part = "all",
}) => {
  const g = mumGeo(pose);
  const c = Math.min(1.2, pose.drop / 285);
  const { shY, sx, head } = g;
  const bl = pose.x - 100 - 78 * c;
  const br = pose.x + 96 + 46 * c;
  const midY = (shY + FLOOR_Y) / 2;
  const frontArm = (
    <g>
      <Limb a={g.sL} b={g.armL.elbow} c={g.armL.hand} w={42} color={C.mumDress} />
      <circle cx={g.armL.hand.x} cy={g.armL.hand.y} r={21} fill={C.skin} />
    </g>
  );
  if (part === "frontArm") return frontArm;
  return (
    <g>
      {/* soft floor shadow */}
      <ellipse cx={(bl + br) / 2} cy={FLOOR_Y + 4} rx={(br - bl) / 2 + 18} ry={14} fill="#7A5B3A" opacity={0.16} />
      {/* back arm */}
      <Limb a={g.sR} b={g.armR.elbow} c={g.armR.hand} w={42} color={C.mumDressShade} />
      <circle cx={g.armR.hand.x} cy={g.armR.hand.y} r={21} fill={C.skinShade} />
      {/* dress */}
      <path
        d={`M ${sx - 64} ${shY + 6} Q ${sx - 78} ${midY} ${bl} ${FLOOR_Y}
            L ${br} ${FLOOR_Y} Q ${sx + 80} ${midY} ${sx + 64} ${shY + 6}
            Q ${sx} ${shY - 24} ${sx - 64} ${shY + 6} Z`}
        fill={C.mumDress}
      />
      <path
        d={`M ${bl} ${FLOOR_Y} L ${br} ${FLOOR_Y} L ${br - 6} ${FLOOR_Y - 20} Q ${(bl + br) / 2} ${FLOOR_Y - 8} ${bl + 6} ${FLOOR_Y - 20} Z`}
        fill={C.mumDressShade}
      />
      {/* head + hijab */}
      <g transform={`rotate(${pose.headTilt} ${head.x} ${head.y + 70})`}>
        <path
          d={`M ${head.x - 80} ${head.y + 4}
              Q ${head.x - 96} ${head.y + 92} ${sx - 84} ${shY + 44}
              Q ${sx} ${shY + 92} ${sx + 84} ${shY + 44}
              Q ${head.x + 96} ${head.y + 92} ${head.x + 80} ${head.y + 4} Z`}
          fill={C.mumHijab}
        />
        <ellipse cx={head.x} cy={head.y - 6} rx={84} ry={88} fill={C.mumHijab} />
        <ellipse cx={head.x + pose.lookX * 7} cy={head.y + 10} rx={56} ry={61} fill={C.skin} />
        <path
          d={`M ${head.x - 52 + pose.lookX * 7} ${head.y + 46} Q ${head.x + pose.lookX * 7} ${head.y + 104} ${head.x + 52 + pose.lookX * 7} ${head.y + 46}`}
          stroke={C.mumHijabShade}
          strokeWidth={5}
          fill="none"
          opacity={0.7}
        />
        <Face
          cx={head.x + pose.lookX * 7}
          cy={head.y}
          eyeGap={22}
          eyeY={8}
          mouthY={40}
          lookX={pose.lookX}
          lookY={pose.lookY}
          mood={pose.mood}
          blink={pose.blink}
          joy={pose.joy}
        />
      </g>
      {part === "all" && frontArm}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* Child                                                               */
/* ------------------------------------------------------------------ */

export type KidPose = {
  x: number;
  squat: number; // 0 standing .. ~85 kneeling
  lean: number; // px, positive = towards screen-left
  hop: number;
  handL: P;
  handR: P;
  footLift: [number, number];
  headTilt: number;
  lookX: number;
  lookY: number;
  mood: number;
  blink: number;
  mouthOpen: number;
  joy: number;
};

export const KID_ARM = { upper: 82, lower: 82 };

export const kidGeo = (p: KidPose) => {
  const top = 1135 + p.squat + p.hop;
  const bx = p.x - p.lean;
  const sL = { x: bx - 44, y: top + 22 };
  const sR = { x: bx + 44, y: top + 22 };
  const hipY = 1300 + p.squat + p.hop * 0.5;
  const head = { x: bx - p.lean * 0.5, y: top - 60 };
  const armL = ik(sL, p.handL, KID_ARM.upper, KID_ARM.lower, 1);
  const armR = ik(sR, p.handR, KID_ARM.upper, KID_ARM.lower, -1);
  return { top, bx, sL, sR, hipY, head, armL, armR };
};

export const Kid: React.FC<{ pose: KidPose; part?: "all" | "body" | "frontArm" }> = ({
  pose,
  part = "all",
}) => {
  const g = kidGeo(pose);
  const { top, bx, hipY, head } = g;
  const feet: P[] = [
    { x: pose.x - 27, y: 1384 - pose.footLift[0] },
    { x: pose.x + 27, y: 1384 - pose.footLift[1] },
  ];
  const hips: P[] = [
    { x: pose.x - 24 - pose.lean * 0.3, y: hipY },
    { x: pose.x + 24 - pose.lean * 0.3, y: hipY },
  ];
  const legs = [ik(hips[0], feet[0], 50, 50, 1), ik(hips[1], feet[1], 50, 50, -1)];
  const hx = head.x;
  const hy = head.y;
  const frontArm = (
    <g>
      <Limb a={g.sL} b={g.armL.elbow} c={g.armL.hand} w={30} color={C.skin} />
      <circle cx={g.sL.x} cy={g.sL.y + 2} r={22} fill={C.kidTee} />
      <circle cx={g.armL.hand.x} cy={g.armL.hand.y} r={17} fill={C.skin} />
    </g>
  );
  if (part === "frontArm") return frontArm;
  return (
    <g>
      <ellipse cx={pose.x} cy={FLOOR_Y + 2} rx={78} ry={12} fill="#7A5B3A" opacity={0.16} />
      {/* legs */}
      {legs.map((l, i) => (
        <g key={i}>
          <Limb a={hips[i]} b={l.elbow} c={l.hand} w={30} color={C.skin} />
          <ellipse cx={feet[i].x + (i === 0 ? -6 : 6)} cy={feet[i].y + 8} rx={25} ry={13} fill={C.kidShoe} />
          <ellipse cx={feet[i].x + (i === 0 ? -6 : 6)} cy={feet[i].y + 15} rx={25} ry={5} fill="#D9CDB8" />
        </g>
      ))}
      {/* back arm */}
      <Limb a={g.sR} b={g.armR.elbow} c={g.armR.hand} w={30} color={C.skinShade} />
      <circle cx={g.armR.hand.x} cy={g.armR.hand.y} r={17} fill={C.skinShade} />
      {/* shorts + tee */}
      <rect x={pose.x - 54 - pose.lean * 0.3} y={hipY - 30} width={108} height={54} rx={20} fill={C.kidShorts} />
      <path
        d={`M ${bx - 60} ${top + 30} Q ${bx - 60} ${top} ${bx - 28} ${top}
            L ${bx + 28} ${top} Q ${bx + 60} ${top} ${bx + 60} ${top + 30}
            L ${pose.x + 56 - pose.lean * 0.3} ${hipY - 8} Q ${pose.x - pose.lean * 0.3} ${hipY + 6} ${pose.x - 56 - pose.lean * 0.3} ${hipY - 8} Z`}
        fill={C.kidTee}
      />
      <circle cx={g.sR.x} cy={g.sR.y + 2} r={22} fill={C.kidTeeShade} />
      <path
        d={`M ${bx - 22} ${top + 1} Q ${bx} ${top + 22} ${bx + 22} ${top + 1}`}
        stroke="#F4EBDD"
        strokeWidth={7}
        fill="none"
        strokeLinecap="round"
      />
      {/* head */}
      <g transform={`rotate(${pose.headTilt} ${hx} ${hy + 70})`}>
        <circle cx={hx - 80} cy={hy + 12} r={15} fill={C.skin} />
        <circle cx={hx + 80} cy={hy + 12} r={15} fill={C.skin} />
        <circle cx={hx} cy={hy} r={81} fill={C.skin} />
        <path
          d={`M ${hx - 85} ${hy + 2} A 85 87 0 0 1 ${hx + 85} ${hy + 2}
              Q ${hx + 74} ${hy - 44} ${hx + 26 + pose.lookX * 8} ${hy - 46}
              Q ${hx - 14 + pose.lookX * 8} ${hy - 26} ${hx - 54 + pose.lookX * 8} ${hy - 44}
              Q ${hx - 78} ${hy - 36} ${hx - 85} ${hy + 2} Z`}
          fill={C.kidHair}
        />
        <path
          d={`M ${hx - 10} ${hy - 84} Q ${hx + 8} ${hy - 108} ${hx + 26} ${hy - 86}`}
          stroke={C.kidHair}
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
        />
        <Face
          cx={hx + pose.lookX * 8}
          cy={hy}
          eyeGap={28}
          eyeY={10}
          mouthY={46}
          lookX={pose.lookX}
          lookY={pose.lookY}
          mood={pose.mood}
          blink={pose.blink}
          mouthOpen={pose.mouthOpen}
          joy={pose.joy}
          size={1.12}
        />
      </g>
      {part === "all" && frontArm}
    </g>
  );
};
