
"use client";

import { Wrench, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { PartsTable } from "@/components/parts/parts-table";
import { initialParts, labs } from "@/lib/data";
import { useLocalStorageState } from "@/hooks/use-local-storage-state";
import type { Part } from "@/lib/types";

export default function DashboardPage() {
  const [parts, setParts] = useLocalStorageState<Part[]>("parts", initialParts);

  const totalParts = parts.length;
  const repairedCount = parts.filter(p => p.status === 'Repaired').length;
  const defectiveCount = parts.filter(p => p.status === 'Defective').length;
  const underTestingCount = parts.filter(p => p.status === 'Under Testing').length;
  
  const recentParts = [...parts].sort((a, b) => b.repairedAt.getTime() - a.repairedAt.getTime()).slice(0, 5);
  
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
  };


  return (
    <>
      <PageHeader
        title="Dashboard"
        description="An overview of the part repair and testing status."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Parts" value={totalParts} icon={<Wrench />} />
        <StatCard title="Repaired" value={repairedCount} icon={<CheckCircle />} colorClassName="text-accent" />
        <StatCard title="Defective" value={defectiveCount} icon={<AlertCircle />} colorClassName="text-destructive" />
        <StatCard title="Under Testing" value={underTestingCount} icon={<Clock />} colorClassName="text-secondary" />
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Recently Processed Parts</h2>
        <PartsTable 
            parts={recentParts} 
            labs={labs} 
            setParts={setParts}
            onAddPart={handleAddPart}
        />
      </div>
    </>
  );
}
