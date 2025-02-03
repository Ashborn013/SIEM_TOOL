"use client"
import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function JobPage() {
  const { job_id } = useParams()
  const [job, setJob] = useState(undefined)

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch("http://localhost:223/Job_details")
        if (!res.ok) {
          throw new Error("Failed to fetch jobs")
        }

        const jobs = await res.json()
        const fetchedJob = jobs.find(j => j.job_id === job_id)

        if (fetchedJob) {
          setJob(fetchedJob)
        } else {
          setJob(null)
        }
      } catch (error) {
        console.error("Error fetching job:", error)
        setJob(null)
      }
    }

    fetchJob()
  }, [job_id]) // Added job_id to the dependency array

  if (job === null) {
    notFound()
  }

  if (job === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Job Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{job.job}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="font-semibold">Job ID:</span>
              <span>{job.job_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Level:</span>
              <Badge
                variant={job.level === "Critical" ? "destructive" : "default"}
              >
                {job.level}
              </Badge>
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
        </CardContent>
      </Card>
    </div>
  )
}
