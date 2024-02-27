import { ColumnDef } from "@tanstack/react-table"
import { parseISO } from "date-fns"
import { TransactionsQuery } from "~/queries/get-transactions"
import { Badge } from "~/ui/badge"
import { Checkbox } from "~/ui/checkbox"
import formatCurrency from "~/utils/format-currency"
import formatDate from "~/utils/format-date"

import { DataTableColumnHeader } from "./transactions-column-header"
import { DataTableRowActions } from "./transactions-row-actions"
import { cn } from "~/utils/cn"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { getAcronym } from "~/utils/get-acronym"

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
    accessorKey: "start_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Data" />,
    cell: ({ row }) => <div className="w-[80px]">{formatDate(parseISO(row.getValue("start_date")), "dd/MM/yyyy")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>,
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
    accessorKey: "transaction_categories",
    header: "Categoria",
    cell: ({ row }) => {
      return (
        <Badge>
          {/* {icon && React.cloneElement(icon, { className: "h-4 w-4" })} */}
          <span className="ml-2">{row.original.transaction_categories?.name}</span>
        </Badge>
      )
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Conta" />,
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
    accessorKey: "clients",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
    cell: ({ row }) => <span>{row.original.clients?.name}</span>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
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
