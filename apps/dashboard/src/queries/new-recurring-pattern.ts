import { SupabaseClient } from "~/services/supabase"
import { RecurringPattern } from "~/types/recurring-pattern"

export async function newRecurringPattern(
  supabase: SupabaseClient,
  values: Pick<RecurringPattern, "recurring_type_id" | "max_num_of_ocurrences" | "transaction_id">
) {
  return supabase
    .from("recurring_pattern")
    .insert({ ...values })
    .throwOnError()
}
