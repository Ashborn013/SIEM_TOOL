"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", A: 200, B: 80 },
  { month: "February", A: 305, B: 200 },
  { month: "March", A: 237, B: 120 },
  { month: "April", A: 73, B: 190 },
  { month: "May", A: 209, B: 130 },
  { month: "June", A: 214, B: 140 },
]

const chartConfig = {
  A: {
    label: "A",
    color: "hsl(var(--chart-1))",
  },
  B: {
    label: "B",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChartData() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="A"
              stackId="a"
              fill="var(--color-A)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="B"
              stackId="a"
              fill="var(--color-B)"
              radius={[4, 4, 0, 0]}
            />

          </BarChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
