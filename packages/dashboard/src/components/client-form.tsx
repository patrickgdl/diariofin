import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"
import { Switch } from "~/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import { Textarea } from "~/ui/textarea"

import AddressForm from "./address-form"
import ClientDataForm from "./client-data-form"
import formSchema, { ClientFormType } from "./client-form-schema"

type ClientFormProps = {
  isSupplier: boolean
  onSubmit: (values: ClientFormType) => void
}

const ClientForm = ({ onSubmit, isSupplier }: ClientFormProps) => {
  const form = useForm<ClientFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      is_supplier: isSupplier,
      is_client: !isSupplier,
      email: "",
      cpf_cnpj: "",
      phone: "",
      person_type: "physical",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="account-form">
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
          {isSupplier ? (
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </Form>
  )
}

export default ClientForm
