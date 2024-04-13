import { CheckCircledIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"
import CategoryBadge from "~/components/category-badge"
import { TransactionsQuery } from "~/queries/get-transactions"
import { Avatar, AvatarFallback, AvatarImage } from "@fluxozen/ui/avatar"
import { Checkbox } from "@fluxozen/ui/checkbox"
import { TableCell } from "@fluxozen/ui/table"
import { cn } from "@fluxozen/ui/utils"
import formatCurrency from "~/utils/format-currency"
import { getAcronym } from "~/utils/get-acronym"

import { TRANSACTION_TYPE } from "../constants"
import { DataTableRowActions } from "./transactions-row-actions"

export const columns: ColumnDef<TransactionsQuery[0]>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <TableCell>
        <Checkbox
          checked={row.getIsSelected()}
          aria-label="Selecionar linha"
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </TableCell>
    ),
  },
  {
    accessorKey: "description",
    cell: ({ row }) => (
      <TableCell className="w-1/5">
        {/* @ts-ignore */}
        <div className={cn("capitalize", row.original.transactions_instance.is_cancelled && "line-through")}>
          {row.getValue("description")}
        </div>
      </TableCell>
    ),
  },
  {
    accessorKey: "is_done",
    cell: ({ row }) => {
      return (
        <TableCell className="w-1/5">
          <div className="flex md:w-[150px] items-center">
            {/* @ts-ignore */}
            {row.original.transactions_instance?.is_done ? (
              <CheckCircledIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            ) : (
              <CircleIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            {/* @ts-ignore */}
            <span className="hidden md:block">
              {row.original.transactions_instance?.is_done ? "Confirmado" : "Pendente"}
            </span>
          </div>
        </TableCell>
      )
    },
    filterFn: (row, id, value) => {
      return (
        // @ts-ignore
        (value[0] === "true" && row.original.transactions_instance?.is_done) ||
        // @ts-ignore
        (value[0] === "false" && !row.original.transactions_instance?.is_done)
      )
    },
  },
  {
    accessorKey: "transaction_categories",
    cell: ({ row }) => {
      return (
        <TableCell className="w-1/5">
          {row.original.transaction_types?.id === TRANSACTION_TYPE.EXPENSE ? (
            <CategoryBadge category={row.original.transaction_categories!} />
          ) : null}
        </TableCell>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.transaction_categories?.id)
    },
  },
  {
    accessorKey: "account",
    cell: ({ row }) => (
      <TableCell className="w-1/5">
        <div className="flex items-center space-x-1">
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${row.original.account?.id}.png`}
              alt={row.original.account?.name || ""}
            />
            <AvatarFallback>{getAcronym(row.original.account?.name || "")}</AvatarFallback>
          </Avatar>

          <span className="min-w-[100px]">{row.original.account?.name}</span>
        </div>
      </TableCell>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.original.account?.id)
    },
  },
  {
    accessorKey: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      return (
        <TableCell className="w-1/5">
          <div className={cn("text-right font-medium", amount < 0 ? "" : "text-green-500")}>
            {formatCurrency(amount)}
          </div>
        </TableCell>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // @ts-ignore
      return row.original.transactions_instance.is_cancelled || row.original.transactions_instance.is_refunded ? (
        <TableCell />
      ) : (
        <TableCell>
          <DataTableRowActions row={row} />
        </TableCell>
      )
    },
  },
]
