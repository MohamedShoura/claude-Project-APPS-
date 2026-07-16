'use client';

import { useMemo, useState } from 'react';
import type { Currency, Locale, PricePoint } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/format';

export function PriceHistoryChart({ history, currency, locale }: { history: PricePoint[]; currency: Currency; locale: Locale }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = 200, P = 24;
  const { path, area, points, min, max } = useMemo(() => {
    const prices = history.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const step = (W - P * 2) / Math.max(1, history.length - 1);
    const pts = history.map((p, i) => {
      const x = P + i * step;
      const y = H - P - ((p.price - min) / range) * (H - P * 2);
      return { x, y, ...p };
    });
    const path = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' ');
    const area = `${path} L${pts[pts.length - 1].x},${H - P} L${pts[0].x},${H - P} Z`;
    return { path, area, points: pts, min, max };
  }, [history]);

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Price history">
        <defs>
          <linearGradient id="ph" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6392b" stopOpacity="0.25" />
            <stop offset="1" stopColor="#e6392b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#ph)" />
        <path d={path} fill="none" stroke="#e6392b" strokeWidth="2" />
        {points.map((pt, i) => (
          <g key={i}>
            <rect x={pt.x - 8} y={0} width={16} height={H} fill="transparent" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
            {hover === i && (
              <>
                <circle cx={pt.x} cy={pt.y} r={4} fill="#e6392b" />
                <line x1={pt.x} y1={P} x2={pt.x} y2={H - P} stroke="#e5e8ec" strokeDasharray="3 3" />
              </>
            )}
          </g>
        ))}
      </svg>
      <div className="flex items-center justify-between px-2 text-xs text-ink-muted">
        <span>{formatDate(history[0].date, locale)}</span>
        {hover !== null && (
          <span className="font-semibold text-ink">
            {formatDate(points[hover].date, locale)} · {formatPrice(points[hover].price, currency, locale)}
          </span>
        )}
        <span>{formatDate(history[history.length - 1].date, locale)}</span>
      </div>
    </div>
  );
}
