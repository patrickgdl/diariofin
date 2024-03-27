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
import { Table, TableBody, TableCell, TableRow } from "~/ui/table"
import formatCurrency from "~/utils/format-currency"

import { TransactionsByDateGrouped } from "./top-categories-table"
import { Progress } from "~/ui/progress"

export const columns: ColumnDef<TransactionsByDateGrouped["categories"][0]>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <TableCell className="pr-0 pl-6 py-2 w-1/3">
          <div className="flex items-center space-x-3">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: row.original.transaction_categories.category_groups?.color }}
            />
            <div>{row.original.transaction_categories.icon}</div>
            <div className="capitalize">{row.original.transaction_categories.name}</div>
          </div>
        </TableCell>
      )
    },
  },
  {
    id: "progress",
    cell: ({ row }) => {
      const current = Math.abs(row.original.totalAmount)
      const amount = Math.abs(row.getValue("amount") as number)

      const progressPercent = current > 0 ? (amount / current) * 100 : 0

      return (
        <TableCell className="w-1/5">
          <Progress value={progressPercent} className="w-full" />
        </TableCell>
      )
    },
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      return (
        <TableCell className="w-1/3">
          <div className="text-right font-medium">{formatCurrency(amount)} </div>
        </TableCell>
      )
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
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              Sem transações categorizadas.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
