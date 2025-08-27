
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Part, PartStatus, Lab } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type ReportPartsTableProps = {
  parts: Part[];
  labs: Lab[];
};

const getLabName = (labId: string, labs: Lab[]) => {
    return labs.find((lab) => lab.id === labId)?.name || "Unknown Lab";
};

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

export function ReportPartsTable({ parts, labs }: ReportPartsTableProps) {
  return (
    <Card className="col-span-1 xl:col-span-3">
        <CardHeader>
            <CardTitle>All Parts Data</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Part ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Lab Assigned</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Repair Time (h)</TableHead>
                    <TableHead>Repaired At</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {parts.length > 0 ? (
                    parts.map((part) => (
                    <TableRow key={part.id}>
                        <TableCell className="font-medium">{part.id}</TableCell>
                        <TableCell>{part.name}</TableCell>
                        <TableCell>{getLabName(part.labId, labs)}</TableCell>
                        <TableCell>{getStatusBadge(part.status)}</TableCell>
                        <TableCell>{part.repairTime}</TableCell>
                        <TableCell>{part.repairedAt.toLocaleDateString()}</TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                        No parts data available.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
      </CardContent>
    </Card>
  );
}
