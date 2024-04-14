import type { DateRangeCalendar } from "@fluxozen/ui/calendar"
import { SupabaseClient } from "~/services/supabase"

export function getTransactionCountByDate(supabase: SupabaseClient, date: DateRangeCalendar) {
  return supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .gt("date", date.from)
    .lt("date", date.to)
    .throwOnError()
}
