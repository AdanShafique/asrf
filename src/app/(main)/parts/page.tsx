"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PartsTable } from "@/components/parts/parts-table";
import { parts as initialParts, labs } from "@/lib/data";
import { AddPartDialog } from "@/components/parts/add-part-dialog";
import type { Part } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function PartsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [parts, setParts] = React.useState<Part[]>(initialParts);
  const { toast } = useToast();

  const handleAddPart = (newPartData: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>) => {
    const newPart: Part = {
        ...newPartData,
        id: `P${(parts.length + 1).toString().padStart(4, '0')}`,
        status: 'Under Testing',
        repairTime: 0,
        testingTime: 0,
        repairedAt: new Date(),
    };
    setParts(prevParts => [newPart, ...prevParts]);
    setIsAddDialogOpen(false);
    toast({
        title: "Part Added",
        description: `Part ${newPart.name} has been successfully added.`,
    });
  };

  return (
    <>
      <PageHeader title="Parts Management" description="View, add, and manage all TU-85 parts.">
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Part
        </Button>
      </PageHeader>
      <PartsTable parts={parts} labs={labs} onAddPart={handleAddPart} />
      <AddPartDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        labs={labs}
        onAdd={handleAddPart}
      />
    </>
  );
}
