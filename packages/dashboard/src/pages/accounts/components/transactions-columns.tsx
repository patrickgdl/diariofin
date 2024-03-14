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
    enableResizing: false, //disable resizing for just this column
  },
  {
    accessorKey: "transaction_categories",
    header: "Categoria",
    cell: ({ row }) => {
      return (
        <Badge style={{ backgroundColor: row.original.transaction_categories?.category_groups?.color }}>
          <span className="mr-1">{row.original.transaction_categories?.icon}</span>
          {row.original.transaction_categories?.name}
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
