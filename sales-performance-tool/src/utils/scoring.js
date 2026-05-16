export function evaluateSalesperson(person) {
  const {
    leadsReceived,
    leadsContacted,
    followUpsCompleted,
    meetingsBooked,
    dealsClosed,
    crmUpdated,
    responseTime,
  } = person;

  // Rates (capped at 100%)
  const contactRate = leadsReceived > 0 ? Math.min((leadsContacted / leadsReceived) * 100, 100) : 0;
  const followUpRate = leadsContacted > 0 ? Math.min((followUpsCompleted / leadsContacted) * 100, 100) : 0;
  const meetingRate = leadsContacted > 0 ? Math.min((meetingsBooked / leadsContacted) * 100, 100) : 0;
  const closingRate = meetingsBooked > 0 ? Math.min((dealsClosed / meetingsBooked) * 100, 100) : 0;

  // Weighted scoring
  const contactScore = (contactRate / 100) * 20;       // 20 pts
  const followUpScore = (followUpRate / 100) * 20;      // 20 pts
  const meetingScore = (meetingRate / 100) * 15;        // 15 pts
  const closingScore = (closingRate / 100) * 25;        // 25 pts
  const crmScore = crmUpdated ? 10 : 0;                 // 10 pts
  const responseScore =
    responseTime === "Fast" ? 10 : responseTime === "Average" ? 6 : 2; // 10 pts

  const totalScore = Math.round(
    contactScore + followUpScore + meetingScore + closingScore + crmScore + responseScore
  );

  // Category
  let category, categoryColor;
  if (totalScore >= 85) {
    category = "Excellent";
    categoryColor = "#10b981";
  } else if (totalScore >= 70) {
    category = "Good";
    categoryColor = "#3b82f6";
  } else if (totalScore >= 50) {
    category = "Needs Improvement";
    categoryColor = "#f59e0b";
  } else {
    category = "Poor Performance";
    categoryColor = "#ef4444";
  }

  // Strengths
  const strengths = [];
  if (contactRate >= 90) strengths.push("Excellent lead contact rate");
  if (followUpRate >= 85) strengths.push("Strong follow-up discipline");
  if (meetingRate >= 35) strengths.push("High meeting conversion from leads");
  if (closingRate >= 50) strengths.push("Strong closing ability");
  if (crmUpdated) strengths.push("Consistent CRM hygiene");
  if (responseTime === "Fast") strengths.push("Fast response time to leads");
  if (dealsClosed >= 7) strengths.push("High volume of closed deals");

  // Weaknesses
  const weaknesses = [];
  if (contactRate < 75) weaknesses.push("Low lead contact rate");
  if (followUpRate < 70) weaknesses.push("Insufficient follow-up activity");
  if (meetingRate < 25) weaknesses.push("Low meeting booking rate");
  if (closingRate < 35) weaknesses.push("Below-average closing rate");
  if (!crmUpdated) weaknesses.push("CRM not consistently updated");
  if (responseTime === "Slow") weaknesses.push("Slow response time to leads");

  // Recommendation
  let recommendation;
  if (totalScore >= 85) {
    recommendation = "Maintain current performance. Consider as a mentor for junior team members.";
  } else if (totalScore >= 70) {
    recommendation = "Solid contributor. Focus on closing rate and pipeline discipline to reach top tier.";
  } else if (totalScore >= 50) {
    recommendation = "Performance requires structured coaching. Set bi-weekly check-ins and KPI targets.";
  } else {
    recommendation = "Immediate intervention required. Assign a performance improvement plan (PIP) with 30-day milestones.";
  }

  // Action plan
  const actionPlan = [];
  if (contactRate < 75) actionPlan.push("Increase daily outreach calls — target contacting 90%+ of assigned leads within 24h.");
  if (followUpRate < 70) actionPlan.push("Implement a structured follow-up cadence: Day 1, Day 3, Day 7 touchpoints.");
  if (meetingRate < 25) actionPlan.push("Practice discovery call scripts and objection handling to boost meetings booked.");
  if (closingRate < 35) actionPlan.push("Attend closing technique training; review lost deals weekly with team lead.");
  if (!crmUpdated) actionPlan.push("Log all activities in CRM daily before end-of-day. Make it a non-negotiable habit.");
  if (responseTime === "Slow") actionPlan.push("Set response SLA: all new leads to be contacted within 2 hours of assignment.");
  if (actionPlan.length === 0) actionPlan.push("Keep up the excellent work. Set stretch targets for next quarter.");

  return {
    totalScore,
    category,
    categoryColor,
    contactRate: Math.round(contactRate),
    followUpRate: Math.round(followUpRate),
    meetingRate: Math.round(meetingRate),
    closingRate: Math.round(closingRate),
    strengths,
    weaknesses,
    recommendation,
    actionPlan,
    scoreBreakdown: {
      contact: Math.round(contactScore),
      followUp: Math.round(followUpScore),
      meeting: Math.round(meetingScore),
      closing: Math.round(closingScore),
      crm: crmScore,
      response: responseScore,
    },
  };
}

export function buildTeamSummary(people, evaluations) {
  if (people.length === 0) return null;

  const scores = evaluations.map((e) => e.totalScore);
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const maxIdx = scores.indexOf(Math.max(...scores));
  const minIdx = scores.indexOf(Math.min(...scores));

  return {
    bestPerformer: people[maxIdx].name,
    bestScore: scores[maxIdx],
    lowestPerformer: people[minIdx].name,
    lowestScore: scores[minIdx],
    totalLeads: people.reduce((s, p) => s + p.leadsReceived, 0),
    totalMeetings: people.reduce((s, p) => s + p.meetingsBooked, 0),
    totalDeals: people.reduce((s, p) => s + p.dealsClosed, 0),
    totalRevenue: people.reduce((s, p) => s + p.totalSalesValue, 0),
    avgScore,
    teamSize: people.length,
  };
}
