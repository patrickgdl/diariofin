import { ClientFormType } from "~/components/client-form-schema"
import useClients from "~/hooks/useClientsQuery"
import { useNewAddressMutation } from "~/hooks/useNewAddressMutation"
import { useNewClientMutation } from "~/hooks/useNewClientMutation"
import useSuppliers from "~/hooks/useSuppliersQuery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { ClientsTable } from "./components/clients-table"
import { SuppliersTable } from "./components/suppliers-table"

export default function ClientsPage() {
  const { suppliers, ...suppliersQuery } = useSuppliers()
  const { clients, ...clientsQuery } = useClients()

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
      <div className="space-y-4 h-[calc(100vh-80px)] overflow-y-auto">
        <div className="flex flex-col justify-between space-y-2">
          <Tabs defaultValue="clients" className="space-y-4">
            <TabsList>
              <TabsTrigger value="clients">Clientes</TabsTrigger>
              <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
            </TabsList>

            <TabsContent value="clients" className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
              <p className="text-sm text-muted-foreground">
                Aqui uma lista dos seus clientes. Você pode adicionar, editar e remover clientes.
              </p>

              <ClientsTable clients={clients} onSubmit={handleSubmit} />
            </TabsContent>

            <TabsContent value="suppliers" className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Fornecedores</h2>
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
