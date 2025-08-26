
"use client";

import * as React from "react";
import { useParams, notFound } from 'next/navigation';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { PartsTable } from "@/components/parts/parts-table";
import { initialParts, labs } from "@/lib/data";
import { AddPartDialog } from "@/components/parts/add-part-dialog";
import type { Part } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";

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

export default function LabPartsPage() {
  const params = useParams();
  const labId = params.labId as string;
  const [allParts, setAllParts] = useLocalStorageState<Part[]>("all-parts", initialParts);

  const lab = labs.find(l => l.id === labId);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const labParts = React.useMemo(() => {
    return allParts.filter(p => p.labId === labId);
  }, [allParts, labId]);

  if (!lab) {
    notFound();
  }
  
  const handleAddPart = (newPartData: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>) => {
    const labPrefix = getLabPrefix(newPartData.labId);
    const partsInLab = allParts.filter(p => p.labId === newPartData.labId);
    const newPartNumber = (partsInLab.length + 1).toString().padStart(3, '0');
    
    const newPart: Part = {
        ...newPartData,
        id: `${labPrefix}-${newPartNumber}`,
        status: 'Under Testing',
        repairTime: 0,
        testingTime: 0,
        repairedAt: new Date(),
    };
    
    setAllParts(prev => [newPart, ...prev]);
    
    setIsAddDialogOpen(false);
    toast({
        title: "Part Added",
        description: `Part ${newPart.name} has been successfully added with ID ${newPart.id}.`,
    });
  };

  return (
    <>
      <PageHeader title={`${lab.name} - Parts`} description={`View, add, and manage parts for the ${lab.name}.`}>
        <div className="flex gap-2">
            <Link href="/labs" passHref>
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Labs
                </Button>
            </Link>
            <Button onClick={() => setIsAddDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Part
            </Button>
        </div>
      </PageHeader>
      <PartsTable parts={labParts} labs={[lab]} onAddPart={handleAddPart} setParts={setAllParts} />
      <AddPartDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        labs={[lab]}
        onAdd={handleAddPart}
      />
    </>
  );
}
