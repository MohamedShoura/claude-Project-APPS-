import React, { useState, useEffect } from "react";
import { DEPARTMENTS } from "../data/sampleData";

const EMPTY = {
  name: "",
  jobTitle: "",
  department: "Sales",
  period: new Date().toISOString().slice(0, 7),
  monthlyTarget: "",
  actualAchievement: "",
  revenueTarget: "",
  revenueGenerated: "",
  leadsHandled: "",
  closedDeals: "",
  attendanceScore: "",
  notes: "",
  managerNotes: "",
};

export default function EmployeeForm({ onSave, onCancel, initial }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        ...EMPTY,
        ...initial,
        monthlyTarget: initial.monthlyTarget ?? "",
        actualAchievement: initial.actualAchievement ?? "",
        revenueTarget: initial.revenueTarget ?? "",
        revenueGenerated: initial.revenueGenerated ?? "",
        leadsHandled: initial.leadsHandled ?? "",
        closedDeals: initial.closedDeals ?? "",
        attendanceScore: initial.attendanceScore ?? "",
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Employee name is required";
    if (!form.jobTitle.trim()) e.jobTitle = "Job title is required";
    if (form.monthlyTarget === "" || isNaN(Number(form.monthlyTarget))) e.monthlyTarget = "Enter a valid number";
    if (form.actualAchievement === "" || isNaN(Number(form.actualAchievement))) e.actualAchievement = "Enter a valid number";
    if (form.attendanceScore === "" || isNaN(Number(form.attendanceScore)) || Number(form.attendanceScore) < 0 || Number(form.attendanceScore) > 100)
      e.attendanceScore = "Enter a number between 0 and 100";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const employee = {
      ...form,
      id: initial?.id || `emp-${Date.now()}`,
      monthlyTarget: Number(form.monthlyTarget),
      actualAchievement: Number(form.actualAchievement),
      revenueTarget: Number(form.revenueTarget) || 0,
      revenueGenerated: Number(form.revenueGenerated) || 0,
      leadsHandled: Number(form.leadsHandled) || 0,
      closedDeals: Number(form.closedDeals) || 0,
      attendanceScore: Number(form.attendanceScore),
      createdAt: initial?.createdAt || new Date().toISOString(),
    };
    onSave(employee);
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal">
        <div className="modal-header">
          <h2>{initial ? "Edit Employee" : "Add New Employee"}</h2>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body" noValidate>
          {/* Basic Info */}
          <div className="form-section">
            <h3 className="form-section-title">👤 Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Mitchell"
                  className={errors.name ? "input-error" : ""}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Sales Executive"
                  className={errors.jobTitle ? "input-error" : ""}
                />
                {errors.jobTitle && <span className="error-msg">{errors.jobTitle}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select name="department" value={form.department} onChange={handleChange}>
                  {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Period (Month)</label>
                <input
                  type="month"
                  name="period"
                  value={form.period}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Target & Achievement */}
          <div className="form-section">
            <h3 className="form-section-title">🎯 Targets & Achievement</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Monthly Target *</label>
                <input
                  type="number"
                  name="monthlyTarget"
                  value={form.monthlyTarget}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  min="0"
                  className={errors.monthlyTarget ? "input-error" : ""}
                />
                <span className="field-hint">Number of tasks, units, or calls targeted</span>
                {errors.monthlyTarget && <span className="error-msg">{errors.monthlyTarget}</span>}
              </div>
              <div className="form-group">
                <label>Actual Achievement *</label>
                <input
                  type="number"
                  name="actualAchievement"
                  value={form.actualAchievement}
                  onChange={handleChange}
                  placeholder="e.g. 45"
                  min="0"
                  className={errors.actualAchievement ? "input-error" : ""}
                />
                <span className="field-hint">What was actually completed this month</span>
                {errors.actualAchievement && <span className="error-msg">{errors.actualAchievement}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Revenue Target ($)</label>
                <input
                  type="number"
                  name="revenueTarget"
                  value={form.revenueTarget}
                  onChange={handleChange}
                  placeholder="e.g. 150000"
                  min="0"
                />
                <span className="field-hint">Leave 0 if not applicable</span>
              </div>
              <div className="form-group">
                <label>Revenue Generated ($)</label>
                <input
                  type="number"
                  name="revenueGenerated"
                  value={form.revenueGenerated}
                  onChange={handleChange}
                  placeholder="e.g. 140000"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Sales Metrics */}
          <div className="form-section">
            <h3 className="form-section-title">📞 Sales Metrics</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Leads Handled</label>
                <input
                  type="number"
                  name="leadsHandled"
                  value={form.leadsHandled}
                  onChange={handleChange}
                  placeholder="e.g. 60"
                  min="0"
                />
                <span className="field-hint">Total leads assigned this month</span>
              </div>
              <div className="form-group">
                <label>Closed Deals</label>
                <input
                  type="number"
                  name="closedDeals"
                  value={form.closedDeals}
                  onChange={handleChange}
                  placeholder="e.g. 18"
                  min="0"
                />
                <span className="field-hint">Deals successfully closed</span>
              </div>
            </div>
          </div>

          {/* Attendance & Notes */}
          <div className="form-section">
            <h3 className="form-section-title">📅 Attendance & Notes</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Attendance / Commitment Score (0–100) *</label>
                <input
                  type="number"
                  name="attendanceScore"
                  value={form.attendanceScore}
                  onChange={handleChange}
                  placeholder="e.g. 90"
                  min="0"
                  max="100"
                  className={errors.attendanceScore ? "input-error" : ""}
                />
                <span className="field-hint">100 = Perfect attendance, 0 = Never present</span>
                {errors.attendanceScore && <span className="error-msg">{errors.attendanceScore}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Performance Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Describe this employee's performance this period..."
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Manager Notes (Private)</label>
              <textarea
                name="managerNotes"
                value={form.managerNotes}
                onChange={handleChange}
                placeholder="Internal notes — not shown on employee report..."
                rows={2}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initial ? "Save Changes" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
