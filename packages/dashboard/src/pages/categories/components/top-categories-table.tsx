import { TransactionsByDateQuery } from "~/pages/dashboard/queries/get-transactions-by-date"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/ui/accordion"
import { Badge } from "~/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"
import { Progress } from "~/ui/progress"
import formatCurrency from "~/utils/format-currency"
import { hexToRgb } from "~/utils/hexToRgb"

export type TransactionsByDateGrouped = {
  id: string
  name: string
  color: string
  totalAmount: number
  categories: {
    transaction_categories: {
      id: string
      name: string
      icon: string
      category_groups: {
        id: string
        name: string
        color: string
      } | null
    }
    transactionId: string
    amount: number
  }[]
}

export function TopCategoriesTable({ data }: { data: TransactionsByDateQuery }) {
  const groupedData = data.reduce((acc, curr) => {
    if (!curr.transaction_categories?.category_groups) {
      return acc
    }

    const groupId = curr.transaction_categories.category_groups.id
    const transactionId = curr.id
    const amount = curr.amount

    if (!acc[groupId]) {
      acc[groupId] = {
        id: curr.transaction_categories.category_groups.id,
        name: curr.transaction_categories.category_groups.name,
        color: curr.transaction_categories.category_groups.color,
        totalAmount: 0,
        categories: [],
      }
    }

    let categoryObject = acc[groupId].categories.find((obj) => obj.transactionId === transactionId)

    if (!categoryObject) {
      categoryObject = {
        transactionId: transactionId,
        transaction_categories: curr.transaction_categories,
        amount,
      }
      acc[groupId].categories.push(categoryObject)
    }

    acc[groupId].totalAmount += amount

    return acc
  }, {} as Record<string, TransactionsByDateGrouped>)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Categorias</CardTitle>
        <CardDescription>Onde você mais gasta seu dinheiro?</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedData).length ? (
          <Accordion type="single" collapsible>
            {Object.entries(groupedData).map(([groupId, groupedRows]) => (
              <AccordionItem key={groupId} value={groupId} className="border-none">
                <AccordionTrigger className="flex-row-reverse py-2 flex-none w-full [&>svg]:text-primary">
                  <div className="flex items-center space-x-3 w-full">
                    <Badge
                      className="px-1.5"
                      style={{ backgroundColor: hexToRgb(groupedRows.color || "#000000", "0.2") }}
                    >
                      <span className="font-medium" style={{ color: groupedRows.color }}>
                        {groupedRows.categories.length}
                      </span>
                    </Badge>

                    <span className="flex w-2/3">{groupedRows.name}</span>
                    <Progress value={80} className="w-1/3" />
                    <span className="flex justify-end w-1/3">{formatCurrency(groupedRows.totalAmount)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0 px-5">
                  {groupedRows &&
                    groupedRows.categories.map((category) => (
                      <div key={category.transaction_categories.id} className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: groupedRows.color }} />
                          <span>{category.transaction_categories.icon}</span>
                          <span>{category.transaction_categories.name}</span>
                        </div>
                        <span>{formatCurrency(category.amount)}</span>
                      </div>
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="rounded-md border h-24 flex justify-center items-center">Sem transações para mostrar.</div>
        )}
      </CardContent>
    </Card>
  )
}
