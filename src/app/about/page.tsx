import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const teamMembers = [
    { name: "Maj. Gen. Ahmad", role: "Project Director", avatar: "AG" },
    { name: "Col. Sajjad", role: "Lead Engineer", avatar: "CS" },
    { name: "Lt. Col. Imran", role: "Logistics", avatar: "LI" },
    { name: "Maj. Qasim", role: "Senior Technician", avatar: "MQ" },
];

export default function AboutPage() {
  return (
    <>
        <PageHeader 
            title="About ASRF Tracker"
            description="Learn more about the project, its mission, and the team."
        />
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        The ASRF Tracker application is designed to provide a comprehensive and efficient system for monitoring the repair and testing processes of Tank T-85 parts. Our goal is to streamline workshop operations, improve accountability, and provide real-time data for better decision-making. By digitizing the tracking of parts through various lab stages, from reception to final testing, we aim to reduce delays, minimize errors, and ensure all components meet the highest standards of quality and reliability before being deployed.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Meet the Team</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map(member => (
                        <div key={member.name} className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={`https://placehold.co/100x100/1e293b/ffffff/png?text=${member.avatar}`} />
                                <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-muted-foreground">{member.role}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    </>
  );
}
