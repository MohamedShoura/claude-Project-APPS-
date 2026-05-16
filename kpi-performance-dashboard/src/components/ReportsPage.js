import React, { useState, useMemo } from "react";
import { DEPARTMENTS } from "../data/sampleData";
import { exportToCSV, exportToExcel, exportToPDF } from "../utils/exportUtils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";

function formatPeriod(period) {
  if (!period) return "—";
  try {
    return new Date(period + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch { return period; }
}

export default function ReportsPage({ employees, kpiMap, onViewEmployee }) {
  const [dept, setDept] = useState("All Departments");
  const [period, setPeriod] = useState("All Periods");
  const [search, setSearch] = useState("");

  const periods = useMemo(() => {
    const set = new Set(employees.map((e) => e.period));
    return ["All Periods", ...Array.from(set).sort().reverse()];
  }, [employees]);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchDept = dept === "All Departments" || e.department === dept;
      const matchPeriod = period === "All Periods" || e.period === period;
      const matchSearch =
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(search.toLowerCase());
      return matchDept && matchPeriod && matchSearch;
    });
  }, [employees, dept, period, search]);

  const deptChartData = useMemo(() => {
    const map = {};
    filtered.forEach((e) => {
      if (!map[e.department]) map[e.department] = { dept: e.department, scores: [], revenue: 0, deals: 0 };
      map[e.department].scores.push(kpiMap[e.id]?.performanceScore ?? 0);
      map[e.department].revenue += e.revenueGenerated || 0;
      map[e.department].deals += e.closedDeals || 0;
    });
    return Object.values(map).map((d) => ({
      name: d.dept,
      avgScore: Math.round(d.scores.reduce((a, b) => a + b, 0) / d.scores.length),
      revenue: d.revenue,
      deals: d.deals,
    }));
  }, [filtered, kpiMap]);

  const trendData = useMemo(() => {
    const map = {};
    employees.forEach((e) => {
      if (!map[e.period]) map[e.period] = { period: e.period, scores: [] };
      map[e.period].scores.push(kpiMap[e.id]?.performanceScore ?? 0);
    });
    return Object.values(map)
      .sort((a, b) => a.period.localeCompare(b.period))
      .map((d) => ({
        period: formatPeriod(d.period),
        avgScore: Math.round(d.scores.reduce((a, b) => a + b, 0) / d.scores.length),
      }));
  }, [employees, kpiMap]);

  const sorted = [...filtered].sort(
    (a, b) => (kpiMap[b.id]?.performanceScore ?? 0) - (kpiMap[a.id]?.performanceScore ?? 0)
  );

  return (
    <div className="reports-page">
      {/* Filters */}
      <div className="reports-filter-bar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍  Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="filter-select" value={dept} onChange={(e) => setDept(e.target.value)}>
          <option>All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select className="filter-select" value={period} onChange={(e) => setPeriod(e.target.value)}>
          {periods.map((p) => <option key={p}>{p}</option>)}
        </select>
        <div className="export-group">
          <button className="btn btn-ghost btn-sm" onClick={() => exportToPDF(filtered)}>⬇ PDF</button>
          <button className="btn btn-ghost btn-sm" onClick={() => exportToExcel(filtered)}>⬇ Excel</button>
          <button className="btn btn-ghost btn-sm" onClick={() => exportToCSV(filtered)}>⬇ CSV</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="reports-summary">
        {[
          { label: "Filtered Employees", value: filtered.length, icon: "👥" },
          {
            label: "Avg Performance",
            value: filtered.length
              ? `${Math.round(filtered.reduce((s, e) => s + (kpiMap[e.id]?.performanceScore ?? 0), 0) / filtered.length)}%`
              : "—",
            icon: "📈",
          },
          {
            label: "Total Revenue",
            value: `$${filtered.reduce((s, e) => s + (e.revenueGenerated || 0), 0).toLocaleString()}`,
            icon: "💰",
          },
          {
            label: "Total Deals",
            value: filtered.reduce((s, e) => s + (e.closedDeals || 0), 0),
            icon: "🤝",
          },
        ].map((c) => (
          <div key={c.label} className="report-summary-card">
            <span className="summary-icon">{c.icon}</span>
            <div>
              <div className="summary-value">{c.value}</div>
              <div className="summary-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      {deptChartData.length > 1 && (
        <div className="reports-charts">
          <div className="chart-card">
            <h3 className="chart-title">Average Score by Department</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={deptChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`${v}%`, "Avg Score"]} />
                <Bar dataKey="avgScore" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {trendData.length > 1 && (
            <div className="chart-card">
              <h3 className="chart-title">Performance Trend Over Time</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`${v}%`, "Avg Score"]} />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} name="Avg Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Ranked List */}
      <div className="report-section">
        <h2 className="section-title">📋 Performance Rankings</h2>
        {sorted.length === 0 ? (
          <div className="empty-state"><p>No employees match this filter.</p></div>
        ) : (
          <div className="ranked-list">
            {sorted.map((e, i) => {
              const k = kpiMap[e.id];
              if (!k) return null;
              return (
                <div key={e.id} className="ranked-item" onClick={() => onViewEmployee(e)}>
                  <div className="rank-num" style={{ color: i === 0 ? "#d97706" : i === 1 ? "#94a3b8" : "#b45309" }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </div>
                  <div className="rank-info">
                    <div className="rank-name">{e.name}</div>
                    <div className="rank-meta">{e.jobTitle} · {e.department} · {formatPeriod(e.period)}</div>
                  </div>
                  <div className="rank-metrics">
                    <span className="rank-ach">Ach: {k.achievementPct}%</span>
                    {e.leadsHandled > 0 && <span className="rank-conv">Conv: {k.conversionRate}%</span>}
                  </div>
                  <div className="rank-score" style={{ color: k.ratingColor }}>
                    {k.performanceScore}%
                  </div>
                  <span className="rating-badge" style={{ background: k.ratingBg, color: k.ratingColor }}>
                    {k.rating}
                  </span>
                  <span className="rank-arrow">→</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
