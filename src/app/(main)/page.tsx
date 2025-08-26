import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/page-header";
import { parts, labs } from "@/lib/data";
import { Package, Wrench, CircleAlert, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { PartStatus } from "@/lib/types";

export default function DashboardPage() {
  const totalParts = parts.length;
  const repairedParts = parts.filter(p => p.status === "Functional").length;
  const underTesting = parts.filter(p => p.status === "Under Testing").length;
  const defectiveParts = parts.filter(p => p.status === "Defective").length;

  const recentParts = [...parts]
    .sort((a, b) => b.repairedAt.getTime() - a.repairedAt.getTime())
    .slice(0, 5);

  const getStatusBadge = (status: PartStatus) => {
    switch (status) {
      case "Functional":
        return <Badge className="bg-accent hover:bg-accent/80 text-accent-foreground">Functional</Badge>;
      case "Under Testing":
        return <Badge variant="secondary">Under Testing</Badge>;
      case "Defective":
        return <Badge variant="destructive">Defective</Badge>;
    }
  };
  
  const getLabName = (labId: string) => {
    return labs.find(lab => lab.id === labId)?.name || 'Unknown Lab';
  };


  return (
    <>
      <PageHeader title="Dashboard" description="Overview of TU-85 parts repair and testing status." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Parts" value={totalParts} icon={<Package />} />
        <StatCard title="Repaired Parts" value={repairedParts} icon={<CheckCircle2 />} colorClassName="text-accent"/>
        <StatCard title="Under Testing" value={underTesting} icon={<Wrench />} colorClassName="text-secondary"/>
        <StatCard title="Defective Parts" value={defectiveParts} icon={<CircleAlert />} colorClassName="text-destructive"/>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recently Updated Parts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Lab Assigned</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentParts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-medium">{part.id}</TableCell>
                    <TableCell>{part.name}</TableCell>
                    <TableCell>{getLabName(part.labId)}</TableCell>
                    <TableCell>{getStatusBadge(part.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
