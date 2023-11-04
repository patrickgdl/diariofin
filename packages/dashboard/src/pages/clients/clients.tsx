import { ClientsTable } from "./components/clients-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import { SuppliersTable } from "./components/suppliers-table"

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      <div className="space-y-4 p-8 pt-6 h-[calc(100vh-80px)] overflow-y-auto">
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

              <ClientsTable />
            </TabsContent>

            <TabsContent value="suppliers" className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Fornecedores</h2>
              <p className="text-sm text-muted-foreground">
                Aqui uma lista dos seus fornecedores. Você pode adicionar, editar e remover fornecedores.
              </p>

              <SuppliersTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
