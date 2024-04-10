import { ArrowDownFromLine, ArrowUpFromLine, PlusCircleIcon } from "lucide-react"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import { TransactionsTable } from "~/components/transactions-table/transactions-table"
import useMediaQuery from "~/hooks/use-media-query"
import useCategories from "~/hooks/useCategoriesQuery"
import useTransactionsQuery from "~/hooks/useTransactionsQuery"
import { Button } from "~/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Separator } from "~/ui/separator"

import { columns } from "./components/columns"
import { TransactionDisplay } from "./components/transaction-display"
import { TransactionsQuery } from "~/queries/get-transactions-by-account"
import { Drawer, DrawerContent } from "~/ui/drawer"

export default function TransactionsPage() {
  const navigate = useNavigate()
  const { isDesktop } = useMediaQuery()

  const { categories } = useCategories()
  const { data, groupedData, ...transactionsQuery } = useTransactionsQuery()

  const [selected, setSelected] = React.useState<TransactionsQuery[0] | null>(null)

  if (transactionsQuery.isLoading || transactionsQuery.isFetching) {
    return <Loader />
  }

  if (transactionsQuery.isError) {
    return <ErrorState />
  }

  const handleSelect = (selected: TransactionsQuery[0]) => {
    setSelected(selected)
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen items-stretch">
      <ResizablePanel
        order={1}
        minSize={30}
        id="transactions"
        className="!overflow-y-auto"
        defaultSize={isDesktop ? 60 : 100}
      >
        <div className="flex h-[52px] items-center px-4 py-2">
          <h1 className="text-lg font-medium">Transações</h1>

          <div className="ml-auto space-x-1 flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  Nova transação
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col space-y-1 w-36 p-0">
                <Button
                  variant="ghost"
                  className="flex justify-start space-x-1"
                  onClick={() => navigate("/transactions/new?type=INCOME")}
                >
                  <ArrowDownFromLine className="mr-2 h-4 w-4" />
                  Entrada
                </Button>

                <Button
                  variant="ghost"
                  className="flex justify-start space-x-1"
                  onClick={() => navigate("/transactions/new?type=EXPENSE")}
                >
                  <ArrowUpFromLine className="mr-2 h-4 w-4" />
                  Saída
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Separator />

        <TransactionsTable columns={columns} data={data} groupedData={groupedData} onSelect={handleSelect} />
      </ResizablePanel>

      {isDesktop ? (
        <>
          <ResizableHandle withHandle />

          <ResizablePanel id="transaction-display" order={2} defaultSize={40}>
            {selected ? (
              <TransactionDisplay
                categories={categories}
                transaction={selected}
                onDeactivate={console.log}
                onEdit={(acc) => navigate(`/accounts/${acc.id}`)}
              />
            ) : (
              <div className="p-8 text-center text-muted-foreground">Sem transação selecionada</div>
            )}
          </ResizablePanel>
        </>
      ) : (
        <Drawer open={Boolean(selected)} onClose={() => setSelected(null)}>
          <DrawerContent>
            {selected && (
              <TransactionDisplay
                categories={categories}
                transaction={selected}
                onDeactivate={console.log}
                onEdit={(acc) => navigate(`/accounts/${acc.id}`)}
              />
            )}
          </DrawerContent>
        </Drawer>
      )}
    </ResizablePanelGroup>
  )
}
