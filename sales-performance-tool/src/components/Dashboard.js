import React from "react";

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${accent}` }}>
      <div className="stat-value" style={{ color: accent }}>
        {value}
      </div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

export default function Dashboard({ summary }) {
  if (!summary) return null;

  const { categoryColor } = getScoreStyle(summary.avgScore);

  return (
    <section className="dashboard">
      <h2 className="section-title">Team Summary Dashboard</h2>
      <div className="stat-grid">
        <StatCard
          label="Best Performer"
          value={summary.bestPerformer}
          sub={`Score: ${summary.bestScore}`}
          accent="#10b981"
        />
        <StatCard
          label="Lowest Performer"
          value={summary.lowestPerformer}
          sub={`Score: ${summary.lowestScore}`}
          accent="#ef4444"
        />
        <StatCard
          label="Avg Team Score"
          value={`${summary.avgScore}/100`}
          accent={categoryColor}
        />
        <StatCard
          label="Total Leads"
          value={summary.totalLeads.toLocaleString()}
          accent="#6366f1"
        />
        <StatCard
          label="Total Meetings"
          value={summary.totalMeetings.toLocaleString()}
          accent="#f59e0b"
        />
        <StatCard
          label="Total Deals Closed"
          value={summary.totalDeals.toLocaleString()}
          accent="#3b82f6"
        />
        <StatCard
          label="Total Revenue"
          value={`$${summary.totalRevenue.toLocaleString()}`}
          accent="#10b981"
        />
        <StatCard
          label="Team Size"
          value={summary.teamSize}
          sub="salespeople"
          accent="#8b5cf6"
        />
      </div>
    </section>
  );
}

function getScoreStyle(score) {
  if (score >= 85) return { categoryColor: "#10b981" };
  if (score >= 70) return { categoryColor: "#3b82f6" };
  if (score >= 50) return { categoryColor: "#f59e0b" };
  return { categoryColor: "#ef4444" };
}
