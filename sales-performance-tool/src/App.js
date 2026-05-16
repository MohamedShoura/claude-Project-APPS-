import React, { useState, useMemo } from "react";
import "./App.css";
import { sampleSalesData } from "./data/sampleData";
import { evaluateSalesperson, buildTeamSummary } from "./utils/scoring";
import Dashboard from "./components/Dashboard";
import TeamTable from "./components/TeamTable";
import PerformanceCard from "./components/PerformanceCard";
import SalespersonForm from "./components/SalespersonForm";

export default function App() {
  const [people, setPeople] = useState(sampleSalesData);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [view, setView] = useState("cards");
  const [filterCat, setFilterCat] = useState("All");

  const evaluations = useMemo(() => people.map(evaluateSalesperson), [people]);
  const summary = useMemo(() => buildTeamSummary(people, evaluations), [people, evaluations]);

  const categories = ["All", "Excellent", "Good", "Needs Improvement", "Poor Performance"];

  const filtered = useMemo(() => {
    if (filterCat === "All") return { people, evaluations };
    const idxs = evaluations
      .map((e, i) => (e.category === filterCat ? i : -1))
      .filter((i) => i !== -1);
    return { people: idxs.map((i) => people[i]), evaluations: idxs.map((i) => evaluations[i]) };
  }, [people, evaluations, filterCat]);

  function handleAdd(person) {
    if (editTarget) {
      setPeople((ps) => ps.map((p) => (p.id === person.id ? person : p)));
    } else {
      setPeople((ps) => [...ps, person]);
    }
    setShowForm(false);
    setEditTarget(null);
  }

  function handleEdit(person) {
    setEditTarget(person);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (window.confirm("Remove this salesperson from the review?")) {
      setPeople((ps) => ps.filter((p) => p.id !== id));
    }
  }

  function handleCancelForm() {
    setShowForm(false);
    setEditTarget(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-icon">📊</div>
            <div>
              <h1 className="brand-title">Sales Performance Review</h1>
              <p className="brand-subtitle">Business &amp; Marketing Consulting — Team Analytics</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditTarget(null); setShowForm(true); }}>
            + Add Salesperson
          </button>
        </div>
      </header>

      <main className="app-main">
        {summary && <Dashboard summary={summary} />}

        <div className="controls-bar">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${filterCat === cat ? "active" : ""}`}
                onClick={() => setFilterCat(cat)}
              >
                {cat}
                <span className="filter-count">
                  {cat === "All"
                    ? people.length
                    : evaluations.filter((e) => e.category === cat).length}
                </span>
              </button>
            ))}
          </div>
          <div className="view-toggle">
            <button
              className={`view-btn ${view === "cards" ? "active" : ""}`}
              onClick={() => setView("cards")}
            >
              ⊞ Cards
            </button>
            <button
              className={`view-btn ${view === "table" ? "active" : ""}`}
              onClick={() => setView("table")}
            >
              ☰ Table
            </button>
          </div>
        </div>

        {filtered.people.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>No salespeople match this filter.</p>
            <button className="btn btn-primary" onClick={() => { setEditTarget(null); setShowForm(true); }}>
              + Add Salesperson
            </button>
          </div>
        ) : view === "table" ? (
          <TeamTable
            people={filtered.people}
            evaluations={filtered.evaluations}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="cards-grid">
            {filtered.people.map((p, i) => (
              <PerformanceCard
                key={p.id}
                person={p}
                evaluation={filtered.evaluations[i]}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Sales Performance Review Tool &nbsp;·&nbsp; Internal Use Only</p>
      </footer>

      {showForm && (
        <SalespersonForm
          onAdd={handleAdd}
          onCancel={handleCancelForm}
          initial={editTarget}
        />
      )}
    </div>
  );
}
