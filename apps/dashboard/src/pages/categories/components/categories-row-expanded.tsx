import { TableCell, TableRow } from "@fluxozen/ui/table"
import formatCurrency from "~/utils/format-currency"

import { TransactionsByCategoryGrouped } from "./top-categories-table"
import { Progress } from "@fluxozen/ui/progress"

type CategoriesRowExpandedProps = {
  categories: TransactionsByCategoryGrouped["categories"][0][]
  onSelect: (category: TransactionsByCategoryGrouped["categories"][0]) => void
}

export function CategoriesRowExpanded({ categories, onSelect }: CategoriesRowExpandedProps) {
  return (
    <>
      {categories.map((category) => (
        <TableRow key={category.transactionId} onClick={() => onSelect(category)}>
          <TableCell className="pr-0 pl-6 w-[5%]" />
          <TableCell className="w-[5%]">
            <div className="flex items-center justify-center">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: category.transaction_categories.category_groups?.color }}
              />
            </div>
          </TableCell>
          <TableCell className="w-1/2">
            <div className="flex items-center space-x-3">
              <div>{category.transaction_categories.icon}</div>
              <div className="capitalize">{category.transaction_categories.name}</div>
            </div>
          </TableCell>
          <TableCell className="w-1/5">
            <Progress
              value={
                Math.abs(category.totalAmount) > 0
                  ? (Math.abs(category.amount) / Math.abs(category.totalAmount)) * 100
                  : 0
              }
              className="w-full"
            />
          </TableCell>
          <TableCell className="w-1/3">
            <div className="text-right font-medium">{formatCurrency(category.amount)} </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
