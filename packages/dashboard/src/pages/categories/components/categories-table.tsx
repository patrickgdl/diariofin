import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import * as React from "react"
import { ProgressCategories } from "~/ui/progress-categories"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/ui/table"
import formatCurrency from "~/utils/format-currency"

import { TransactionsByDateGrouped } from "./top-categories-table"

export const columns: ColumnDef<TransactionsByDateGrouped["categories"][0]>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: row.original.transaction_categories.category_groups?.color }}
          />
          <div>{row.original.transaction_categories.icon}</div>
          <div className="capitalize">{row.original.transaction_categories.name}</div>
        </div>
      )
    },
  },
  {
    id: "progress",
    cell: ({ row }) => {
      const current = 80
      const amount = row.getValue("amount") as number

      const progressPercent = current > 0 ? (amount / current) * 100 : 0

      return (
        <div className="w-full px-2">
          <ProgressCategories value={progressPercent} className="w-full" />
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      return <div className="text-right font-medium">{formatCurrency(amount)}</div>
    },
  },
]

type CategoriesTableProps = {
  data: TransactionsByDateGrouped["categories"][0][]
  onSelect: (category: TransactionsByDateGrouped["categories"][0]) => void
}

export function CategoriesTable({ data, onSelect }: CategoriesTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="flex flex-col space-y-1.5 pl-4 py-1">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onSelect(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="[&:has([role=checkbox])]:pl-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
