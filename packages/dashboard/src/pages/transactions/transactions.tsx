import { useNavigate } from "react-router-dom"
import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import { TransactionsTable } from "~/components/transactions-table/transactions-table"
import useTransactionsQuery from "~/hooks/useTransactionsQuery"

import { columns } from "./components/columns"
import { Button } from "~/ui/button"
import { PlusCircleIcon } from "lucide-react"
import { Separator } from "~/ui/separator"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"

export default function TransactionsPage() {
  const navigate = useNavigate()

  const { data, groupedData, ...transactionsQuery } = useTransactionsQuery()

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
            <Button variant="ghost" onClick={() => navigate("/transactions/new?type=INCOME")}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Nova transação
            </Button>
          </div>
        </div>

        <Separator />

        <div className="p-2">
          <TransactionsTable columns={columns} data={data} groupedData={groupedData} />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={45}>
        <div className="p-8 text-center text-muted-foreground">Sem transação selecionada</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
