import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"

import { ClientsTable } from "./components/clients-table"
import { SuppliersTable } from "./components/suppliers-table"
import { useToast } from "~/ui/use-toast"
import { Clients } from "~/types/clients"
import { ClientFormType } from "~/components/client-form-schema"
import supabase from "~/services/supabase"

export default function ClientsPage() {
  const { toast } = useToast()

  const [clients, setClients] = React.useState<Clients[]>([])
  const [suppliers, setSuppliers] = React.useState<Clients[]>([])

  async function handleSubmit(values: ClientFormType) {
    const { address, ...client } = values

    const { data, error } = await supabase
      .from("clients")
      .insert({ ...client })
      .select()

    if (error) return toast({ variant: "destructive", description: "Ocorreu um erro." })

    if (data) {
      if (data[0].is_client) setClients([...clients, ...data])
      if (data[0].is_supplier) setSuppliers([...suppliers, ...data])

      toast({ description: "Salvo com sucesso" })
    }

    if (address) {
      const withClientId = { ...address, client_id: data[0].id }

      const { error } = await supabase
        .from("address")
        .insert({ ...withClientId })
        .select()

      if (error) return toast({ variant: "destructive", description: "Ocorreu um erro ao salvar o endereço." })
    }
  }

  const getClients = async () => {
    const { data, error } = await supabase.from("clients").select("*").eq("is_client", true)

    if (error) return toast({ variant: "destructive", description: "Erro ao requisitar clientes." })

    setClients(data)
  }

  const getSuppliers = async () => {
    const { data, error } = await supabase.from("clients").select("*").eq("is_supplier", true)

    if (error) return toast({ variant: "destructive", description: "Erro ao requisitar fornecedores." })

    setSuppliers(data)
  }

  React.useEffect(() => {
    getClients()
    getSuppliers()
  }, [])

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
