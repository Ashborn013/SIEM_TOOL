"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DynamicTableProps {
  data: any[]
}

export function DynamicTable({ data }: DynamicTableProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  // Set the first row as selected by default when component mounts
  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedRow(0)
    }
  }, [data])

  // Skip rendering if no data
  if (!data || data.length === 0) {
    return <div className="text-center py-4">No data available</div>
  }

  // Get all columns except 'message'
  const columns = Object.keys(data[0]).filter((col) => col !== "message")

  // Check if message column exists
  const hasMessageColumn = Object.keys(data[0]).includes("message")

  return (
    <div className="mt-6 space-y-6">
      <Card className="border shadow-sm">
        <CardHeader className="bg-muted/50 pb-2">
          <CardTitle className="text-xl">Related Logs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] w-full rounded-b-lg">
            <Table>
              <TableHeader className="bg-muted/30 sticky top-0">
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column} className="font-semibold">
                      {column.charAt(0).toUpperCase() + column.slice(1).replace("_", " ")}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    onMouseEnter={() => setSelectedRow(rowIndex)}
                    className={`
                      transition-colors
                      ${selectedRow === rowIndex ? "bg-primary/10 hover:bg-primary/15" : "hover:bg-muted"}
                      ${hasMessageColumn ? "cursor-pointer" : ""}
                    `}
                  >
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column}`}>{row[column]?.toString() || "—"}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message display area - always visible */}
      {hasMessageColumn && selectedRow !== null && (
        <Card className="border shadow-sm">
          <CardHeader className="bg-muted/50 pb-2">
            <CardTitle className="text-sm font-medium">Message Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 max-h-[200px] overflow-auto">
            <div className="p-3 bg-muted/30 rounded-md whitespace-pre-wrap">
              {data[selectedRow]?.message || "No message available"}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

