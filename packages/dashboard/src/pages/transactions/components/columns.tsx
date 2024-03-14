import { CheckCircledIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"
import { TransactionsQuery } from "~/queries/get-transactions"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Badge } from "~/ui/badge"
import { Checkbox } from "~/ui/checkbox"
import { cn } from "~/utils/cn"
import formatCurrency from "~/utils/format-currency"
import { getAcronym } from "~/utils/get-acronym"

import { DataTableRowActions } from "./transactions-row-actions"

export const columns: ColumnDef<TransactionsQuery[0]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>,
    enableResizing: false, //disable resizing for just this column
  },
  {
    accessorKey: "is_done",
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {row.original.transactions_instance?.is_done ? (
            <CheckCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          ) : (
            <CircleIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{row.original.transactions_instance?.is_done ? "Recebido" : "Não recebido"}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "transaction_categories",
    cell: ({ row }) => {
      return (
        <Badge style={{ backgroundColor: row.original.transaction_categories?.category_groups?.color }}>
          <span className="mr-1">{row.original.transaction_categories?.icon}</span>
          {row.original.transaction_categories?.name}
        </Badge>
      )
    },
    enableResizing: false,
  },
  {
    accessorKey: "account",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <Avatar className="h-5 w-5">
          <AvatarImage
            src={`https://avatar.vercel.sh/${row.original.account?.id}.png`}
            alt={row.original.account?.name || ""}
          />
          <AvatarFallback>{getAcronym(row.original.account?.name || "")}</AvatarFallback>
        </Avatar>

        <span>{row.original.account?.name}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      return (
        <div className={cn("text-right font-medium", amount < 0 ? "text-red-500" : "text-green-500")}>
          {formatCurrency(amount)}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
