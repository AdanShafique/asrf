import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PartsTable } from "@/components/parts/parts-table";
import { parts, labs } from "@/lib/data";

export default function PartsPage() {
  return (
    <>
      <PageHeader title="Parts Management" description="View, add, and manage all TU-85 parts.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Part
        </Button>
      </PageHeader>
      <PartsTable parts={parts} labs={labs} />
    </>
  );
}
