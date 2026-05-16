import React, { useState } from "react";
import ScoreRing from "./ScoreRing";
import RateBar from "./RateBar";

export default function PerformanceCard({ person, evaluation, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const { totalScore, category, categoryColor, contactRate, followUpRate, meetingRate, closingRate,
    strengths, weaknesses, recommendation, actionPlan, scoreBreakdown } = evaluation;

  return (
    <div className="perf-card" style={{ borderLeft: `5px solid ${categoryColor}` }}>
      {/* Card Header */}
      <div className="perf-card-header">
        <div className="perf-card-identity">
          <div className="avatar" style={{ background: categoryColor }}>
            {person.name.charAt(0)}
          </div>
          <div>
            <h3 className="perf-name">{person.name}</h3>
            <span className="category-badge" style={{ background: `${categoryColor}20`, color: categoryColor }}>
              {category}
            </span>
          </div>
        </div>
        <div className="perf-card-score">
          <ScoreRing score={totalScore} color={categoryColor} />
        </div>
      </div>

      {/* Quick stats row */}
      <div className="quick-stats">
        {[
          { label: "Leads", value: person.leadsReceived },
          { label: "Contacted", value: person.leadsContacted },
          { label: "Meetings", value: person.meetingsBooked },
          { label: "Closed", value: person.dealsClosed },
          { label: "Revenue", value: `$${person.totalSalesValue.toLocaleString()}` },
        ].map(({ label, value }) => (
          <div key={label} className="qs-item">
            <span className="qs-value">{value}</span>
            <span className="qs-label">{label}</span>
          </div>
        ))}
        <div className="qs-item">
          <span className="qs-value" style={{ color: person.crmUpdated ? "#10b981" : "#ef4444" }}>
            {person.crmUpdated ? "✓" : "✗"}
          </span>
          <span className="qs-label">CRM</span>
        </div>
        <div className="qs-item">
          <span className="qs-value" style={{
            color: person.responseTime === "Fast" ? "#10b981" : person.responseTime === "Average" ? "#f59e0b" : "#ef4444"
          }}>
            {person.responseTime}
          </span>
          <span className="qs-label">Response</span>
        </div>
      </div>

      {/* Rate bars */}
      <div className="rate-bars">
        <RateBar label="Lead Contact Rate" value={contactRate} color="#6366f1" />
        <RateBar label="Follow-up Rate" value={followUpRate} color="#3b82f6" />
        <RateBar label="Meeting Conversion" value={meetingRate} color="#f59e0b" />
        <RateBar label="Closing Rate" value={closingRate} color="#10b981" />
      </div>

      {/* Expand toggle */}
      <button className="expand-btn" onClick={() => setExpanded((v) => !v)}>
        {expanded ? "Hide Details ▲" : "View Full Report ▼"}
      </button>

      {expanded && (
        <div className="perf-details">
          {/* Score breakdown */}
          <div className="detail-section">
            <h4>Score Breakdown</h4>
            <div className="breakdown-grid">
              {[
                { label: "Contact Rate", pts: scoreBreakdown.contact, max: 20 },
                { label: "Follow-ups", pts: scoreBreakdown.followUp, max: 20 },
                { label: "Meetings", pts: scoreBreakdown.meeting, max: 15 },
                { label: "Closing", pts: scoreBreakdown.closing, max: 25 },
                { label: "CRM Discipline", pts: scoreBreakdown.crm, max: 10 },
                { label: "Response Speed", pts: scoreBreakdown.response, max: 10 },
              ].map(({ label, pts, max }) => (
                <div key={label} className="breakdown-item">
                  <div className="breakdown-label">{label}</div>
                  <div className="breakdown-bar-track">
                    <div
                      className="breakdown-bar-fill"
                      style={{ width: `${(pts / max) * 100}%`, background: categoryColor }}
                    />
                  </div>
                  <div className="breakdown-pts">{pts}/{max}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="sw-grid">
            <div className="detail-section">
              <h4 className="strengths-title">✓ Strengths</h4>
              {strengths.length > 0 ? (
                <ul className="sw-list">
                  {strengths.map((s, i) => (
                    <li key={i} className="sw-item strength">{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="sw-empty">No notable strengths identified yet.</p>
              )}
            </div>
            <div className="detail-section">
              <h4 className="weaknesses-title">✗ Weak Points</h4>
              {weaknesses.length > 0 ? (
                <ul className="sw-list">
                  {weaknesses.map((w, i) => (
                    <li key={i} className="sw-item weakness">{w}</li>
                  ))}
                </ul>
              ) : (
                <p className="sw-empty">No significant weaknesses found.</p>
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div className="detail-section">
            <h4>Recommendation</h4>
            <div className="recommendation-box" style={{ borderLeft: `4px solid ${categoryColor}` }}>
              {recommendation}
            </div>
          </div>

          {/* Action Plan */}
          <div className="detail-section">
            <h4>Action Plan</h4>
            <ol className="action-list">
              {actionPlan.map((step, i) => (
                <li key={i} className="action-item">{step}</li>
              ))}
            </ol>
          </div>

          {/* Manager Notes */}
          {person.notes && (
            <div className="detail-section">
              <h4>Manager Notes</h4>
              <div className="notes-box">{person.notes}</div>
            </div>
          )}
        </div>
      )}

      {/* Card footer actions */}
      <div className="card-actions">
        <button className="btn btn-sm btn-outline" onClick={() => onEdit(person)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(person.id)}>Remove</button>
      </div>
    </div>
  );
}
