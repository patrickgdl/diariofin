import ErrorState from "~/components/error-state"
import Loader from "~/components/loader"
import useClientsByType from "~/hooks/useClientsByTypeQuery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fluxozen/ui/tabs"

import { ClientsTable } from "./components/clients-table"
import { SuppliersTable } from "./components/suppliers-table"

export default function ClientsPage() {
  const { data: clients, ...clientsQuery } = useClientsByType("CLIENT")
  const { data: suppliers, ...suppliersQuery } = useClientsByType("SUPPLIER")

  if (clientsQuery.isLoading || suppliersQuery.isLoading) {
    return <Loader />
  }

  if (clientsQuery.isError || suppliersQuery.isError) {
    return <ErrorState />
  }

  return (
    <div className="flex flex-col p-4 md:p-6">
      <div className="space-y-6 h-[calc(100vh-80px)] overflow-y-auto">
        <h2 className="text-3xl font-bold tracking-tight">Clientes e Fornecedores</h2>

        <div className="flex flex-col justify-between">
          <Tabs defaultValue="clients" className="space-y-4">
            <TabsList className="w-full py-5 px-1">
              <TabsTrigger className="w-full py-2" value="clients">
                Clientes
              </TabsTrigger>
              <TabsTrigger className="w-full py-2" value="suppliers">
                Fornecedores
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clients" className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Aqui uma lista dos seus clientes. Você pode adicionar, editar e remover clientes.
              </p>

              <ClientsTable clients={clients} />
            </TabsContent>

            <TabsContent value="suppliers" className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Aqui uma lista dos seus fornecedores. Você pode adicionar, editar e remover fornecedores.
              </p>

              <SuppliersTable suppliers={suppliers} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
