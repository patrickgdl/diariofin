import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "~/ui/badge"
import { Checkbox } from "~/ui/checkbox"

import { CheckCircledIcon, CircleIcon } from "@radix-ui/react-icons"
import { DataTableColumnHeader } from "./transactions-column-header"
import { DataTableRowActions } from "./transactions-row-actions"
import formatCurrency from "~/utils/format-currency"
import formatDate from "~/utils/format-date"
import { parseISO } from "date-fns"
import { TransactionsQuery } from "~/queries/get-transactions"

export const columns: ColumnDef<TransactionsQuery[0]>[] = [
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
    accessorKey: "start_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
    cell: ({ row }) => <div className="w-[80px]">{formatDate(parseISO(row.getValue("start_date")))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Descrição" />,
    cell: ({ row }) => {
      return <span className="max-w-[500px] truncate font-medium">{row.getValue("description")}</span>
    },
  },
  {
    accessorKey: "transaction_categories",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Categoria" />,
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.transaction_categories?.name}</Badge>
    },
  },
  // {
  //   accessorKey: "is_done",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {row.original.transactions_instance?.is_done ? (
  //           <CircleIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         ) : (
  //           <CheckCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{row.original.transactions_instance?.is_done ? "Recebido" : "Não recebido"}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    accessorKey: "account",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Conta" />,
    cell: ({ row }) => <span>{row.original.account?.name}</span>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "clients",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
    cell: ({ row }) => <span>{row.original.clients?.name}</span>,
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
