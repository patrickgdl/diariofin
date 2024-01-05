import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Switch } from "~/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import { Textarea } from "~/ui/textarea"

import TransactionAmountForm from "./transaction-amount-form"
import TransactionRecurrenceForm from "./transaction-recurrence-form"
import formSchema, { ClientFormType } from "../schema/transactions-form-schema"
import { InputCurrency } from "~/ui/input-currency"
import { Input } from "~/ui/input"

type TransactionDataFormProps = {
  onSubmit: (values: ClientFormType) => void
}

const TransactionDataForm = ({ onSubmit }: TransactionDataFormProps) => {
  const form = useForm<ClientFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      description: "",
      is_supplier: false,
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
          <div className="flex justify-between items-end w-full space-x-4">
            <div className="w-2/4">
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do recebimento</FormLabel>
                    <FormControl>
                      <InputCurrency
                        id="input-amount"
                        name="input-amount"
                        placeholder="R$ 00,00"
                        defaultValue={field.value}
                        onCustomChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-2/4">
              <FormField
                control={form.control}
                name="is_client"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-0 space-x-4">
                    <FormLabel className="text-base">Já foi recebido?</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Breve descrição do recebimento." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Tabs defaultValue="data" className="space-y-4">
            <TabsList>
              <TabsTrigger value="data">Dados do Lançamento</TabsTrigger>
              <TabsTrigger value="recurrence">Recorrência</TabsTrigger>
              <TabsTrigger value="additional">Adicionais</TabsTrigger>
            </TabsList>

            <TabsContent value="data">
              <TransactionAmountForm form={form} />
            </TabsContent>

            <TabsContent value="recurrence">
              <TransactionRecurrenceForm form={form} />
            </TabsContent>

            <TabsContent value="additional" className="space-y-4">
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

export default TransactionDataForm
