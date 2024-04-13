import { useMutation } from "@tanstack/react-query"
import { newRecurringPattern } from "~/queries/new-recurring-pattern"

import useSupabase from "./useSupabase"
import { RecurringPattern } from "~/types/recurring-pattern"

export function useNewRecurringPatternMutation() {
  const supabase = useSupabase()

  const mutationFn = async (
    recurringPattern: Pick<RecurringPattern, "recurring_type_id" | "max_num_of_ocurrences" | "transaction_id">
  ) => {
    return newRecurringPattern(supabase, recurringPattern).then((result) => result.data)
  }

  return useMutation({ mutationFn })
}
