"use client"

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { JobTable } from '@/components/job-table'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'

export default function Page() {
  const [rows, setRows] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch('http://127.0.0.1:223/Job_details')
        const data = await response.json()
        console.log("Fetched data")

        setRows((currentRows) => {
          if (JSON.stringify(currentRows) !== JSON.stringify(data)) {
            return data
          }
          return currentRows
        })

      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchJobDetails() // Initial fetch
    const intervalId = setInterval(fetchJobDetails, 5000) // Fetch every 5000 ms (5 seconds)
    return () => clearInterval(intervalId)
  }, [])

  const filteredRows = rows.filter(row => 
    row.Job.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.Job_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(row.time * 1000).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Job Details Dashboard</CardTitle>
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

