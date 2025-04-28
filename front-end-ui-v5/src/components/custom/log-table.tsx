import { LogIdType, logs_idsSchema } from "@/app/user/report/[job_id]/schema";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Pagination
} from "@heroui/react";
import { useMemo, useState } from "react";

// Ensure logs_idsSchema.shape exists and is an object
const columns = logs_idsSchema?.shape
    ? Object.keys(logs_idsSchema.shape).map((key) => ({
          key,
          label: key,
      }))
    : [];

export default function LogTable({ rows }: { rows: LogIdType[] }) {
    let num = 0;
    
      const [page, setPage] = useState(1);
      const rowsPerPage = 4;
    
      // Calculate total pages
      const pages = Math.ceil(rows.length / rowsPerPage);
    
      // Get current page items
      const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return rows.slice(start, end);
      }, [page, rows]);
    
    return (
        <Table aria-label="Example table with dynamic content"
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
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items} emptyContent={"No Data Present"}>
                {(item: LogIdType) => (
                    <TableRow key={num++}>
                        {(columnKey) => (
                            <TableCell>
                                {columnKey === "message" ? (
                                    <div className="max-h-24 overflow-y-auto whitespace-pre-wrap break-words p-2 border border-gray-300">
                                        {getKeyValue(item, columnKey)}
                                    </div>
                                ) : (
                                    getKeyValue(item, columnKey)
                                )}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
