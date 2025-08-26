
"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { initialParts, labs } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { PartsTable } from "@/components/parts/parts-table";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import type { Part } from "@/lib/types";
import { BackButton } from "@/components/back-button";

export default function LabDetailPage() {
  const params = useParams();
  const labId = params.labId as string;

  const [allParts, setAllParts] = useLocalStorageState<Part[]>("parts", initialParts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const lab = labs.find((l) => l.id === labId);

  if (!lab) {
    notFound();
  }

  if (!isClient) {
    return null;
  }
  
  const partsInLab = allParts.filter((p) => p.labId === labId);

  const handleAddPart = (part: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime'>) => {
    const newPart: Part = {
        ...part,
        id: `TE-${Math.floor(Math.random() * 1000)}`, // temporary id
        status: "Under Testing",
        repairedAt: new Date(),
        repairTime: 0,
        testingTime: 0,
    };
    setAllParts(currentParts => [...currentParts, newPart]);
    setIsAddDialogOpen(false);
  };


  return (
    <>
      <PageHeader
        title={lab.name}
        description={`Viewing all parts assigned to ${lab.name}.`}
      >
        <BackButton />
      </PageHeader>
      <PartsTable 
        parts={partsInLab} 
        labs={labs}
        setParts={setAllParts} 
        onAddPart={handleAddPart} 
      />
    </>
  );
}
