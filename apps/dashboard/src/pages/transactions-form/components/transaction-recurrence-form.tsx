import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import useRecurringTypes from "~/hooks/useRecurringTypesQuery"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@diariofin/ui/form"
import { Input } from "@diariofin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@diariofin/ui/select"
import { Switch } from "@diariofin/ui/switch"

import { TransactionFormType } from "../schema/transactions-form-schema"

type TransactionRecurrenceFormProps = {
  form: UseFormReturn<TransactionFormType, any, undefined>
}

const TransactionRecurrenceForm = ({ form }: TransactionRecurrenceFormProps) => {
  const { recurringTypes } = useRecurringTypes()

  const [hasInstallments, setHasIstallments] = React.useState(false)

  const isRecurring = form.watch("is_recurring")

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="flex w-full space-x-4">
        <div className="w-2/4">
          <FormField
            control={form.control}
            name="is_recurring"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mt-1 mb-2">Recorrência/Parcelamento?</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="w-2/4">
          <FormField
            control={form.control}
            name="recurring_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Período</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isRecurring}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o período" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {recurringTypes?.length > 0 &&
                      recurringTypes.map((type) => (
                        <SelectItem value={`${type.id}`} key={type.id} className="justify-between">
                          <span>{type.name}</span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex w-full space-x-4 items-center">
        <div className="w-2/4 flex flex-col space-y-1">
          <FormLabel className="mt-1 mb-2">Recebimento fixo</FormLabel>

          <Switch
            disabled={!isRecurring}
            checked={!hasInstallments}
            onCheckedChange={() => setHasIstallments(!hasInstallments)}
          />
        </div>

        <div className="w-2/4">
          <FormField
            name="max_num_of_ocurrences"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtde de Parcelas</FormLabel>
                <FormControl>
                  <Input placeholder="Núm. de Parcelas" {...field} disabled={!hasInstallments} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionRecurrenceForm
