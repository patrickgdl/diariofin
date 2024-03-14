import * as React from "react"
import { BoltIcon } from "@heroicons/react/20/solid"
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
import { CarIcon, CoffeeIcon, HomeIcon, KeyIcon, ShoppingBagIcon, StarIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/ui/table"
import formatCurrency from "~/utils/format-currency"
import { cn } from "~/utils/cn"
import formatDate from "~/utils/format-date"

interface Transaction {
  date: string
  incoming: number
  outgoing: number
}

const data: Transaction[] = [
  {
    date: "2023-01-01T14:48:00",
    incoming: 732.65,
    outgoing: -800.4,
  },
  {
    date: "2023-02-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-03-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-04-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-05-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-06-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-07-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-08-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-09-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-10-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-11-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
  {
    date: "2023-12-01T14:48:00",
    incoming: 820.8,
    outgoing: -550.55,
  },
]

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "date",
    accessorFn: (row) => new Date(row.date), // Accessor function for date
    header: () => <div>Mês</div>,
    cell: ({ getValue }) => {
      const date = getValue() as Date
      return formatDate(date, "dd/MM")
    },
  },
  {
    accessorKey: "incoming",
    header: () => <div className="text-right">Entradas</div>,
    cell: ({ row }) => {
      const incoming = parseFloat(row.getValue("incoming"))
      return <div className="text-right font-medium">{formatCurrency(incoming)}</div>
    },
  },
  {
    accessorKey: "outgoing",
    header: () => <div className="text-right">Saídas</div>,
    cell: ({ row }) => {
      const outgoing = parseFloat(row.getValue("outgoing"))
      return <div className="text-right font-medium">{formatCurrency(outgoing)}</div>
    },
  },
  {
    id: "diff",
    header: () => <div className="text-right">Diferença</div>,
    cell: ({ row }) => {
      const incoming = parseFloat(row.getValue("incoming"))
      const outgoing = parseFloat(row.getValue("outgoing"))

      const diff = incoming + outgoing

      return (
        <div className={cn("text-right font-medium", diff < 0 ? "text-red-500" : "text-green-500")}>
          {formatCurrency(diff)}
        </div>
      )
    },
  },
]

export function MonthByMonthTable() {
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
    <Card>
      <CardHeader>
        <CardTitle>Consolidado Mês-a-Mês</CardTitle>
        <CardDescription>Como foi seus gastos nos últimos 12 meses?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="[&:has([role=checkbox])]:pl-3">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
      </CardContent>
    </Card>
  )
}
