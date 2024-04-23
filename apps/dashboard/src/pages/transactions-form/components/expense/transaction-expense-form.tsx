import { zodResolver } from "@hookform/resolvers/zod"
import { addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import useCategoriesAndGroups from "~/hooks/useCategoriesAndGroupsQuery"
import useClientsByType from "~/hooks/useClientsByTypeQuery"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import { Transactions } from "~/types/transactions"
import { Button } from "@diariofin/ui/button"
import { Calendar } from "@diariofin/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@diariofin/ui/form"
import { Input } from "@diariofin/ui/input"
import { InputCurrency } from "@diariofin/ui/input-currency-alt"
import { Popover, PopoverContent, PopoverTrigger } from "@diariofin/ui/popover"
import { Switch } from "@diariofin/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@diariofin/ui/tabs"
import { cn } from "@diariofin/ui/utils"
import formatDate from "~/utils/format-date"

import formSchema, { TransactionExpenseFormType } from "./transactions-expense-form-schema"
import TransactionExpenseDataForm from "./transaction-expense-data-form"
import { Textarea } from "@diariofin/ui/textarea"

type TransactionExpenseFormProps = {
  transactionToUpdate?: Transactions | null
  onSubmit: (values: TransactionExpenseFormType) => void
}

const TransactionExpenseForm = ({ onSubmit, transactionToUpdate }: TransactionExpenseFormProps) => {
  const { data: categories } = useCategoriesAndGroups()
  const { data: clientsOrSuppliers } = useClientsByType("CLIENT")

  const form = useForm<TransactionExpenseFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_done: false,
      client_id: "",
      notes: "",
      description: "",
      date: new Date(),
      type_id: TRANSACTION_TYPE.EXPENSE,
    },
  })

  React.useEffect(() => {
    if (transactionToUpdate) {
      form.reset({
        ...transactionToUpdate,
        category_id: transactionToUpdate?.category_id || "",
        date: transactionToUpdate?.date ? new Date(transactionToUpdate.date) : new Date(),
      })
    }
  }, [transactionToUpdate])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="transaction-form">
        <div className="space-y-8 md:py-4">
          <div className="flex flex-col-reverse md:flex-row space-x-1 items-center w-full">
            <div className="w-full md:w-2/4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data do Pagamento</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? formatDate(field.value, "PPP") : <span>Escolha uma data</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full mb-4 md:mb-0 md:w-2/4">
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="md:text-right">
                    <FormLabel htmlFor="input-amount">Valor do pagamento</FormLabel>
                    <FormControl>
                      <InputCurrency
                        id="input-amount"
                        name="input-amount"
                        placeholder="R$ 00,00"
                        className="md:text-right w-full"
                        defaultValue={field.value}
                        onCustomChange={field.onChange}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row md:space-x-3 items-center w-full">
            <div className="w-full md:w-3/4">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Breve descrição da transação..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full mb-4 md:mb-0 md:w-1/4">
              <FormField
                control={form.control}
                name="is_done"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 md:space-x-0 md:flex-col md:space-y-4 md:items-end">
                    <FormLabel>Já foi pago?</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Tabs defaultValue="data" className="space-y-4">
            <TabsList>
              <TabsTrigger value="data">Dados do Lançamento</TabsTrigger>
              <TabsTrigger value="notes">Anotações</TabsTrigger>
            </TabsList>

            <TabsContent value="data">
              <TransactionExpenseDataForm form={form} categories={categories} clientsOrSuppliers={clientsOrSuppliers} />
            </TabsContent>

            <TabsContent value="notes">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea className="resize-none" {...field} value={field.value ? field.value : ""} />
                    </FormControl>
                    <FormDescription>Insira qualquer observação que achar relevante para a transação.</FormDescription>
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

export default TransactionExpenseForm
