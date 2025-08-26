"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { parts, labs } from "@/lib/data";
import { Pie, PieChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const chartConfig = {
  functional: { label: "Functional", color: "hsl(var(--chart-1))" },
  defective: { label: "Defective", color: "hsl(var(--chart-2))" },
  testing: { label: "Under Testing", color: "hsl(var(--chart-3))" },
  repairTime: { label: "Repair Time (h)", color: "hsl(var(--chart-4))" },
};

export function ReportCharts() {
  // Data for Part Status Pie Chart
  const statusCounts = parts.reduce((acc, part) => {
    if (part.status === "Functional") acc.functional++;
    else if (part.status === "Defective") acc.defective++;
    else if (part.status === "Under Testing") acc.testing++;
    return acc;
  }, { functional: 0, defective: 0, testing: 0 });

  const pieData = [
    { name: "Functional", value: statusCounts.functional, fill: "var(--color-functional)" },
    { name: "Defective", value: statusCounts.defective, fill: "var(--color-defective)" },
    { name: "Under Testing", value: statusCounts.testing, fill: "var(--color-testing)" },
  ];

  // Data for Lab Repair Time Bar Chart
  const labRepairData = labs.map(lab => {
    const labParts = parts.filter(p => p.labId === lab.id);
    const totalTime = labParts.reduce((sum, p) => sum + p.repairTime, 0);
    const avgTime = labParts.length > 0 ? totalTime / labParts.length : 0;
    return { name: lab.name, "Repair Time": parseFloat(avgTime.toFixed(1)) };
  });

  // Data for Most Frequently Repaired Parts
  const partRepairFrequency = parts.reduce((acc, part) => {
      const partBaseName = part.name.replace(/ \w*$/, '');
      acc[partBaseName] = (acc[partBaseName] || 0) + 1;
      return acc;
  }, {} as Record<string, number>);

  const topRepairedParts = Object.entries(partRepairFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, "Repair Count": count }));


  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Part Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={pieData} dataKey="value" nameKey="name" />
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Repair Time by Lab</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={labRepairData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis />
              <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
              <Bar dataKey="Repair Time" fill="hsl(var(--chart-4))" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Most Frequently Repaired Parts</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={topRepairedParts} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={120} />
                <XAxis type="number" dataKey="Repair Count" />
                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }}/>
                <Bar dataKey="Repair Count" fill="hsl(var(--chart-1))" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
