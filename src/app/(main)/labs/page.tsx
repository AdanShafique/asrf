import { PageHeader } from "@/components/page-header";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { labs, parts } from "@/lib/data";
import { Wrench, Clock, FlaskConical } from "lucide-react";

export default function LabsPage() {
  const labStats = labs.map((lab) => {
    const labParts = parts.filter((part) => part.labId === lab.id);
    const totalRepaired = labParts.filter(p => p.status === 'Repaired' || p.status === 'Under Testing').length;
    const currentWorkload = labParts.filter(p => p.status === 'Under Testing').length;
    const totalRepairTime = labParts.reduce((sum, part) => sum + part.repairTime, 0);
    const averageRepairTime = totalRepaired > 0 ? (totalRepairTime / totalRepaired).toFixed(1) : 0;

    return {
      ...lab,
      totalRepaired,
      currentWorkload,
      averageRepairTime,
    };
  });

  return (
    <>
      <PageHeader title="Lab Management" description="Overview of all repair and testing facilities." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labStats.map((lab) => (
          <Card key={lab.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{lab.name}</CardTitle>
                <FlaskConical className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                   <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="text-2xl font-bold">{lab.totalRepaired}</p>
                    <p className="text-sm text-muted-foreground">Parts Repaired</p>
                </div>
              </div>
               <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                   <Clock className="h-6 w-6 text-secondary" />
                </div>
                <div>
                    <p className="text-2xl font-bold">{lab.averageRepairTime} <span className="text-sm font-normal text-muted-foreground">hrs</span></p>
                    <p className="text-sm text-muted-foreground">Avg. Repair Time</p>
                </div>
              </div>
               <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                   <FlaskConical className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <p className="text-2xl font-bold">{lab.currentWorkload}</p>
                    <p className="text-sm text-muted-foreground">Current Workload</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
