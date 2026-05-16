import React from "react";
import ScoreRing from "./ScoreRing";

export default function TeamTable({ people, evaluations, onEdit, onDelete }) {
  if (people.length === 0) return null;

  return (
    <section className="team-table-section">
      <h2 className="section-title">Team Overview</h2>
      <div className="table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Salesperson</th>
              <th>Score</th>
              <th>Status</th>
              <th>Contact%</th>
              <th>Follow-up%</th>
              <th>Meeting%</th>
              <th>Closing%</th>
              <th>Revenue</th>
              <th>CRM</th>
              <th>Response</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p, i) => {
              const ev = evaluations[i];
              return (
                <tr key={p.id}>
                  <td className="td-name">
                    <div className="avatar sm" style={{ background: ev.categoryColor }}>{p.name.charAt(0)}</div>
                    {p.name}
                  </td>
                  <td className="td-score">
                    <ScoreRing score={ev.totalScore} color={ev.categoryColor} size={52} />
                  </td>
                  <td>
                    <span className="category-badge sm" style={{ background: `${ev.categoryColor}20`, color: ev.categoryColor }}>
                      {ev.category}
                    </span>
                  </td>
                  <td><RatePill value={ev.contactRate} /></td>
                  <td><RatePill value={ev.followUpRate} /></td>
                  <td><RatePill value={ev.meetingRate} /></td>
                  <td><RatePill value={ev.closingRate} /></td>
                  <td className="td-rev">${p.totalSalesValue.toLocaleString()}</td>
                  <td style={{ color: p.crmUpdated ? "#10b981" : "#ef4444", fontWeight: 600 }}>
                    {p.crmUpdated ? "Yes" : "No"}
                  </td>
                  <td>
                    <span style={{
                      color: p.responseTime === "Fast" ? "#10b981" : p.responseTime === "Average" ? "#f59e0b" : "#ef4444",
                      fontWeight: 600,
                    }}>
                      {p.responseTime}
                    </span>
                  </td>
                  <td className="td-actions">
                    <button className="btn btn-sm btn-outline" onClick={() => onEdit(p)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(p.id)}>✕</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RatePill({ value }) {
  const color = value >= 75 ? "#10b981" : value >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <span className="rate-pill" style={{ background: `${color}15`, color }}>
      {value}%
    </span>
  );
}
