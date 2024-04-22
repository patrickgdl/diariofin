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
import { Table, TableBody, TableCell, TableRow } from "@fluxozen/ui/table"

import { DataTablePagination } from "./transactions-pagination"
import { DataTableToolbar } from "./transactions-toolbar"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  groupedData: Record<string, TData[]>
  onSelect: (data: TData) => void
}

export function TransactionsTable<TData, TValue>({
  columns,
  data,
  groupedData,
  onSelect,
}: DataTableProps<TData, TValue>) {
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
      <div className="p-2">
        <DataTableToolbar table={table} />
      </div>

      {Object.entries(groupedData).length ? (
        <Table>
          <TableBody>
            {Object.entries(groupedData).map(([groupedDate, groupedRows]) => (
              <React.Fragment key={groupedDate}>
                {table.getRowModel().rows?.length &&
                table.getRowModel().rows.filter((row) => groupedRows.includes(row.original)).length > 0 ? (
                  <>
                    <TableRow className="bg-gray-50 border-y border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <TableCell colSpan={columns.length}>
                        <h2 className="ml-2">{groupedDate}</h2>
                      </TableCell>
                    </TableRow>

                    {table
                      .getRowModel()
                      .rows.filter((row) => groupedRows.includes(row.original))
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          onClick={() => onSelect(row.original)}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <React.Fragment key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </React.Fragment>
                          ))}
                        </TableRow>
                      ))}
                  </>
                ) : null}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="rounded-md border h-24 flex justify-center items-center">Sem resultados.</div>
      )}

      <DataTablePagination table={table} />
    </div>
  )
}
