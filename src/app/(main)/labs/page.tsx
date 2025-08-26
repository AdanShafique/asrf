import { PageHeader } from "@/components/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { labs, parts } from "@/lib/data";
import { Wrench, Clock, FlaskConical, Package, CheckCircle2 } from "lucide-react";

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
            <CardContent className="grid grid-cols-2 gap-4 flex-grow">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                   <Package className="h-8 w-8 text-muted-foreground mb-2" />
                   <p className="text-2xl font-bold">{lab.totalParts}</p>
                   <p className="text-sm text-center text-muted-foreground">Total Parts</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                   <CheckCircle2 className="h-8 w-8 text-accent mb-2" />
                   <p className="text-2xl font-bold">{lab.repairedParts}</p>
                   <p className="text-sm text-center text-muted-foreground">Repaired</p>
                </div>
                 <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                   <Wrench className="h-8 w-8 text-secondary mb-2" />
                   <p className="text-2xl font-bold">{lab.currentWorkload}</p>
                   <p className="text-sm text-center text-muted-foreground">In Testing</p>
                </div>
                 <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                   <Clock className="h-8 w-8 text-blue-500 mb-2" />
                   <p className="text-2xl font-bold">{lab.averageRepairTime}<span className="text-base font-normal text-muted-foreground">h</span></p>
                   <p className="text-sm text-center text-muted-foreground">Avg. Time</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
