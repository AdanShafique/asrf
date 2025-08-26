import { PageHeader } from "@/components/page-header";
import { labs } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LabsPage() {
  return (
    <>
      <PageHeader
        title="Repair & Testing Labs"
        description="Browse the specialized labs responsible for part repairs."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <Link href={`/labs/${lab.id}`} key={lab.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <CardHeader>
                <CardTitle>{lab.name}</CardTitle>
                <CardDescription>Click to view details and assigned parts.</CardDescription>
              </CardHeader>
              <div className="flex-grow" />
              <div className="p-6 pt-0 flex justify-end">
                <ArrowRight className="text-muted-foreground" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
