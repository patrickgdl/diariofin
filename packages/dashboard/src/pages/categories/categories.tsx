import { PlusIcon } from "lucide-react"
import { Button } from "~/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/ui/dialog"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"

import { CategoriesTable } from "./components/categories-table"
import { CategoriesDisplay, CategoriesDisplayProps } from "./components/categories-display"
import { CategoriesForm } from "./components/categories-form"
import { SpentSoFarCard } from "./components/spent-so-far-card"
import { TopCategoriesTable, TransactionsByDateGrouped } from "./components/top-categories-table"
import useTransactionsQuery from "~/hooks/useTransactionsQuery"
import Loader from "~/components/loader"
import ErrorState from "~/components/error-state"
import * as React from "react"
import { Badge } from "~/ui/badge"
import { hexToRgb } from "~/utils/hexToRgb"
import formatCurrency from "~/utils/format-currency"
import { Progress } from "~/ui/progress"
import useTransactionsByTypeQuery from "~/hooks/useTransactionsByType"
import { TRANSACTION_TYPE } from "../transactions/constants"
import useTransactionsByCategoryQuery from "~/hooks/useTransactionsByCategory"

export const mails = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "American Express",
    available: 7665,
    change: 12,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Credit Card",
    paymentIds: ["m5gr84i9"],
    income: 10400,
    limit: 25000,
  },
]

export default function CategoriesDashboard() {
  const [selectedCategory, setSelectedCategory] = React.useState<CategoriesDisplayProps["category"] | null>(null)
  const { data, isLoading, isError } = useTransactionsByTypeQuery(TRANSACTION_TYPE.EXPENSE)

  const groupedByCategoryGroup = data.reduce((acc, curr) => {
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

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorState />
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-[1200px] items-stretch">
      <ResizablePanel minSize={30} defaultSize={50} className="!overflow-y-auto">
        <div className="flex h-[52px] items-center px-4 py-2">
          <h1 className="text-lg font-medium">Categorias</h1>

          <div className="ml-auto space-x-1 flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Nova categoria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="mx-auto w-full max-w-sm space-y-6">
                  <DialogHeader>
                    <DialogTitle className="text-sm">Nova categoria</DialogTitle>
                  </DialogHeader>

                  <CategoriesForm />

                  <Button className="w-full">Salvar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator />

        <div className="p-2">
          <SpentSoFarCard data={data} />

          <div className="px-4 py-6">
            {Object.entries(groupedByCategoryGroup).length ? (
              Object.entries(groupedByCategoryGroup).map(([groupedDate, groupedRows]) => (
                <React.Fragment key={groupedDate}>
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
                    <span className="flex justify-end w-1/3 text-right font-medium">
                      {formatCurrency(groupedRows.totalAmount)}
                    </span>
                  </div>

                  <CategoriesTable
                    data={groupedRows.categories}
                    onSelect={(row) => setSelectedCategory(row.transaction_categories)}
                  />
                </React.Fragment>
              ))
            ) : (
              <div className="rounded-md border h-24 flex justify-center items-center">Sem resultados.</div>
            )}
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50}>
        <CategoriesDisplay category={selectedCategory} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
