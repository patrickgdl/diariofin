import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import transactions from "./data/tasks"
import { useNavigate } from "react-router-dom"

export default function TransactionsPage() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex-1 flex-col space-y-8 px-8 py-4 md:flex">
      <h2 className="text-2xl font-bold tracking-tight">Entradas e Saídas</h2>

      <Tabs defaultValue="incoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incoming">Contas a receber</TabsTrigger>
          <TabsTrigger value="outgoing">Contas a pagar</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming">
          <div className="my-8">
            <DataTable onNewClick={() => navigate("/transactions/new")} data={transactions} columns={columns} />
          </div>
        </TabsContent>

        <TabsContent value="outgoing">
          <div className="my-8">
            <DataTable onNewClick={() => navigate("/transactions/new")} data={transactions} columns={columns} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
