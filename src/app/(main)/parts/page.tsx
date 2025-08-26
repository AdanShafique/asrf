
"use client";

import * as React from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Zap } from "lucide-react";
import { PartsTable } from "@/components/parts/parts-table";
import { parts as initialParts, labs } from "@/lib/data";
import { AddPartDialog } from "@/components/parts/add-part-dialog";
import type { Part, PartStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const getLabPrefix = (labId: string) => {
    switch (labId) {
        case "turret-elec": return "TE";
        case "hull-lab-1": return "HL1";
        case "hull-lab-2": return "HL2";
        case "gcs-lab": return "GCS";
        case "elec-harness-lab": return "EHL";
        default: return "P";
    }
};

const getRandomStatus = (): PartStatus => {
  const statuses: PartStatus[] = ["Repaired", "Under Testing", "Defective"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export default function PartsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [parts, setParts] = React.useState<Part[]>(initialParts);
  const { toast } = useToast();

  const handleAddPart = (newPartData: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>) => {
    const labPrefix = getLabPrefix(newPartData.labId);
    const partsInLab = parts.filter(p => p.labId === newPartData.labId);
    const newPartNumber = (partsInLab.length + 1).toString().padStart(3, '0');
    
    const newPart: Part = {
        ...newPartData,
        id: `${labPrefix}-${newPartNumber}`,
        status: 'Under Testing',
        repairTime: 0,
        testingTime: 0,
        repairedAt: new Date(),
    };
    setParts(prevParts => [newPart, ...prevParts]);
    setIsAddDialogOpen(false);
    toast({
        title: "Part Added",
        description: `Part ${newPart.name} has been successfully added with ID ${newPart.id}.`,
    });
  };

  const handleSimulateStatusChanges = () => {
    setParts(currentParts => {
        // Randomly update status for a few parts
        const updatedParts = [...currentParts];
        const partsToUpdateCount = Math.min(5, updatedParts.length);

        for (let i = 0; i < partsToUpdateCount; i++) {
            const randomIndex = Math.floor(Math.random() * updatedParts.length);
            updatedParts[randomIndex] = {
                ...updatedParts[randomIndex],
                status: getRandomStatus(),
                repairedAt: new Date(), // Update the date to reflect the change
            };
        }
        return updatedParts;
    });

    toast({
        title: "Simulation Complete",
        description: "Part statuses have been updated automatically.",
    });
  };


  return (
    <>
      <PageHeader title="Parts Management" description="View, add, and manage all TU-85 parts.">
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleSimulateStatusChanges}>
                <Zap className="mr-2 h-4 w-4" />
                Simulate Status Changes
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Part
            </Button>
        </div>
      </PageHeader>
      <PartsTable parts={parts} labs={labs} onAddPart={handleAddPart} setParts={setParts} />
      <AddPartDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        labs={labs}
        onAdd={handleAddPart}
      />
    </>
  );
}
