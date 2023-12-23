import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "~/ui/badge"
import { Checkbox } from "~/ui/checkbox"

import { status } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import formatDate from "~/utils/format-date"
import { parseISO } from "date-fns"
import formatCurrency from "~/utils/format-currency"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
    cell: ({ row }) => <div className="w-[80px]">{formatDate(parseISO(row.getValue("date")))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Descrição" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Badge variant="outline">{row.original.category}</Badge>
          <span className="max-w-[500px] truncate font-medium">{row.getValue("description")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "done",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const stts = status.find((account) => account.value === row.getValue("done"))

      if (!stts) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {stts.icon && <stts.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{stts.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Conta" />,
    cell: ({ row }) => <span>{row.getValue("account")}</span>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "client",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
    cell: ({ row }) => <span>{row.getValue("client")}</span>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader className="justify-end" column={column} title="Valor" />,
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.getValue("amount"))}</div>,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
