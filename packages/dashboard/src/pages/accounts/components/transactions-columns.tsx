import { ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "~/pages/transactions/components/transactions-row-actions"
import { TransactionsQuery } from "~/queries/get-transactions"
import { Badge } from "~/ui/badge"
import { cn } from "~/utils/cn"
import formatCurrency from "~/utils/format-currency"

export const columns: ColumnDef<TransactionsQuery[0]>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>,
  },
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
