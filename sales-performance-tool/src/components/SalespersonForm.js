import React, { useState } from "react";

const EMPTY_FORM = {
  name: "",
  leadsReceived: "",
  leadsContacted: "",
  followUpsCompleted: "",
  meetingsBooked: "",
  dealsClosed: "",
  totalSalesValue: "",
  crmUpdated: true,
  responseTime: "Average",
  notes: "",
};

export default function SalespersonForm({ onAdd, onCancel, initial }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    ["leadsReceived", "leadsContacted", "followUpsCompleted", "meetingsBooked", "dealsClosed", "totalSalesValue"].forEach((f) => {
      if (form[f] === "" || isNaN(Number(form[f])) || Number(form[f]) < 0)
        errs[f] = "Must be a valid non-negative number";
    });
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAdd({
      ...form,
      leadsReceived: Number(form.leadsReceived),
      leadsContacted: Number(form.leadsContacted),
      followUpsCompleted: Number(form.followUpsCompleted),
      meetingsBooked: Number(form.meetingsBooked),
      dealsClosed: Number(form.dealsClosed),
      totalSalesValue: Number(form.totalSalesValue),
      id: initial?.id || Date.now(),
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{initial ? "Edit Salesperson" : "Add Salesperson"}</h3>
          <button className="btn-icon" onClick={onCancel}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="form-grid" noValidate>
          <div className="form-group full">
            <label>Salesperson Name *</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Sarah Mitchell"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {[
            { field: "leadsReceived", label: "Leads Received" },
            { field: "leadsContacted", label: "Leads Contacted" },
            { field: "followUpsCompleted", label: "Follow-ups Completed" },
            { field: "meetingsBooked", label: "Meetings Booked" },
            { field: "dealsClosed", label: "Deals Closed" },
            { field: "totalSalesValue", label: "Total Sales Value ($)" },
          ].map(({ field, label }) => (
            <div className="form-group" key={field}>
              <label>{label} *</label>
              <input
                type="number"
                min="0"
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
                placeholder="0"
              />
              {errors[field] && <span className="error">{errors[field]}</span>}
            </div>
          ))}

          <div className="form-group">
            <label>CRM Updates Completed?</label>
            <div className="toggle-group">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  className={`toggle-btn ${form.crmUpdated === val ? "active" : ""}`}
                  onClick={() => set("crmUpdated", val)}
                >
                  {val ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Response Time Quality</label>
            <div className="toggle-group">
              {["Fast", "Average", "Slow"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`toggle-btn ${form.responseTime === opt ? "active" : ""}`}
                  onClick={() => set("responseTime", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group full">
            <label>Manager Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Add any observations or context..."
            />
          </div>

          <div className="form-actions full">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initial ? "Save Changes" : "Add Salesperson"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
