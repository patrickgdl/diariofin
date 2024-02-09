import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { Switch } from "~/ui/switch"

import { TransactionFormType } from "../schema/transactions-form-schema"

type TransactionRecurrenceFormProps = {
  form: UseFormReturn<TransactionFormType, any, undefined>
}

const TransactionRecurrenceForm = ({ form }: TransactionRecurrenceFormProps) => {
  const [hasInstallments, setHasIstallments] = useState(false)

  return (
    <div className="space-y-4 py-2 pb-4">
      <FormField
        control={form.control}
        name="is_recurring"
        render={({ field }) => (
          <FormItem className="flex items-center space-y-0 space-x-4">
            <FormLabel className="text-base">Recorrência/Parcelamento?</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="w-1/4">
        <FormField
          control={form.control}
          name="recurrence.recurring_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Período</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Mensal/Semanal/etc" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com" className="justify-between">
                    <span>m@example.com</span>
                  </SelectItem>
                  <SelectItem value="m@google.com" className="justify-between">
                    <span>m@example.com</span>
                  </SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex w-full space-x-2 items-end">
        <div className="w-1/4 flex items-center space-y-0 space-x-4">
          <FormLabel className="text-base">Recorrência/Parcelamento?</FormLabel>

          <Switch checked={hasInstallments} onCheckedChange={() => setHasIstallments(!hasInstallments)} />
        </div>

        <div className="w-1/4">
          <FormField
            name="recurrence.max_num_of_ocurrences"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de Parcelas</FormLabel>
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
