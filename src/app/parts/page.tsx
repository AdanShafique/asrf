"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { PlusCircle } from "lucide-react";
import { initialParts, labs } from "@/lib/data";
import { PartsTable } from "@/components/parts/parts-table";
import { AddPartDialog } from "@/components/parts/add-part-dialog";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import type { Part } from "@/lib/types";

export default function PartsPage() {
  const [parts, setParts] = useLocalStorageState<Part[]>("parts", initialParts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddPart = (part: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>) => {
    const newPart: Part = {
        ...part,
        id: `TE-${Math.floor(Math.random() * 1000)}`, // temporary id
        status: "Under Testing",
        repairedAt: new Date(),
        repairTime: 0,
        testingTime: 0,
    };
    setParts(currentParts => [...currentParts, newPart]);
    setIsAddDialogOpen(false);
  };

  return (
    <>
      <PageHeader 
        title="Parts Management"
        description="Track, edit, and manage all T-85 parts in the repair cycle."
      >
        <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Part
        </Button>
      </PageHeader>
      
      <PartsTable parts={parts} labs={labs} setParts={setParts} onAddPart={handleAddPart} />

      <AddPartDialog 
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        labs={labs}
        onAdd={handleAddPart}
      />
    </>
  );
}
