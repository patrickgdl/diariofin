import { PlusIcon } from "lucide-react"
import * as React from "react"
import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import useMediaQuery from "~/hooks/use-media-query"
import useTransactionsByTypeQuery from "~/hooks/useTransactionsByType"
import { Button } from "~/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/ui/dialog"
import { Drawer, DrawerContent } from "~/ui/drawer"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"
import { Table, TableBody } from "~/ui/table"

import { TRANSACTION_TYPE } from "../transactions/constants"
import { CategoriesForm } from "./components/categories-form"
import { CategoryDisplay } from "./components/category-display"
import { CategoryRow } from "./components/category-row"
import { SpentSoFarCard } from "./components/spent-so-far-card"
import { TransactionsByCategoryGrouped } from "./components/top-categories-table"

export default function CategoriesDashboard() {
  const { isDesktop } = useMediaQuery()
  const [selected, setSelected] = React.useState<TransactionsByCategoryGrouped["categories"][0] | null>(null)
  const [openNew, setOpenNew] = React.useState<boolean>(false)

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

  const groupedData = data.reduce((acc, curr) => {
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

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorState />
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-[1200px] items-stretch">
      <ResizablePanel
        id="categories"
        order={1}
        minSize={30}
        className="!overflow-y-auto"
        defaultSize={isDesktop ? 50 : 100}
      >
        <div className="flex h-[52px] items-center px-4 py-2">
          <h1 className="text-lg font-medium">Categorias</h1>

          <div className="ml-auto space-x-1 flex items-center">
            <Dialog open={openNew} onOpenChange={() => setOpenNew(!openNew)}>
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

                  <CategoriesForm onFinish={() => setOpenNew(false)} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator />

        <div className="py-8 px-4">
          <SpentSoFarCard data={data} doneTotal={doneTotal} pendingTotal={pendingTotal} />

          <div className="py-8">
            {groupedData.length ? (
              <Table>
                <TableBody>
                  {groupedData.map((row) => (
                    <CategoryRow key={row.id} row={row} total={total} defaultOpen onSelect={setSelected} />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="rounded-md border h-24 flex justify-center items-center">Sem resultados.</div>
            )}
          </div>
        </div>
      </ResizablePanel>

      {isDesktop ? (
        <>
          <ResizableHandle withHandle />

          <ResizablePanel order={2} id="category-display" defaultSize={50}>
            <CategoryDisplay category={selected} />
          </ResizablePanel>
        </>
      ) : (
        <Drawer open={Boolean(selected)} onClose={() => setSelected(null)}>
          <DrawerContent>
            <CategoryDisplay category={selected} />
          </DrawerContent>
        </Drawer>
      )}
    </ResizablePanelGroup>
  )
}
