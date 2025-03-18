import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function JobTable({ rows }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Sl No</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Job ID</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.job}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {row.message.length > 50 ? `${row.message.substring(0, 50)}...` : row.message}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{row.message}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge variant={row.level.toLowerCase() === 'error' ? 'destructive' : 'default'}>
                  {row.level}
                </Badge>
              </TableCell>
              <TableCell>{row.job_id}</TableCell>
              <TableCell>{new Date(row.time * 1000).toLocaleString()}</TableCell>
              <TableCell><Button><Link href={`/user/report/${row.job_id}`}>Open</Link></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function JobTableScroll({ rows }) {
  const displayRows = rows.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details (Top 5)</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.job}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {row.message.length > 50 ? `${row.message.substring(0, 50)}...` : row.message}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{row.message}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.level.toLowerCase() === 'error' ? 'destructive' : 'default'}>
                      {row.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.job_id}</TableCell>
                  <TableCell>{new Date(row.time * 1000).toLocaleString()}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
