"use client"

import { useMemo } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Card, CardBody, CardHeader, Chip, Skeleton } from "@heroui/react"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Sidebar from "@/components/sidebar-props/sidebar-main"
import { securityEventsMockData } from "@/utils/MockData"

export default function Page() {
  return (
    <div className="flex">
      <Sidebar/>
      <JobDetails />
    </div>
  )
}

function JobDetails() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: getJobDetails,
    refetchInterval: 5000,
    refetchOnWindowFocus: true
  })

  const chartData = useMemo(() => {
    if (!data) return []

    const timeSeriesData = new Map()
    const jobsArray = Array.isArray(data) ? data : [data]

    jobsArray.forEach(job => {
      if (job.logs_ids && Array.isArray(job.logs_ids)) {
        job.logs_ids.forEach(log => {
          const timestamp = new Date(log["@timestamp"]).toISOString().split('T')[0]
          
          if (!timeSeriesData.has(timestamp)) {
            timeSeriesData.set(timestamp, {
              date: timestamp,
              Critical: 0,
              High: 0,
              Medium: 0,
              Low: 0
            })
          }

          const entry = timeSeriesData.get(timestamp)
          if (job.level) {
            entry[job.level]++
          }
        })
      }
    })

    return Array.from(timeSeriesData.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [data])

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-content1 p-3 rounded-lg shadow-lg border border-content2">
          <p className="text-foreground font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} alerts`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold">Security Alert Trends</h4>
          <p className="text-sm text-default-500">Timeline of security alerts by severity level</p>
        </div>
        {firstJob && (
          <Chip color="primary" variant="flat">
            {firstJob.job}
          </Chip>
        )}
      </CardHeader>
      <CardBody className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardBody className="flex flex-col items-start">
              <span className="text-2xl font-bold">
                {totalLogs}
              </span>
              <span className="text-sm text-default-500">Total Alerts</span>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col items-start">
              <span className="text-2xl font-bold">{totalLogs}</span>
              <span className="text-sm text-default-500">Total Log Entries</span>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col items-start">
              <span className="text-2xl font-bold">
                {firstJob?.job_id ? firstJob.job_id.substring(0, 8) + "..." : "N/A"}
              </span>
              <span className="text-sm text-default-500">Latest Job ID</span>
            </CardBody>
          </Card>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffa64d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffa64d" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffff4d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffff4d" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4dff4d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4dff4d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-default-500"
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tickMargin={10}
                className="text-default-500"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="Critical"
                stackId="1"
                stroke="#ff4d4d"
                fill="url(#colorCritical)"
              />
              <Area
                type="monotone"
                dataKey="High"
                stackId="1"
                stroke="#ffa64d"
                fill="url(#colorHigh)"
              />
              <Area
                type="monotone"
                dataKey="Medium"
                stackId="1"
                stroke="#ffff4d"
                fill="url(#colorMedium)"
              />
              <Area
                type="monotone"
                dataKey="Low"
                stackId="1"
                stroke="#4dff4d"
                fill="url(#colorLow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}

async function getJobDetails() {
  const res = await fetch("http://127.0.0.1:223/Job_details")
  if (!res.ok) {
    throw new Error("Network response was not ok")
  }
  
  return res.json()
  // return securityEventsMockData;
}

function SkeletonCard() {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-[200px] rounded-lg" />
        <Skeleton className="h-4 w-[300px] rounded-lg" />
      </CardHeader>
      <CardBody className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardBody>
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-4 w-24 mt-2 rounded-lg" />
              </CardBody>
            </Card>
          ))}
        </div>
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </CardBody>
    </Card>
  )
}