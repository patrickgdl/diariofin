import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/ui/table"

import { DataTablePagination } from "./transactions-pagination"
import { DataTableToolbar } from "./transactions-toolbar"
import { cn } from "~/utils/cn"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  groupedData: Record<string, TData[]>
}

export function TransactionsTable<TData, TValue>({ columns, data, groupedData }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />

      {Object.entries(groupedData).length ? (
        Object.entries(groupedData).map(([groupedDate, groupedRows]) => (
          <React.Fragment key={groupedDate}>
            <h2 className="ml-2 text-lg font-semibold">{groupedDate}</h2>

            <Table>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  // filter rows that are only on grouped rows
                  table
                    .getRowModel()
                    .rows.filter((row) => groupedRows.includes(row.original))
                    .map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className={cn(cell.column.getCanResize() ? null : `w-1/4`)}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Sem resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </React.Fragment>
        ))
      ) : (
        <div className="rounded-md border h-24 flex justify-center items-center">Sem resultados.</div>
      )}

      <DataTablePagination table={table} />
    </div>
  )
}
