
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
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Eye, Pencil, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Part, PartStatus, Lab } from "@/lib/types";
import { DeletePartDialog } from "./delete-part-dialog";
import { PartDetailsDialog } from "./part-details-dialog";
import { EditPartDialog } from "./edit-part-dialog";
import { useToast } from "@/hooks/use-toast";

type PartsTableProps = {
  parts: Part[];
  labs: Lab[];
  onAddPart: (part: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>) => void;
  setParts: React.Dispatch<React.SetStateAction<Part[]>>;
};

const ITEMS_PER_PAGE = 19;

export function PartsTable({ parts, labs, setParts }: PartsTableProps) {
  const [filter, setFilter] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Part; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [partToDelete, setPartToDelete] = React.useState<Part | null>(null);
  const [partToView, setPartToView] = React.useState<Part | null>(null);
  const [partToEdit, setPartToEdit] = React.useState<Part | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const { toast } = useToast();
  
  const getLabName = (labId: string) => {
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
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue instanceof Date && bValue instanceof Date) {
            return sortConfig.direction === 'ascending' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
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
      getLabName(part.labId).toLowerCase().includes(filter.toLowerCase()) ||
      part.status.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredParts.length / ITEMS_PER_PAGE);
  const paginatedParts = filteredParts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handleStatusChange = (partId: string, newStatus: PartStatus) => {
    setParts(currentParts => currentParts.map(p => p.id === partId ? { ...p, status: newStatus, repairedAt: new Date() } : p));
  };

  const handleDelete = (partId: string) => {
    setParts(currentParts => currentParts.filter(p => p.id !== partId));
    setIsDeleteAlertOpen(false);
    setPartToDelete(null);
  };
  
  const openDeleteDialog = (part: Part) => {
    setPartToDelete(part);
    setIsDeleteAlertOpen(true);
  };
  
  const openDetailsDialog = (part: Part) => {
    setPartToView(part);
    setIsDetailsDialogOpen(true);
  };

  const openEditDialog = (part: Part) => {
    setPartToEdit(part);
    setIsEditDialogOpen(true);
  };

  const handleEdit = (updatedPart: Part) => {
    setParts(currentParts => currentParts.map(p => p.id === updatedPart.id ? updatedPart : p));
    setIsEditDialogOpen(false);
    setPartToEdit(null);
    toast({
        title: "Part Updated",
        description: `Part ${updatedPart.id} has been successfully updated.`,
    })
  };

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter parts by ID, name, lab, or status..."
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setCurrentPage(1); // Reset to first page on new filter
          }}
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
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('repairedAt')}>
                  Repaired At
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedParts.length > 0 ? (
              paginatedParts.map((part) => (
                <TableRow key={part.id}>
                  <TableCell className="font-medium">{part.id}</TableCell>
                  <TableCell>{part.name}</TableCell>
                  <TableCell>{getLabName(part.labId)}</TableCell>
                  <TableCell>{getStatusBadge(part.status)}</TableCell>
                  <TableCell>{part.repairedAt.toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onSelect={() => openDetailsDialog(part)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => openEditDialog(part)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                           <DropdownMenuSubTrigger>
                                Change Status
                           </DropdownMenuSubTrigger>
                           <DropdownMenuSubContent>
                               <DropdownMenuItem onClick={() => handleStatusChange(part.id, 'Repaired')}>
                                   <CheckCircle className="mr-2 h-4 w-4 text-accent"/> Repaired
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleStatusChange(part.id, 'Under Testing')}>
                                   <Clock className="mr-2 h-4 w-4 text-secondary"/> Under Testing
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleStatusChange(part.id, 'Defective')}>
                                   <AlertCircle className="mr-2 h-4 w-4 text-destructive"/> Defective
                               </DropdownMenuItem>
                           </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => openDeleteDialog(part)} className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min(paginatedParts.length, ITEMS_PER_PAGE * currentPage)} of {filteredParts.length} parts.
        </div>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>
      {partToDelete && (
        <DeletePartDialog
          isOpen={isDeleteAlertOpen}
          setIsOpen={setIsDeleteAlertOpen}
          part={partToDelete}
          onDelete={handleDelete}
        />
      )}
      {partToView && (
        <PartDetailsDialog
            isOpen={isDetailsDialogOpen}
            setIsOpen={setIsDetailsDialogOpen}
            part={partToView}
            labName={getLabName(partToView.labId)}
        />
      )}
      {partToEdit && (
        <EditPartDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
            part={partToEdit}
            labs={labs}
            onSave={handleEdit}
        />
      )}
    </>
  );
}
