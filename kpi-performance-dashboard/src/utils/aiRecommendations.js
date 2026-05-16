export function generateAIRecommendations(employees, kpiMap) {
  if (!employees || employees.length === 0) return [];

  const recommendations = [];

  // --- Who needs immediate follow-up ---
  const critical = employees.filter((e) => (kpiMap[e.id]?.performanceScore ?? 0) < 55);
  if (critical.length > 0) {
    recommendations.push({
      type: "urgent",
      icon: "🚨",
      title: "Immediate Attention Required",
      description: `${critical.length} employee${critical.length > 1 ? "s" : ""} ${critical.length > 1 ? "are" : "is"} performing critically below targets and need immediate manager follow-up.`,
      employees: critical.map((e) => e.name),
      action: "Schedule individual meetings this week. Review their workload, challenges, and support needs. Consider formal performance plans.",
    });
  }

  // --- Who deserves bonus / recognition ---
  const stars = employees.filter((e) => (kpiMap[e.id]?.performanceScore ?? 0) >= 90);
  if (stars.length > 0) {
    recommendations.push({
      type: "positive",
      icon: "🏆",
      title: "Top Performers — Bonus & Recognition",
      description: `${stars.length} employee${stars.length > 1 ? "s" : ""} ${stars.length > 1 ? "have" : "has"} achieved Excellent performance this period and deserve recognition.`,
      employees: stars.map((e) => e.name),
      action: "Recommend for monthly bonus. Share their success story in team meetings. Consider expanded responsibilities or leadership opportunities.",
    });
  }

  // --- Who needs training ---
  const salesWithLowConversion = employees.filter(
    (e) =>
      e.department === "Sales" &&
      e.leadsHandled > 10 &&
      (kpiMap[e.id]?.conversionRate ?? 0) < 20
  );
  if (salesWithLowConversion.length > 0) {
    recommendations.push({
      type: "training",
      icon: "📚",
      title: "Sales Training Needed",
      description: `${salesWithLowConversion.length} sales employee${salesWithLowConversion.length > 1 ? "s" : ""} ${salesWithLowConversion.length > 1 ? "have" : "has"} a low conversion rate despite handling enough leads. This signals a skill gap in closing.`,
      employees: salesWithLowConversion.map((e) => e.name),
      action: "Enroll in closing skills and objection-handling workshop. Review lost deals together. Pair with top closer for shadowing sessions.",
    });
  }

  // --- Attendance problems ---
  const attendanceIssues = employees.filter((e) => (e.attendanceScore ?? 0) < 75);
  if (attendanceIssues.length > 0) {
    recommendations.push({
      type: "warning",
      icon: "⏰",
      title: "Attendance & Commitment Issues",
      description: `${attendanceIssues.length} employee${attendanceIssues.length > 1 ? "s have" : " has"} attendance scores below 75%, which is directly affecting their overall KPI results.`,
      employees: attendanceIssues.map((e) => e.name),
      action: "Meet with each employee individually to understand root causes. Involve HR if patterns continue. Set clear attendance expectations in writing.",
    });
  }

  // --- Repeated team-wide problem: low achievement ---
  const lowAchievement = employees.filter((e) => (kpiMap[e.id]?.achievementPct ?? 0) < 70);
  if (lowAchievement.length >= Math.ceil(employees.length * 0.4)) {
    recommendations.push({
      type: "pattern",
      icon: "📉",
      title: "Team-Wide Target Achievement Problem",
      description: `More than 40% of the team is not meeting achievement targets. This may indicate targets are too aggressive, or there is a systemic issue (resources, market, tools).`,
      employees: lowAchievement.map((e) => e.name),
      action: "Review whether monthly targets are realistic. Assess if the team has the right tools and lead quality. Consider a team strategy session to realign goals.",
    });
  }

  // --- High performers ready to step up ---
  const readyForMore = employees.filter(
    (e) =>
      (kpiMap[e.id]?.performanceScore ?? 0) >= 80 &&
      (kpiMap[e.id]?.performanceScore ?? 0) < 90
  );
  if (readyForMore.length > 0) {
    recommendations.push({
      type: "growth",
      icon: "🚀",
      title: "Growth Opportunity — Near-Top Performers",
      description: `${readyForMore.length} employee${readyForMore.length > 1 ? "s are" : " is"} performing very well and with the right push could reach Excellent status next period.`,
      employees: readyForMore.map((e) => e.name),
      action: "Set stretch targets for next month. Offer advanced training or cross-department exposure. Regular encouragement goes a long way for this group.",
    });
  }

  // --- Revenue gap ---
  const revenueUnderperformers = employees.filter(
    (e) =>
      e.revenueTarget > 0 &&
      (kpiMap[e.id]?.revenueAchievementPct ?? 100) < 65
  );
  if (revenueUnderperformers.length > 0) {
    recommendations.push({
      type: "revenue",
      icon: "💰",
      title: "Revenue Gap — Below 65% of Target",
      description: `${revenueUnderperformers.length} employee${revenueUnderperformers.length > 1 ? "s are" : " is"} generating significantly less revenue than their target. Deal size or deal quality may be the issue.`,
      employees: revenueUnderperformers.map((e) => e.name),
      action: "Review their deal pipeline for quality. Are they pursuing the right size clients? Consider upselling training or adjusting their lead assignment to higher-value prospects.",
    });
  }

  // --- If everything is great ---
  if (recommendations.length === 0) {
    recommendations.push({
      type: "positive",
      icon: "✅",
      title: "Team Performance Looks Strong",
      description: "All team members are meeting or exceeding their KPI targets this period. Great work by the whole team!",
      employees: [],
      action: "Maintain current momentum. Set next quarter's targets slightly higher to continue growth. Celebrate the team's achievements in the next all-hands meeting.",
    });
  }

  return recommendations;
}
