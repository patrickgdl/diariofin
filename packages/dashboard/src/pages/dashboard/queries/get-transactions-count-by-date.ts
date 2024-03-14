import { DateRange } from "react-day-picker"
import { SupabaseClient } from "~/services/supabase"

export function getTransactionCountByDate(supabase: SupabaseClient, date: DateRange) {
  return supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .gt("date", date.from)
    .lt("date", date.to)
    .throwOnError()
}
