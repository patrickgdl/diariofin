import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@fluxozen/ui/card"
import { TransactionsByTypeQuery } from "~/queries/get-transactions-by-type"

import { CategoriesTable } from "./categories-table"

export function TopCategoriesTable({ data }: { data: TransactionsByTypeQuery }) {
  const total = data.reduce((acc, curr) => acc + Math.abs(curr.amount), 0)

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Top Categorias</CardTitle>
        <CardDescription>Onde você mais gasta seu dinheiro?</CardDescription>
      </CardHeader>
      <CardContent>
        <CategoriesTable data={data} total={total} />
      </CardContent>
    </Card>
  )
}
