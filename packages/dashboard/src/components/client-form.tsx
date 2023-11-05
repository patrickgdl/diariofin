import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import { Textarea } from "~/ui/textarea"

import AddressForm from "./address-form"
import ClientDataForm from "./client-data-form"
import { Switch } from "~/ui/switch"
import { Label } from "~/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip"

const formSchema = z.object({
  description: z
    .string()
    .max(10, {
      message: "Número da Conta deve conter no máximo 10 caracteres",
    })
    .optional(),
  name: z
    .string()
    .min(2, {
      message: "Nome precisa ser no mínimo 2 caracteres",
    })
    .max(50),
  is_supplier: z.string().optional(),
})

export type ClientFormType = z.infer<typeof formSchema>

type ClientFormProps = {
  onSubmit: (values: ClientFormType) => void
}

const ClientForm = ({ onSubmit }: ClientFormProps) => {
  const form = useForm<ClientFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      name: "",
      is_supplier: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="account-form">
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe o nome do cliente" {...field} />
                  </FormControl>
                  <FormDescription>Esse é o nome da conta para visualização.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-end">
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="supplier">
                      <span>É fornecedor?</span>
                    </Label>
                    <Switch id="supplier" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Essa opção também cria um Fornecedor com os mesmos dados.</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="space-y-2">
            <Tabs defaultValue="data" className="space-y-4">
              <TabsList>
                <TabsTrigger value="data">Dados do Cliente</TabsTrigger>
                <TabsTrigger value="address">Endereço</TabsTrigger>
                <TabsTrigger value="anotations">Anotações</TabsTrigger>
              </TabsList>

              <TabsContent value="data" className="space-y-4">
                <ClientDataForm onSubmit={() => null} />
              </TabsContent>

              <TabsContent value="address" className="space-y-4">
                <AddressForm onSubmit={() => null} />
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
        </div>
      </form>
    </Form>
  )
}

export default ClientForm
