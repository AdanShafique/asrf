
"use client";

import { PageHeader } from "@/components/page-header";
import { ReportCharts } from "@/components/reports/report-charts";
import { initialParts } from "@/lib/data";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import type { Part } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  const [parts] = useLocalStorageState<Part[]>("parts", initialParts);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        description="Visualize repair data and lab performance."
      >
        <Button onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
        </Button>
      </PageHeader>
      <div id="report-content">
        <ReportCharts parts={parts} />
      </div>
    </>
  );
}
