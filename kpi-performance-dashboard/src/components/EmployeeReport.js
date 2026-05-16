import React from "react";
import { getStrengths, getWeaknesses, getRecommendedActions } from "../utils/kpiCalculations";
import { exportToPDF } from "../utils/exportUtils";

function ScoreRing({ score, color }) {
  const r = 45;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(score, 100) / 100;
  const dash = pct * circ;

  return (
    <svg width="120" height="120" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
        style={{ transition: "stroke-dasharray 0.8s ease" }}
      />
      <text x="55" y="52" textAnchor="middle" fontSize="18" fontWeight="700" fill={color}>{score}%</text>
      <text x="55" y="68" textAnchor="middle" fontSize="10" fill="#94a3b8">Score</text>
    </svg>
  );
}

function MetricItem({ label, value, color }) {
  return (
    <div className="metric-item">
      <div className="metric-item-label">{label}</div>
      <div className="metric-item-value" style={{ color }}>{value}</div>
    </div>
  );
}

function formatPeriod(period) {
  if (!period) return "—";
  try {
    return new Date(period + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch { return period; }
}

export default function EmployeeReport({ employee, kpi, onBack, onEdit }) {
  if (!employee || !kpi) return null;

  const strengths = getStrengths(employee, kpi);
  const weaknesses = getWeaknesses(employee, kpi);
  const actions = getRecommendedActions(employee, kpi);

  return (
    <div className="report-page">
      {/* Back & Actions */}
      <div className="report-topbar">
        <button className="btn btn-ghost" onClick={onBack}>← Back to Employees</button>
        <div className="report-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => exportToPDF([employee])}>⬇ Export PDF</button>
          <button className="btn btn-outline btn-sm" onClick={() => onEdit(employee)}>✏️ Edit</button>
        </div>
      </div>

      {/* Header Card */}
      <div className="report-header-card">
        <div className="report-avatar" style={{ background: "#1e40af" }}>
          {employee.name.charAt(0).toUpperCase()}
        </div>
        <div className="report-identity">
          <h1 className="report-name">{employee.name}</h1>
          <p className="report-sub">{employee.jobTitle} · {employee.department}</p>
          <p className="report-period">Period: {formatPeriod(employee.period)}</p>
        </div>
        <div className="report-score-block">
          <ScoreRing score={kpi.performanceScore} color={kpi.ratingColor} />
          <span
            className="rating-badge-lg"
            style={{ background: kpi.ratingBg, color: kpi.ratingColor, border: `2px solid ${kpi.ratingBorder}` }}
          >
            {kpi.rating}
          </span>
        </div>
      </div>

      {/* KPI Summary Grid */}
      <div className="report-section">
        <h2 className="section-title">📊 KPI Summary</h2>
        <div className="kpi-summary-grid">
          <MetricItem
            label="Achievement %"
            value={`${kpi.achievementPct}%`}
            color={kpi.achievementPct >= 90 ? "#059669" : kpi.achievementPct >= 70 ? "#d97706" : "#dc2626"}
          />
          <MetricItem
            label="Target vs Actual"
            value={`${employee.actualAchievement} / ${employee.monthlyTarget}`}
            color="#2563eb"
          />
          <MetricItem
            label="Conversion Rate"
            value={employee.leadsHandled > 0 ? `${kpi.conversionRate}%` : "N/A"}
            color="#7c3aed"
          />
          <MetricItem
            label="Leads / Deals"
            value={employee.leadsHandled > 0 ? `${employee.closedDeals} / ${employee.leadsHandled}` : "N/A"}
            color="#7c3aed"
          />
          <MetricItem
            label="Revenue Generated"
            value={employee.revenueGenerated > 0 ? `$${employee.revenueGenerated.toLocaleString()}` : "N/A"}
            color="#059669"
          />
          {kpi.revenueAchievementPct !== null && (
            <MetricItem
              label="Revenue Achievement"
              value={`${kpi.revenueAchievementPct}%`}
              color="#059669"
            />
          )}
          <MetricItem
            label="Attendance Score"
            value={`${employee.attendanceScore}%`}
            color={employee.attendanceScore >= 85 ? "#059669" : employee.attendanceScore >= 70 ? "#d97706" : "#dc2626"}
          />
          <MetricItem
            label="Overall Score"
            value={`${kpi.performanceScore}%`}
            color={kpi.ratingColor}
          />
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="sw-grid">
        <div className="report-section sw-card strength-card">
          <h2 className="section-title">💪 Strength Points</h2>
          <ul className="sw-list">
            {strengths.map((s, i) => (
              <li key={i} className="sw-item strength-item">
                <span className="sw-dot">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="report-section sw-card weakness-card">
          <h2 className="section-title">⚠️ Areas for Improvement</h2>
          {weaknesses.length > 0 ? (
            <ul className="sw-list">
              {weaknesses.map((w, i) => (
                <li key={i} className="sw-item weakness-item">
                  <span className="sw-dot">!</span>
                  {w}
                </li>
              ))}
            </ul>
          ) : (
            <p className="sw-none">No major weaknesses identified this period.</p>
          )}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="report-section">
        <h2 className="section-title">🎯 Recommended Actions</h2>
        <div className="actions-list">
          {actions.map((a, i) => (
            <div key={i} className="action-item">
              <span className="action-num">{i + 1}</span>
              <span>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      {(employee.notes || employee.managerNotes) && (
        <div className="notes-grid">
          {employee.notes && (
            <div className="report-section notes-card">
              <h2 className="section-title">📝 Performance Notes</h2>
              <p className="notes-text">{employee.notes}</p>
            </div>
          )}
          {employee.managerNotes && (
            <div className="report-section notes-card">
              <h2 className="section-title">🔒 Manager Notes</h2>
              <p className="notes-text">{employee.managerNotes}</p>
            </div>
          )}
        </div>
      )}

      {/* Final Rating */}
      <div className="report-section final-rating-card" style={{ borderColor: kpi.ratingBorder, background: kpi.ratingBg }}>
        <h2 className="section-title">🏅 Final Performance Rating</h2>
        <div className="final-rating-content">
          <div className="final-rating-text" style={{ color: kpi.ratingColor }}>
            {kpi.rating}
          </div>
          <div className="final-rating-desc">
            {kpi.performanceScore >= 90 && "This employee is performing at the highest level. Recognize and reward their contribution."}
            {kpi.performanceScore >= 80 && kpi.performanceScore < 90 && "Strong performer. Provide growth opportunities to reach the top tier."}
            {kpi.performanceScore >= 70 && kpi.performanceScore < 80 && "Solid contributor. Focused coaching will drive improvement."}
            {kpi.performanceScore >= 50 && kpi.performanceScore < 70 && "Performance is below expectations. A structured improvement plan is recommended."}
            {kpi.performanceScore < 50 && "Critical performance gap. Immediate management intervention is required."}
          </div>
        </div>
      </div>
    </div>
  );
}
