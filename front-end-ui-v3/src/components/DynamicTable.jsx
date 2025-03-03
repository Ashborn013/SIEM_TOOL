"use client"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { extractHeaders } from "@/utils/tableUtils"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DynamicTable({ data }) {
  const [headers, setHeaders] = useState([])
  const [filteredData, setFilteredData] = useState(data)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setHeaders(extractHeaders(data))
    setFilteredData(data)
  }, [data])

  const handleSearch = event => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)

    const filtered = data.filter(item =>
      Object.values(item).some(
        value =>
          value &&
          value
            .toString()
            .toLowerCase()
            .includes(term)
      )
    )
    setFilteredData(filtered)
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(header => (
                <TableHead key={header} className="font-medium">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {headers.map(header => (
                  <TableCell key={`${index}-${header}`}>
                    {row[header]?.toString() || "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

