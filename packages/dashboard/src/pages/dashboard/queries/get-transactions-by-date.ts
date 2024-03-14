import { DateRange } from "react-day-picker"
import { SupabaseClient } from "~/services/supabase"

export function getTransactionByDate(supabase: SupabaseClient, date: DateRange) {
  return supabase
    .from("transactions")
    .select("*")
    .gt("date", date.to?.toISOString())
    .lt("date", date.from?.toISOString())
    .throwOnError()
}
