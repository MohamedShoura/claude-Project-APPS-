import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// شخصيتان بأسلوب مسطّح موحّد (نفس الحجم والإضاءة والظل) وبزيّ محتشم ملائم للبيئة المدرسية القطرية:
// creative = الجيل المبدع (عباءة وشيلة سوداء، نظارة خفيفة) — inspiring = الجيل المبهر (شيلة بيضاء وزي مدرسي).
// لا توجد حركة فم: الإيماءة مرتبطة بطاقة الصوت الفعلية (energy) فقط.

type Props = {
  kind: "creative" | "inspiring";
  active: boolean;
  energy?: number; // 0..1 طاقة الكلام الحالية (من الصوت الأصلي)
  facing?: "left" | "right";
  height?: number;
  seed?: number;
};

const SKIN = { creative: "#D9A07A", inspiring: "#E4B38F" };

export const Character: React.FC<Props> = ({ kind, active, energy = 0, facing = "left", height = 560, seed = 0 }) => {
  const frame = useCurrentFrame();
  const isC = kind === "creative";
  // رمش هادئ كل ~4 ثوانٍ
  const cyc = (frame + seed * 37) % 128;
  const blink = cyc < 4 ? interpolate(cyc, [0, 2, 4], [1, 0.1, 1]) : 1;
  // تنفّس خفيف جدًا
  const breathe = Math.sin((frame + seed * 20) / 38) * 1.2;
  // إيماءة اليد: زاوية أساسية + طاقة الكلام
  const armAngle = active ? 6 - energy * 22 : 18;
  const headTilt = active ? energy * 2.5 : 0;

  const wrap = isC ? "#22222A" : "#F3F3F6";
  const wrapShade = isC ? "#121218" : "#D9DCE4";
  const body = isC ? "#1C1C23" : "#355A82";
  const bodyLight = isC ? "#30303A" : "#4673A1";
  const trim = isC ? "#8E2F4F" : "#FFFFFF";
  const skin = SKIN[kind];

  return (
    <svg
      viewBox="0 0 360 620"
      height={height}
      style={{
        transform: `scaleX(${facing === "right" ? -1 : 1})`,
        filter: active ? "none" : "saturate(0.6) brightness(1.02)",
        opacity: active ? 1 : 0.78,
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id={`b-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bodyLight} />
          <stop offset="0.6" stopColor={body} />
        </linearGradient>
        <radialGradient id={`f-${kind}`} cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`translate(0 ${breathe})`}>
        {/* الجسد */}
        <path d="M95 345 Q180 318 265 345 L318 620 L42 620 Z" fill={`url(#b-${kind})`} />
        <path d="M180 352 L180 620" stroke={trim} strokeWidth={isC ? 5 : 0} opacity={0.8} />
        {!isC && <path d="M150 350 L180 392 L210 350" fill="none" stroke="#fff" strokeWidth={9} strokeLinejoin="round" />}
        {/* الذراع والإيماءة: ساعد مرفوع نحو المنصة المقابلة، تدور حول المرفق بحسب طاقة الكلام */}
        <path d="M112 356 Q84 400 92 452 L128 448 Q124 410 140 380 Z" fill={body} />
        <g transform={`rotate(${armAngle} 108 448)`}>
          <path d="M92 452 Q60 446 26 420 L40 396 Q70 418 128 448 Z" fill={body} />
          <path d="M30 420 Q8 412 4 396 Q2 384 14 386 Q18 372 30 378 Q42 380 44 398 Z" fill={skin} />
        </g>
        {/* الرأس والشيلة */}
        <g transform={`rotate(${headTilt} 180 240)`}>
          <path d="M92 230 Q92 118 180 112 Q268 118 268 230 Q272 320 300 372 Q240 352 180 356 Q120 352 60 372 Q88 320 92 230 Z" fill={wrap} />
          <path d="M60 372 Q120 352 180 356 Q240 352 300 372 Q250 392 180 388 Q110 392 60 372 Z" fill={wrapShade} />
          <ellipse cx="180" cy="238" rx="58" ry="70" fill={skin} />
          <ellipse cx="180" cy="238" rx="58" ry="70" fill={`url(#f-${kind})`} />
          <path d="M118 214 Q124 150 180 146 Q236 150 242 214 Q214 176 180 174 Q146 176 118 214 Z" fill={wrap} />
          {/* ملامح */}
          <g transform={`translate(0 ${238 * (1 - blink)}) scale(1 ${blink})`}>
            <ellipse cx="158" cy="238" rx="5.5" ry="6.5" fill="#2A1E1A" />
            <ellipse cx="202" cy="238" rx="5.5" ry="6.5" fill="#2A1E1A" />
          </g>
          <path d="M146 222 Q158 215 168 221" stroke="#3A2A24" strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M192 221 Q202 215 214 222" stroke="#3A2A24" strokeWidth={3} fill="none" strokeLinecap="round" />
          {isC && (
            <g stroke="#B08A3C" strokeWidth={2.4} fill="none" opacity={0.9}>
              <circle cx="158" cy="239" r="15" />
              <circle cx="202" cy="239" r="15" />
              <path d="M173 239 Q180 234 187 239" />
            </g>
          )}
          <ellipse cx="146" cy="262" rx="11" ry="6" fill="#E88A8A" opacity={0.25} />
          <ellipse cx="214" cy="262" rx="11" ry="6" fill="#E88A8A" opacity={0.25} />
          <path d="M168 274 Q180 283 192 274" stroke="#8A4A3A" strokeWidth={3.4} fill="none" strokeLinecap="round" />
          {isC && <circle cx="246" cy="300" r="7" fill="#8E2F4F" stroke="#C7A04A" strokeWidth={2} />}
        </g>
      </g>
    </svg>
  );
};
