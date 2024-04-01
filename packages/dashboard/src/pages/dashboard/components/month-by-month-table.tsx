import * as React from "react"
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
import { TransactionsByDateQuery } from "../queries/get-transactions-by-date"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import { getMonth, parseISO } from "date-fns"

type GroupForTable = { month: string; incoming: number; outgoing: number }

const groupByMonthAndSum = (data: TransactionsByDateQuery) => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const grouped: Record<string, GroupForTable> = {}

  // Initialize totals for all months to zero for both "pending" and "done"
  months.forEach((month) => {
    grouped[month] = {
      month: month,
      incoming: 0,
      outgoing: 0,
    }
  })

  data.forEach((item) => {
    const monthIndex = getMonth(parseISO(item.date))
    const month = months[monthIndex]
    // @ts-ignore
    if (item.transaction_types?.id === TRANSACTION_TYPE.INCOME) {
      grouped[month].incoming += item.amount
    } else {
      grouped[month].outgoing += Math.abs(item.amount)
    }
  })

  return Object.values(grouped)
}

export const columns: ColumnDef<GroupForTable>[] = [
  {
    id: "month",
    accessorFn: (row) => row.month, // Accessor function for date
    header: () => <div>Mês</div>,
    cell: ({ row }) => {
      const month = row.getValue("month")
      return month
    },
  },
  {
    accessorKey: "incoming",
    header: () => <div className="text-right">Entrada</div>,
    cell: ({ row }) => {
      const incoming = parseFloat(row.getValue("incoming"))
      return <div className="text-right font-medium">{formatCurrency(incoming)}</div>
    },
  },
  {
    accessorKey: "outgoing",
    header: () => <div className="text-right">Saída</div>,
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

      const diff = incoming + -outgoing

      const textColor = diff < 0 ? "text-red-500" : diff === 0 ? "" : "text-green-500"

      return <div className={cn("text-right font-medium", textColor)}>{formatCurrency(diff)}</div>
    },
  },
]

export function MonthByMonthTable({ data }: { data: TransactionsByDateQuery }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const groupedData = groupByMonthAndSum(data)

  const table = useReactTable({
    data: groupedData,
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
                    Sem resultados
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
