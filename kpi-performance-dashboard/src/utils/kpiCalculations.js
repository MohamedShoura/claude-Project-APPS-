export function calculateKPIs(employee) {
  const {
    monthlyTarget = 0,
    actualAchievement = 0,
    leadsHandled = 0,
    closedDeals = 0,
    revenueGenerated = 0,
    revenueTarget = 0,
    attendanceScore = 0,
  } = employee;

  const achievementPct =
    monthlyTarget > 0 ? Math.min((actualAchievement / monthlyTarget) * 100, 150) : 0;

  const conversionRate =
    leadsHandled > 0 ? Math.min((closedDeals / leadsHandled) * 100, 100) : 0;

  const revenueAchievementPct =
    revenueTarget > 0 ? Math.min((revenueGenerated / revenueTarget) * 100, 150) : null;

  // Weighted performance score
  // Achievement 40%, Attendance 25%, Conversion 20%, Revenue 15%
  const normAchievement = Math.min(achievementPct, 100);
  const normConversion = Math.min(conversionRate, 100);
  const normAttendance = Math.min(attendanceScore, 100);
  const normRevenue =
    revenueTarget > 0
      ? Math.min((revenueGenerated / revenueTarget) * 100, 100)
      : normAchievement;

  const performanceScore = Math.round(
    normAchievement * 0.4 +
      normAttendance * 0.25 +
      normConversion * 0.2 +
      normRevenue * 0.15
  );

  let rating, ratingColor, ratingBg, ratingBorder;
  if (performanceScore >= 90) {
    rating = "Excellent";
    ratingColor = "#059669";
    ratingBg = "#ecfdf5";
    ratingBorder = "#6ee7b7";
  } else if (performanceScore >= 80) {
    rating = "Very Good";
    ratingColor = "#2563eb";
    ratingBg = "#eff6ff";
    ratingBorder = "#93c5fd";
  } else if (performanceScore >= 70) {
    rating = "Good";
    ratingColor = "#7c3aed";
    ratingBg = "#f5f3ff";
    ratingBorder = "#c4b5fd";
  } else if (performanceScore >= 50) {
    rating = "Needs Improvement";
    ratingColor = "#d97706";
    ratingBg = "#fffbeb";
    ratingBorder = "#fcd34d";
  } else {
    rating = "Poor";
    ratingColor = "#dc2626";
    ratingBg = "#fef2f2";
    ratingBorder = "#fca5a5";
  }

  return {
    achievementPct: Math.round(achievementPct * 10) / 10,
    conversionRate: Math.round(conversionRate * 10) / 10,
    revenueAchievementPct:
      revenueAchievementPct !== null ? Math.round(revenueAchievementPct * 10) / 10 : null,
    performanceScore,
    rating,
    ratingColor,
    ratingBg,
    ratingBorder,
    needsAttention: performanceScore < 70,
  };
}

export function getStrengths(employee, kpis) {
  const s = [];
  if (kpis.achievementPct >= 100) s.push("Surpasses monthly targets — goes above and beyond");
  else if (kpis.achievementPct >= 90) s.push("Consistently meets or nearly meets monthly targets");
  if (kpis.conversionRate >= 40) s.push("Excellent lead-to-deal conversion rate");
  else if (kpis.conversionRate >= 25) s.push("Solid conversion rate — good at closing leads");
  if (employee.attendanceScore >= 95) s.push("Outstanding attendance and commitment");
  else if (employee.attendanceScore >= 85) s.push("Good attendance record");
  if (employee.closedDeals >= 20) s.push("High volume of closed deals this period");
  if (kpis.revenueAchievementPct !== null && kpis.revenueAchievementPct >= 100)
    s.push("Exceeds revenue targets — strong deal value");
  if (s.length === 0) s.push("Shows willingness to improve — needs structured support");
  return s;
}

export function getWeaknesses(employee, kpis) {
  const w = [];
  if (kpis.achievementPct < 60) w.push("Significantly below monthly achievement target");
  else if (kpis.achievementPct < 80) w.push("Achievement target not fully met this period");
  if (kpis.conversionRate < 15) w.push("Very low conversion rate — leads are not converting to deals");
  else if (kpis.conversionRate < 25) w.push("Conversion rate below team average — closing skills need work");
  if (employee.attendanceScore < 70) w.push("Attendance issues are impacting overall performance");
  else if (employee.attendanceScore < 80) w.push("Attendance could be improved for better consistency");
  if (employee.leadsHandled < 20 && employee.department === "Sales")
    w.push("Number of leads handled is below expected volume");
  if (employee.closedDeals === 0 && employee.department === "Sales")
    w.push("No deals closed this period — urgent coaching required");
  return w;
}

export function getRecommendedActions(employee, kpis) {
  const a = [];
  if (kpis.performanceScore >= 90) {
    a.push("Recognize this employee publicly — share success with the team");
    a.push("Evaluate for bonus, promotion, or expanded responsibilities");
    a.push("Use as a mentor for lower-performing team members");
  } else if (kpis.performanceScore >= 80) {
    a.push("Encourage stretch goals to push toward top performance");
    a.push("Provide advanced training or new challenges to maintain motivation");
  } else if (kpis.performanceScore >= 70) {
    a.push("Schedule monthly coaching session to review pipeline and targets");
    a.push("Identify specific areas to focus on for the next quarter");
  } else if (kpis.performanceScore >= 50) {
    a.push("Set up bi-weekly check-in meetings to monitor progress");
    a.push("Create a structured improvement plan with clear milestones");
    if (kpis.conversionRate < 25)
      a.push("Enroll in sales training focused on closing techniques");
    if (employee.attendanceScore < 80)
      a.push("Address attendance concerns formally with HR involvement");
  } else {
    a.push("Initiate a formal Performance Improvement Plan (PIP) immediately");
    a.push("Assign a direct supervisor for daily check-ins");
    a.push("Set 30-day review checkpoint with clear pass/fail criteria");
    if (employee.closedDeals === 0) a.push("Pair with top performer for shadowing sessions");
  }
  return a;
}

export function buildTeamSummary(employees, kpiMap) {
  if (!employees || employees.length === 0) return null;
  const scores = employees.map((e) => kpiMap[e.id]?.performanceScore ?? 0);
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const maxIdx = scores.indexOf(Math.max(...scores));
  const minIdx = scores.indexOf(Math.min(...scores));
  return {
    totalEmployees: employees.length,
    topPerformer: employees[maxIdx],
    topScore: scores[maxIdx],
    lowestPerformer: employees[minIdx],
    lowestScore: scores[minIdx],
    avgScore,
    totalRevenue: employees.reduce((s, e) => s + (e.revenueGenerated || 0), 0),
    totalDeals: employees.reduce((s, e) => s + (e.closedDeals || 0), 0),
    totalLeads: employees.reduce((s, e) => s + (e.leadsHandled || 0), 0),
    needsAttention: employees.filter((e) => kpiMap[e.id]?.needsAttention),
    excellent: employees.filter((e) => kpiMap[e.id]?.rating === "Excellent").length,
    veryGood: employees.filter((e) => kpiMap[e.id]?.rating === "Very Good").length,
    good: employees.filter((e) => kpiMap[e.id]?.rating === "Good").length,
    needsImprovement: employees.filter((e) => kpiMap[e.id]?.rating === "Needs Improvement").length,
    poor: employees.filter((e) => kpiMap[e.id]?.rating === "Poor").length,
  };
}
