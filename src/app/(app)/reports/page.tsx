
"use client";

import { PageHeader } from "@/components/page-header";
import { ReportCharts } from "@/components/reports/report-charts";
import { initialParts, labs } from "@/lib/data";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import type { Part, Lab } from "@/lib/types";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader } from "lucide-react";
import { ReportPartsTable } from "@/components/reports/report-parts-table";

export default function ReportsPage() {
  const [parts] = useLocalStorageState<Part[]>("parts", initialParts);
  const [isClient, setIsClient] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const getLabName = (labId: string, labsList: Lab[]) => {
    return labsList.find((lab) => lab.id === labId)?.name || "Unknown Lab";
  };
  
  const handleDownload = () => {
    if (!parts.length) return;
    setIsDownloading(true);

    try {
        const headers = ["Part ID", "Name", "Lab Assigned", "Status", "Repair Time (h)", "Repaired At"];
        const csvContent = [
            headers.join(","),
            ...parts.map(part => [
                part.id,
                `"${part.name.replace(/"/g, '""')}"`, // Handle quotes in names
                getLabName(part.labId, labs),
                part.status,
                part.repairTime,
                part.repairedAt.toLocaleDateString()
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.href) {
            URL.revokeObjectURL(link.href);
        }
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "ASRF-Parts-Report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error("Error generating CSV:", error);
    } finally {
        setIsDownloading(false);
    }
  };


  if (!isClient) {
    return null;
  }
  
  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        description="Visualize repair data and lab performance."
      >
        <Button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? (
                <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                </>
            ) : (
                <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report (CSV)
                </>
            )}
        </Button>
      </PageHeader>
      <div id="report-content" ref={reportRef} className="space-y-8">
        <ReportCharts parts={parts} />
        <ReportPartsTable parts={parts} labs={labs} />
      </div>
    </>
  );
}
