import { QueryData } from "@supabase/supabase-js"
import { DateRange } from "react-day-picker"
import { SupabaseClient } from "~/services/supabase"

export type TransactionByDateProps = {
  date: DateRange
  isDone?: boolean
}

export function getTransactionByDate(supabase: SupabaseClient, { date, isDone = false }: TransactionByDateProps) {
  return supabase
    .from("transactions")
    .select(
      `*, 
        transactions_instance!inner(is_cancelled,is_refunded,is_done),
        transaction_types (
          id,
          name
        ),
        transaction_categories (
          id,
          name,
          icon,
          category_groups (
            id, 
            name, 
            color
          )
        )
      `
    )
    .gt("date", date.from?.toISOString())
    .lt("date", date.to?.toISOString())
    .eq("transactions_instance.is_done", isDone)
    .eq("transactions_instance.is_cancelled", false)
    .eq("transactions_instance.is_refunded", false)
    .order("date", { ascending: false })
    .throwOnError()
}

export type TransactionsByDateQuery = QueryData<ReturnType<typeof getTransactionByDate>>
