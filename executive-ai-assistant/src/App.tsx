import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Insights from "@/pages/Insights";
import Kpis from "@/pages/Kpis";
import Planner from "@/pages/Planner";
import Reminders from "@/pages/Reminders";
import Meetings from "@/pages/Meetings";
import Team from "@/pages/Team";
import EmployeeProfile from "@/pages/EmployeeProfile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="insights" element={<Insights />} />
        <Route path="kpis" element={<Kpis />} />
        <Route path="planner" element={<Planner />} />
        <Route path="reminders" element={<Reminders />} />
        <Route path="meetings" element={<Meetings />} />
        <Route path="team" element={<Team />} />
        <Route path="team/:id" element={<EmployeeProfile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
