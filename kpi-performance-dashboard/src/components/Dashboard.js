import React, { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { buildTeamSummary } from "../utils/kpiCalculations";

const RATING_COLORS = {
  Excellent: "#059669",
  "Very Good": "#2563eb",
  Good: "#7c3aed",
  "Needs Improvement": "#d97706",
  Poor: "#dc2626",
};

function KPICard({ label, value, sub, color, icon }) {
  return (
    <div className="kpi-card" style={{ borderTopColor: color }}>
      <div className="kpi-card-header">
        <span className="kpi-icon">{icon}</span>
        <span className="kpi-label">{label}</span>
      </div>
      <div className="kpi-value" style={{ color }}>{value}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  );
}

function RatingBadge({ rating, color }) {
  return (
    <span
      className="rating-badge"
      style={{
        backgroundColor: color + "20",
        color,
        border: `1px solid ${color}50`,
      }}
    >
      {rating}
    </span>
  );
}

export default function Dashboard({ employees, kpiMap, onNavigate, onViewEmployee }) {
  const summary = useMemo(() => buildTeamSummary(employees, kpiMap), [employees, kpiMap]);

  const barData = useMemo(
    () =>
      employees
        .map((e) => ({
          name: e.name.split(" ")[0],
          score: kpiMap[e.id]?.performanceScore ?? 0,
          rating: kpiMap[e.id]?.rating ?? "",
        }))
        .sort((a, b) => b.score - a.score),
    [employees, kpiMap]
  );

  const pieData = useMemo(() => {
    if (!summary) return [];
    return [
      { name: "Excellent", value: summary.excellent },
      { name: "Very Good", value: summary.veryGood },
      { name: "Good", value: summary.good },
      { name: "Needs Improvement", value: summary.needsImprovement },
      { name: "Poor", value: summary.poor },
    ].filter((d) => d.value > 0);
  }, [summary]);

  if (employees.length === 0) {
    return (
      <div className="empty-dashboard">
        <div className="empty-icon">📊</div>
        <h2>No Data Yet</h2>
        <p>Add your first employee to start tracking KPI performance.</p>
        <button className="btn btn-primary" onClick={() => onNavigate("employees")}>
          + Add First Employee
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* KPI Cards Row */}
      <div className="kpi-cards-grid">
        <KPICard
          label="Total Employees"
          value={summary?.totalEmployees ?? 0}
          sub="Tracked this period"
          color="#2563eb"
          icon="👥"
        />
        <KPICard
          label="Average Team Score"
          value={`${summary?.avgScore ?? 0}%`}
          sub="Overall performance"
          color={summary?.avgScore >= 80 ? "#059669" : summary?.avgScore >= 70 ? "#7c3aed" : "#d97706"}
          icon="📈"
        />
        <KPICard
          label="Total Revenue"
          value={`$${(summary?.totalRevenue ?? 0).toLocaleString()}`}
          sub="Generated this period"
          color="#059669"
          icon="💰"
        />
        <KPICard
          label="Total Closed Deals"
          value={summary?.totalDeals ?? 0}
          sub={`From ${summary?.totalLeads ?? 0} leads`}
          color="#7c3aed"
          icon="🤝"
        />
        <KPICard
          label="Needs Attention"
          value={summary?.needsAttention?.length ?? 0}
          sub="Below 70% performance"
          color="#dc2626"
          icon="⚠️"
        />
      </div>

      {/* Top / Lowest Performers */}
      <div className="performers-row">
        <div className="performer-card top-performer">
          <div className="performer-badge">🏆 Top Performer</div>
          {summary?.topPerformer && (
            <>
              <div className="performer-name">{summary.topPerformer.name}</div>
              <div className="performer-meta">{summary.topPerformer.jobTitle} · {summary.topPerformer.department}</div>
              <div className="performer-score">{summary.topScore}% Score</div>
              <RatingBadge rating={kpiMap[summary.topPerformer.id]?.rating} color={kpiMap[summary.topPerformer.id]?.ratingColor} />
              <button className="btn btn-sm btn-outline" onClick={() => onViewEmployee(summary.topPerformer)}>
                View Report →
              </button>
            </>
          )}
        </div>

        <div className="performer-card low-performer">
          <div className="performer-badge" style={{ background: "#fef2f2", color: "#dc2626" }}>
            ⚠️ Needs Support
          </div>
          {summary?.lowestPerformer && (
            <>
              <div className="performer-name">{summary.lowestPerformer.name}</div>
              <div className="performer-meta">{summary.lowestPerformer.jobTitle} · {summary.lowestPerformer.department}</div>
              <div className="performer-score">{summary.lowestScore}% Score</div>
              <RatingBadge rating={kpiMap[summary.lowestPerformer.id]?.rating} color={kpiMap[summary.lowestPerformer.id]?.ratingColor} />
              <button className="btn btn-sm btn-outline" onClick={() => onViewEmployee(summary.lowestPerformer)}>
                View Report →
              </button>
            </>
          )}
        </div>

        {summary?.needsAttention?.length > 0 && (
          <div className="performer-card attention-card">
            <div className="performer-badge" style={{ background: "#fffbeb", color: "#d97706" }}>
              📋 Attention List
            </div>
            <div className="attention-list">
              {summary.needsAttention.map((e) => (
                <div key={e.id} className="attention-item" onClick={() => onViewEmployee(e)}>
                  <span className="attention-name">{e.name}</span>
                  <span className="attention-score" style={{ color: kpiMap[e.id]?.ratingColor }}>
                    {kpiMap[e.id]?.performanceScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Bar Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Team Performance Scores</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#64748b" }} unit="%" />
              <Tooltip
                formatter={(v) => [`${v}%`, "Performance Score"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={RATING_COLORS[entry.rating] || "#2563eb"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card chart-card-sm">
          <h3 className="chart-title">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={RATING_COLORS[entry.name]} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => <span style={{ fontSize: 12, color: "#475569" }}>{value}</span>}
              />
              <Tooltip formatter={(v) => [v, "Employees"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <button className="quick-btn" onClick={() => onNavigate("employees")}>
            <span>➕</span> Add New Employee
          </button>
          <button className="quick-btn" onClick={() => onNavigate("reports")}>
            <span>📋</span> View Reports
          </button>
          <button className="quick-btn" onClick={() => onNavigate("ai")}>
            <span>🤖</span> Get AI Insights
          </button>
        </div>
      </div>
    </div>
  );
}
