import { Button } from "@fluxozen/ui/button"
import { Drawer, DrawerContent } from "@fluxozen/ui/drawer"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@fluxozen/ui/resizable"
import { Separator } from "@fluxozen/ui/separator"
import { PlusIcon } from "lucide-react"
import * as React from "react"
import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import useMediaQuery from "~/hooks/use-media-query"
import useTransactionsByTypeQuery from "~/hooks/useTransactionsByType"
import { pushModal } from "~/modals"

import { TRANSACTION_TYPE } from "../transactions/constants"
import { CategoryDisplay } from "./components/category-display"
import { CategoriesTable, TransactionGroupedByCategory } from "./components/categories-table"
import { SpentSoFarCard } from "./components/spent-so-far-card"

export default function CategoriesDashboard() {
  const { isDesktop } = useMediaQuery()
  const [selected, setSelected] = React.useState<TransactionGroupedByCategory["categories"][0] | null>(null)

  const { data, isLoading, isError } = useTransactionsByTypeQuery(TRANSACTION_TYPE.EXPENSE)

  const pendingTotal = data
    .filter((transaction) => transaction.transactions_instance?.is_done === false)
    .reduce((acc, curr) => acc + curr.amount, 0)

  const doneTotal = data
    .filter((transaction) => transaction.transactions_instance?.is_done === true)
    .reduce((acc, curr) => acc + curr.amount, 0)

  const total = doneTotal + pendingTotal

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

          <div className="ml-auto">
            <Button variant="ghost" onClick={() => pushModal("DialogCategory")}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nova categoria
            </Button>
          </div>
        </div>

        <Separator />

        <div className="py-8 px-4">
          <SpentSoFarCard data={data} doneTotal={doneTotal} pendingTotal={pendingTotal} />

          <div className="py-8">
            <CategoriesTable data={data} total={total} />
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
