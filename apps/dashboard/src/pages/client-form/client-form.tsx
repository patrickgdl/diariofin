import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useAuthUser } from "~/contexts/SessionContext"
import useClientById from "~/hooks/useClientByIdQuery"
import { useNewClientMutation } from "~/hooks/useNewClientMutation"
import { useUpdateClientMutation } from "~/hooks/useUpdateClientMutation"
import { Button } from "@fluxozen/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@fluxozen/ui/form"
import { Input } from "@fluxozen/ui/input"
import { Switch } from "@fluxozen/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fluxozen/ui/tabs"
import { Textarea } from "@fluxozen/ui/textarea"

import AddressForm from "./address-form"
import ClientDataForm from "./client-data-form"
import formSchema, { ClientFormType } from "./schema/client-form-schema"
import { Separator } from "@fluxozen/ui/separator"
import { ChevronLeftIcon } from "lucide-react"
import { toast } from "@fluxozen/ui/use-toast"
import { useNewAddressMutation } from "~/hooks/useNewAddressMutation"
import { useUpdateAddressMutation } from "~/hooks/useUpdateAddressMutation"

const ClientForm = () => {
  const navigate = useNavigate()

  const { id: user_id } = useAuthUser() || {}

  let { id } = useParams()
  const isAddMode = id === "new"
  const { data: clientToUpdate } = useClientById(id)

  const [searchParams] = useSearchParams()
  const variant = searchParams.get("type") as "CLIENT" | "SUPPLIER"

  const newClient = useNewClientMutation()
  const updateClient = useUpdateClientMutation()

  const newAddress = useNewAddressMutation()
  const updateAddress = useUpdateAddressMutation()

  const form = useForm<ClientFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      is_supplier: variant === "SUPPLIER",
      is_client: variant === "CLIENT",
      address: {
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        uf: "",
        cep: "",
      },
      email: "",
      cpf_cnpj: "",
      phone: "",
      person_type: "physical",
    },
  })

  const handleSubmit = async (values: ClientFormType) => {
    const { address, ...client } = values

    if (!user_id) return

    if (isAddMode) {
      const response = await newClient.mutateAsync({ ...client, user_id })

      if (address && response) {
        await newAddress.mutateAsync({ ...address, user_id, client_id: response[0].id })
      }

      toast({ title: `${variant === "CLIENT" ? "Cliente" : "Fornecedor"} criado com sucesso` })
      navigate("/clients")
    } else {
      const response = await updateClient.mutateAsync({ id: id!, client: { ...client } })

      if (address && response) {
        // await updateAddress.mutateAsync({ id: ID_DO_ENDERECO_AQUI, address: ...address, user_id, client_id: response[0].id })
      }

      toast({ title: `${variant === "CLIENT" ? "Cliente" : "Fornecedor"} atualizado com sucesso` })
      navigate("/clients")
    }
  }

  React.useEffect(() => {
    if (clientToUpdate) {
      form.reset({ ...clientToUpdate })
    }
  }, [clientToUpdate])

  return (
    <div className="space-y-6">
      <div>
        <div className="flex space-x-2 items-center p-4 md:p-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <div>
            <h3 className="text-lg font-medium">Formulário de {variant === "CLIENT" ? "Clientes" : "Fornecedores"}</h3>
            <p className="text-sm text-muted-foreground">
              Insira aqui um {variant === "CLIENT" ? "cliente" : "fornecedor"}.
            </p>
          </div>
        </div>

        <Separator />
      </div>

      <div className="flex flex-col mx-auto max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-6 py-2 pb-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe o nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {variant === "SUPPLIER" ? (
                <FormField
                  control={form.control}
                  name="is_client"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">É cliente?</FormLabel>
                        <FormDescription>Também cria um Cliente com os mesmos dados</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="is_supplier"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">É fornecedor?</FormLabel>
                        <FormDescription>Também cria um Fornecedor com os mesmos dados</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <Tabs defaultValue="data" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="data">Dados do Cliente</TabsTrigger>
                  <TabsTrigger value="address">Endereço</TabsTrigger>
                  <TabsTrigger value="anotations">Anotações</TabsTrigger>
                </TabsList>

                <TabsContent value="data">
                  <ClientDataForm form={form} />
                </TabsContent>

                <TabsContent value="address">
                  <AddressForm form={form} />
                </TabsContent>

                <TabsContent value="anotations" className="space-y-4">
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anotações</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Forneça informações relevantes do cliente nesse campo"
                            className="resize-none"
                            {...field}
                            value={field.value ? field.value : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-x-2 flex items-center justify-end">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancelar
              </Button>

              <Button type="submit">{isAddMode ? "Criar" : "Atualizar"}</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ClientForm
