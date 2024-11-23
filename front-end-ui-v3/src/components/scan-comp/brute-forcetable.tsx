'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const INTERVAL_TIME = 10000

export function BruteForceTable() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    function fetchBruteForce() {
      fetch('http://127.0.0.1:223/brute_force')
        .then(response => response.json())
        .then(data => {
          setRows(data)
        })
        .catch(error => console.error("Error:", error))
    }

    fetchBruteForce()
    const intervalId = setInterval(fetchBruteForce, INTERVAL_TIME)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sl No</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Event ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => {
          const correctedJson = row.log.replace(/'/g, '"')
          let logObj = JSON.parse(correctedJson)

          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{logObj.level}</TableCell>
              <TableCell>{row.message}</TableCell>
              <TableCell>{row.event_id}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

