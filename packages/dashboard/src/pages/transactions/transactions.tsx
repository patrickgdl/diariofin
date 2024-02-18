import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { columns } from "./components/columns"
import { DataTable } from "./components/transactions-table"
import { useNavigate } from "react-router-dom"
import useTransactionsQuery from "~/hooks/useTransactionsQuery"
import { TRANSACTION_TYPE } from "./constants"

export default function TransactionsPage() {
  const navigate = useNavigate()

  const { data: expenses } = useTransactionsQuery(TRANSACTION_TYPE.EXPENSE)
  const { data: income, isLoading, isError } = useTransactionsQuery(TRANSACTION_TYPE.INCOME)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <h2 className="text-2xl font-bold tracking-tight">Entradas e Saídas</h2>

      <Tabs defaultValue="income" className="space-y-4">
        <TabsList className="w-full py-5 px-1">
          <TabsTrigger className="w-full py-2" value="income">
            Contas a receber
          </TabsTrigger>
          <TabsTrigger className="w-full py-2" value="expenses">
            Contas a pagar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <div className="my-8">
            <DataTable onNewClick={() => navigate("/transactions/new")} data={income} columns={columns} />
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="my-8">
            <DataTable onNewClick={() => navigate("/transactions/new")} data={expenses} columns={columns} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
