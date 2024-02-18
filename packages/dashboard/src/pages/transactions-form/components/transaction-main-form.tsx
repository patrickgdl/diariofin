import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import useCategoriesAndGroups from "~/hooks/useCategoriesAndGroupsQuery"
import useClientsByType from "~/hooks/useClientsByTypeQuery"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import { Transactions } from "~/types/transactions"
import { Button } from "~/ui/button"
import { Calendar } from "~/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"
import { InputCurrency } from "~/ui/input-currency-alt"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { Switch } from "~/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "~/ui/toggle-group"
import { cn } from "~/utils/cn"
import formatDate from "~/utils/format-date"

import formSchema, { TransactionFormType } from "../schema/transactions-form-schema"
import TransactionDataForm from "./transaction-data-form"
import TransactionRecurrenceForm from "./transaction-recurrence-form"

type TransactionMainFormProps = {
  variant: keyof typeof TRANSACTION_TYPE
  transactionToUpdate?: Transactions
  onSubmit: (values: TransactionFormType) => void
}

const TransactionMainForm = ({ variant, onSubmit, transactionToUpdate }: TransactionMainFormProps) => {
  const isExpense = variant === "EXPENSE"

  const { data: categories } = useCategoriesAndGroups()
  const { data: clientsOrSuppliers } = useClientsByType(isExpense ? "CLIENT" : "SUPPLIER")

  const form = useForm<TransactionFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_done: false,
      description: "",
      client_id: "",
    },
  })

  const handlePresetDate = (value: string) => {
    if (value) {
      const addedDays = addDays(new Date(), parseInt(value))
      form.setValue("start_date", addedDays, { shouldValidate: true })
    }
  }

  React.useEffect(() => {
    if (transactionToUpdate) {
      form.reset({
        ...transactionToUpdate,
        start_date: transactionToUpdate?.start_date ? new Date(transactionToUpdate.start_date) : new Date(),
      })
    }
  }, [transactionToUpdate])

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="transaction-form">
          <div className="space-y-8 py-2 pb-4">
            <div className="flex space-x-4 items-end justify-center w-full">
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
                        value={field.value}
                        onCustomChange={field.onChange}
                        autoFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_done"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-0 space-x-4">
                  <FormLabel className="text-base">Já foi recebido?</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-end w-auto">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data do Recebimento</FormLabel>

                    <div className="flex space-x-1">
                      <ToggleGroup variant="outline" type="single" onValueChange={handlePresetDate}>
                        <ToggleGroupItem value="0">Hoje</ToggleGroupItem>
                        <ToggleGroupItem value="1">Amanhã</ToggleGroupItem>
                        <ToggleGroupItem value="7">Semana que vem</ToggleGroupItem>
                      </ToggleGroup>

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
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-2/4">
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
            </div>

            <Tabs defaultValue="data" className="space-y-4">
              <TabsList>
                <TabsTrigger value="data">Dados do Lançamento</TabsTrigger>

                <TabsTrigger disabled value="recurrence">
                  Recorrência (em breve)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="data">
                <TransactionDataForm
                  form={form}
                  variant={variant}
                  categories={categories}
                  clientsOrSuppliers={clientsOrSuppliers}
                />
              </TabsContent>

              <TabsContent value="recurrence">
                <TransactionRecurrenceForm form={form} />
              </TabsContent>
            </Tabs>
          </div>
        </form>
      </Form>

      <DevTool control={form.control} />
    </>
  )
}

export default TransactionMainForm
