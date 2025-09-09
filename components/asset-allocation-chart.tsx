"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { InvestmentType } from "@/types/basis";
import { parseCurrency } from "@/lib/portfolio-utils";

interface AssetAllocationChartProps {
  assetData: Array<{
    assetType: InvestmentType;
    value: number;
    formattedValue: string;
  }>;
}

const chartConfig = {
  Equities: {
    label: "Equities",
    color: "hsl(var(--chart-1))",
  },
  Bonds: {
    label: "Bonds",
    color: "hsl(var(--chart-2))",
  },
  CEDEARS: {
    label: "CEDEARS",
    color: "hsl(var(--chart-3))",
  },
  Notes: {
    label: "Notes",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

export function AssetAllocationChart({ assetData }: AssetAllocationChartProps) {
  const total = assetData.reduce((sum, asset) => sum + asset.value, 0);

  const chartData = assetData.map((asset, index) => ({
    name: asset.assetType,
    value: asset.value,
    percentage: ((asset.value / total) * 100).toFixed(1),
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <CardDescription>
          Distribution of investments by asset type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {chartData.map((entry, index) => (
            <div key={entry.name} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-sm font-medium">{entry.name}</span>
              <span className="text-sm text-muted-foreground ml-auto">
                {entry.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
