import { DateRange } from "react-day-picker"
import { SupabaseClient } from "~/services/supabase"

export function getTransactionCountByDate(supabase: SupabaseClient, date: DateRange) {
  return supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .gt("start_date", date.from)
    .lt("start_date", date.to)
    .throwOnError()
}
