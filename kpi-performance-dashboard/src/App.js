import React, { useMemo, useState } from "react";
import "./App.css";
import { sampleEmployees } from "./data/sampleData";
import { calculateKPIs } from "./utils/kpiCalculations";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeReport from "./components/EmployeeReport";
import ReportsPage from "./components/ReportsPage";
import AIRecommendations from "./components/AIRecommendations";

export default function App() {
  const [employees, setEmployees] = useLocalStorage("kpi-employees", sampleEmployees);
  const [page, setPage] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const kpiMap = useMemo(() => {
    const map = {};
    employees.forEach((e) => { map[e.id] = calculateKPIs(e); });
    return map;
  }, [employees]);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleSave(employee) {
    if (editTarget) {
      setEmployees((prev) => prev.map((e) => (e.id === employee.id ? employee : e)));
      showToast(`${employee.name}'s record updated successfully.`);
    } else {
      setEmployees((prev) => [...prev, employee]);
      showToast(`${employee.name} added to the dashboard.`);
    }
    setShowForm(false);
    setEditTarget(null);
  }

  function handleEdit(employee) {
    setEditTarget(employee);
    setShowForm(true);
    // If viewing a report, stay on employees page when form closes
    if (page === "report") setPage("employees");
  }

  function handleDelete(id) {
    const emp = employees.find((e) => e.id === id);
    if (window.confirm(`Are you sure you want to remove ${emp?.name || "this employee"}?`)) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      showToast(`Employee removed.`, "info");
      if (page === "report") setPage("employees");
    }
  }

  function handleViewEmployee(employee) {
    setSelectedEmployee(employee);
    setPage("report");
  }

  function handleNavigate(p) {
    setPage(p);
    setSelectedEmployee(null);
  }

  function handleAdd() {
    setEditTarget(null);
    setShowForm(true);
  }

  function handleCancelForm() {
    setShowForm(false);
    setEditTarget(null);
  }

  return (
    <Layout
      currentPage={page === "report" ? "employees" : page}
      onNavigate={handleNavigate}
      employeeCount={employees.length}
    >
      {page === "dashboard" && (
        <Dashboard
          employees={employees}
          kpiMap={kpiMap}
          onNavigate={handleNavigate}
          onViewEmployee={handleViewEmployee}
        />
      )}

      {page === "employees" && (
        <EmployeeList
          employees={employees}
          kpiMap={kpiMap}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleViewEmployee}
        />
      )}

      {page === "report" && selectedEmployee && (
        <EmployeeReport
          employee={selectedEmployee}
          kpi={kpiMap[selectedEmployee.id]}
          onBack={() => setPage("employees")}
          onEdit={handleEdit}
        />
      )}

      {page === "reports" && (
        <ReportsPage
          employees={employees}
          kpiMap={kpiMap}
          onViewEmployee={handleViewEmployee}
        />
      )}

      {page === "ai" && (
        <AIRecommendations employees={employees} kpiMap={kpiMap} />
      )}

      {showForm && (
        <EmployeeForm
          onSave={handleSave}
          onCancel={handleCancelForm}
          initial={editTarget}
        />
      )}

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === "success" ? "✓" : "ℹ"} {toast.msg}
        </div>
      )}
    </Layout>
  );
}
