import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BackButton } from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-center py-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-right">{value}</span>
    </div>
)

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Admin Profile"
        description="View and manage your profile information."
      >
        <BackButton />
      </PageHeader>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={`https://placehold.co/100x100/1e293b/ffffff/png?text=SA`} />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">Site Administrator</CardTitle>
            <CardDescription>E-00001</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
            <DetailRow label="Full Name" value="System Administrator" />
            <Separator />
            <DetailRow label="Email" value="admin@asrf.mil.pk" />
            <Separator />
            <DetailRow label="Role" value={<Badge>Administrator</Badge>} />
            <Separator />
            <DetailRow label="Department" value="IT & Systems" />
            <Separator />
            <DetailRow label="Last Login" value={new Date().toLocaleString()} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
