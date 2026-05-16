import { calculateKPIs } from "./kpiCalculations";

export function exportToCSV(employees) {
  const headers = [
    "Name", "Job Title", "Department", "Period",
    "Monthly Target", "Actual Achievement", "Achievement %",
    "Leads Handled", "Closed Deals", "Conversion Rate %",
    "Revenue Target", "Revenue Generated", "Revenue Achievement %",
    "Attendance Score", "Performance Score", "KPI Rating", "Notes",
  ];

  const rows = employees.map((e) => {
    const k = calculateKPIs(e);
    return [
      e.name, e.jobTitle, e.department, e.period,
      e.monthlyTarget, e.actualAchievement, k.achievementPct,
      e.leadsHandled, e.closedDeals, k.conversionRate,
      e.revenueTarget, e.revenueGenerated,
      k.revenueAchievementPct !== null ? k.revenueAchievementPct : "N/A",
      e.attendanceScore, k.performanceScore, k.rating,
      e.notes || "",
    ];
  });

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  downloadFile(
    new Blob([csvContent], { type: "text/csv;charset=utf-8;" }),
    `KPI_Report_${new Date().toISOString().slice(0, 10)}.csv`
  );
}

export function exportToExcel(employees) {
  import("xlsx").then((XLSX) => {
    const data = employees.map((e) => {
      const k = calculateKPIs(e);
      return {
        Name: e.name,
        "Job Title": e.jobTitle,
        Department: e.department,
        Period: e.period,
        "Monthly Target": e.monthlyTarget,
        "Actual Achievement": e.actualAchievement,
        "Achievement %": k.achievementPct,
        "Leads Handled": e.leadsHandled,
        "Closed Deals": e.closedDeals,
        "Conversion Rate %": k.conversionRate,
        "Revenue Target": e.revenueTarget,
        "Revenue Generated": e.revenueGenerated,
        "Revenue Achievement %": k.revenueAchievementPct ?? "N/A",
        "Attendance Score": e.attendanceScore,
        "Performance Score": k.performanceScore,
        "KPI Rating": k.rating,
        Notes: e.notes || "",
        "Manager Notes": e.managerNotes || "",
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "KPI Report");
    XLSX.writeFile(wb, `KPI_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  });
}

export function exportToPDF(employees) {
  import("jspdf").then(({ default: jsPDF }) => {
    import("jspdf-autotable").then(() => {
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

      // Header
      doc.setFillColor(30, 64, 175);
      doc.rect(0, 0, 297, 20, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("KPI Performance Dashboard Report", 14, 13);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 220, 13);

      // Summary row
      const totalRevenue = employees.reduce((s, e) => s + (e.revenueGenerated || 0), 0);
      const totalDeals = employees.reduce((s, e) => s + (e.closedDeals || 0), 0);
      const scores = employees.map((e) => calculateKPIs(e).performanceScore);
      const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

      doc.setTextColor(30, 64, 175);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`Total Employees: ${employees.length}`, 14, 28);
      doc.text(`Average Score: ${avgScore}%`, 70, 28);
      doc.text(`Total Revenue: $${totalRevenue.toLocaleString()}`, 126, 28);
      doc.text(`Total Deals: ${totalDeals}`, 200, 28);

      // Table
      const tableData = employees.map((e) => {
        const k = calculateKPIs(e);
        return [
          e.name,
          e.department,
          e.period,
          `${e.actualAchievement}/${e.monthlyTarget}`,
          `${k.achievementPct}%`,
          `${e.closedDeals}/${e.leadsHandled}`,
          `${k.conversionRate}%`,
          `$${(e.revenueGenerated || 0).toLocaleString()}`,
          `${e.attendanceScore}%`,
          `${k.performanceScore}%`,
          k.rating,
        ];
      });

      doc.autoTable({
        startY: 33,
        head: [["Name", "Dept", "Period", "Achievement", "Ach%", "Deals/Leads", "Conv%", "Revenue", "Attend%", "Score", "Rating"]],
        body: tableData,
        headStyles: { fillColor: [30, 64, 175], textColor: 255, fontStyle: "bold", fontSize: 8 },
        bodyStyles: { fontSize: 8, textColor: [30, 41, 59] },
        alternateRowStyles: { fillColor: [239, 246, 255] },
        columnStyles: {
          10: {
            fontStyle: "bold",
            cellWidth: 28,
          },
        },
        didDrawCell: (data) => {
          if (data.column.index === 10 && data.section === "body") {
            const rating = data.cell.text[0];
            let color;
            if (rating === "Excellent") color = [5, 150, 105];
            else if (rating === "Very Good") color = [37, 99, 235];
            else if (rating === "Good") color = [124, 58, 237];
            else if (rating === "Needs Improvement") color = [217, 119, 6];
            else color = [220, 38, 38];
            if (color) doc.setTextColor(...color);
          }
        },
        didParseCell: (data) => {
          if (data.column.index === 10 && data.section === "body") {
            data.cell.styles.textColor = [0, 0, 0];
          }
        },
      });

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text("KPI Performance Dashboard — Confidential", 14, 205);
        doc.text(`Page ${i} of ${pageCount}`, 270, 205);
      }

      doc.save(`KPI_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    });
  });
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
