import { TransactionsByDateQuery } from "~/pages/dashboard/queries/get-transactions-by-date"
import { Table, TableBody, TableCell, TableRow } from "~/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/ui/accordion"
import { Badge } from "~/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/card"
import { Progress } from "~/ui/progress"
import formatCurrency from "~/utils/format-currency"
import { hexToRgb } from "~/utils/hexToRgb"
import { CategoriesTable } from "./categories-table"
import { formatPercentage } from "~/utils/format-percentage"

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
    totalAmount: number
  }[]
}

export function TopCategoriesTable({ data }: { data: TransactionsByDateQuery }) {
  const total = data.reduce((acc, curr) => acc + curr.amount, 0)

  const expenseTransactions = data.filter((transaction) => transaction.amount < 0)

  console.log(expenseTransactions)

  const groupedData = expenseTransactions.reduce((acc, curr) => {
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

    acc[groupId].totalAmount += amount

    let categoryObject = acc[groupId].categories.find((obj) => obj.transactionId === transactionId)

    if (!categoryObject) {
      categoryObject = {
        transactionId: transactionId,
        transaction_categories: curr.transaction_categories,
        amount,
        totalAmount: acc[groupId].totalAmount,
      }
      acc[groupId].categories.push(categoryObject)
    }

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
                <AccordionTrigger className="flex-row-reverse py-0 flex-none w-full [&>svg]:text-primary">
                  <Table>
                    <TableBody>
                      <TableRow
                      // onClick={() => onSelect(row.original)}
                      >
                        <TableCell className="flex w-full">
                          <div className="space-x-3">
                            <Badge
                              className="px-1.5"
                              style={{ backgroundColor: hexToRgb(groupedRows.color || "#000000", "0.2") }}
                            >
                              <span className="font-medium" style={{ color: groupedRows.color }}>
                                {groupedRows.categories.length}
                              </span>
                            </Badge>

                            <span>{groupedRows.name}</span>
                          </div>
                        </TableCell>

                        <TableCell className="w-1/5">
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Progress value={(groupedRows.totalAmount / total) * 100} className="w-full" />
                            </TooltipTrigger>
                            <TooltipContent>
                              Essa categoria equivale a {formatPercentage((groupedRows.totalAmount / total) * 100)} do
                              seu gasto total.
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>

                        <TableCell className="w-1/3 text-right">{formatCurrency(groupedRows.totalAmount)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <CategoriesTable data={groupedRows.categories} onSelect={console.log} />
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
