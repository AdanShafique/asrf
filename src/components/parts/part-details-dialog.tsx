"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Part, PartStatus } from "@/lib/types";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

interface PartDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  part: Part;
  labName: string;
}

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

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-center py-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}</span>
    </div>
)

export function PartDetailsDialog({ isOpen, setIsOpen, part, labName }: PartDetailsDialogProps) {
  if (!part) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Part Details</DialogTitle>
          <DialogDescription>
            Detailed information for part ID: {part.id}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
            <DetailRow label="Part Name" value={part.name} />
            <Separator />
            <DetailRow label="Assigned Lab" value={labName} />
            <Separator />
            <DetailRow label="Status" value={getStatusBadge(part.status)} />
            <Separator />
            <DetailRow label="Repair Time" value={`${part.repairTime} hours`} />
            <Separator />
            <DetailRow label="Testing Time" value={`${part.testingTime} hours`} />
            <Separator />
            <DetailRow label="Repaired At" value={part.repairedAt.toLocaleDateString()} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
