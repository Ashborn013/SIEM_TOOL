"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const defaultChartData  = [
  
    { attackType: "malware", attack: 0, fill: "var(--color-malware)" },
    { attackType: "ransomware", attack: 0, fill: "var(--color-ransomware)" },
    { attackType: "ddos", attack: 0, fill: "var(--color-ddos)" },
    { attackType: "other", attack: 0, fill: "var(--color-other)" },
  ]

const chartConfig = {
  attack: {
    label: "Attacks ",
  },
  
  malware: {
    label: "Malware",
    color: "hsl(var(--chart-2))",
  },
  ransomware: {
    label: "Ransomware",
    color: "hsl(var(--chart-3))",
  },
  ddos: {
    label: "DDoS",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function PieChartRisk({chartData = defaultChartData}) {
  const totalAttacks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.attack, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col min-w-[500px] ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="attack"
              nameKey="attackType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className=" text-3xl font-bold [fill:currentColor]"
                        >
                          {totalAttacks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground [fill:currentColor]"
                        >
                          Attacks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total attacks for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}