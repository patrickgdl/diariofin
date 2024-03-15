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
import { TRANSACTION_TYPE } from "../constants"
import { hexToRgb } from "~/utils/hexToRgb"
import CategoryBadge from "~/components/category-badge"

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
        aria-label="Selecionar linha"
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    cell: ({ row }) => (
      // @ts-ignore
      <div className={cn("capitalize", row.original.transactions_instance.is_cancelled && "line-through")}>
        {row.getValue("description")}
      </div>
    ),
    enableResizing: false,
  },
  {
    accessorKey: "is_done",
    cell: ({ row }) => {
      return (
        <div className="flex w-[150px] items-center">
          {/* @ts-ignore */}
          {row.original.transactions_instance?.is_done ? (
            <CheckCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          ) : (
            <CircleIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          {/* @ts-ignore */}
          <span>{row.original.transactions_instance?.is_done ? "Confirmado" : "Não confirmado"}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableResizing: false,
  },
  {
    accessorKey: "transaction_categories",
    cell: ({ row }) => {
      return (
        <>
          {row.original.transaction_types?.id === TRANSACTION_TYPE.EXPENSE ? (
            <CategoryBadge category={row.original.transaction_categories!} />
          ) : null}
        </>
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
    enableResizing: false,
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      return (
        <div className={cn("text-right font-medium", amount < 0 ? "" : "text-green-500")}>{formatCurrency(amount)}</div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // @ts-ignore
      return row.original.transactions_instance.is_cancelled ||
        // @ts-ignore
        row.original.transactions_instance.is_refunded ? null : (
        <DataTableRowActions row={row} />
      )
    },
  },
]
