import { PlusIcon } from "lucide-react"
import * as React from "react"
import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import useTransactionsByTypeQuery from "~/hooks/useTransactionsByType"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/ui/dialog"
import { Progress } from "~/ui/progress"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"
import { Table, TableBody, TableCell, TableRow } from "~/ui/table"
import formatCurrency from "~/utils/format-currency"
import { hexToRgb } from "~/utils/hexToRgb"

import { TRANSACTION_TYPE } from "../transactions/constants"
import { CategoriesDisplay, CategoriesDisplayProps } from "./components/categories-display"
import { CategoriesForm } from "./components/categories-form"
import { CategoriesTable } from "./components/categories-table"
import { SpentSoFarCard } from "./components/spent-so-far-card"
import { TransactionsByDateGrouped } from "./components/top-categories-table"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"
import { formatPercentage } from "~/utils/format-percentage"

export default function CategoriesDashboard() {
  const [selectedCategory, setSelectedCategory] = React.useState<TransactionsByDateGrouped["categories"][0] | null>(
    null
  )
  const { data, isLoading, isError } = useTransactionsByTypeQuery(TRANSACTION_TYPE.EXPENSE)

  const pendingTotal = data
    // @ts-ignore
    .filter((transaction) => transaction.transactions_instance.is_done === false)
    .reduce((acc, curr) => acc + curr.amount, 0)

  const doneTotal = data
    // @ts-ignore
    .filter((transaction) => transaction.transactions_instance.is_done === true)
    .reduce((acc, curr) => acc + curr.amount, 0)

  const total = doneTotal + pendingTotal

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

        <div className="py-8 px-4">
          <SpentSoFarCard data={data} doneTotal={doneTotal} pendingTotal={pendingTotal} />

          <div className="py-8">
            {Object.entries(groupedByCategoryGroup).length ? (
              Object.entries(groupedByCategoryGroup).map(([groupedDate, groupedRows]) => (
                <React.Fragment key={groupedDate}>
                  <Table>
                    <TableBody>
                      <TableRow
                      // onClick={() => onSelect(row.original)}
                      >
                        <TableCell className="w-1/3 space-x-2">
                          <Badge
                            className="px-1.5"
                            style={{ backgroundColor: hexToRgb(groupedRows.color || "#000000", "0.2") }}
                          >
                            <span className="font-medium" style={{ color: groupedRows.color }}>
                              {groupedRows.categories.length}
                            </span>
                          </Badge>

                          <span>{groupedRows.name}</span>
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

                  <CategoriesTable data={groupedRows.categories} onSelect={(row) => setSelectedCategory(row)} />
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
