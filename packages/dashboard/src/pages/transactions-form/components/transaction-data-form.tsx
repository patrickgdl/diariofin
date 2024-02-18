import { UseFormReturn } from "react-hook-form"
import useAppContext from "~/hooks/useAppContext"
import { TRANSACTION_TYPE } from "~/pages/transactions/constants"
import { CategoryGroups } from "~/types/category-groups"
import { Clients } from "~/types/clients"
import { TransactionCategories } from "~/types/transaction-categories"
import { Badge } from "~/ui/badge"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"

import { TransactionFormType } from "../schema/transactions-form-schema"

type Categories = Omit<TransactionCategories, "group_id"> & { category_groups: CategoryGroups | null }

type TransactionDataFormProps = {
  variant: keyof typeof TRANSACTION_TYPE
  form: UseFormReturn<TransactionFormType, any, undefined>
  categories: Categories[]
  clientsOrSuppliers: Clients[]
}

const TransactionDataForm = ({ variant, form, categories, clientsOrSuppliers }: TransactionDataFormProps) => {
  const { accounts } = useAppContext()

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="w-3/4">
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
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
                            <Badge className="ml-4">{category.category_groups?.name}</Badge>
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

        <div className="w-2/4">
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <Select onValueChange={field.onChange} value={field.value ? field.value : undefined}>
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
