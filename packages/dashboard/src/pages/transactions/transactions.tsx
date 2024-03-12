import { useNavigate } from "react-router-dom"
import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import { TransactionsTable } from "~/components/transactions-table/transactions-table"
import useTransactionsQuery from "~/hooks/useTransactionsQuery"

import { columns } from "./components/columns"
import { Button } from "~/ui/button"
import { ArrowDownFromLine, ArrowUpFromLine, PlusCircleIcon } from "lucide-react"
import { Separator } from "~/ui/separator"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import * as React from "react"
import { TransactionDisplay } from "./components/transaction-display"

export default function TransactionsPage() {
  const navigate = useNavigate()
  const { data, groupedData, ...transactionsQuery } = useTransactionsQuery()

  const [selected, setSelected] = React.useState(data[0] || null)

  if (transactionsQuery.isLoading || transactionsQuery.isFetching) {
    return <Loader />
  }

  if (transactionsQuery.isError) {
    return <ErrorState />
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen items-stretch">
      <ResizablePanel minSize={30} defaultSize={55} className="!overflow-y-auto">
        <div className="flex h-[52px] items-center px-4 py-2">
          <h1 className="text-lg font-medium">Todas as Transações</h1>

          <div className="ml-auto space-x-1 flex items-center">
            <Popover>
              <PopoverTrigger>
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

        <div className="p-2">
          <TransactionsTable columns={columns} data={data} groupedData={groupedData} onSelect={setSelected} />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={45}>
        {selected ? (
          <TransactionDisplay
            transaction={selected}
            onDeactivate={console.log}
            onEdit={(acc) => navigate(`/accounts/${acc.id}`)}
          />
        ) : (
          <div className="p-8 text-center text-muted-foreground">Sem transação selecionada</div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
