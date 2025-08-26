
"use client";

import { PageHeader } from "@/components/page-header";
import { ReportCharts } from "@/components/reports/report-charts";
import { initialParts } from "@/lib/data";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import type { Part } from "@/lib/types";
import { useEffect, useState } from "react";

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
      />
      <ReportCharts parts={parts} />
    </>
  );
}
