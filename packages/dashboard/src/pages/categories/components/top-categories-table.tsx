import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"

import { CategoryRow } from "./category-row"
import { Table, TableBody } from "~/ui/table"
import { useNavigate } from "react-router-dom"
import { TransactionsByDateQuery } from "~/queries/get-transactions-by-date"

export type TransactionsByCategoryGrouped = {
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

export function TopCategoriesTable({ data }: { data: TransactionsByDateQuery }) {
  const navigate = useNavigate()

  const expenseTransactions = data.filter((transaction) => transaction.amount < 0)
  const total = expenseTransactions.reduce((acc, curr) => acc + Math.abs(curr.amount), 0)

  const groupedData = expenseTransactions.reduce((acc, curr) => {
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
        name: curr.transaction_categories.name,
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
  }, [] as TransactionsByCategoryGrouped[])

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Top Categorias</CardTitle>
        <CardDescription>Onde você mais gasta seu dinheiro?</CardDescription>
      </CardHeader>
      <CardContent>
        {groupedData.length ? (
          <Table>
            <TableBody>
              {groupedData.map((row) => (
                <CategoryRow
                  row={row}
                  key={row.id}
                  total={total}
                  onSelect={(c) => navigate(`/transactions/${c.transactionId}`)}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="rounded-md border h-24 flex justify-center items-center">Sem transações para mostrar.</div>
        )}
      </CardContent>
    </Card>
  )
}
