"use client"

import { useMemo } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const queryClient = new QueryClient()

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobDetails />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

function JobDetails() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: getJobDetails,
    refetchInterval: 5000,
    refetchOnWindowFocus: true
  })

  // Process data for the chart
  const chartData = useMemo(() => {
    if (!data) return []

    // Count occurrences of each level
    const levelCounts = {
      Critical: 0,
      High: 0,
      Low: 0,
    }

    const jobsArray = Array.isArray(data) ? data : [data]

    // Count jobs by level
    jobsArray.forEach((job: { level?: "Critical" | "High" | "Low" }) => {
      if (job.level && job.level in levelCounts) {
        levelCounts[job.level]++
      }
    })

    // Convert to array format for Recharts
    return [
      { name: "Critical", value: levelCounts.Critical },
      { name: "High", value: levelCounts.High },
      { name: "Low", value: levelCounts.Low },
    ]
  }, [data])

  // Get total logs count
  const totalLogs = useMemo(() => {
    if (!data) return 0

    const jobsArray = Array.isArray(data) ? data : [data]

    return jobsArray.reduce((total, job) => {
      return total + (job.logs_ids?.length || 0)
    }, 0)
  }, [data])


  if (isLoading) return <SkeletonCard />
  if (error) return <p>Error: {error.message}</p>


  const firstJob = Array.isArray(data) ? data[0] : data

  return (
    <Card className="w-full max-w-6xl mx-auto p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Security Alert Levels</CardTitle>
            <CardDescription>Distribution of security alerts by severity level</CardDescription>
          </div>
          {firstJob && (
            <Badge variant={"default"}>
              {firstJob.job}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{chartData.reduce((sum, item) => sum + item.value, 0)}</div>
              <p className="text-xs text-muted-foreground">Total Alerts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalLogs}</div>
              <p className="text-xs text-muted-foreground">Total Log Entries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {firstJob?.job_id ? firstJob.job_id.substring(0, 8) + "..." : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">Latest Job ID</p>
            </CardContent>
          </Card>
        </div>

        <ChartContainer
          config={{
            severity: {
              label: "Severity Level",
            },
            count: {
              label: "Number of Alerts",
            },
          }}
          className="h-[400px]"
        >
          <BarChart data={chartData}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} tickMargin={10} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
              fill="currentColor"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="severity"
                  formatter={(value, name) => [`${value} alerts`, "Count"]}
                />
              }
              cursor={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

async function getJobDetails() {
  const res = await fetch("http://127.0.0.1:223/Job_details")
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  return res.json()
}

function SkeletonCard() {
  return (
    <Card className="w-full max-w-6xl mx-auto p-4">
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-24 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-[400px] w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
