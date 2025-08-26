import { PageHeader } from "@/components/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { labs, parts } from "@/lib/data";
import { Wrench, Clock, FlaskConical, Package, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function LabsPage() {
  const labStats = labs.map((lab) => {
    const labParts = parts.filter((part) => part.labId === lab.id);
    const totalParts = labParts.length;
    const repairedParts = labParts.filter(p => p.status === 'Repaired').length;
    const currentWorkload = labParts.filter(p => p.status === 'Under Testing').length;
    const totalRepairTime = labParts.reduce((sum, part) => sum + part.repairTime, 0);
    const averageRepairTime = repairedParts > 0 ? (totalRepairTime / repairedParts).toFixed(1) : 0;

    return {
      ...lab,
      totalParts,
      repairedParts,
      currentWorkload,
      averageRepairTime,
    };
  });

  return (
    <>
      <PageHeader title="Lab Management" description="Overview of all repair and testing facilities." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labStats.map((lab) => (
          <Card key={lab.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{lab.name}</CardTitle>
                <FlaskConical className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="h-6 w-6 text-muted-foreground" />
                    <span className="text-muted-foreground">Total Parts</span>
                  </div>
                  <span className="font-bold text-lg">{lab.totalParts}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent" />
                    <span className="text-muted-foreground">Repaired</span>
                  </div>
                  <span className="font-bold text-lg">{lab.repairedParts}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wrench className="h-6 w-6 text-secondary" />
                    <span className="text-muted-foreground">In Testing</span>
                  </div>
                  <span className="font-bold text-lg">{lab.currentWorkload}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <span className="text-muted-foreground">Avg. Repair Time</span>
                  </div>
                  <span className="font-bold text-lg">{lab.averageRepairTime}<span className="text-sm font-normal text-muted-foreground">h</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
