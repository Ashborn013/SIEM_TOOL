'use client'

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { JobTableScroll } from "@/components/job-table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

const colorMap = {
  Critical: "bg-purple-600 dark:bg-purple-800",
  High: "bg-red-500 dark:bg-red-700",
  Mid: "bg-orange-400 dark:bg-orange-600",
  Low: "bg-yellow-400 dark:bg-yellow-600",
  Accepted: "bg-green-400 dark:bg-green-600",
  Closed: "bg-gray-400 dark:bg-gray-600",
}

function RiskCard({ title, content, color }) {
  return (
    <Card className={`${color} text-white`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{content}</p>
      </CardContent>
    </Card>
  )
}

function RiskChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--bar-color)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function useDataFetching() {
  const [riskCounts, setRiskCounts] = React.useState({
    Critical: 0,
    High: 0,
    Mid: 0,
    Low: 0,
    Accepted: 0,
    Closed: 0,
  })
  const [jobDetails, setJobDetails] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const prevDataRef = React.useRef({ riskCounts: null, jobDetails: null })

  const fetchData = React.useCallback(async () => {
    try {
      setError(null)

      const [jobDetailsResponse] = await Promise.all([
        fetch("http://127.0.0.1:223/Job_details").then((res) => res.json()),
        // fetch("http://127.0.0.1:223/brute_force").then((res) => res.json()),
      ])

      const newCounts = countValuesInArray(jobDetailsResponse)
      const newJobDetails = jobDetailsResponse

      if (
        JSON.stringify(newCounts) !==
        JSON.stringify(prevDataRef.current.riskCounts)
      ) {
        setRiskCounts(newCounts)
        prevDataRef.current.riskCounts = newCounts
      }

      if (
        JSON.stringify(newJobDetails) !==
        JSON.stringify(prevDataRef.current.jobDetails)
      ) {
        setJobDetails(newJobDetails)
        prevDataRef.current.jobDetails = newJobDetails
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.")
      console.error("Error fetching data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchData()
    const intervalId = setInterval(fetchData, 5000)
    return () => clearInterval(intervalId)
  }, [fetchData])

  return { riskCounts, jobDetails, isLoading, error }
}

export default function Dashboard() {
  const { riskCounts, jobDetails, isLoading, error } = useDataFetching()

  const chartData = React.useMemo(() => {
    return Object.entries(riskCounts).map(([name, value]) => ({ name, value }))
  }, [riskCounts])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return <DashboardError error={error} />
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(riskCounts).map(([level, count]) => (
          <RiskCard
            key={level}
            title={level}
            content={count}
            color={colorMap[level]}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <RiskChart data={chartData} />
        <JobTableScroll rows={jobDetails.slice(0,5)} />
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  )
}

function DashboardError({ error }) {
  return (
    <div className="container mx-auto p-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  )
}

function countValuesInArray(rows) {
  return rows.reduce((acc, row) => {
    acc[row.level] = (acc[row.level] || 0) + 1
    return acc
  }, {})
}

