import { ClientFormType } from "~/components/client-form-schema"
import { useNewAddressMutation } from "~/hooks/useNewAddressMutation"
import { useNewClientMutation } from "~/hooks/useNewClientMutation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { ClientsTable } from "./components/clients-table"
import { SuppliersTable } from "./components/suppliers-table"
import useClientsByType from "~/hooks/useClientsByTypeQuery"

export default function ClientsPage() {
  const { data: clients, ...clientsQuery } = useClientsByType("CLIENT")
  const { data: suppliers, ...suppliersQuery } = useClientsByType("SUPPLIER")

  const mutateClient = useNewClientMutation()
  const mutateAddress = useNewAddressMutation()

  async function handleSubmit(values: ClientFormType) {
    const { address, ...client } = values

    const response = await mutateClient.mutateAsync(client)

    if (address && response) {
      const withClientId = { ...address, client_id: response[0].id }

      await mutateAddress.mutateAsync(withClientId)
    }
  }

  if (clientsQuery.isLoading || suppliersQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (clientsQuery.isError || suppliersQuery.isError) {
    return <div>Error...</div>
  }

  return (
    <div className="flex flex-col">
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

              <ClientsTable clients={clients} onSubmit={handleSubmit} />
            </TabsContent>

            <TabsContent value="suppliers" className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Aqui uma lista dos seus fornecedores. Você pode adicionar, editar e remover fornecedores.
              </p>

              <SuppliersTable suppliers={suppliers} onSubmit={handleSubmit} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
