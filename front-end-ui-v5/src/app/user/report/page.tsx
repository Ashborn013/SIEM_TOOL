"use client"

import React, { useState } from 'react'
import { JobTable } from '@/components/custom/job-table'
import { Card, CardBody, CardHeader, Input } from "@heroui/react"
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import Sidebar from '@/components/sidebar-props/sidebar-main'

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
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const { data: rows = [], isLoading, isError } = useQuery({
        queryKey: ['jobDetails'],
        queryFn: fetchJobDetails,
        refetchInterval: 5000,
        refetchOnWindowFocus: true
    })

    if (isError) return (
        <Card className="bg-background">
            <CardBody>
                <p className="text-danger text-center">Error loading jobs.</p>
            </CardBody>
        </Card>
    )

    const filteredRows = rows.filter((row: JobDetail) =>
        row.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.job_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        new Date(row.time * 1000).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())
    )

    React.useEffect(() => {
        setPage(1)
    }, [searchQuery])

    return (
        <div className="container mx-auto py-10">
            <Card className="bg-background">
                <CardHeader className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold text-foreground">Job Listings</h4>
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-default-400" />
                            <Input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                                variant="bordered"
                                radius="sm"
                                color="primary"
                                size="sm"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {isLoading ? (
                        <div className="flex flex-col gap-2">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-12 rounded-lg bg-default-100 animate-pulse"
                                />
                            ))}
                        </div>
                    ) : (
                        <JobTable
                            rows={filteredRows}
                        />
                    )}
                </CardBody>
            </Card>
        </div>
    )
}

export default function Page() {
    return (
        <div className='flex'>
            <Sidebar />
            <JobList />
        </div>
    )
}