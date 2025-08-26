import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About ASRF" description="Pioneering excellence in armored systems readiness." />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                    <p>
                        The Armored Systems Repair Facility (ASRF) is dedicated to ensuring the highest state of operational readiness for the nation's heavy armored vehicle fleet. Our primary focus is the TU-85 Main Battle Tank, a cornerstone of our ground forces. We specialize in the meticulous repair, rigorous testing, and complete overhaul of all critical TU-85 components.
                    </p>
                    <p>
                        Leveraging state-of-the-art diagnostics and a team of highly skilled technicians, we minimize downtime and maximize vehicle lifespan. ASRF Tracker, our proprietary management system, provides unparalleled transparency into our operations, allowing for real-time monitoring and data-driven decision-making to maintain peak fleet performance.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Our Facilities</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    <p>
                        Our facility is comprised of specialized labs, each dedicated to a specific subsystem of the TU-85. This includes the Hull Lab, Electrical Lab, Turret Lab, Engine Lab, and Transmission lab. This specialized approach ensures that every component receives expert attention, adhering to the strictest military specifications and quality standards.
                    </p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card className="overflow-hidden">
                <div className="relative h-96 w-full">
                    <Image
                        src="https://picsum.photos/600/800"
                        alt="Army Tank"
                        fill
                        className="object-cover"
                        data-ai-hint="army tank"
                    />
                </div>
                <CardHeader>
                    <CardTitle>Commitment to Excellence</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    <p>
                        ASRF is more than a repair depot; we are a center of excellence, committed to innovation and reliability in military vehicle maintenance.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
