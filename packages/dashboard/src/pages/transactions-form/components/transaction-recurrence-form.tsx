import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/ui/form"
import { Input } from "~/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/ui/select"
import { Switch } from "~/ui/switch"

import { TransactionFormType } from "../schema/transactions-form-schema"
import supabase from "~/services/supabase"
import { RecurringTypes } from "~/types/recurring-types"
import { useToast } from "~/ui/use-toast"

type TransactionRecurrenceFormProps = {
  form: UseFormReturn<TransactionFormType, any, undefined>
}

const TransactionRecurrenceForm = ({ form }: TransactionRecurrenceFormProps) => {
  const { toast } = useToast()

  const [hasInstallments, setHasIstallments] = React.useState(false)
  const [recurringTypes, setRecurringTypes] = React.useState<RecurringTypes[]>([])

  const isRecurring = form.watch("is_recurring")

  const getRecurrenceTypes = async () => {
    const { data, error } = await supabase.from("recurring_types").select("*")

    if (error) return toast({ variant: "destructive", description: "Erro ao requisitar categorias." })

    setRecurringTypes(data)
  }

  React.useEffect(() => {
    getRecurrenceTypes()
  }, [])

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
            name="recurrence.recurring_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Período</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isRecurring}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Recorrência" />
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

          <Switch checked={!hasInstallments} onCheckedChange={() => setHasIstallments(!hasInstallments)} />
        </div>

        <div className="w-2/4">
          <FormField
            name="recurrence.max_num_of_ocurrences"
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
