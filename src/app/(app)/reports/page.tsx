
"use client";

import { PageHeader } from "@/components/page-header";
import { ReportCharts } from "@/components/reports/report-charts";
import { initialParts, labs } from "@/lib/data";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import type { Part } from "@/lib/types";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ReportPartsTable } from "@/components/reports/report-parts-table";

export default function ReportsPage() {
  const [parts] = useLocalStorageState<Part[]>("parts", initialParts);
  const [isClient, setIsClient] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleDownload = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);

    try {
        // Temporarily increase width for better capture
        reportRef.current.style.width = '1200px';
        
        const canvas = await html2canvas(reportRef.current, {
            scale: 2, 
            useCORS: true,
            backgroundColor: null, 
        });

        // Revert width style
        reportRef.current.style.width = '';

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(canvas.toDataURL("image/png", 1.0), "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("ASRF-Report.pdf");

    } catch (error) {
        console.error("Error generating PDF:", error);
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
                    Download Report
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
