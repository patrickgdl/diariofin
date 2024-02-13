import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import supabase from "~/services/supabase"
import { Clients } from "~/types/clients"
import { Badge } from "~/ui/badge"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { toast } from "~/ui/use-toast"

import { TransactionFormType } from "../schema/transactions-form-schema"
import useAppContext from "~/hooks/useAppContext"
import { CategoryGroups } from "~/types/category-groups"
import { TransactionCategories } from "~/types/transaction-categories"

type TransactionDataFormProps = {
  variant: keyof typeof TRANSACTION_TYPE
  form: UseFormReturn<TransactionFormType, any, undefined>
}

type Categories = Omit<TransactionCategories, "group_id"> & { category_groups: CategoryGroups | null }

const TransactionDataForm = ({ variant, form }: TransactionDataFormProps) => {
  const [categories, setCategories] = React.useState<Categories[]>([])
  const [clientsOrSuppliers, setClientsOrSuppliers] = React.useState<Clients[]>([])

  const { accounts } = useAppContext()

  const isExpense = variant === "EXPENSE"

  const getClientsOrSuppliers = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq(isExpense ? "is_client" : "is_supplier", true)

    if (error) return toast({ variant: "destructive", description: "Erro ao requisitar clientes." })

    setClientsOrSuppliers(data)
  }

  const getCategories = async () => {
    const { data, error } = await supabase.from("transaction_categories").select(`id, name, category_groups (id, name)`)

    if (error) return toast({ variant: "destructive", description: "Erro ao requisitar categorias." })

    setCategories(data)
  }

  React.useEffect(() => {
    getClientsOrSuppliers()
    getCategories()
  }, [])

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="w-2/4">
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.length > 0
                    ? categories.map((category) => {
                        return (
                          <SelectItem key={category.id} value={category.id} className="justify-between">
                            <span>{category.name}</span>
                            <Badge>{category.category_groups?.name}</Badge>
                          </SelectItem>
                        )
                      })
                    : null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex w-full space-x-1">
        <div className="w-2/4">
          <FormField
            control={form.control}
            name="account_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conta</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <div className="w-2/4">
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clientsOrSuppliers?.length > 0 &&
                      clientsOrSuppliers.map((client) => {
                        return (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
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
  )
}

export default TransactionDataForm
