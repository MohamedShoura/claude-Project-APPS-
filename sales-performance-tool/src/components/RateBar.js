import React from "react";

export default function RateBar({ label, value, color }) {
  return (
    <div className="rate-bar-row">
      <div className="rate-bar-label">
        <span>{label}</span>
        <span style={{ color }} className="rate-bar-pct">{value}%</span>
      </div>
      <div className="rate-bar-track">
        <div
          className="rate-bar-fill"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}
