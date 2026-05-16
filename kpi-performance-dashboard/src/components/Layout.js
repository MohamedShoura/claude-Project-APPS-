import React, { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "employees", label: "Employees", icon: "👥" },
  { id: "reports", label: "Reports", icon: "📋" },
  { id: "ai", label: "AI Insights", icon: "🤖" },
];

export default function Layout({ currentPage, onNavigate, employeeCount, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">📈</div>
          <div className="brand-text">
            <span className="brand-name">KPI Dashboard</span>
            <span className="brand-sub">Performance Management</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-section-label">MAIN MENU</p>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? "nav-item-active" : ""}`}
              onClick={() => {
                onNavigate(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.id === "employees" && (
                <span className="nav-badge">{employeeCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-info">
            <span className="footer-dot" />
            <span>KPI Dashboard v1.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        {/* Top Header */}
        <header className="top-header">
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span />
            <span />
            <span />
          </button>
          <div className="header-title">
            {NAV_ITEMS.find((n) => n.id === currentPage)?.label || "KPI Dashboard"}
          </div>
          <div className="header-right">
            <div className="header-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
