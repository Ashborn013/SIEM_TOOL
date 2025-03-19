"use client"

import React, { useState } from 'react'
import { useParams, notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { DynamicTable } from "./Dytable"
import { Badge } from '@/components/ui/badge'
const queryClient = new QueryClient()

async function fetchJobs() {
  const res = await fetch("http://localhost:223/Job_details")
  if (!res.ok) {
    throw new Error("Failed to fetch jobs")
  }
  return res.json()
}

function JobPage() {
  const { job_id } = useParams()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: jobs = [], isLoading, isError } = useQuery({
    queryKey: ['jobDetails'],
    queryFn: fetchJobs,
    // refetchInterval: 15000,
    // refetchOnWindowFocus: true
  })

  if (isLoading) return <JobPageSkeleton />
  if (isError) return <p>Error loading job details.</p>

  const job = jobs.find((j:any) => j.job_id === job_id)
  if (!job) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              {/* <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search job details..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div> */}
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="font-semibold">Job ID:</span>
                <span>{job.job_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Level:</span>
                <Badge>{job.level}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Message:</span>
                <span>{job.message}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Time:</span>
                <span>{new Date(job.time * 1000).toLocaleString()}</span>
              </div>
            </div>
            {job.logs_ids && job.logs_ids.length > 0 && <DynamicTable data={job.logs_ids} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobPage />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

function JobPageSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search job details..."
                  className="pl-8"
                  disabled
                />
              </div>
            </div>
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-10 bg-gray-200 animate-pulse rounded-md" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}