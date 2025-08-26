
"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { ReportCharts } from "@/components/reports/report-charts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { initialParts, labs } from "@/lib/data";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import { Part } from "@/lib/types";

export default function ReportsPage() {
  const [parts] = useLocalStorageState<Part[]>("all-parts", initialParts);

  const handleExport = () => {
    const getLabName = (labId: string) => {
        return labs.find((lab) => lab.id === labId)?.name || "Unknown Lab";
    };

    const headers = ["Part ID", "Name", "Assigned Lab", "Status", "Repair Time", "Testing Time", "Repaired At"];
    const csvContent = [
      headers.join(","),
      ...parts.map(part => [
        part.id,
        `"${part.name.replace(/"/g, '""')}"`, // Handle quotes in names
        getLabName(part.labId),
        part.status,
        `${part.repairTime} hr`,
        `${part.testingTime} hr`,
        part.repairedAt.toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.href) {
        URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "parts_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <PageHeader title="Reports & Analytics" description="Analyze repair data and lab performance.">
        <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Reports
        </Button>
      </PageHeader>
      <ReportCharts parts={parts} />
    </>
  );
}
