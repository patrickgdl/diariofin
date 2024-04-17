import { Table, TableBody } from "@fluxozen/ui/table"
import { TransactionsByTypeQuery } from "~/queries/get-transactions-by-type"

import { CategoryRow } from "./category-row"

export type TransactionGroupedByCategory = {
  id: string
  name: string
  color?: string | null
  totalAmount: number
  categories: {
    transaction_categories: {
      id: string
      name: string
      icon: string
      category_groups: {
        id: string
        name: string
        color?: string | null
      } | null
    }
    transactionId: string
    amount: number
    totalAmount: number
  }[]
}

type CategoryRowProps = {
  data: TransactionsByTypeQuery
  total: number
  onSelect: (category: TransactionGroupedByCategory["categories"][0]) => void
}

export function CategoriesTable({ data, total, onSelect }: CategoryRowProps) {
  const groupedData = data
    .reduce((acc, curr) => {
      if (!curr.transaction_categories?.category_groups) {
        return acc
      }

      const categoryId = curr.transaction_categories.id
      const existingCategory = acc.find((cat) => cat.id === categoryId)

      if (existingCategory) {
        existingCategory.totalAmount += curr.amount
        existingCategory.categories.push({
          transactionId: curr.id,
          transaction_categories: curr.transaction_categories,
          amount: curr.amount,
          totalAmount: existingCategory.totalAmount,
        })
      } else {
        acc.push({
          id: categoryId,
          name: curr.transaction_categories.category_groups.name,
          color: curr.transaction_categories.category_groups.color,
          totalAmount: curr.amount,
          categories: [
            {
              transactionId: curr.id,
              transaction_categories: curr.transaction_categories,
              amount: curr.amount,
              totalAmount: curr.amount,
            },
          ],
        })
      }

      return acc
    }, [] as TransactionGroupedByCategory[])
    .sort((a, b) => Math.abs(b.totalAmount) - Math.abs(a.totalAmount))

  return (
    <>
      {groupedData.length ? (
        <Table>
          <TableBody>
            {groupedData.map((row) => (
              <CategoryRow row={row} key={row.id} total={total} onSelect={onSelect} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="rounded-md border h-24 flex justify-center items-center">Sem transações para mostrar.</div>
      )}
    </>
  )
}
