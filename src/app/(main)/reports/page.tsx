import { PageHeader } from "@/components/page-header";
import { ReportCharts } from "@/components/reports/report-charts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports & Analytics" description="Analyze repair data and lab performance.">
        <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
        </Button>
      </PageHeader>
      <ReportCharts />
    </>
  );
}
