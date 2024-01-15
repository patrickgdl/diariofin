import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { columns } from "./components/columns"
import { DataTable } from "./components/transactions-table"
import { useNavigate } from "react-router-dom"
import supabase from "~/services/supabase"
import { useToast } from "~/ui/use-toast"
import * as React from "react"
import { QueryData } from "@supabase/supabase-js"

import { TRANSACTION_QUERY, TRANSACTION_TYPE } from "./constants"

const incomeQuery = supabase.from("transactions").select(TRANSACTION_QUERY).eq("type_id", TRANSACTION_TYPE.INCOME)
const expensesQuery = supabase.from("transactions").select(TRANSACTION_QUERY).eq("type_id", TRANSACTION_TYPE.EXPENSE)

type IncomeResult = QueryData<typeof incomeQuery>
type ExpensesResult = QueryData<typeof expensesQuery>

export default function TransactionsPage() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [income, setIncome] = React.useState<IncomeResult>([])
  const [expenses, setExpenses] = React.useState<ExpensesResult>([])

  const getIncome = async () => {
    const { data, error } = await incomeQuery

    if (error) return toast({ variant: "destructive", description: "Erro ao requisitar entradas." })

    setIncome(data)
  }

  const getExpenses = async () => {
    const { data, error } = await expensesQuery

    if (error) return toast({ variant: "destructive", description: "Erro ao requisitar saídas." })

    setExpenses(data)
  }

  React.useEffect(() => {
    getIncome()
    getExpenses()
  }, [])

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <h2 className="text-2xl font-bold tracking-tight">Entradas e Saídas</h2>

      <Tabs defaultValue="income" className="space-y-4">
        <TabsList>
          <TabsTrigger value="income">Contas a receber</TabsTrigger>
          <TabsTrigger value="expenses">Contas a pagar</TabsTrigger>
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
