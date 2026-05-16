import React, { useState, useMemo } from "react";
import { DEPARTMENTS } from "../data/sampleData";
import { exportToCSV, exportToExcel, exportToPDF } from "../utils/exportUtils";

const RATINGS = ["All Ratings", "Excellent", "Very Good", "Good", "Needs Improvement", "Poor"];

function RatingBadge({ rating, color, bg }) {
  return (
    <span className="rating-badge" style={{ background: bg, color, border: `1px solid ${color}40` }}>
      {rating}
    </span>
  );
}

function ProgressBar({ value, color }) {
  const capped = Math.min(value, 100);
  return (
    <div className="progress-bar-track">
      <div className="progress-bar-fill" style={{ width: `${capped}%`, background: color }} />
    </div>
  );
}

export default function EmployeeList({ employees, kpiMap, onAdd, onEdit, onDelete, onView }) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [rating, setRating] = useState("All Ratings");
  const [period, setPeriod] = useState("");

  const periods = useMemo(() => {
    const set = new Set(employees.map((e) => e.period));
    return ["All Periods", ...Array.from(set).sort().reverse()];
  }, [employees]);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const kpi = kpiMap[e.id];
      const matchSearch =
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.jobTitle.toLowerCase().includes(search.toLowerCase());
      const matchDept = dept === "All Departments" || e.department === dept;
      const matchRating = rating === "All Ratings" || kpi?.rating === rating;
      const matchPeriod = !period || period === "All Periods" || e.period === period;
      return matchSearch && matchDept && matchRating && matchPeriod;
    });
  }, [employees, kpiMap, search, dept, rating, period]);

  return (
    <div className="employee-list-page">
      {/* Toolbar */}
      <div className="list-toolbar">
        <div className="toolbar-left">
          <input
            className="search-input"
            type="text"
            placeholder="🔍  Search by name or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="filter-select" value={dept} onChange={(e) => setDept(e.target.value)}>
            <option>All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className="filter-select" value={rating} onChange={(e) => setRating(e.target.value)}>
            {RATINGS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select className="filter-select" value={period} onChange={(e) => setPeriod(e.target.value)}>
            {periods.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="toolbar-right">
          <div className="export-group">
            <button className="btn btn-ghost btn-sm" onClick={() => exportToPDF(filtered)}>⬇ PDF</button>
            <button className="btn btn-ghost btn-sm" onClick={() => exportToExcel(filtered)}>⬇ Excel</button>
            <button className="btn btn-ghost btn-sm" onClick={() => exportToCSV(filtered)}>⬇ CSV</button>
          </div>
          <button className="btn btn-primary" onClick={onAdd}>+ Add Employee</button>
        </div>
      </div>

      <p className="results-count">{filtered.length} employee{filtered.length !== 1 ? "s" : ""} found</p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <p>No employees match your filters.</p>
          {employees.length === 0 && (
            <button className="btn btn-primary" onClick={onAdd}>+ Add First Employee</button>
          )}
        </div>
      ) : (
        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Period</th>
                <th>Achievement</th>
                <th>Conversion</th>
                <th>Revenue</th>
                <th>Attendance</th>
                <th>Score</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const k = kpiMap[e.id];
                if (!k) return null;
                return (
                  <tr key={e.id} className={k.needsAttention ? "row-attention" : ""}>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar" style={{ background: stringToColor(e.name) }}>
                          {e.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="emp-name">{e.name}</div>
                          <div className="emp-title">{e.jobTitle}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="dept-chip">{e.department}</span></td>
                    <td className="period-cell">{formatPeriod(e.period)}</td>
                    <td>
                      <div className="metric-cell">
                        <span className="metric-pct">{k.achievementPct}%</span>
                        <ProgressBar value={k.achievementPct} color={k.ratingColor} />
                      </div>
                    </td>
                    <td>
                      {e.leadsHandled > 0 ? (
                        <div className="metric-cell">
                          <span className="metric-pct">{k.conversionRate}%</span>
                          <ProgressBar value={k.conversionRate} color="#7c3aed" />
                        </div>
                      ) : <span className="na-text">N/A</span>}
                    </td>
                    <td className="revenue-cell">
                      {e.revenueGenerated > 0
                        ? `$${e.revenueGenerated.toLocaleString()}`
                        : <span className="na-text">—</span>}
                    </td>
                    <td>
                      <div className="metric-cell">
                        <span className="metric-pct">{e.attendanceScore}%</span>
                        <ProgressBar value={e.attendanceScore} color="#0891b2" />
                      </div>
                    </td>
                    <td>
                      <span className="score-pill" style={{ background: k.ratingBg, color: k.ratingColor }}>
                        {k.performanceScore}%
                      </span>
                    </td>
                    <td>
                      <RatingBadge rating={k.rating} color={k.ratingColor} bg={k.ratingBg} />
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn" title="View Report" onClick={() => onView(e)}>👁</button>
                        <button className="action-btn" title="Edit" onClick={() => onEdit(e)}>✏️</button>
                        <button className="action-btn action-btn-danger" title="Delete" onClick={() => onDelete(e.id)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function stringToColor(str) {
  const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#6366f1"];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function formatPeriod(period) {
  if (!period) return "—";
  try {
    return new Date(period + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return period;
  }
}
