import { DateRange } from "react-day-picker"
import { SupabaseClient } from "~/services/supabase"

export function getTransactionByDate(supabase: SupabaseClient, date: DateRange) {
  return supabase
    .from("transactions")
    .select("*")
    .gt("start_date", date.to?.toISOString())
    .lt("start_date", date.from?.toISOString())
    .throwOnError()
}
