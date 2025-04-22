import { LogIdType, logs_idsSchema } from "@/app/user/report/[job_id]/schema";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@heroui/react";

// Ensure logs_idsSchema.shape exists and is an object
const columns = logs_idsSchema?.shape
    ? Object.keys(logs_idsSchema.shape).map((key) => ({
          key,
          label: key,
      }))
    : [];

export default function LogTable({ rows }: { rows: LogIdType[] }) {
    return (
        <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows} emptyContent={"No Data Present"}>
                {(item: LogIdType, index: number) => (
                    <TableRow key={index}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
