"use client"

import React, { useState } from 'react'
import { JobTable } from '@/components/custom/job-table'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

const queryClient = new QueryClient()
interface JobDetail {
  job: string;
  message: string;
  level: string;
  job_id: string;
  time: number;
}


async function fetchJobDetails() {
  const response = await fetch('http://127.0.0.1:223/Job_details')
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

function JobList() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: rows = [], isLoading, isError } = useQuery({
    queryKey: ['jobDetails'],
    queryFn: fetchJobDetails,
    refetchInterval: 5000,
    refetchOnWindowFocus: true

  })

  if (isLoading) return <JobListSkeleton/>
  if (isError) return <p>Error loading jobs.</p>

  const filteredRows = rows.filter((row: JobDetail) => 
    row.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.job_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(row.time * 1000).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <JobTable rows={filteredRows} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
function JobListSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
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