import React, { useMemo } from "react";
import { generateAIRecommendations } from "../utils/aiRecommendations";

const TYPE_STYLES = {
  urgent: { border: "#dc2626", bg: "#fef2f2", badge: "#dc2626", badgeBg: "#fee2e2", badgeText: "Urgent Action" },
  positive: { border: "#059669", bg: "#f0fdf4", badge: "#059669", badgeBg: "#dcfce7", badgeText: "Great News" },
  training: { border: "#2563eb", bg: "#eff6ff", badge: "#2563eb", badgeBg: "#dbeafe", badgeText: "Training" },
  warning: { border: "#d97706", bg: "#fffbeb", badge: "#d97706", badgeBg: "#fef3c7", badgeText: "Warning" },
  pattern: { border: "#7c3aed", bg: "#f5f3ff", badge: "#7c3aed", badgeBg: "#ede9fe", badgeText: "Pattern Found" },
  growth: { border: "#0891b2", bg: "#f0f9ff", badge: "#0891b2", badgeBg: "#e0f2fe", badgeText: "Growth" },
  revenue: { border: "#d97706", bg: "#fffbeb", badge: "#d97706", badgeBg: "#fef3c7", badgeText: "Revenue Alert" },
};

export default function AIRecommendations({ employees, kpiMap }) {
  const recs = useMemo(() => generateAIRecommendations(employees, kpiMap), [employees, kpiMap]);

  if (employees.length === 0) {
    return (
      <div className="ai-page">
        <div className="ai-header">
          <h1 className="ai-title">🤖 AI Performance Insights</h1>
          <p className="ai-desc">Add employees to unlock smart recommendations from your data.</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🤖</div>
          <p>No data available yet. Add employees to see AI insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-page">
      <div className="ai-header">
        <div>
          <h1 className="ai-title">🤖 AI Performance Insights</h1>
          <p className="ai-desc">
            Smart recommendations generated from your team's KPI data. These insights help you
            take the right action at the right time.
          </p>
        </div>
        <div className="ai-badge">
          {recs.length} Insight{recs.length !== 1 ? "s" : ""} Found
        </div>
      </div>

      <div className="ai-disclaimer">
        <span>💡</span>
        <span>
          These recommendations are generated automatically based on your team's performance data.
          Use your judgment when applying them. Data as of {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}.
        </span>
      </div>

      <div className="recs-grid">
        {recs.map((rec, i) => {
          const style = TYPE_STYLES[rec.type] || TYPE_STYLES.positive;
          return (
            <div
              key={i}
              className="rec-card"
              style={{ borderLeftColor: style.border, background: style.bg }}
            >
              <div className="rec-header">
                <span className="rec-icon">{rec.icon}</span>
                <div className="rec-header-text">
                  <span className="rec-badge" style={{ background: style.badgeBg, color: style.badge }}>
                    {style.badgeText}
                  </span>
                  <h3 className="rec-title">{rec.title}</h3>
                </div>
              </div>

              <p className="rec-description">{rec.description}</p>

              {rec.employees && rec.employees.length > 0 && (
                <div className="rec-employees">
                  <span className="rec-emp-label">Employees involved:</span>
                  <div className="rec-emp-chips">
                    {rec.employees.map((name) => (
                      <span key={name} className="emp-chip">{name}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="rec-action">
                <div className="rec-action-label">✅ Recommended Manager Action:</div>
                <div className="rec-action-text">{rec.action}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Health Summary */}
      <div className="ai-summary-card">
        <h2 className="section-title">📊 Quick Team Health Summary</h2>
        <div className="health-grid">
          {[
            {
              label: "Need Immediate Help",
              count: employees.filter((e) => (kpiMap[e.id]?.performanceScore ?? 0) < 55).length,
              color: "#dc2626",
              desc: "Score below 55%",
            },
            {
              label: "Need Coaching",
              count: employees.filter((e) => {
                const s = kpiMap[e.id]?.performanceScore ?? 0;
                return s >= 55 && s < 70;
              }).length,
              color: "#d97706",
              desc: "Score 55%–69%",
            },
            {
              label: "On Track",
              count: employees.filter((e) => {
                const s = kpiMap[e.id]?.performanceScore ?? 0;
                return s >= 70 && s < 90;
              }).length,
              color: "#2563eb",
              desc: "Score 70%–89%",
            },
            {
              label: "Top Performers",
              count: employees.filter((e) => (kpiMap[e.id]?.performanceScore ?? 0) >= 90).length,
              color: "#059669",
              desc: "Score 90%+",
            },
          ].map((item) => (
            <div key={item.label} className="health-item" style={{ borderTopColor: item.color }}>
              <div className="health-count" style={{ color: item.color }}>{item.count}</div>
              <div className="health-label">{item.label}</div>
              <div className="health-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Manager Action Checklist */}
      <div className="ai-checklist-card">
        <h2 className="section-title">📋 Manager Action Checklist</h2>
        <p className="checklist-intro">Use this as your weekly management guide:</p>
        <div className="checklist">
          {employees
            .filter((e) => (kpiMap[e.id]?.performanceScore ?? 0) < 60)
            .map((e) => (
              <div key={e.id} className="checklist-item urgent">
                <input type="checkbox" id={`urgent-${e.id}`} />
                <label htmlFor={`urgent-${e.id}`}>
                  <strong>{e.name}</strong> — Schedule urgent 1:1 review (Score: {kpiMap[e.id]?.performanceScore}%)
                </label>
              </div>
            ))}
          {employees
            .filter((e) => {
              const s = kpiMap[e.id]?.performanceScore ?? 0;
              return s >= 60 && s < 70;
            })
            .map((e) => (
              <div key={e.id} className="checklist-item warning">
                <input type="checkbox" id={`warn-${e.id}`} />
                <label htmlFor={`warn-${e.id}`}>
                  <strong>{e.name}</strong> — Schedule coaching session (Score: {kpiMap[e.id]?.performanceScore}%)
                </label>
              </div>
            ))}
          {employees
            .filter((e) => (kpiMap[e.id]?.performanceScore ?? 0) >= 90)
            .map((e) => (
              <div key={e.id} className="checklist-item positive">
                <input type="checkbox" id={`star-${e.id}`} />
                <label htmlFor={`star-${e.id}`}>
                  <strong>{e.name}</strong> — Recognize achievement and discuss growth path (Score: {kpiMap[e.id]?.performanceScore}%)
                </label>
              </div>
            ))}
          <div className="checklist-item">
            <input type="checkbox" id="team-meeting" />
            <label htmlFor="team-meeting">Hold monthly team KPI review meeting</label>
          </div>
          <div className="checklist-item">
            <input type="checkbox" id="targets" />
            <label htmlFor="targets">Review and confirm next month's targets with each department head</label>
          </div>
        </div>
      </div>
    </div>
  );
}
