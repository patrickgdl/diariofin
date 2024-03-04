import { useNavigate } from "react-router-dom"
import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import { TransactionsTable } from "~/components/transactions-table/transactions-table"
import useTransactionsQuery from "~/hooks/useTransactionsQuery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { columns } from "./components/columns"
import { TRANSACTION_TYPE } from "./constants"

export default function TransactionsPage() {
  const navigate = useNavigate()

  const { data: income, groupedData: groupedIncome, ...incomeQuery } = useTransactionsQuery(TRANSACTION_TYPE.INCOME)
  const {
    data: expenses,
    groupedData: groupedExpenses,
    ...expenseQuery
  } = useTransactionsQuery(TRANSACTION_TYPE.EXPENSE)

  if (incomeQuery.isLoading || expenseQuery.isLoading) {
    return <Loader />
  }

  if (incomeQuery.isError || expenseQuery.isError) {
    return <ErrorState />
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex p-6">
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
            <TransactionsTable
              data={income}
              columns={columns}
              groupedData={groupedIncome}
              onNewClick={() => navigate("/transactions/new?type=INCOME")}
            />
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="my-8">
            <TransactionsTable
              columns={columns}
              data={expenses}
              groupedData={groupedExpenses}
              onNewClick={() => navigate("/transactions/new?type=EXPENSE")}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
