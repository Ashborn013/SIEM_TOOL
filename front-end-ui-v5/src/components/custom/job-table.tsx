"use client"
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Pagination,
  Selection,
  getKeyValue
} from "@heroui/react";
import { useRouter } from 'next/navigation';
import moment from 'moment';
interface JobDetail {
  job: string;
  message: string;
  level: string;
  job_id: string;
  time: number;
}

interface JobTableProps {
  rows: JobDetail[];
}

export function JobTable({ rows }: JobTableProps) {
  const router = useRouter()
  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  // Calculate total pages
  const pages = Math.ceil(rows.length / rowsPerPage);

  // Get current page items
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  const columns = [
    { key: "job", label: "JOB" },
    { key: "message", label: "MESSAGE" },
    { key: "level", label: "LEVEL" },
    { key: "job_id", label: "JOB ID" },
    { key: "time", label: "TIME" },
    { key: "open", label: "OPEN" }
  ];

  const getLevelColor = (level: string) => {
    const normalizedLevel = level.trim().toLowerCase();
    
    switch (normalizedLevel) {
      case 'critical':
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex flex-col gap-4">
    <Table
      aria-label="Job listings table"
      classNames={{
        wrapper: "min-h-[400px]",
      }}
      
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
    >
      <TableHeader columns={columns}>
        {(column) => (
            <TableColumn key={column.key}>
              {column.label}
          </TableColumn>
        )}
      </TableHeader>
        <TableBody items={items}>
        {(row) => (
          <TableRow key={row.job_id}>
            <TableCell>{row.job}</TableCell>
            <TableCell>{row.message}</TableCell>
            <TableCell>
              <Chip
                color={getLevelColor(row.level) as "danger" | "warning" | "success" | "default"}
                variant="flat"
                size="sm"
              >
                {row.level}
              </Chip>
            </TableCell>
            <TableCell>{row.job_id}</TableCell>
            <TableCell className="text-right">
              {moment(row.time*1000).format('MMMM Do YYYY, h:mm:ss a')}
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm" onPress={()=>router.push(`/user/report/${row.job_id}`)} >
                Open
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  );
}
