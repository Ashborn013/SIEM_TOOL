"use client"

import React, { useState } from 'react'
import { useParams, notFound } from "next/navigation"
import { Card, CardHeader, CardBody } from "@heroui/card"
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { Input, Badge, Button } from "@heroui/react"
import Sidebar from '@/components/sidebar-props/sidebar-main'
import { GetJobType } from './schema'
import moment from "moment"
import LogTable from '@/components/custom/log-table'
import ReportLogDataDisplayModal from './reporttablemodal'

async function fetchJobs(job_id: string) {
    const res = await fetch("http://localhost:223/Job_details")
    if (!res.ok) {
        throw new Error("Failed to fetch jobs")
    }
    const temp: GetJobType[] = await res.json()
    const data = temp.find((elm) => elm.job_id === job_id)
    return data
}

function JobPage() {
    const { job_id } = useParams()
    const [searchQuery, setSearchQuery] = useState('')

    const { data: job, isLoading, isError } = useQuery({
        queryKey: ['jobDetail', job_id],
        queryFn: () => fetchJobs(job_id as string),
    })

    if (isLoading) return <JobPageSkeleton />
    if (isError) return <p className="text-red-500">Error loading job details.</p>

    if (!job) {
        notFound()
    }

    return (
        <div className="flex flex-col mx-auto py-10 space-y-6">
            <header className="text-center">
                <h1 className="text-2xl font-bold">Job Details</h1>
                <p className="text-gray-500">Detailed information about the selected job</p>
            </header>
            {/* <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search job details..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div> */}
            <Card className='flex'>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Job Information</h2>
                </CardHeader>
                <CardBody>
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr className="border-b">
                                <th className="py-2 font-semibold">Job ID:</th>
                                <td className="py-2">{job.job_id}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="py-2 font-semibold">Level:</th>
                                <td className="py-2">
                                    <Badge>{job.level}</Badge>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <th className="py-2 font-semibold">Message:</th>
                                <td className="py-2">{job.message}</td>
                            </tr>
                            <tr>
                                <th className="py-2 font-semibold">Time:</th>
                                <td className="py-2">{moment(job.time * 1000).format('MMMM Do YYYY, h:mm:ss a')}</td>
                            </tr>
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    )
}

export default function Page() {
    const { job_id } = useParams()
    
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 items-center justify-center flex-col">
                <JobPage />
                <ReportLogDataDisplayModal jobId={job_id as string} />
            </div>
        </div>
    )
}

function JobPageSkeleton() {
    return (
        <div className="container mx-auto py-10 space-y-6">
            <header className="text-center">
                <h1 className="text-2xl font-bold">Loading Job Details...</h1>
            </header>
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Loading...</h2>
                </CardHeader>
                <CardBody>
                    <div className="space-y-4">
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
                </CardBody>
            </Card>
        </div>
    )
}