

"use client";

import * as React from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/page-header";
import { initialParts, labs } from "@/lib/data";
import { Package, Wrench, CircleAlert, CheckCircle2, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Part, PartStatus } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";

export default function DashboardPage() {
  const [filter, setFilter] = React.useState("");
  const [parts] = useLocalStorageState<Part[]>("all-parts", initialParts);

  const totalParts = parts.length;
  const repairedParts = parts.filter(p => p.status === "Repaired").length;
  const underTesting = parts.filter(p => p.status === "Under Testing").length;
  const defectiveParts = parts.filter(p => p.status === "Defective").length;

  const getStatusBadge = (status: PartStatus) => {
    switch (status) {
      case "Repaired":
        return <Badge className="bg-accent hover:bg-accent/80 text-accent-foreground">Repaired</Badge>;
      case "Under Testing":
        return <Badge variant="secondary">Under Testing</Badge>;
      case "Defective":
        return <Badge variant="destructive">Defective</Badge>;
    }
  };
  
  const getLabName = (labId: string) => {
    return labs.find(lab => lab.id === labId)?.name || 'Unknown Lab';
  };

  const filteredRecentParts = React.useMemo(() => {
    const filtered = parts.filter(
      (part) =>
        part.id.toLowerCase().includes(filter.toLowerCase()) ||
        part.name.toLowerCase().includes(filter.toLowerCase()) ||
        getLabName(part.labId).toLowerCase().includes(filter.toLowerCase())
    );

    return filtered
      .sort((a, b) => b.repairedAt.getTime() - a.repairedAt.getTime())
      .slice(0, 5);
  }, [filter, parts]);

  return (
    <>
      <PageHeader title="Dashboard" description="Overview of T-85 parts repair and testing status." />
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
            <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search recent parts by ID, name, or lab..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="pl-10 max-w-sm"
                />
            </div>
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
                {filteredRecentParts.length > 0 ? filteredRecentParts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-medium">{part.id}</TableCell>
                    <TableCell>{part.name}</TableCell>
                    <TableCell>{getLabName(part.labId)}</TableCell>
                    <TableCell>{getStatusBadge(part.status)}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No matching parts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
