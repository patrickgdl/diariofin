import { UseFormReturn } from "react-hook-form"
import useAppContext from "~/hooks/useAppContext"
import { CategoryGroups } from "~/types/category-groups"
import { Clients } from "~/types/clients"
import { TransactionCategories } from "~/types/transaction-categories"
import { Badge } from "~/ui/badge"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"

import { TransactionExpenseFormType } from "./transactions-expense-form-schema"
import CategoryBadge from "~/components/category-badge"

type Categories = Omit<TransactionCategories, "group_id" | "user_id"> & {
  category_groups: Omit<CategoryGroups, "user_id"> | null
}

type TransactionDataFormProps = {
  form: UseFormReturn<TransactionExpenseFormType, any, undefined>
  categories: Categories[]
  clientsOrSuppliers: Clients[]
}

const TransactionDataForm = ({ form, categories, clientsOrSuppliers }: TransactionDataFormProps) => {
  const { accounts } = useAppContext()

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="flex w-full space-x-1">
        <div className="w-2/4">
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
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center space-x-4">
                                <span>{category.name}</span>
                                <CategoryBadge category={category} />
                              </div>
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

        {/* <div className="w-2/4">
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
        </div> */}
      </div>
    </div>
  )
}

export default TransactionDataForm
