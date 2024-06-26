import { zodResolver } from "@hookform/resolvers/zod"
import { addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import useAppContext from "~/hooks/useAppContext"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import { Transactions } from "~/types/transactions"
import { Button } from "@diariofin/ui/button"
import { Calendar } from "@diariofin/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@diariofin/ui/form"
import { Input } from "@diariofin/ui/input"
import { InputCurrency } from "@diariofin/ui/input-currency-alt"
import { Popover, PopoverContent, PopoverTrigger } from "@diariofin/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@diariofin/ui/select"
import { Switch } from "@diariofin/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@diariofin/ui/toggle-group"
import { cn } from "@diariofin/ui/utils"
import formatDate from "~/utils/format-date"

import formSchema, { TransactionIncomeFormType } from "./transaction-income-form-schema"

type TransactionIncomeFormProps = {
  transactionToUpdate?: Transactions | null
  onSubmit: (values: TransactionIncomeFormType) => void
}

const TransactionIncomeForm = ({ onSubmit, transactionToUpdate }: TransactionIncomeFormProps) => {
  // const { data: clientsOrSuppliers } = useClientsByType("SUPPLIER")
  const { accounts } = useAppContext()

  const form = useForm<TransactionIncomeFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_done: false,
      description: "",
      notes: "",
      date: new Date(),
      client_id: "",
      type_id: TRANSACTION_TYPE.INCOME,
    },
  })

  const handlePresetDate = (value: string) => {
    if (value) {
      const addedDays = addDays(new Date(), parseInt(value))
      form.setValue("date", addedDays, { shouldValidate: true })
    }
  }

  React.useEffect(() => {
    if (transactionToUpdate) {
      form.reset({
        ...transactionToUpdate,
        date: transactionToUpdate?.date ? new Date(transactionToUpdate.date) : new Date(),
      })
    }
  }, [transactionToUpdate])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="transaction-form">
        <div className="space-y-8 py-2 pb-4">
          <div className="flex space-x-1 items-center w-full">
            <div className="w-2/4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data do Recebimento</FormLabel>

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

            <div className="w-2/4">
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel htmlFor="input-amount">Valor do recebimento</FormLabel>
                    <FormControl>
                      <InputCurrency
                        id="input-amount"
                        name="input-amount"
                        className="text-right w-full"
                        placeholder="R$ 00,00"
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

          <FormField
            control={form.control}
            name="is_done"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 space-x-4">
                <FormLabel>Já foi recebido?</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-1">
            <div className="w-2/4">
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

            <div className="w-2/4">
              <FormField
                control={form.control}
                name="account_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conta</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma conta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts?.length > 0 &&
                          accounts.map((account) => {
                            return (
                              <SelectItem key={account.id} value={account.id}>
                                {account.name}
                              </SelectItem>
                            )
                          })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default TransactionIncomeForm
