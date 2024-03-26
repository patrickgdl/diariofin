import { UseFormReturn } from "react-hook-form"
import useAppContext from "~/hooks/useAppContext"
import { Clients } from "~/types/clients"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"

import { TransactionIncomeFormType } from "./transaction-income-form-schema"

type TransactionDataFormProps = {
  form: UseFormReturn<TransactionIncomeFormType, any, undefined>
  clientsOrSuppliers: Clients[]
}

const TransactionDataForm = ({ form, clientsOrSuppliers }: TransactionDataFormProps) => {
  const { accounts } = useAppContext()

  return (
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
      </div>*/}
    </div>
  )
}

export default TransactionDataForm
