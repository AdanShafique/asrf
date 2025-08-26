"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Part, PartStatus, Lab } from "@/lib/types";

type PartsTableProps = {
  parts: Part[];
  labs: Lab[];
};

export function PartsTable({ parts: initialParts, labs }: PartsTableProps) {
  const [parts, setParts] = React.useState(initialParts);
  const [filter, setFilter] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Part; direction: string } | null>(null);

  const getLabName = (labId: string) => {
    return labs.find((lab) => lab.id === labId)?.name || "Unknown Lab";
  };
  
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

  const requestSort = (key: keyof Part) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedParts = React.useMemo(() => {
    let sortableParts = [...parts];
    if (sortConfig !== null) {
      sortableParts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableParts;
  }, [parts, sortConfig]);

  const filteredParts = sortedParts.filter(
    (part) =>
      part.id.toLowerCase().includes(filter.toLowerCase()) ||
      part.name.toLowerCase().includes(filter.toLowerCase()) ||
      getLabName(part.labId).toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter parts by ID, name, or lab..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('id')}>
                  Part ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('name')}>
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Lab Assigned</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Repair Time (h)</TableHead>
              <TableHead className="text-right">Testing Time (h)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell className="font-medium">{part.id}</TableCell>
                  <TableCell>{part.name}</TableCell>
                  <TableCell>{getLabName(part.labId)}</TableCell>
                  <TableCell>{getStatusBadge(part.status)}</TableCell>
                  <TableCell className="text-right">{part.repairTime}</TableCell>
                  <TableCell className="text-right">{part.testingTime}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
